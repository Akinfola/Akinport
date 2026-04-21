'use client';

import Image from 'next/image';
import { useState } from 'react';

const BASE = 'https://themewagon.github.io/iPortfolio/assets/img/portfolio';

const items = [
  { id: 1, category: 'app', title: 'App 1', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/app-1.jpg` },
  { id: 2, category: 'product', title: 'Product 1', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/product-1.jpg` },
  { id: 3, category: 'branding', title: 'Branding 1', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/branding-1.jpg` },
  { id: 4, category: 'books', title: 'Books 1', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/books-1.jpg` },
  { id: 5, category: 'app', title: 'App 2', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/app-2.jpg` },
  { id: 6, category: 'product', title: 'Product 2', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/product-2.jpg` },
  { id: 7, category: 'branding', title: 'Branding 2', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/branding-2.jpg` },
  { id: 8, category: 'books', title: 'Books 2', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/books-2.jpg` },
  { id: 9, category: 'app', title: 'App 3', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/app-3.jpg` },
  { id: 10, category: 'product', title: 'Product 3', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/product-3.jpg` },
  { id: 11, category: 'branding', title: 'Branding 3', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/branding-3.jpg` },
  { id: 12, category: 'books', title: 'Books 3', description: 'Lorem ipsum, dolor sit amet consectetur', image: `${BASE}/books-3.jpg` },
];

const filters = ['all', 'app', 'product', 'branding', 'books'];

interface LightboxItem {
  image: string;
  title: string;
  description: string;
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  const filtered = activeFilter === 'all' ? items : items.filter((i) => i.category === activeFilter);

  return (
    <section id="portfolio" className="section">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="section-title">
          <h2>Portfolio</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem.
            Sit sint consectetur velit. Quisquam quos quisquam cupiditate.
          </p>
        </div>

        {/* Filters */}
        <ul className="portfolio-filters mb-8">
          {filters.map((f) => (
            <li
              key={f}
              className={activeFilter === f ? 'filter-active' : ''}
              onClick={() => setActiveFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </li>
          ))}
        </ul>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="portfolio-item"
              onClick={() => setLightbox({ image: item.image, title: item.title, description: item.description })}
            >
              <div className="relative overflow-hidden rounded-lg" style={{ height: 240 }}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  unoptimized
                />
                <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span style={{ fontSize: 12, color: '#149ddd', cursor: 'pointer' }}>
                      <i className="bi bi-zoom-in mr-1" />
                      Preview
                    </span>
                    <span style={{ fontSize: 12, color: '#149ddd', cursor: 'pointer', marginLeft: 8 }}>
                      <i className="bi bi-link-45deg mr-1" />
                      Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '90vw', textAlign: 'center' }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: -40,
                right: 0,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 28,
                cursor: 'pointer',
              }}
              aria-label="Close lightbox"
            >
              <i className="bi bi-x-lg" />
            </button>
            <img
              src={lightbox.image}
              alt={lightbox.title}
              style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }}
            />
            <div style={{ color: '#fff', marginTop: 12 }}>
              <h4 style={{ fontSize: 20, fontFamily: 'Poppins, sans-serif', marginBottom: 4 }}>
                {lightbox.title}
              </h4>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}