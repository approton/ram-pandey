'use client';
import { useEffect, useRef } from 'react';
import Icon from './Icon';
export default function ThemeToggle() {
  const input = useRef(null);
  useEffect(() => {
    let saved;
    try {
      saved = localStorage.getItem('ram-theme');
    } catch {}
    const light =
      saved === 'light' ||
      (saved !== 'dark' && matchMedia('(prefers-color-scheme: light)').matches);
    if (input.current) input.current.checked = light;
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
  }, []);
  function change(e) {
    const next = e.currentTarget.checked ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('ram-theme', next);
    } catch {}
  }
  return (
    <label className="theme" title="Switch between light and dark theme">
      <input
        ref={input}
        id="theme-switch"
        className="themeNative"
        type="checkbox"
        role="switch"
        aria-label="Light theme"
        onChange={change}
      />
      <span className="themeSun">
        <Icon name="sun" />
      </span>
      <span className="themeMoon">
        <Icon name="moon" />
      </span>
      <span className="controlLabel">Theme</span>
    </label>
  );
}
