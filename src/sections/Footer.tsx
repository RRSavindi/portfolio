import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { SITE } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Magnetic from '../components/Magnetic';

export default function Footer() {
  const reduced = useReducedMotion();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <footer className="relative border-t border-white/5 light:border-ink-950/5 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <a href="#hero" className="font-display text-lg font-bold text-white light:text-ink-950">
            <span className="text-accent">{'<'}</span>RS<span className="text-accent">{'/>'}</span>
          </a>
          <span className="text-sm text-zinc-600 light:text-zinc-500">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-8">
          <Magnetic strength={0.5}>
            <a href={SITE.socials.github} target="_blank" rel="noreferrer" className="text-zinc-500 light:text-zinc-500 transition-colors hover:text-accent">
              <SiGithub size={18} />
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 light:text-zinc-500 transition-colors hover:text-accent">
              <LinkedinIcon size={18} />
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a href={SITE.socials.email} className="text-zinc-500 light:text-zinc-500 transition-colors hover:text-accent">
              <Mail size={18} />
            </a>
          </Magnetic>
        </div>

        <Magnetic strength={0.3}>
          <motion.button
            onClick={scrollToTop}
            whileHover={reduced ? {} : { y: -2 }}
            className="flex items-center gap-2 rounded-full border border-white/10 light:border-ink-950/10 px-4 py-2 text-xs font-medium text-zinc-400 light:text-zinc-600 transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp size={14} />
          </motion.button>
        </Magnetic>
      </div>
    </footer>
  );
}