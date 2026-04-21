'use client';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNavToggle({ isOpen, onToggle }: Props) {
  return (
    <button
      className="mobile-nav-toggle"
      onClick={onToggle}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
    >
      <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} />
    </button>
  );
}
