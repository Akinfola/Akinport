import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

export const contactRouter = Router();

// ─── Rate Limiter ─────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again later.",
  },
});

// ─── Validation ───────────────────────────────────────────────
const validateContact = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be at least 2 characters long."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .withMessage("Please enter a valid email address."),


  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Subject must be at least 2 characters long."),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required.")
    .isLength({ min: 2, max: 5000 })
    .withMessage("Message must be at least 2 characters long."),
];

// ─── Transporter ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Route ────────────────────────────────────────────────────
contactRouter.post(
  "/",
  contactLimiter,
  validateContact,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
      return;
    }

    const { name, email, subject, message } = req.body;

    const smtpReady =
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_USER !== "" &&
      process.env.SMTP_PASS !== "";

    if (!smtpReady) {
      console.info(
        `[contact] SMTP not configured — logging submission: name=${name} email=${email} subject=${subject}`,
      );
      res.status(200).json({
        success: true,
        message: "Message received! I will get back to you soon.",
      });
      return;
    }

    try {
      const startTime = Date.now();
      const ownerEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

      // ─── Send Emails in Parallel ──────────────────────────
      await Promise.all([
        // 1. Notify owner
        transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: ownerEmail,
          replyTo: email,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto">
              <h2 style="color:#0ea5e9">New Portfolio Message</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px;font-weight:bold;width:90px">Name</td><td style="padding:8px">${name}</td></tr>
                <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px;font-weight:bold">Subject</td><td style="padding:8px">${subject}</td></tr>
                <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
              </table>
            </div>
          `,
        }),

        // 2. Auto-reply to sender
        transporter.sendMail({
          from: `"AKINTEK⚡" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Re: ${subject}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto">
              <p>Hi ${name},</p>
              <p>Thanks for reaching out! I've received your message and will reply as soon as possible.</p>
              <br/>
              <p>Best regards,<br/><strong>Akintek</strong></p>
            </div>
          `,
        }),
      ]);

      const duration = Date.now() - startTime;
      console.info(`[contact] Message sent in ${duration}ms`);

      res.status(200).json({
        success: true,
        message: "Message sent successfully!",
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error("[contact] Email error:", msg);

      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }
  },
);