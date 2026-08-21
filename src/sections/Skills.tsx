import { motion } from 'framer-motion';
import { SKILLS } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Skills() {
  const categories = Object.entries(SKILLS);
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent"
          >
            Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.1 }}
            className="font-display text-3xl font-bold text-white light:text-ink-950 sm:text-4xl"
          >
            Tools of the trade
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : catIdx * 0.1 }}
              className="rounded-2xl border border-white/5 light:border-ink-950/5 bg-ink-900/30 light:bg-white/60 p-8 backdrop-blur-sm"
            >
              <h3 className="mb-6 font-display text-xl font-semibold text-white light:text-ink-950">{category}</h3>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={reduced ? {} : { scale: 1.08, y: -2 }}
                    animate={reduced ? {} : { y: [0, -3, 0] }}
                    transition={{
                      opacity: { duration: 0.3, delay: catIdx * 0.1 + i * 0.05 },
                      scale: { duration: 0.3, delay: catIdx * 0.1 + i * 0.05 },
                      y: reduced ? {} : { duration: 2.5 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                    }}
                    className="cursor-default rounded-full border border-white/10 light:border-ink-950/10 bg-white/5 light:bg-ink-950/5 px-4 py-2 text-sm font-medium text-zinc-300 light:text-zinc-700 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}