'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/useInView';

const services = [
  {
    icon: 'bi-laptop',
    title: 'Frontend Development',
    description:
      'Building responsive, fast, and modern user interfaces using React, Next.js, and Tailwind CSS with smooth UX and animations.',
  },
  {
    icon: 'bi-server',
    title: 'Backend Development',
    description:
      'Creating secure and scalable backend systems using Node.js, Express, and RESTful APIs with clean architecture.',
  },
  {
    icon: 'bi-database',
    title: 'Database Design',
    description:
      'Designing and managing efficient databases (MongoDB, PostgreSQL, MySQL) with optimized queries and structure.',
  },
  {
    icon: 'bi-shield-lock',
    title: 'Authentication Systems',
    description:
      'Implementing secure login systems with JWT, OAuth, role-based access control, and protected routes.',
  },
  {
    icon: 'bi-cloud-arrow-up',
    title: 'Deployment & Hosting',
    description:
      'Deploying full-stack applications on Vercel, Render, and cloud platforms with CI/CD and environment setup.',
  },
  {
    icon: 'bi-box-seam',
    title: 'Full Web Applications',
    description:
      'Building complete systems like booking platforms, SaaS apps, dashboards, and e-commerce solutions.',
  },
];

export default function Services() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="services"
      className="section section-bg py-20"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#173b6c]">
            My Services
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            I deliver full-stack development solutions from UI to backend,
            database, and deployment with modern scalable architecture.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm cursor-pointer relative overflow-hidden"
            >
              {/* glow background on hover */}
              <motion.div
                className="absolute inset-0 bg-sky-500/5 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* ICON */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 3 }}
                className="text-[#149ddd] text-3xl mb-4 relative z-10"
              >
                <i className={`bi ${service.icon}`} />
              </motion.div>

              {/* TITLE */}
              <h4 className="text-lg font-semibold mb-2 relative z-10">
                <Link
                  href="/service-details"
                  className="hover:text-[#149ddd] transition-colors"
                >
                  {service.title}
                </Link>
              </h4>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}