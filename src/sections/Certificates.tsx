import { motion } from 'framer-motion';
import { Award, ArrowUpRight, CalendarDays } from 'lucide-react';
import { CERTIFICATES, type Certificate } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 light:border-ink-950/5 bg-ink-900/40 light:bg-white/60 p-7 transition-colors duration-300 hover:border-accent/30"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-3 text-accent">
            <Award size={21} strokeWidth={1.8} />
          </div>
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${certificate.title} credential`}
            className="rounded-full border border-white/10 light:border-ink-950/10 p-2 text-zinc-500 light:text-zinc-600 transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUpRight size={16} />
          </a>
        </div>

        <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-white light:text-ink-950">{certificate.title}</h3>
        <p className="mb-5 text-sm text-zinc-400 light:text-zinc-600">{certificate.issuer}</p>

        <div className="mt-auto flex items-center gap-2 text-xs text-zinc-500 light:text-zinc-600">
          <CalendarDays size={15} />
          <span>{certificate.date}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Certificates() {
  return (
    <section id="certificates" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent">Certificates</p>
          <h2 className="font-display text-3xl font-bold text-white light:text-ink-950 sm:text-4xl">Courses &amp; certifications</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {CERTIFICATES.map((certificate, index) => (
            <CertificateCard key={certificate.title} certificate={certificate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}