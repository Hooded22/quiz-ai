'use server';

import styles from './Statistics.module.css';

export default function Statistics() {
  return (
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
  );
}