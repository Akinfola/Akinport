'use client';

import Image from 'next/image';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '#hero', icon: 'bi-house', label: 'Home' },
  { href: '#about', icon: 'bi-person', label: 'About' },
  { href: '#resume', icon: 'bi-file-earmark-text', label: 'Resume' },
  { href: '#portfolio', icon: 'bi-images', label: 'Portfolio' },
  { href: '#services', icon: 'bi-hdd-stack', label: 'Services' },
  { href: '#contact', icon: 'bi-envelope', label: 'Contact' },
];

const dropdownItems = [
  {
    label: 'Dropdown 1',
    href: '#',
  },
  {
    label: 'Deep Dropdown',
    href: '#',
    children: [
      'Deep Dropdown 1',
      'Deep Dropdown 2',
      'Deep Dropdown 3',
      'Deep Dropdown 4',
      'Deep Dropdown 5',
    ],
  },
  { label: 'Dropdown 2', href: '#' },
  { label: 'Dropdown 3', href: '#' },
  { label: 'Dropdown 4', href: '#' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deepDropdownOpen, setDeepDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('#hero');

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    onClose();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside id="sidebar" className={isOpen ? 'active' : ''}>
      {/* Profile */}
      <div className="flex flex-col items-center py-8">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#2c2f3f] mb-3">
          <Image
            src="assests/hero.jpg"
            alt="Ejide Ayodele David"
            width={96}
            height={96}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>
        <h1 className="text-xl font-bold text-white font-raleway tracking-wide">
          <a
            href="#hero"
            className="hover:text-[#149ddd] transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            Alex Smith
          </a>
        </h1>

        {/* Social Links */}
        <div className="social-links flex gap-2 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
            <i className="bi bi-twitter-x" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
            <i className="bi bi-facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="list-none p-0">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={activeNav === item.href ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
              >
                <i className={`bi ${item.icon}`} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}

          {/* Dropdown */}
          <li className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen((v) => !v);
              }}
            >
              <i className="bi bi-grid" />
              <span>Dropdown</span>
            </a>
            <div className="nav-dropdown-menu">
              <ul className="list-none p-0">
                {dropdownItems.map((item) =>
                  item.children ? (
                    <li
                      key={item.label}
                      className={`nav-dropdown ${deepDropdownOpen ? 'open' : ''}`}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setDeepDropdownOpen((v) => !v);
                        }}
                      >
                        <i className="bi bi-chevron-right" style={{ fontSize: '12px' }} />
                        {item.label}
                      </a>
                      <div className="nav-dropdown-menu">
                        <ul className="list-none p-0">
                          {item.children.map((child) => (
                            <li key={child}>
                              <a href="#" onClick={(e) => e.preventDefault()}>
                                <i className="bi bi-dot" />
                                {child}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <a href={item.href} onClick={(e) => e.preventDefault()}>
                        <i className="bi bi-chevron-right" style={{ fontSize: '12px' }} />
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
