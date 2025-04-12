import React from 'react';
import styles from './styles.module.css';

interface RecordButtonProps {
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export const RecordButton = ({ onMouseDown, onMouseUp }: RecordButtonProps) => {
  return (
    <button
      className={styles.recordButton}
      type='button'
      onTouchStart={onMouseDown}
      onMouseDown={onMouseDown}
      onTouchEnd={onMouseUp}
      onMouseUp={onMouseUp}
    ></button>
  );
};
