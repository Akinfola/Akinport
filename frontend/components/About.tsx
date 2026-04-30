'use client';

import Image from 'next/image';
import { useInView } from '@/lib/useInView';
import { useCounter } from '@/lib/useCounter';

const stats = [
  { icon: 'bi-emoji-smile', value: 10, suffix: '+', label: 'Projects Built', sub: 'real-world applications' },
  { icon: 'bi-journal-richtext', value: 5, suffix: '+', label: 'Full Stack Apps', sub: 'frontend + backend systems' },
  { icon: 'bi-headset', value: 24, suffix: '/7', label: 'Support Mindset', sub: 'always improving systems' },
  { icon: 'bi-people', value: 100, suffix: '%', label: 'Commitment', sub: 'clean & scalable code' },
];

const skills = [
  // Frontend & Core
  { name: 'Next.js', value: 95 },
  { name: 'React', value: 92 },
  { name: 'TypeScript', value: 90 },
  // Backend & Tools
  { name: 'Node.js', value: 88 },
  { name: 'PostgreSQL / MongoDB', value: 85 },
  { name: 'Git & Deployment', value: 80 },
];

function StatCounter({
  icon,
  value,
  suffix,
  label,
  sub,
  active,
}: {
  icon: string;
  value: number;
  suffix: string;
  label: string;
  sub: string;
  active: boolean;
}) {
  const count = useCounter(value, 2000, active);

  return (
    <div className="text-center p-4">
      <i className={`bi ${icon}`} style={{ fontSize: 44, color: '#149ddd', display: 'block', marginBottom: 10 }} />
      <span className="text-2xl font-bold text-[#173b6c]">
        {count}{suffix}
      </span>
      <p className="text-sm text-gray-600 mt-1">
        <strong>{label}</strong> {sub}
      </p>
    </div>
  );
}

function SkillBar({
  name,
  value,
  active,
}: {
  name: string;
  value: number;
  active: boolean;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-[#173b6c]">{name}</span>
        <span className="text-gray-500">{value}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#149ddd] h-2 rounded-full transition-all duration-1000"
          style={{ width: active ? `${value}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="about" className="py-20 bg-white" ref={ref as React.RefObject<HTMLElement>}>
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#173b6c]">About Me</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            I am a Full-Stack Developer focused on building scalable, high-performance web applications with great user experience. I specialize in creating clean, responsive UIs and secure backend systems that power modern digital products.
            I work with Next.js, React, TypeScript, JavaScript, Node.js, and PostgreSQL, developing everything from frontend interfaces to REST APIs and database-driven applications.
            I prioritize code quality, scalability, and performance, ensuring every project is built for long-term growth. I enjoy solving real-world problems by building SaaS platforms, dashboards, booking systems, and custom web solutions from start to finish.
          </p>
        </div>

        {/* PROFILE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">

          {/* IMAGE */}
         <div className="flex justify-center lg:justify-start">
  <div className="relative group">
    <Image
      src="/assets/about.jpeg"
      alt="Profile"
      width={350}
      height={400}
      className="
        rounded-2xl
        object-cover
        w-full max-w-xs
        shadow-md
        transition-all duration-700 ease-in-out
        group-hover:scale-110
        group-hover:-translate-y-2
        group-hover:shadow-2xl
      "
    />

    {/* glow effect */}
    <div className="
      absolute inset-0 rounded-2xl
      opacity-0 group-hover:opacity-100
      transition duration-300
     
      scale-110
    " />
  </div>
</div>

          {/* BIO */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-[#173b6c] mb-3">
              Full-Stack Developer (React / Next.js / Node.js)
            </h3>

            <p className="text-gray-600 italic mb-4">
              I specialize in building complete web applications from frontend to backend,
              focusing on performance, scalability, and clean architecture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Location:</strong> Lagos, Nigeria</li>
                <li><strong>Phone:</strong> Available on request</li>
                <li><strong>Email:</strong> ejideayodele@gmail.com</li>
              </ul>

              <ul className="space-y-2 text-gray-700">
                <li><strong>Speciality:</strong> Web & SaaS Development</li>
                <li><strong>Experience:</strong> Project-based (Freelance)</li>
                <li><strong>Status:</strong> <span className="text-[#149ddd] font-semibold">Available</span></li>
              </ul>
            </div>

            <p className="text-gray-600">
           I enjoy turning ideas into real-world applications such as booking systems, SaaS platforms, dashboards, and custom business solutions. I focus on building clean, maintainable code and well-structured architectures that scale easily. I also prioritize efficient API design, seamless backend integration, and smooth, intuitive user experiences that make products both functional and enjoyable to use.git 
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-gray-50 rounded-2xl py-8 mb-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} active={inView} />
          ))}
        </div>

        {/* SKILLS */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#173b6c] mb-6">Technical Skills</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10">
            <div>
              {skills.slice(0, 3).map((s) => (
                <SkillBar key={s.name} {...s} active={inView} />
              ))}
            </div>
            <div>
              {skills.slice(3).map((s) => (
                <SkillBar key={s.name} {...s} active={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}