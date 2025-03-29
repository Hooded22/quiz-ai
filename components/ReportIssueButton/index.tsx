"use client"

import { useState } from 'react';
import styles from './styles.module.css';
import { ISSUE_CODE } from 'constants/issueCode';

export function ReportIssueButton() {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleOpenModal = () => {
        setShowModal(true);
        setSubmitSuccess(false);
        setSubmitError('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setDescription('');
    };


    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Limit to 250 characters
        if (e.target.value.length <= 250) {
            setDescription(e.target.value);
        }
    };

    const handleSubmit = async () => {
        if (!description.trim()) {
            setSubmitError('Please fill out field');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: ISSUE_CODE.reportedIssue,
                    description,
                }),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setDescription('');
                // Close modal after 2 seconds on success
                setTimeout(() => {
                    setShowModal(false);
                }, 2000);
            } else {
                setSubmitError('Failed to submit feedback. Please try again.');
            }
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button onClick={handleOpenModal} className={styles.reportButton}>
                Report Issue
            </button>

            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3 className={styles.modalTitle}>Report Issue</h3>

                        {submitSuccess ? (
                            <div className={styles.successMessage}>
                                Thank you for your feedback!
                            </div>
                        ) : (
                            <>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="issueDescription">Description</label>
                                    <textarea
                                        id="issueDescription"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        maxLength={250}
                                        placeholder="Please provide details about the issue"
                                        className={styles.textareaField}
                                        rows={4}
                                    />
                                    <div className={styles.characterCount}>
                                        {description.length}/250
                                    </div>
                                </div>

                                {submitError && (
                                    <div className={styles.errorMessage}>
                                        {submitError}
                                    </div>
                                )}

                                <div className={styles.modalButtons}>
                                    <button
                                        className={styles.modalButtonCancel}
                                        onClick={handleCloseModal}
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className={styles.modalButtonConfirm}
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
} 