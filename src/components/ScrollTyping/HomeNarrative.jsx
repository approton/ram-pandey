'use client';
import { useState } from 'react';
import ScrollTyping from './ScrollTyping';
import { useExperience } from '../Experience/ExperienceClient';
export default function HomeNarrative({ initialSnapshot }) {
  const [firstComplete, setFirstComplete] = useState(false);
  const experience = useExperience(initialSnapshot);
  return (
    <>
      <ScrollTyping onComplete={() => setFirstComplete(true)}>
        From reusable enterprise components to modular frontend systems, my focus is on making
        software easier to use, maintain, and evolve. I care about the details people feel: a clear
        interaction, a fast response, a keyboard journey that simply works.
      </ScrollTyping>
      <ScrollTyping enabled={firstComplete}>
        {`Based in Pune, with roots in Deoria, Uttar Pradesh, I bring ${experience.duration} of engineering experience across frontend development, automation, and testing.`}
      </ScrollTyping>
    </>
  );
}
