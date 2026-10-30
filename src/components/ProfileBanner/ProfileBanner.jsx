'use client';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '../Icon/Icon';
import ScrollTyping from '../ScrollTyping/ScrollTyping';
import styles from './ProfileBanner.module.css';
export default function ProfileBanner({ onDetailsChange }) {
  const [mode, setMode] = useState(null);
  const [pinned, setPinned] = useState(false);
  const root = useRef(null);
  const preview = useRef(null);
  const photo = useRef(null);
  const details = useRef(null);
  const ignoreFocus = useRef(false);
  const id = useId();
  useEffect(() => {
    onDetailsChange?.(mode === 'details');
    return () => onDetailsChange?.(false);
  }, [mode, onDetailsChange]);
  useEffect(() => {
    const close = (e) => {
      if (e.type === 'keydown' && e.key === 'Escape') {
        if (
          preview.current?.contains(document.activeElement) ||
          (root.current?.contains(document.activeElement) &&
            document.activeElement !== photo.current &&
            document.activeElement !== details.current)
        ) {
          ignoreFocus.current = true;
          (mode === 'photo' ? photo : details).current?.focus();
        }
        setMode(null);
        setPinned(false);
      } else if (
        e.type === 'pointerdown' &&
        !root.current?.contains(e.target) &&
        !preview.current?.contains(e.target)
      ) {
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
  function closePreview() {
    ignoreFocus.current = true;
    (mode === 'photo' ? photo : details).current?.focus();
    setMode(null);
    setPinned(false);
  }
  function hover(e, next) {
    if (
      e.pointerType === 'mouse' &&
      window.innerWidth > 800 &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      show(next);
    }
  }

  return (
    <div
      ref={root}
      className={styles.banner}
      data-expanded={Boolean(mode)}
      onPointerLeave={(event) => {
        if (event.pointerType === 'mouse') {
          setMode(null);
          setPinned(false);
        }
      }}
      onBlur={(e) => {
        if (
          !pinned &&
          !e.currentTarget.contains(e.relatedTarget) &&
          !preview.current?.contains(e.relatedTarget)
        ) {
          setMode(null);
        }
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
        onClick={() => toggle('photo')}
      >
        <Image
          src="/images/profile/ram-pandey-cutout.png"
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
        onClick={(event) => {
          event.stopPropagation();
          toggle('details');
        }}
      >
        <strong>Ram Niwash Pandey</strong>
        <span>Senior Software Engineer I</span>
        <small>HCLSoftware · BigFix</small>
        <span className={styles.hint}>
          Explore profile <Icon name="arrow" size={11} />
        </span>
      </button>
      <span className={`statusDot ${styles.dot}`} aria-hidden="true" />
      {mode === 'photo' && (
        <section
          ref={preview}
          id={`${id}-preview`}
          className={`${styles.preview} ${mode === 'photo' ? styles.photoPreview : styles.detailsPreview}`}
          aria-label={mode === 'photo' ? 'Expanded portrait' : 'Profile details'}
          role="dialog"
          aria-modal="false"
        >
          <button
            type="button"
            className={styles.close}
            aria-label="Close profile preview"
            onClick={closePreview}
          >
            <Icon name="close" size={17} />
          </button>
          <Image
            src="/images/profile/ram-pandey-cutout.png"
            alt="Portrait of Ram Niwash Pandey"
            width={1254}
            height={1254}
            sizes={mode === 'photo' ? '(max-width: 480px) 85vw, 340px' : '150px'}
            className={styles.previewImage}
          />
          {mode === 'details' && (
            <div className={styles.previewText}>
              <div className={styles.ideTab}>
                <Icon name="code" size={13} /> profile.md
              </div>
              <h3>Ram Niwash Pandey</h3>
              <ScrollTyping className={styles.typedProfile}>
                Senior Software Engineer I at HCLSoftware · BigFix. Based in Pune, India. Building
                with React, Next.js, accessible interfaces, frontend architecture, and practical AI
                tools.
              </ScrollTyping>
              <Link href="/about/" className={styles.profileLink}>
                View full profile <Icon name="arrow" size={15} />
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
