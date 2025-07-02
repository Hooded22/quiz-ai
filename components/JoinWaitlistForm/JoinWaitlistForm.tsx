'use client';

import { useState } from 'react';
import styles from './JoinWaitlistForm.module.css';

interface JoinWaitlistFormProps {
  onSubmit?: (data: { name: string; role: string; email: string }) => void;
}

export default function JoinWaitlistForm({ onSubmit }: JoinWaitlistFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, role, email });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="role" className={styles.label}>
          Role (optional)
        </label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Frontend Developer, DevOps Engineer"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Join Waitlist
      </button>

      <p className={styles.disclaimer}>
        We'll only use your email to invite you to the beta.
      </p>
    </form>
  );
}