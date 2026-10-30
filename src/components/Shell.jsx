'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Icon from './Icon';
import SpatialEffects from './SpatialEffects';
import { SocialLinks } from './ContactActions';
export default function Shell({ children }) {
  const path = usePathname();
  const [theme, setTheme] = useState('dark');
  const mobileNavigation = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef(null);

  useEffect(() => {
    let saved;
    try {
      saved = localStorage.getItem('ram-theme');
    } catch {}
    if (saved !== 'light' && saved !== 'dark') saved = null;
    const t = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(t);
    document.documentElement.dataset.theme = t;
    const onScroll = () => {
      setScrolled(scrollY > 30);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const close = (e) => {
      const details = mobileNavigation.current;
      if (!details?.open) return;
      if (e.type === 'keydown' && e.key === 'Escape') {
        details.open = false;
        details.querySelector('summary')?.focus();
      } else if (e.type === 'pointerdown' && !details.contains(e.target)) details.open = false;
    };
    addEventListener('keydown', close);
    addEventListener('pointerdown', close);
    return () => {
      removeEventListener('keydown', close);
      removeEventListener('pointerdown', close);
    };
  }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('ram-theme', next);
    } catch {}
  }
  return (
    <>
      <SpatialEffects />
      <div className="ambient" aria-hidden="true">
        <div className="ambientOne" />
        <div className="ambientTwo" />
        <div className="ambientGrid" />
      </div>
      <div className="readingProgress" ref={progress} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`header ${scrolled ? 'headerScrolled' : ''}`}>
        <a href="/" className="brand" aria-label="Ram Pandey home">
          <span className="monogram">
            r<span>p</span>
            <i>·</i>
          </span>
          <span>
            RAM PANDEY<span className="brandSubtitle">ENGINEERING WITH INTENT</span>
          </span>
        </a>
        <nav id="main-navigation" aria-label="Main navigation" className="nav">
          {[
            ['/', 'Home'],
            ['/about/', 'About'],
            ['/expertise/', 'Expertise'],
            ['/projects/', 'Projects'],
            ['/services/', 'Services'],
          ].map(([url, label]) => (
            <a
              key={url}
              href={url}

              aria-current={
                url === '/'
                  ? path === '/'
                    ? 'page'
                    : undefined
                  : path.startsWith(url)
                    ? 'page'
                    : undefined
              }
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="headerActions">
          <button
            className="theme"
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            <span className="controlLabel">Theme</span>
          </button>
          <a className="smallCta" href="/contact/">
            Let’s talk <Icon name="arrow" size={17} />
          </a>
          <details ref={mobileNavigation} className="mobileNavigation">
            <summary aria-label="Open mobile navigation">
              <Icon name="menu" />
              <span className="controlLabel">Menu</span>
            </summary>
            <nav aria-label="Mobile navigation" className="mobileNavPanel">
              <span className="eyebrow">EXPLORE THE WORKSPACE</span>
              {[
                ['/', 'Home'],
                ['/about/', 'About'],
                ['/expertise/', 'Expertise'],
                ['/projects/', 'Projects'],
                ['/services/', 'Services'],
                ['/contact/', 'Contact'],
              ].map(([url, label]) => (
                <a key={url} href={url} aria-current={path === url ? 'page' : undefined}>
                  {label}
                  <Icon name="arrow" size={17} />
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="footerTop">
          <div>
            <a href="/" className="footerName">
              Ram Pandey<span className="accent">.</span>
            </a>
            <p>Thoughtful systems. Meaningful experiences.</p>
          </div>
          <div className="footerNav">
            <a href="/about/">About</a>
            <a href="/projects/">Projects</a>
            <a href="/services/">Services</a>
            <a href="/contact/">Contact</a>
          </div>
          <SocialLinks />
        </div>
        <div className="footerBottom">
          <span>© {new Date().getFullYear()} Ram Niwash Pandey</span>
          <span>Designed with purpose. Engineered with precision.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
