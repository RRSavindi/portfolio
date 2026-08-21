import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

type CursorVariant = 'default' | 'hover' | 'view' | 'text';

const ACCENT = '#6366f1';

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { damping: 24, stiffness: 260, mass: 0.45 });
  const smoothY = useSpring(cursorY, { damping: 24, stiffness: 260, mass: 0.45 });

  const [variant, setVariant] = useState<CursorVariant>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [viewLabel, setViewLabel] = useState('View');

  useEffect(() => {
    if (reduced) return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updatePointer = () => setIsFinePointer(mediaQuery.matches);
    updatePointer();
    mediaQuery.addEventListener('change', updatePointer);

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);

      const target = event.target as HTMLElement;
      const viewTarget = target.closest('[data-cursor="view"]');
      if (target.closest('input, textarea, [data-cursor="text"]')) {
        setVariant('text');
      } else if (viewTarget) {
        setVariant('view');
        setViewLabel(viewTarget.getAttribute('data-cursor-label') || 'View');
      } else if (target.closest('a, button, [data-cursor="hover"], [role="button"]')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    document.body.classList.add('custom-cursor-active');

    return () => {
      mediaQuery.removeEventListener('change', updatePointer);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY, reduced]);

  if (!isFinePointer || reduced) return null;

  const outerSizes: Record<CursorVariant, number> = {
    default: 20,
    hover: 30,
    view: 50,
    text: 0,
  };

  const innerSizes: Record<CursorVariant, number> = {
    default: 6,
    hover: 8,
    view: 12,
    text: 0,
  };

  const outerSize = outerSizes[variant];
  const innerSize = innerSizes[variant];
  const auraSize = outerSize * 1.9;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-9999 flex items-center justify-center"
      style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: variant === 'text' || !isVisible ? 0 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Little aura — diamond shaped, soft blur */}
      <motion.div
        className="absolute bg-accent"
        style={{ rotate: 45, filter: 'blur(10px)' }}
        animate={{ width: auraSize, height: auraSize, opacity: variant === 'default' ? 0.12 : 0.2 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      />

      {/* Outer diamond — border only */}
      <motion.div
        className="absolute border-2 border-accent"
        style={{ rotate: 45 }}
        animate={{
          width: outerSize,
          height: outerSize,
          backgroundColor: variant === 'view' ? `${ACCENT}18` : 'transparent',
          boxShadow: `0 0 ${variant === 'view' ? 18 : 10}px ${ACCENT}55`,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 280, mass: 0.35 }}
      />

      {/* Inner diamond — filled */}
      <motion.div
        className="absolute rounded-xs bg-accent"
        style={{ rotate: 45 }}
        animate={{
          width: innerSize,
          height: innerSize,
          scale: variant === 'hover' ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.7, repeat: variant === 'hover' ? Infinity : 0 }}
      />

      <AnimatePresence>
        {variant === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="absolute whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-white"
          >
            {viewLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}