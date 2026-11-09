'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ResumeLink() {
  const link = useRef(null);

  useEffect(() => {
    const button = link.current;
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        button.toggleAttribute('data-visible', entry.intersectionRatio >= 0.6);
      },
      { threshold: 0.6 },
    );
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  return (
    <Link ref={link} className="button primary resumeButton" href="/resume/">
      Explore my digital resume
    </Link>
  );
}
