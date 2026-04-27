# MyPortfolio — Next.js + Node.js

A fully functional build of my portfolio using Bootstrap
template, implemented with **Next.js 14** (App Router, TypeScript) on the frontend and **Express +
Node.js** (TypeScript) on the backend.

---

## Project Structure

```
iportfolio/
├── frontend/          # Next.js 14 app
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── service-details/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Sidebar.tsx          # Fixed sidebar with nav + dropdowns
│   │   ├── MobileNavToggle.tsx  # Hamburger button for mobile
│   │   ├── Hero.tsx             # Full-screen hero with typed animation
│   │   ├── About.tsx            # Profile, animated counters, skill bars
│   │   ├── Resume.tsx           # Timeline-style education & experience
│   │   ├── Portfolio.tsx        # Filterable grid + lightbox
│   │   ├── Services.tsx         # 6-card service grid
│   │   ├── Testimonials.tsx     # Auto-advancing carousel
│   │   ├── Contact.tsx          # Form connected to backend API
│   │   ├── Footer.tsx
│   │   └── BackToTop.tsx
│   ├── lib/
│   │   ├── useInView.ts         # IntersectionObserver hook
│   │   └── useCounter.ts        # Animated number counter hook
│   └── ...config files
│
└── backend/           # Express + TypeScript API
    └── src/
        ├── index.ts             # Server entry point
        └── routes/
            └── contact.ts       # POST /api/contact with validation + email
```

---

## Features

| Feature | Details |
|---|---|
| **Sidebar navigation** | Fixed sidebar, smooth-scroll links, nested dropdowns, mobile overlay |
| **Typed hero animation** | Cycles through Designer / Developer / Freelancer |
| **Animated stat counters** | Count up on scroll into view |
| **Skill progress bars** | Animated on scroll using IntersectionObserver |
| **Portfolio filter** | Filter by All / App / Product / Branding / Books |
| **Lightbox** | Click any portfolio image to open a full-screen overlay |
| **Testimonials carousel** | Auto-advances every 5 s, prev/next arrows, dot navigation |
| **Contact form** | Validated, rate-limited, sends email via Nodemailer + auto-reply |
| **Service Details page** | Linked from services section |
| **Mobile responsive** | Hamburger menu, sidebar overlay, responsive grids |
| **Back-to-top button** | Appears after scrolling 300px |

---

## Quick Start

### 1. Clone & install

```bash
# Clone the repo (or copy the iportfolio/ folder)
cd iportfolio

# Install frontend deps
cd frontend && npm install

# Install backend deps
cd ../backend && npm install
```

### 2. Configure environment variables

**Backend** — copy the example and fill in your SMTP credentials:
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
FRONTEND_URL=http://**************

# Gmail example (use an App Password, not your real password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-char-app-password

CONTACT_EMAIL=inbox-you-want-messages-at@example.com
```

> **Gmail tip**: Enable 2FA → Google Account → Security → App Passwords → generate one.

**Frontend** — create `.env.local`:
```bash
cd frontend
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://****************
```

### 3. Run in development

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev
# → http://****************

# Terminal 2 — Frontend
cd frontend
npm run dev
# → http://****************
```

### 4. Build for production

```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm start
```

---

## API Endpoints

### `GET /api/health`
Returns `{ status: "ok", timestamp: "..." }` — use for uptime checks.

### `POST /api/contact`
Sends an email to the site owner and an auto-reply to the sender.

**Request body (JSON):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here (10–5000 characters)"
}
```

**Success (200):**
```json
{ "success": true, "message": "Your message has been sent. Thank you!" }
```

**Validation error (422):**
```json
{ "success": false, "message": "Validation failed.", "errors": [...] }
```

**Rate limit (429):**
```json
{ "success": false, "message": "Too many messages sent. Please try again in 15 minutes." }
```

---

## Customisation

All personal data (name, bio, skills, experience, portfolio items, etc.) is stored in plain
TypeScript arrays at the top of each component file — no CMS or database required. Simply edit the
data arrays to make the portfolio your own.

| File | What to change |
|---|---|
| `components/Sidebar.tsx` | Name, social links |
| `components/Hero.tsx` | `TYPED_WORDS` array |
| `components/About.tsx` | Bio text, stats, skills |
| `components/Resume.tsx` | Education & experience arrays |
| `components/Portfolio.tsx` | `items` array (swap in your own images) |
| `components/Services.tsx` | `services` array |
| `components/Testimonials.tsx` | `testimonials` array |
| `components/Contact.tsx` | Address, phone, email |
| `backend/src/routes/contact.ts` | Email template HTML |

---

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Bootstrap Icons (CDN)

**Backend**
- Express 4
- TypeScript
- Nodemailer
- express-validator
- express-rate-limit
- helmet + cors


