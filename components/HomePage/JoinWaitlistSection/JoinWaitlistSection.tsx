'use client';

import styles from './JoinWaitlistSection.module.css';
import JoinWaitlistForm from '../../JoinWaitlistForm/JoinWaitlistForm';

interface JoinWaitlistSectionProps {
  onSubmit?: (data: { name: string; role: string; email: string }) => void;
}

export default function JoinWaitlistSection({ onSubmit }: JoinWaitlistSectionProps) {
  return (
    <div className={styles.waitlistSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Join the <span className={styles.highlight}>Waitlist</span>
        </h2>
        <p className={styles.subtitle}>
          Be the first to know when Quiz AI launches. Get early access to our AI-powered interview simulator.
        </p>
      </div>

      <div className={styles.formContainer}>
        <JoinWaitlistForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}