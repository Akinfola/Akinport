'use client';

import { useInView } from '@/lib/useInView';

const summary = {
  name: 'Brandon Johnson',
  description:
    'Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing user-centered digital/print marketing material from initial concept to final, polished deliverable.',
  details: ['Portland par 127, Orlando, FL', '(123) 456-7891', 'alice.barkley@example.com'],
};

const education = [
  {
    degree: 'Master of Fine Arts & Graphic Design',
    period: '2015 – 2016',
    school: 'Rochester Institute of Technology, Rochester, NY',
    description:
      'Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut dignissimos deleniti nerada porti sand markend.',
  },
  {
    degree: 'Bachelor of Fine Arts & Graphic Design',
    period: '2010 – 2014',
    school: 'Rochester Institute of Technology, Rochester, NY',
    description:
      'Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila.',
  },
];

const experience = [
  {
    title: 'Senior Graphic Design Specialist',
    period: '2019 – Present',
    company: 'Experion, New York, NY',
    bullets: [
      'Lead in the design, development, and implementation of the graphic, layout, and production communication materials.',
      'Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project.',
      'Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design.',
      'Oversee the efficient use of production project budgets ranging from $2,000 – $25,000.',
    ],
  },
  {
    title: 'Graphic Design Specialist',
    period: '2017 – 2018',
    company: 'Stepping Stone Advertising, New York, NY',
    bullets: [
      'Developed numerous marketing programs (logos, brochures, infographics, presentations, and advertisements).',
      'Managed up to 5 projects or tasks at a given time while under pressure.',
      'Recommended and consulted with clients on the most appropriate graphic design.',
      'Created 4+ design presentations and proposals a month for clients and account managers.',
    ],
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
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Summary */}
            <h3 className="resume-title">Sumary</h3>
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
                <p className="italic text-sm mb-2" style={{ color: '#149ddd' }}>
                  {edu.school}
                </p>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h3 className="resume-title">Professional Experience</h3>
            {experience.map((exp) => (
              <div className="resume-item" key={exp.title}>
                <h4>{exp.title}</h4>
                <h5>{exp.period}</h5>
                <p className="italic text-sm mb-2" style={{ color: '#149ddd' }}>
                  {exp.company}
                </p>
                <ul className="text-sm">
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
