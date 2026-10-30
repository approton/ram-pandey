'use client';
import { useEffect, useLayoutEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from './Icon';
import styles from './ProfileBanner.module.css';
export default function ProfileBanner() {
  const [mode, setMode] = useState(null);
  const [pinned, setPinned] = useState(false);
  const root = useRef(null);
  const preview = useRef(null);
  const [placement, setPlacement] = useState({});
  const photo = useRef(null);
  const details = useRef(null);
  const ignoreFocus = useRef(false);
  const id = useId();
  useLayoutEffect(() => {
    if (!mode) return;
    const position = () => {
      if (innerWidth <= 800) {
        setPlacement({});
        return;
      }
      if (!root.current || !preview.current) return;
      const rect = root.current.getBoundingClientRect();
      const width = Math.min(mode === 'photo' ? 340 : 460, innerWidth - 32);
      const height = Math.min(preview.current.scrollHeight, innerHeight - 132);
      const left = Math.max(
        16,
        Math.min(mode === 'photo' ? rect.left : rect.right - width, innerWidth - width - 16),
      );
      const top = Math.max(112, Math.min(rect.top - height - 14, innerHeight - height - 16));
      setPlacement({
        position: 'fixed',
        left,
        top,
        bottom: 'auto',
        right: 'auto',
        width,
        maxHeight: innerHeight - 132,
        overflowY: 'auto',
      });
    };
    position();
    addEventListener('resize', position);
    addEventListener('scroll', position, { passive: true });
    return () => {
      removeEventListener('resize', position);
      removeEventListener('scroll', position);
    };
  }, [mode]);
  useEffect(() => {
    const close = (e) => {
      if (e.type === 'keydown' && e.key === 'Escape') {
        if (
          root.current?.contains(document.activeElement) &&
          document.activeElement !== photo.current &&
          document.activeElement !== details.current
        ) {
          ignoreFocus.current = true;
          (mode === 'photo' ? photo : details).current?.focus();
        }
        setMode(null);
        setPinned(false);
      } else if (e.type === 'pointerdown' && !root.current?.contains(e.target)) {
        setMode(null);
        setPinned(false);
      }
    };
    addEventListener('keydown', close);
    addEventListener('pointerdown', close);
    return () => {
      removeEventListener('keydown', close);
      removeEventListener('pointerdown', close);
    };
  }, [mode]);
  function show(next) {
    if (ignoreFocus.current) {
      ignoreFocus.current = false;
      return;
    }
    setMode(next);
  }
  function toggle(next) {
    if (mode === next && pinned) {
      setMode(null);
      setPinned(false);
    } else {
      setMode(next);
      setPinned(true);
    }
  }
  function hover(e, next) {
    if (e.pointerType === 'mouse') show(next);
  }
  return (
    <div
      ref={root}
      className={styles.banner}
      data-expanded={Boolean(mode)}
      onPointerLeave={() => {
        if (!pinned && !root.current?.contains(document.activeElement)) setMode(null);
      }}
      onBlur={(e) => {
        if (!pinned && !e.currentTarget.contains(e.relatedTarget)) setMode(null);
      }}
    >
      <button
        ref={photo}
        className={styles.photoButton}
        type="button"
        aria-label="Enlarge Ram Pandey’s photo"
        aria-expanded={mode === 'photo'}
        aria-controls={`${id}-preview`}
        onPointerEnter={(e) => hover(e, 'photo')}
        onFocus={() => show('photo')}
        onClick={() => toggle('photo')}
      >
        <Image
          src="/images/profile/ram-pandey.png"
          alt="Ram Niwash Pandey"
          width={1254}
          height={1254}
          sizes="96px"
          priority
          className={styles.thumbnail}
        />
        <span className={styles.expand}>
          <Icon name="arrow" size={13} />
        </span>
      </button>
      <button
        ref={details}
        className={styles.detailsButton}
        type="button"
        aria-label="Show Ram Pandey’s profile details"
        aria-expanded={mode === 'details'}
        aria-controls={`${id}-preview`}
        onPointerEnter={(e) => hover(e, 'details')}
        onFocus={() => show('details')}
        onClick={() => toggle('details')}
      >
        <strong>Ram Niwash Pandey</strong>
        <span>Senior Software Engineer I</span>
        <small>HCLSoftware · BigFix</small>
        <span className={styles.hint}>
          Explore profile <Icon name="arrow" size={11} />
        </span>
      </button>
      <span className={`statusDot ${styles.dot}`} aria-hidden="true" />
      {mode && (
        <section
          ref={preview}
          style={placement}
          id={`${id}-preview`}
          className={`${styles.preview} ${mode === 'photo' ? styles.photoPreview : styles.detailsPreview}`}
          aria-label={mode === 'photo' ? 'Expanded portrait' : 'Profile details'}
        >
          <button
            type="button"
            className={styles.close}
            aria-label="Close profile preview"
            onClick={() => {
              ignoreFocus.current = true;
              (mode === 'photo' ? photo : details).current?.focus();
              setMode(null);
              setPinned(false);
            }}
          >
            <Icon name="close" size={17} />
          </button>
          <Image
            src="/images/profile/ram-pandey.png"
            alt="Portrait of Ram Niwash Pandey"
            width={1254}
            height={1254}
            sizes={mode === 'photo' ? '(max-width: 480px) 85vw, 340px' : '150px'}
            className={styles.previewImage}
          />
          <div className={styles.previewText}>
            <span className={styles.eyebrow}>
              {mode === 'photo' ? 'THE PERSON BEHIND THE CODE' : 'ENGINEERING WITH INTENT'}
            </span>
            <h3>Ram Niwash Pandey</h3>
            {mode === 'details' && (
              <>
                <p className={styles.role}>
                  Senior Software Engineer I<br />
                  HCLSoftware · BigFix
                </p>
                <span className={styles.location}>
                  <Icon name="location" size={14} /> Pune, India
                </span>
                <p className={styles.description}>
                  React, Next.js, accessible interfaces, frontend architecture, and practical AI
                  tools.
                </p>
                <a href="/about/" className={styles.profileLink}>
                  View full profile <Icon name="arrow" size={15} />
                </a>
              </>
            )}
            {mode === 'photo' && (
              <p className={styles.photoNote}>Engineer. Problem solver. Builder.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
