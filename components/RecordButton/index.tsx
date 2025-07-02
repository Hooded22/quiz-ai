import React from 'react';
import styles from './styles.module.css';

interface RecordButtonProps {
  onClick: () => void;
  isRecording: boolean;
}

export const RecordButton = ({ onClick, isRecording }: RecordButtonProps) => {
  return (
    <button
      className={`${styles.recordButton} ${isRecording ? styles.recording : ''}`}
      type='button'
      onClick={onClick}
    ></button>
  );
};
