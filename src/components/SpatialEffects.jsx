'use client';
import { useEffect } from 'react';
export default function SpatialEffects() {
  useEffect(() => {
    if (
      !matchMedia('(hover: hover) and (pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    let active = null,
      raf = 0;
    const selector = '.projectCard,.glassCard,.expertiseCard,.contactAction,.button';
    const reset = () => {
      if (active) {
        active.style.removeProperty('--tilt-x');
        active.style.removeProperty('--tilt-y');
        active.style.removeProperty('--shine-x');
        active.style.removeProperty('--shine-y');
        active.classList.remove('spatialActive');
        active = null;
      }
    };
    const move = (e) => {
      const target = e.target.closest(selector);
      if (!target) {
        reset();
        return;
      }
      if (active !== target) {
        reset();
        active = target;
        active.classList.add('spatialActive');
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!active) return;
        const r = active.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width,
          y = (e.clientY - r.top) / r.height;
        active.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
        active.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`);
        active.style.setProperty('--shine-x', `${x * 100}%`);
        active.style.setProperty('--shine-y', `${y * 100}%`);
      });
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      cancelAnimationFrame(raf);
      reset();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', reset);
    };
  }, []);
  return null;
}
