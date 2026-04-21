import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Full Stack Developer",
};

export default function ServiceDetails() {
  return (
    <main id="main" className="bg-gray-50 min-h-screen">
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#173b6c]">
              My Full-Stack Development Services
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              I build complete, scalable, and production-ready web applications
              from frontend interfaces to backend systems, APIs, and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* SERVICES LIST */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h4 className="text-lg font-bold text-[#173b6c] mb-4">
                  Core Services
                </h4>

                <ul className="space-y-2">
                  {[
                    "Frontend Development (React / Next.js)",
                    "Backend Development (Node.js / APIs)",
                    "Database Design & Management",
                    "Authentication Systems (JWT, OAuth)",
                    "Deployment (Vercel, Render, AWS)",
                    "Full Web App Development",
                  ].map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-gray-700 py-2 border-b last:border-none border-gray-100 hover:text-sky-600 transition"
                    >
                      <span className="text-sky-500">›</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-sky-500 text-white rounded-2xl p-6 shadow-md">
                <h4 className="text-lg font-bold mb-2">
                  Need a Developer?
                </h4>
                <p className="text-sm text-white/90 mb-4">
                  Let’s build your website, SaaS, or booking system from scratch.
                </p>

                <Link
                  href="/#contact"
                  className="inline-block bg-white text-sky-600 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition"
                >
                  Hire Me
                </Link>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-2 space-y-6">

              {/* MAIN SERVICE */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">
                <div className="text-sky-500 text-5xl mb-4">
                  💻
                </div>

                <h3 className="text-2xl font-bold text-[#173b6c] mb-4">
                  Full-Stack Web Application Development
                </h3>

                <p className="text-gray-600 leading-relaxed mb-4">
                  I develop complete web applications from scratch using modern
                  technologies like Next.js, React, Node.js, and TypeScript.
                  My focus is building scalable, fast, and production-ready systems.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  From user interfaces to backend APIs, authentication systems,
                  and database design, I handle the entire development lifecycle
                  including deployment and optimization.
                </p>
              </div>

              {/* FEATURE CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {[
                  "Responsive frontend interfaces with modern UI/UX",
                  "Secure backend APIs and server-side logic",
                  "Database design (MongoDB, PostgreSQL, MySQL)",
                  "Authentication & role-based access control",
                  "Payment integration (Stripe, PayPal)",
                  "Cloud deployment & CI/CD pipelines",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition flex gap-3"
                  >
                    <span className="text-sky-500 mt-1">✔</span>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              {/* BACK BUTTON */}
              <div className="text-center pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-600 transition shadow-md"
                >
                  ← Back to Portfolio
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}