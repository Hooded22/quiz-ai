'use client';

import styles from './DemoSection.module.css';

export default function DemoSection() {
  return (
    <div className={styles.demoSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          See <span className={styles.highlight}>Quiz AI</span> in Action
        </h2>
        <p className={styles.subtitle}>
          Watch how our AI-powered interview simulator helps you practice and improve your skills
        </p>
      </div>

      <div className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <video id='demo-video' className={styles.video} controls preload='metadata' poster='/placeholder-poster.jpg'>
            <source
              src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              type='video/mp4'
            />
            <source
              src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm'
              type='video/webm'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
