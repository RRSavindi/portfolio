import { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Intro() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduced || done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-10000 flex items-center justify-center overflow-hidden bg-ink-950"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.7, duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => setDone(true)}
    >
      {/* Light sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.08), transparent)',
        }}
      />

      {/* Logo assembling */}
      <motion.div
        className="relative font-display text-5xl font-bold text-white sm:text-7xl"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.span
          className="text-accent"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {'<'}
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          RS
        </motion.span>
        <motion.span
          className="text-accent"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {'/>'}
        </motion.span>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
