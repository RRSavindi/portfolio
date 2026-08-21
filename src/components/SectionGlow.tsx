import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SECTIONS = [
  { id: 'hero', color: 'rgba(99, 102, 241, 0.06)' },
  { id: 'about', color: 'rgba(99, 102, 241, 0.04)' },
  { id: 'skills', color: 'rgba(16, 185, 129, 0.04)' },
  { id: 'projects', color: 'rgba(245, 158, 11, 0.04)' },
  { id: 'experience', color: 'rgba(168, 85, 247, 0.04)' },
  { id: 'contact', color: 'rgba(99, 102, 241, 0.06)' },
];

export default function SectionGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const viewportMid = window.innerHeight / 2;
      let activeColor = SECTIONS[0].color;

      for (const section of SECTIONS) {
        const target = document.getElementById(section.id);
        if (!target) continue;
        const rect = target.getBoundingClientRect();
        if (rect.top <= viewportMid && rect.bottom >= viewportMid) {
          activeColor = section.color;
          break;
        }
      }

      el.style.background = `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 70%)`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z- transition-all duration-1000"
      aria-hidden="true"
    />
  );
}