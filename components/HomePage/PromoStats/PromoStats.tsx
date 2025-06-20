'use client';

import styles from './PromoStats.module.css';

interface PromoStatItemProps {
  title: string;
  subtitle: string;
}

function PromoStatItem({ title, subtitle }: PromoStatItemProps) {
  return (
    <div className={styles.promoStatItem}>
      <h3 className={styles.promoStatTitle}>{title}</h3>
      <p className={styles.promoStatSubtitle}>{subtitle}</p>
    </div>
  );
}

export default function PromoStats() {
  return (
    <div className={styles.promoStats}>
      <PromoStatItem
        title="10x"
        subtitle="Faster learning"
      />
      <PromoStatItem
        title="AI-First"
        subtitle="Approach"
      />
      <PromoStatItem
        title="24/7"
        subtitle="Interview assistant"
      />
    </div>
  );
}
