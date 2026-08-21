import { useRef } from 'react';
import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { SITE } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Magnetic from '../components/Magnetic';
import ParticleField from '../components/ParticleField';

export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headline = ['Building', 'polished', 'digital', 'experiences'];

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0.9 },
    },
  };
  const word: Variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="mesh-bg relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <motion.div
        style={{ y: reduced ? 0 : contentY, opacity: reduced ? 1 : contentOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mb-6 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent"
        >
          {SITE.name}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display text-4xl font-bold leading-tight tracking-tight text-white light:text-ink-950 sm:text-6xl md:text-7xl"
        >
          {headline.map((w, i) => (
            <motion.span key={i} variants={word} className="mr-3 inline-block">
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mx-auto mt-6 max-w-4xl text-balance font-body text-lg text-zinc-400 light:text-zinc-600"
        >
          <span className="block">{SITE.title}</span>
          <span className="block">{SITE.tagline}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollTo('#projects')}
              className="group relative overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent/30"
            >
              <span className="relative z-10">View Work</span>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>
          </Magnetic>
          <Magnetic strength={0.4}>
            <button
              onClick={() => scrollTo('#contact')}
              className="rounded-full border border-white/15 light:border-ink-950/15 px-7 py-3.5 text-sm font-semibold text-zinc-200 light:text-zinc-700 transition-all hover:border-accent hover:text-accent"
            >
              Get in Touch
            </button>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <Magnetic strength={0.5}>
            <a
              href={SITE.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-zinc-500 light:text-zinc-500 transition-colors hover:text-accent"
            >
              <SiGithub size={20} />
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a
              href={SITE.socials.email}
              aria-label="Email"
              className="text-zinc-500 light:text-zinc-500 transition-colors hover:text-accent"
            >
              <Mail size={20} />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2.2, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 light:text-zinc-500 hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}