'use client';

import { useEffect, useState } from 'react';

const TYPED_WORDS = ['Designer', 'Developer', 'Freelancer'];
const TYPING_SPEED = 120;
const DELETING_SPEED = 60;
const PAUSE_DURATION = 1800;

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_WORDS[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % TYPED_WORDS.length);
          }
        }
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="hero-container text-center px-4">
        <h1 className="mb-4">Alex Smith</h1>
        <p>
          I&apos;m{' '}
          <span>
            {displayText}
            <span className="typed-cursor">|</span>
          </span>
        </p>

        <button
          onClick={scrollToAbout}
          style={{
            marginTop: '40px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.5)',
            color: '#fff',
            padding: '10px 28px',
            borderRadius: '50px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontFamily: 'Poppins, sans-serif',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#149ddd';
            (e.currentTarget as HTMLButtonElement).style.background = '#149ddd';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <i className="bi bi-chevron-down" />
          Learn More
        </button>
      </div>
    </section>
  );
}
