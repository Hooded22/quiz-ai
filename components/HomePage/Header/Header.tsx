'use server';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Welcome to Quiz AI</h1>
      <p className={styles.description}>Practice for your next technical interview with AI-powered feedback.</p>
      <a className={styles.button} href='/interview'>
        Try an Interview
      </a>
    </header>
  );
}