import { useState } from 'react';
import styles from './styles.module.css';

interface SkipQuestionButtonProps {
    onSkip: () => void;
    onLastQuestionSkip: () => void;
    isDisabled: boolean;
    isLastQuestion: boolean;
}

export function SkipQuestionButton({ onSkip, onLastQuestionSkip, isDisabled, isLastQuestion }: SkipQuestionButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const handleSkipClick = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        isLastQuestion ? onLastQuestionSkip() : onSkip();
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const modalText = isLastQuestion
        ? "It's your last question, do you wanna skip and finish interview?"
        : "Are you sure that you wanna skip question?";

    return (
        <>
            <button
                type='button'
                className={styles.skipButton}
                disabled={isDisabled}
                onClick={handleSkipClick}
            >
                Skip question
            </button>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p className={styles.modalText}>{modalText}</p>
                        <div className={styles.modalButtons}>
                            <button className={styles.modalButtonCancel} onClick={handleCancel}>
                                Cancel
                            </button>
                            <button className={styles.modalButtonConfirm} onClick={handleConfirm}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 