import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCE } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Experience() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.4'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="mb-16"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent">Experience</p>
          <h2 className="font-display text-3xl font-bold text-white light:text-ink-950 sm:text-4xl">Where I've worked</h2>
        </motion.div>

        <div className="relative">
          {/* Static faint track */}
          <div className="absolute left-0 top-0 h-full w-px bg-white/5 light:bg-ink-950/10 md:left-1/3" />
          {/* Scroll-linked progress line drawn on top */}
          {!reduced && (
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-px bg-accent md:left-1/3"
            />
          )}

          {EXPERIENCE.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : i * 0.15 }}
              className="relative mb-12 pl-8 md:grid md:grid-cols-3 md:gap-8 md:pl-0"
            >
              <motion.div
                animate={reduced ? {} : {
                  boxShadow: [
                    '0 0 0 0 rgba(99,102,241,0.4)',
                    '0 0 0 8px rgba(99,102,241,0)',
                    '0 0 0 0 rgba(99,102,241,0)',
                  ],
                }}
                transition={reduced ? {} : { duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="absolute -left-1.25 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-ink-950 light:bg-white md:left-1/3 md:-translate-x-1/2"
              />
              <div className="mb-3 md:mb-0 md:pr-8 md:text-right">
                <p className="text-sm font-medium text-accent">{exp.period}</p>
              </div>
              <div className="md:col-span-2 md:pl-8">
                <h3 className="mb-1 font-display text-xl font-semibold text-white light:text-ink-950">{exp.role}</h3>
                <p className="mb-4 text-sm text-zinc-500 light:text-zinc-600">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((r, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : i * 0.15 + j * 0.08 }}
                      className="flex items-start gap-3 text-sm text-zinc-400 light:text-zinc-600"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/60" />{r}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}