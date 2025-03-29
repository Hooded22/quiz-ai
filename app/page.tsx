import { redirect } from 'next/navigation';
import InterviewConfigForm from '../components/InterviewConfigForm/InterviewConfigForm';
import styles from './page.module.css';
import { FEATURE_FLAGS } from 'constants/featureFlags';

export default function Home() {

  if (!FEATURE_FLAGS.auth.createAccount) {
    redirect('/interview');
    return (
      <div className={styles.authContainer}>
        <p>Registration is currently disabled. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Quiz AI</h1>
        <p className={styles.description}>
          Practice for your next technical interview with AI-powered feedback.
        </p>
        <a className={styles.button} href='/interview'>
          Try an Interview
        </a>
      </header>

      <section className={styles.statistics}>
        <h2 className={styles.sectionTitle}>Why Choose Quiz AI?</h2>
        <div className={styles.statList}>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>5+</h3>
            <p className={styles.statDescription}>Different Roles</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>100+</h3>
            <p className={styles.statDescription}>Interview Questions</p>
          </div>
          <div className={styles.statItem}>
            <h3 className={styles.statNumber}>10</h3>
            <p className={styles.statDescription}>Technologies Covered</p>
          </div>
        </div>
      </section>
    </div>
  );
}
