'use client';
import { useSyncExternalStore } from 'react';
import { getExperience, nextExperienceMonth } from '@/lib/experience.mjs';
let snapshot = getExperience();
const listeners = new Set();
let timeout;
function refresh() {
  const next = getExperience();
  if (next.monthKey !== snapshot.monthKey) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }
}
function schedule() {
  clearTimeout(timeout);
  const now = new Date();
  const delay = Math.min(86400000, Math.max(100, nextExperienceMonth(now) - now.getTime() + 50));
  timeout = setTimeout(() => {
    refresh();
    schedule();
  }, delay);
}
function visible() {
  if (!document.hidden) {
    refresh();
    schedule();
  }
}
function subscribe(listener) {
  listeners.add(listener);
  if (listeners.size === 1) {
    refresh();
    schedule();
    document.addEventListener('visibilitychange', visible);
    window.addEventListener('focus', visible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', visible);
      window.removeEventListener('focus', visible);
    }
  };
}
function getSnapshot() {
  return snapshot;
}
export function useExperience(initialSnapshot) {
  return useSyncExternalStore(subscribe, getSnapshot, () => initialSnapshot);
}
export default function ExperienceClient({ initialSnapshot, display = 'duration' }) {
  const experience = useExperience(initialSnapshot);
  if (display === 'month')
    return (
      <time dateTime={experience.monthKey} data-experience-month>
        {experience.asOf}
      </time>
    );
  return (
    <span
      data-experience-duration
      data-experience-month-key={experience.monthKey}
      title="LinkedIn-style calendar months, starting 18 January 2021"
    >
      {experience.duration}
    </span>
  );
}
