'use client';

import styles from './MainSection.module.css';
import PromoStats from '../PromoStats/PromoStats';

interface MainSectionProps {
  onJoinWaitlist?: () => void;
}

export default function MainSection({ onJoinWaitlist }: MainSectionProps) {
  const title = 'Improve Your interview skills with personal interview simulator';
  const subtitle =
    'MockSim offers a simulated interview experience that helps both aspiring coders and seasoned professionals enhance their skills through practical exercises and personalized AI guidance. Elevate your interview preparation from novice to expert and excel in your career advancement journey.';

  return (
    <>
      <div className={styles.mainSection}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>
            Improve Your <span className={styles.titleHighlight}>interview skills</span> with personal interview simulator
          </h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton} onClick={onJoinWaitlist}>Join the waitlist</button>
            <button className={styles.secondaryButton}>Learn more</button>
          </div>
        </div>
        <div className={styles.rightSide}>
          <video
            className={styles.heroVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <PromoStats />
    </>
  );
}
