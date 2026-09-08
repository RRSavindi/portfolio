import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Briefcase, Code2, GraduationCap } from 'lucide-react';
import { SITE } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

const FACTS = [
  { icon: MapPin, label: 'Based in', value: SITE.location },
  { icon: Briefcase, label: 'Experience', value: `${SITE.currentRole} at ${SITE.currentCompany}` },
  { icon: Code2, label: 'Focus', value: 'Software Development, Frontend Development, UI/UX Design, Full-Stack Development' },
  { icon: GraduationCap, label: 'Education', value: 'Institute of Technology - University of Moratuwa (NDT)' },
];

export default function About() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -30, reduced ? 0 : 30]);

  return(
    <section ref={sectionRef} id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ y: imageY }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 light:border-ink-950/10 bg-linear-to-br from-accent/10 via-transparent to-accent/5 flex items-center justify-center"
          >
            <div className="font-display text-[8rem] font-bold text-accent/20">RS</div>
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 light:border-ink-950/10">
                <img
                  src="/profile.png"
                  alt="Raneesha Savindi"
                  className="h-full w-full object-cover"
                />
              </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent"
            >
              About
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 font-display text-3xl font-bold text-white light:text-ink-950 sm:text-4xl"
            >
              I turn ideas into shipped products.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-lg leading-relaxed text-zinc-400 light:text-zinc-600"
            >
              I'm a full-stack web developer with a strong focus on frontend development and UI/UX design.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 text-lg leading-relaxed text-zinc-400 light:text-zinc-600"
            >
             I completed a 6-month internship in software development at Darimac Technologies (Pvt) Ltd, where I worked on real-world projects across mobile, web, and backend systems. I enjoy building interfaces that are as functional as they are well-designed, and I'm always looking to sharpen both my engineering and design instincts.
            </motion.p>
            <div className="space-y-4">
              {FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={reduced ? {} : { x: 4 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex cursor-default items-center gap-4 border-b border-white/5 light:border-ink-950/5 pb-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 text-accent">
                    <fact.icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-zinc-500 light:text-zinc-500">{fact.label}</p>
                    <p className="text-sm font-medium text-zinc-200 light:text-zinc-800">{fact.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}