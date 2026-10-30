'use client';
import { useState } from 'react';
import CodeScene from './CodeScene';
import ProfileBanner from '../ProfileBanner/ProfileBanner';
import styles from './ProfileWorkspace.module.css';
export default function ProfileWorkspace() {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div className={styles.workspace} data-profile-workspace>
      <CodeScene showProfile={showProfile} />
      <div className={styles.banner}>
        <ProfileBanner onDetailsChange={setShowProfile} />
      </div>
    </div>
  );
}
