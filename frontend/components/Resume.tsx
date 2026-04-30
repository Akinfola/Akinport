'use client';

import { useInView } from '@/lib/useInView';

const summary = {
  name: 'EJIDE AYODELE DAVID',
  description:
    'Full-stack developer experienced in building scalable web applications using Next.js, Node.js, and TypeScript. Focused on clean UI, secure backend systems, and performance optimization. Comfortable working remotely using Git-based workflows and delivering real-world solutions.',
  details: [
    'Lagos, Nigeria',
    '+234 701 891 1593',
    'ejideayodele@gmail.com',
    'GitHub: github.com/yourusername', // replace
    'Portfolio: yourportfolio.com', // replace
  ],
};

const education = [
  {
    degree: 'B.Sc. Physics Education',
    period: '2021 – 2025',
    school: 'University of Lagos, Nigeria',
    description:
      'Built a strong foundation in physics concepts, analytical reasoning, and quantitative problem-solving. Developed the ability to simplify complex scientific ideas for effective teaching and communication. Complemented academic training with hands-on experience in programming and software development, integrating technology into learning and problem-solving processes.',
  },
];

const experience = [
  {
    title: 'Full-Stack Developer Intern',
    period: 'May 2025 – Dec 2025',
    company: 'Unilag Nithub',
    bullets: [
      'Built full-stack web applications using Next.js, Node.js, and TypeScript.',
      'Developed REST APIs for authentication systems and dashboards.',
      'Implemented responsive UI with Tailwind CSS and Bootstrap.',
      'Collaborated using GitHub (pull requests, issues, version control).',
      'Deployed applications using Vercel and Render.',
    ],
  },
  {
    title: 'AI & Web Automation Developer (Freelance)',
    period: 'July 2024 – Jan 2025',
    company: 'Remote',
    bullets: [
      'Developed AI-powered quiz generator using OpenAI API.',
      'Handled API integration and processed JSON responses.',
      'Built interactive UI for displaying dynamic content.',
      'Delivered projects independently in a remote environment.',
    ],
  },
  {
    title: 'Python Programming Tutor (Freelance)',
    period: 'Jan 2024 – Feb 2024',
    company: 'Remote',
    bullets: [
      'Taught Python fundamentals, OOP, and data structures.',
      'Mentored 15+ students on real-world projects.',
      'Helped students build portfolios and prepare for internships.',
    ],
  },
];

const projects = [
  {
    title: 'FinanceFlow App',
    description:
      'A full-stack finance management application for tracking transactions, dashboards, and user data.',
    link: 'https://financeflow-nithub.vercel.app/',
  },
  {
    title: 'Horizon Fullstack App',
    description:
      'A full-stack web application with authentication, dashboards, and secure user workflows.',
    link: 'https://horizon-fullstack.vercel.app/login',
  },
  {
    title: 'QR Code Generator',
    description:
      'A simple web app that generates QR codes instantly from user input, focusing on usability and responsiveness.',
    link: 'https://my-qrcode1.netlify.app/',
  },
  {
    title: 'DSA Practice Platform',
    description:
      'Built a coding platform with challenge solving, submissions, and leaderboard tracking using full-stack architecture.',
    link: '#',
  },
  {
    title: 'AI Quiz Generator',
    description:
      'Web app that generates multiple-choice questions from user input using AI integration.',
    link: '#',
  },
  {
    title: 'Library Management System',
    description:
      'Developed using TypeScript and OOP principles to manage books, users, and borrowing logic.',
    link: '#',
  },
];

export default function Resume() {
  const { ref, inView } = useInView(0.05);

  return (
    <section
      id="resume"
      className="section section-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="section-title">
          <h2>Resume</h2>
          <p>
            Full-stack developer focused on building scalable applications and
            delivering clean, efficient solutions for real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Summary */}
            <h3 className="resume-title">Summary</h3>
            <div className="resume-item pb-0">
              <h4>{summary.name}</h4>
              <p className="italic text-sm mb-3">{summary.description}</p>
              <ul className="text-sm">
                {summary.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <h3 className="resume-title mt-8">Education</h3>
            {education.map((edu) => (
              <div className="resume-item" key={edu.degree}>
                <h4>{edu.degree}</h4>
                <h5>{edu.period}</h5>
                <p className="italic text-sm mb-2 text-sky-500">
                  {edu.school}
                </p>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))}

            {/* Projects */}
            <h3 className="resume-title mt-8">Projects</h3>
            {projects.map((proj) => (
              <div className="resume-item" key={proj.title}>
                <h4 className="flex items-center justify-between">
                  {proj.title}
                  {proj.link !== '#' && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                    >
                      Live
                    </a>
                  )}
                </h4>
                <p className="text-sm mt-1">{proj.description}</p>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h3 className="resume-title">Professional Experience</h3>
            {experience.map((exp) => (
              <div className="resume-item" key={exp.title}>
                <h4>{exp.title}</h4>
                <h5>{exp.period}</h5>
                <p className="italic text-sm mb-2 text-sky-500">
                  {exp.company}
                </p>
                <ul className="text-sm list-disc ml-4">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}