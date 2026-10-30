'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollTyping.module.css';

/** A one-time visual enhancement; the complete text always stays in the document. */
export default function ScrollTyping({
  children,
  as: Element = 'p',
  className = '',
  delay = 0,
  enabled = true,
  onComplete,
}) {
  const text = String(children).replace(/\s+/g, ' ').trim();
  let offset = 0;
  const words = text.split(' ').map((word) => {
    const start = offset;
    offset += word.length + 1;
    return { word, start };
  });
  const root = useRef(null);
  const finishRef = useRef(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;
  const [phase, setPhase] = useState('complete');
  const [visible, setVisible] = useState(text.length);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches || !('IntersectionObserver' in window) || !text) {
      completeRef.current?.();
      return;
    }
    if (!enabled) {
      setVisible(0);
      setPhase('waiting');
      return;
    }
    let frame = 0;
    let timeout = 0;
    let started = false;
    let finished = false;
    let observer;
    const duration = Math.min(2400, Math.max(900, text.length * 10));
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      observer?.disconnect();
      setVisible(text.length);
      setPhase('complete');
      completeRef.current?.();
    };
    finishRef.current = finish;
    const start = () => {
      if (finished) return;
      setPhase('typing');
      let began;
      let lastUpdate = 0;
      const tick = (now) => {
        began ??= now;
        const elapsed = now - began;
        if (elapsed >= duration) {
          finish();
          return;
        }
        if (now - lastUpdate >= 32) {
          setVisible(Math.max(1, Math.floor((elapsed / duration) * text.length)));
          lastUpdate = now;
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    setVisible(0);
    setPhase('waiting');
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          timeout = window.setTimeout(start, Math.min(delay, 250));
        } else if (!entry.isIntersecting && started) {
          // Fast scrolling should never leave a half-written paragraph behind.
          finish();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -24px 0px' },
    );
    observer.observe(root.current);
    const change = () => {
      if (preference.matches) finish();
    };
    const visibility = () => {
      if (document.hidden && started) finish();
    };
    preference.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      observer.disconnect();
      preference.removeEventListener('change', change);
      document.removeEventListener('visibilitychange', visibility);
      finishRef.current = null;
    };
  }, [text, delay, enabled]);

  return (
    <Element
      ref={root}
      className={`${styles.text} ${className}`}
      data-typing-state={phase}
      onPointerDown={() => finishRef.current?.()}
    >
      <span className={styles.fullText}>{text}</span>
      {phase !== 'complete' && (
        <span className={styles.reveal} aria-hidden="true">
          {words.map(({ word, start }, index) => {
            const progress = Math.max(0, Math.min(1, (visible - start) / word.length));
            return (
              <span key={start} className={styles.wordGroup}>
                <span
                  className={styles.word}
                  style={{
                    opacity: progress > 0 ? 1 : 0,
                    clipPath: progress >= 1 ? 'none' : `inset(0 ${(1 - progress) * 100}% 0 0)`,
                  }}
                >
                  {word}
                </span>
                {index < words.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </span>
      )}
    </Element>
  );
}
