import { Router, Request, Response, RequestHandler } from "express";
import { body, validationResult } from "express-validator";
import { rateLimit } from "express-rate-limit";
import { Resend } from "resend";

export const contactRouter = Router();

// ─── RESEND CLIENT ────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.CONTACT_EMAIL || "ejideayodele@gmail.com";

// ─── RATE LIMITER ─────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 5 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ─── VALIDATION ───────────────────────────────────────────────
const validateContact = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email address"),

  body("subject")
    .trim()
    .notEmpty().withMessage("Subject is required")
    .isLength({ min: 2, max: 200 }).withMessage("Subject must be between 2 and 200 characters"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 2, max: 5000 }).withMessage("Message must be between 2 and 5000 characters"),
];

// ─── TYPES ────────────────────────────────────────────────────
interface ContactBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── HELPERS ──────────────────────────────────────────────────
const escapeHTML = (str: string) =>
  str.replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m] || m)
  );

// ─── EMAIL TEMPLATES ──────────────────────────────────────────
function ownerEmailHTML(name: string, email: string, subject: string, message: string) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;padding:24px;color:#1e293b;">
      <h2 style="color:#0ea5e9;margin-top:0;">📬 New Portfolio Message</h2>
      <hr style="border:0;border-top:1px solid #e2e8f0;margin:16px 0;"/>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;font-weight:bold;width:80px;color:#64748b;">From</td>
          <td style="padding:8px 0;">${name} &lt;${email}&gt;</td>
        </tr>
        <tr style="background:#f8fafc;">
          <td style="padding:8px;font-weight:bold;color:#64748b;">Subject</td>
          <td style="padding:8px;">${subject}</td>
        </tr>
      </table>
      <div style="background:#f8fafc;padding:16px;border-radius:8px;margin-top:16px;line-height:1.7;">
        ${message}
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-top:24px;text-align:center;">
        Sent via your Portfolio Contact Form
      </p>
    </div>
  `;
}

function autoReplyHTML(name: string, subject: string) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;padding:24px;color:#1e293b;">
      <h2 style="color:#0ea5e9;margin-top:0;">Thanks for reaching out! 👋</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>
        I've received your message regarding <strong>"${subject}"</strong>
        and will get back to you as soon as possible — usually within 24–48 hours.
      </p>
      <p>In the meantime, feel free to explore more of my work on my portfolio.</p>
      <br/>
      <p style="margin:0;">Best regards,</p>
      <p style="margin:4px 0 0;font-weight:bold;color:#0ea5e9;">Akintek⚡</p>
    </div>
  `;
}

// ─── POST /api/contact ────────────────────────────────────────
contactRouter.post(
  "/",
  contactLimiter as RequestHandler,
  validateContact as any,
  async (req: Request<{}, {}, ContactBody>, res: Response) => {
    const startTime = Date.now();

    // ── Validation ────────────────────────────────────────────
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    const safeName = escapeHTML(name);
    const safeSubject = escapeHTML(subject);
    const safeMessage = escapeHTML(message).replace(/\n/g, "<br/>");

    // ── Dev mode ──────────────────────────────────────────────
    if (!process.env.RESEND_API_KEY) {
      console.log("🛠️  [DEV MODE] Submission received:", { name, email, subject });
      return res.status(200).json({
        success: true,
        message: "Message received! (Dev mode — no email sent)",
      });
    }

    // ── Send emails ───────────────────────────────────────────
    try {
      console.log(`📩 New message from: ${name} <${email}>`);

      await Promise.all([
        // Notify owner
        resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: OWNER_EMAIL,
          replyTo: email,
          subject: `⚡ New Message: ${safeSubject}`,
          html: ownerEmailHTML(safeName, email, safeSubject, safeMessage),
        }),

        // Auto-reply to sender
        resend.emails.send({
          from: "Akintek David <onboarding@resend.dev>",
          to: email,
          subject: `Re: ${safeSubject}`,
          html: autoReplyHTML(safeName, safeSubject),
        }),
      ]);

      console.log(`✅ Emails sent in ${Date.now() - startTime}ms`);

      return res.status(200).json({
        success: true,
        message: "Message sent successfully!",
      });

    } catch (error: any) {
      console.error("❌ Resend Error:", error?.message || error);
      return res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    }
  }
);