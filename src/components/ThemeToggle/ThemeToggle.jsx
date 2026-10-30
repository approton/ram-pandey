'use client';
import { useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
export default function ThemeToggle() {
  const input = useRef(null);
  useEffect(() => {
    if (input.current) input.current.checked = document.documentElement.dataset.theme === 'light';
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
