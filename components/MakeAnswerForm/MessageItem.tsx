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
                <div className={styles.ReportModal}>
                    <div className={styles.ReportModalContent}>
                        <p>Do you want to report issue with AI answer?</p>
                        <div className={styles.ReportModalButtons}>
                            <button onClick={handleConfirmReport}>Yes</button>
                            <button onClick={handleCancelReport}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 