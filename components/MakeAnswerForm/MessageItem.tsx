import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';
import { useState } from 'react';
import styles from './styles.module.css';

interface MessageItemProps {
    message: {
        sender: string;
        content: string;
    };
    onReportClick: () => void;
}

export function MessageItem({ message, onReportClick }: MessageItemProps) {
    const [showModal, setShowModal] = useState(false);

    const isAIMessage = message.sender !== "user";

    const handleReportClick = () => {
        setShowModal(true);
    };

    const handleConfirmReport = () => {
        onReportClick();
        setShowModal(false);
    };

    const handleCancelReport = () => {
        setShowModal(false);
    };

    return (
        <div className={`${styles.Message} ${message.sender === "user" ? styles.UserMessage : styles.AIMessage}`}>
            <MarkdownRenderer content={message.content} />

            {isAIMessage && (
                <div className={styles.ReportLinkContainer}>
                    <button
                        className={styles.ReportLink}
                        onClick={handleReportClick}
                    >
                        Report issue
                    </button>
                </div>
            )}

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p className={styles.modalText}>Do you want to report issue with AI answer?</p>
                        <div className={styles.modalButtons}>
                            <button className={styles.modalButtonCancel} onClick={handleCancelReport}>
                                Cancel
                            </button>
                            <button className={styles.modalButtonConfirm} onClick={handleConfirmReport}>
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 