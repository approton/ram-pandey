'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Icon from '../Icon/Icon';
import styles from './PortraitAvatar.module.css';
export default function PortraitAvatar() {
  const dialog = useRef(null);
  return (
    <>
      <button
        type="button"
        className={styles.avatar}
        aria-label="Enlarge Ram Pandey’s portrait"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Image
          src="/images/profile/ram-pandey-cutout.png"
          width={1254}
          height={1254}
          sizes="90px"
          alt="Ram Niwash Pandey"
        />
        <span className={styles.indicator}>
          <Icon name="arrow" size={11} />
        </span>
      </button>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-label="Ram Pandey’s portrait"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current.close();
        }}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close portrait"
          onClick={() => dialog.current?.close()}
          autoFocus
        >
          <Icon name="close" size={20} />
        </button>
        <Image
          src="/images/profile/ram-pandey-cutout.png"
          width={1254}
          height={1254}
          sizes="(max-width: 480px) 88vw, 420px"
          alt="Portrait of Ram Niwash Pandey"
          className={styles.portrait}
        />
      </dialog>
    </>
  );
}
