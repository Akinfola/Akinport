'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

const BASE = 'https://themewagon.github.io/iPortfolio/assets/img/testimonials';

const testimonials = [
  {
    id: 1,
    name: 'Saul Goodman',
    role: 'CEO & Founder',
    image: `${BASE}/testimonials-1.jpg`,
    text: 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.',
  },
  {
    id: 2,
    name: 'Sara Wilsson',
    role: 'Designer',
    image: `${BASE}/testimonials-2.jpg`,
    text: 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.',
  },
  {
    id: 3,
    name: 'Jena Karlis',
    role: 'Store Owner',
    image: `${BASE}/testimonials-3.jpg`,
    text: 'Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export minim fugiat dolor enim duis veniam ipsum anim magna sunt elit fore quem dolore labore illum veniam.',
  },
  {
    id: 4,
    name: 'Matt Brandon',
    role: 'Freelancer',
    image: `${BASE}/testimonials-4.jpg`,
    text: 'Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam tempor noster veniam sunt culpa nulla illum cillum fugiat legam esse veniam culpa fore nisi cillum quid.',
  },
  {
    id: 5,
    name: 'John Larson',
    role: 'Entrepreneur',
    image: `${BASE}/testimonials-5.jpg`,
    text: 'Qui consequuntur quos accusantium et harum rerum sit laudantium est repudiandae numquam temporibus cumque. Laudantium reprehenderit distinctio sed vero sunt tempore. Vero minus.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section section-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="section-title">
          <h2>Testimonials</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
          </p>
        </div>

        {/* Carousel */}
        <div className="testimonials-carousel relative">
          {/* Prev / Next arrows */}
          <button
            onClick={() => goTo((current - 1 + testimonials.length) % testimonials.length)}
            style={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#149ddd',
              border: 'none',
              color: '#fff',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Previous testimonial"
          >
            <i className="bi bi-chevron-left" />
          </button>

          <div
            style={{
              opacity: isAnimating ? 0 : 1,
              transition: 'opacity 0.3s ease',
              padding: '0 30px',
            }}
          >
            <div className="testimonial-item">
              <p>
                <i className="bi bi-quote quote-icon-left" />
                {t.text}
                <i className="bi bi-quote quote-icon-right" />
              </p>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={90}
                  height={90}
                  className="testimonial-img"
                  unoptimized
                />
                <div style={{ marginLeft: 16 }}>
                  <h3>{t.name}</h3>
                  <h4>{t.role}</h4>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => goTo((current + 1) % testimonials.length)}
            style={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              background: '#149ddd',
              border: 'none',
              color: '#fff',
              width: 36,
              height: 36,
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Next testimonial"
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots mt-6">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
