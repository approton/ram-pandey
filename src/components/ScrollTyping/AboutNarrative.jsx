'use client';
import { useState } from 'react';
import ScrollTyping from './ScrollTyping';
import { useExperience } from '../Experience/ExperienceClient';
import styles from './AboutNarrative.module.css';

export default function AboutNarrative({ initialSnapshot }) {
  const [completed, setCompleted] = useState(0);
  const experience = useExperience(initialSnapshot);
  const paragraphs = [
    'I’m a software engineer based in Pune, Maharashtra, originally from Deoria, Uttar Pradesh. My professional focus is modern frontend engineering: scalable React applications, reusable UI architecture, accessibility, and maintainable systems.',
    `With ${experience.duration} of professional engineering experience as of ${experience.asOf}, I’ve worked across software development, network engineering, enterprise automation, and end-to-end testing. That wider perspective shapes how I think about an application: as a complete system of interactions, responsibilities, and feedback.`,
    'I enjoy translating complex requirements into interfaces that feel clear. The challenge is rarely just writing a component. It is understanding what the component needs to communicate, how it behaves within a larger workflow, and how another engineer will maintain it later.',
  ];
  return (
    <div className={styles.passage}>
      {paragraphs.map((text, index) => (
        <ScrollTyping
          key={index}
          enabled={completed >= index}
          onComplete={() => setCompleted((current) => Math.max(current, index + 1))}
        >
          {text}
        </ScrollTyping>
      ))}
    </div>
  );
}
