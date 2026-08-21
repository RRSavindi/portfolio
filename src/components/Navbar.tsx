import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Magnetic from './Magnetic';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ink-950/70 light:bg-white/70 backdrop-blur-xl border-b border-white/5 light:border-ink-950/5'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Magnetic>
            <a
              href="#hero"
              onClick={(e) => handleClick(e, '#hero')}
              className="font-display text-lg font-bold tracking-tight text-white light:text-ink-950"
            >
              <span className="text-accent">{'<'}</span>RS<span className="text-accent">{'/>'}</span>
            </a>
          </Magnetic>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.href} strength={0.2}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-zinc-400 light:text-zinc-600 transition-colors hover:text-white light:hover:text-ink-950"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.4}>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="rounded-full border border-white/10 light:border-ink-950/10 p-2.5 text-zinc-300 light:text-zinc-600 transition-colors hover:text-accent"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </Magnetic>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="rounded-full border border-white/10 light:border-ink-950/10 p-2.5 text-zinc-300 light:text-zinc-600 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-ink-950/95 light:bg-white/95 backdrop-blur-xl border-b border-white/5 light:border-ink-950/5 md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="border-b border-white/5 light:border-ink-950/5 py-3 text-sm font-medium text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-ink-950"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
