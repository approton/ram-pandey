'use client';
import { useEffect, useState } from 'react';
const thoughts = [
  'Good software begins with a better question.',
  'Make the complex feel simple, one thoughtful detail at a time.',
  'Build with curiosity. Refine with care.',
  'The best interface leaves room for the person using it.',
  'Small improvements become meaningful experiences.',
];
export default function QuoteCloud() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    setIndex(Math.floor(Math.random() * thoughts.length));
  }, []);
  function next() {
    setIndex(
      (current) =>
        (current + 1 + Math.floor(Math.random() * (thoughts.length - 1))) % thoughts.length,
    );
  }
  return (
    <aside className="quoteCloud" aria-label="A thought on engineering">
      <svg
        className="thoughtCloudShape"
        viewBox="0 0 600 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M 70 110 C 25 100 5 155 35 187 C 0 218 8 270 40 286 C 10 329 38 380 81 380 C 75 428 126 458 170 430 C 195 475 260 480 291 446 C 331 481 388 465 408 431 C 456 457 508 428 507 390 C 555 400 596 359 572 318 C 606 284 600 236 570 214 C 604 171 580 120 535 119 C 540 70 490 40 449 65 C 416 18 359 28 331 61 C 294 18 233 23 208 63 C 159 32 107 53 107 96 C 92 91 78 97 70 110 Z" />
      </svg>
      <span className="thoughtBubble thoughtBubbleLarge" aria-hidden="true" />
      <span className="thoughtBubble thoughtBubbleSmall" aria-hidden="true" />

      <div className="thoughtCloudContent">
        <span className="eyebrow">A LITTLE THOUGHT</span>
        <blockquote key={index} aria-live="polite">
          “{thoughts[index]}”
        </blockquote>
        <button type="button" className="quoteNext" onClick={next}>
          Another thought ↻
        </button>
      </div>
    </aside>
  );
}
