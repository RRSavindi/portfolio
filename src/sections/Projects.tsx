import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { PROJECTS, type Project } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    if (glowRef.current) glowRef.current.style.transform = 'translate(50%, 50%)';
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: reduced ? 0 : index * 0.1, duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={index % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5'}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        data-cursor="view"
        data-cursor-label="View →"
        className="group relative h-full overflow-hidden rounded-2xl border border-white/5 light:border-ink-950/5 bg-ink-900/40 light:bg-white/60 p-8 transition-colors duration-300 hover:border-accent/30"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      >
        

        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br from-accent/20 to-accent/5 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative" style={{ transform: 'translateZ(40px)' }}>
          <div className="mb-4 flex items-start justify-between">
            <span className="font-body text-xs font-medium uppercase tracking-wider text-accent">{project.tech[0]}</span>
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`} data-cursor="hover" className="rounded-full border border-white/10 light:border-ink-950/10 p-2 text-zinc-400 light:text-zinc-600 transition-all hover:border-accent hover:text-accent">
                  <SiGithub size={16} />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" aria-label={`${project.title} live`} data-cursor="hover" className="rounded-full border border-white/10 light:border-ink-950/10 p-2 text-zinc-400 light:text-zinc-600 transition-all hover:border-accent hover:text-accent">
                  <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>

          <h3 className="mb-3 font-display text-2xl font-bold text-white light:text-ink-950">{project.title}</h3>
          <p className="mb-6 text-sm leading-relaxed text-zinc-400 light:text-zinc-600">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-md border border-white/5 light:border-ink-950/5 bg-white/5 light:bg-ink-950/5 px-2.5 py-1 text-xs font-medium text-zinc-400 light:text-zinc-600">{t}</span>
            ))}
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: hovered ? '100%' : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute -bottom-8 left-0 h-px bg-linear-to-r from-accent to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent">Projects</p>
          <h2 className="font-display text-3xl font-bold text-white light:text-ink-950 sm:text-4xl">Selected work</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-12">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}