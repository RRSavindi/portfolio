import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { LinkedinIcon } from '../components/icons/LinkedinIcon';
import { SITE } from '../lib/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Magnetic from '../components/Magnetic';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();

  const [sending, setSending] = useState(false);
const [error, setError] = useState(false);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setSending(true);
  setError(false);
  try {
    await emailjs.send(
      'service_0l65han',      //Service ID
      'template_hy00eoe',     //Template ID
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      'soUy31CT8kj9dtJ2q'       //Public Key
    );
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  } catch (err) {
    console.error('EmailJS error:', err);
    setError(true);
    setTimeout(() => setError(false), 4000);
  } finally {
    setSending(false);
  }
};

  const socials = [
    { icon: SiGithub, label: 'GitHub', value: 'Connect on GitHub', href: SITE.socials.github },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'Connect on LinkedIn', href: SITE.socials.linkedin },
    { icon: Mail, label: 'Email', value: SITE.email, href: SITE.socials.email },
  ];

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-body text-sm font-medium uppercase tracking-[0.3em] text-accent">Contact</p>
          <h2 className="font-display text-3xl font-bold text-white light:text-ink-950 sm:text-5xl">Let's build something</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-stretch">
          {/* Left column — social cards, equal height via CSS grid */}
          <div className="grid w-full auto-rows-fr gap-4">
            {socials.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : i * 0.1 }}
              >
                <Magnetic strength={0.15} className="block h-full w-full">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-center gap-4 rounded-2xl border border-white/5 light:border-ink-950/5 bg-ink-900/30 light:bg-white/60 p-5 transition-colors hover:border-accent/30"
                  >
                    <motion.div
                      whileHover={reduced ? {} : { rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/20 text-accent"
                    >
                      <s.icon size={20} />
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-zinc-500 light:text-zinc-500">{s.label}</p>
                      <p className="truncate text-sm font-medium text-zinc-200 light:text-zinc-800">{s.value}</p>
                    </div>
                  </a>
                </Magnetic>
              </motion.div>
            ))}
          </div>

          {/* Right column — form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 0.5 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text" required placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 light:border-ink-950/10 bg-ink-900/40 light:bg-white/60 px-5 py-3.5 text-sm text-white light:text-ink-950 placeholder-zinc-500 outline-none transition-colors focus:border-accent"
            />
            <input
              type="email" required placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 light:border-ink-950/10 bg-ink-900/40 light:bg-white/60 px-5 py-3.5 text-sm text-white light:text-ink-950 placeholder-zinc-500 outline-none transition-colors focus:border-accent"
            />
            <textarea
              required placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full flex-1 resize-none rounded-xl border border-white/10 light:border-ink-950/10 bg-ink-900/40 light:bg-white/60 px-5 py-3.5 text-sm text-white light:text-ink-950 placeholder-zinc-500 outline-none transition-colors focus:border-accent"
            />
            <Magnetic strength={0.2} className="block">
              <button
                type="submit"
                disabled={sent || sending}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:opacity-90"
              >
                {sent ? (
                  <motion.span key="sent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex items-center gap-2">
                    Sent! <Check size={16} />
                  </motion.span>
                ) : error ? (
                  <motion.span key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 flex items-center gap-2">
                    Failed — try again
                  </motion.span>
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    {sending ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </span>
                )}
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </button>
            </Magnetic>
          </motion.form>
        </div>
      </div>
    </section>
  );
}