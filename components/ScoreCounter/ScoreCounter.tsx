import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface ScoreCounterProps {
  score: number; // Assumes score is a percentage between 0 and 100
}

export const ScoreCounter = ({ score }: ScoreCounterProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const start = Date.now();
    const duration = 1000; // Animation duration in ms

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const interpolatedScore = Math.floor(score * progress);

      setDisplayScore(interpolatedScore);

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [score]);

  return (
    <div className={styles.scoreContainer}>
      <h2 className={styles.scoreHeader}>Your score:</h2>
      <span className={styles.score}>{displayScore}%</span>
    </div>
  );
};
