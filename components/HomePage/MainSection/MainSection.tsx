'use client';

import styles from './MainSection.module.css';
import PromoStats from '../PromoStats/PromoStats';

export default function MainSection() {
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
            <button className={styles.primaryButton}>Join the waitlist</button>
            <button className={styles.secondaryButton}>Learn more</button>
          </div>
        </div>
        <div className={styles.rightSide}>
          {/* Placeholder for photo */}
          <div className={styles.photoPlaceholder}></div>
        </div>
      </div>
      <PromoStats />
    </>
  );
}
