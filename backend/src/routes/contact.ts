import { Router, Request, Response, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

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

interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── SMTP TRANSPORTER ────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Force IPv4 to fix the ENETUNREACH error
  // @ts-ignore - 'family' exists at runtime but not in all type versions
  family: 4,
} as SMTPTransport.Options);

// ─── ROUTE ───────────────────────────────────────────────────
contactRouter.post(
  "/",
  contactLimiter as RequestHandler,
  validateContact as any,
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    const startTime = Date.now();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    // Helper to escape HTML and prevent injection in emails
    const escapeHTML = (str: string) =>
      str.replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      }[m] || m));

    const safeName = escapeHTML(name);
    const safeSubject = escapeHTML(subject);
    const safeMessage = escapeHTML(message).replace(/\n/g, "<br/>");

    // Fix: Use || to catch empty strings, not just null/undefined
    const ownerEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    if (!ownerEmail) {
      console.error("❌ Email configuration error: CONTACT_EMAIL/SMTP_USER missing");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const smtpReady = process.env.SMTP_USER && process.env.SMTP_PASS;

    // ─── DEV MODE ───────────────────────────────────────────
    if (!smtpReady) {
      console.log("🛠️ [DEV MODE] Contact Submission:", { name, email, subject });
      return res.status(200).json({
        success: true,
        message: "Message received (Dev Mode - no email sent)",
      });
    }

    // ─── SEND EMAILS (Background) ───────────────────────────
    // We don't 'await' this so the user gets an instant response.
    Promise.all([
      // 1. NOTIFICATION TO OWNER
      transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: ownerEmail,
        replyTo: email,
        subject: `⚡ New Message: ${safeSubject}`,
        html: `
          <div style="font-family:sans-serif; max-width:600px; border:1px solid #e2e8f0; border-radius:12px; padding:24px; color:#1e293b;">
            <h2 style="color:#0ea5e9; margin-top:0;">New Portfolio Message</h2>
            <hr style="border:0; border-top:1px solid #e2e8f0; margin:20px 0;"/>
            <p><strong>From:</strong> ${safeName} (${email})</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <div style="background:#f8fafc; padding:16px; border-radius:8px; margin-top:16px; white-space:pre-wrap;">
              ${safeMessage}
            </div>
            <p style="font-size:12px; color:#94a3b8; margin-top:24px;">Sent from your Portfolio Contact Form</p>
          </div>
        `,
      }),

      // 2. AUTO-REPLY TO SENDER
      transporter.sendMail({
        from: `"Akintek" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thanks for reaching out!`,
        html: `
          <div style="font-family:sans-serif; max-width:600px; border:1px solid #e2e8f0; border-radius:12px; padding:24px; color:#1e293b;">
            <p>Hi ${safeName},</p>
            <p>Thanks for contacting me! I've received your message regarding <strong>"${safeSubject}"</strong> and I'll get back to you as soon as possible.</p>
            <p>In the meantime, feel free to check out more of my work on my portfolio.</p>
            <br/>
            <p>Best regards,<br/><strong>Akintek David</strong></p>
          </div>
        `,
      }),
    ])
      .then(() => {
        const duration = Date.now() - startTime;
        console.info(`✅ Background emails sent in ${duration}ms`);
      })
      .catch((err) => {
        console.error("❌ Background SMTP Error:", err.message);
      });

    // ─── INSTANT RESPONSE ──────────────────────────────────
    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  }
);