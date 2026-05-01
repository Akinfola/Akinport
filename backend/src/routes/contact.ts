import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

export const contactRouter = Router();

// ─── RATE LIMITER ────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // increased for testing stability
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

// ─── VALIDATION ──────────────────────────────────────────────
const validateContact = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be at least 2 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Subject must be at least 2 characters long"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 2, max: 5000 })
    .withMessage("Message must be at least 2 characters long"),
];

// ─── SMTP TRANSPORTER ────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── ROUTE ───────────────────────────────────────────────────
contactRouter.post(
  "/",
  contactLimiter,
  validateContact,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    // safe email fallback
    const ownerEmail =
      process.env.CONTACT_EMAIL ?? process.env.SMTP_USER;

    if (!ownerEmail) {
      console.error("No owner email configured");
      return res.status(500).json({
        success: false,
        message: "Email configuration error",
      });
    }

    const smtpReady =
      process.env.SMTP_USER &&
      process.env.SMTP_PASS;

    // ─── DEV MODE (no SMTP) ────────────────────────────────
    if (!smtpReady) {
      console.log("[DEV MODE] Contact form:", req.body);

      return res.status(200).json({
        success: true,
        message: "Message received successfully",
      });
    }

    try {
      await Promise.all([
        // ─── EMAIL TO OWNER ────────────────────────────────
        transporter.sendMail({
          from: `"Portfolio" <${process.env.SMTP_USER}>`,
          to: ownerEmail,
          replyTo: email,
          subject: `[Contact] ${subject}`,
          html: `
            <h2>New Message</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b><br/>${message}</p>
          `,
        }),

        // ─── AUTO REPLY ────────────────────────────────────
        transporter.sendMail({
          from: `"Akintek" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Re: ${subject}`,
          html: `
            <p>Hi ${name},</p>
            <p>Thanks for contacting me. I’ll get back to you soon.</p>
            <br/>
            <p>— Akintek</p>
          `,
        }),
      ]);

      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
      });

    } catch (error) {
      console.error("Email error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }
  }
);