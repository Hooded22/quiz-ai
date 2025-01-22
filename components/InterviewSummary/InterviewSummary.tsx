'use client';

import {
  QuestionsNumber,
  RoleType,
  SeniorityLevel,
} from '../../types/interviewConfig';
import styles from './styles.module.css';
import { RolesIdsToTextMap } from '../../constants/rolesMap';

export interface InterviewSummaryProps {
  interviewRole: RoleType;
  level: SeniorityLevel;
  questionsNumber: number;
  results: {
    question: string;
    questionCategory: string;
    isAnswerCorrect: boolean;
  }[];
  interviewTime?: number;
}

export const InterviewSummary = ({
  interviewRole,
  level,
  results,
  interviewTime,
}: InterviewSummaryProps) => {
  const correctAnswers = results.filter((r) => r.isAnswerCorrect).length;
  const incorrectAnswers = results.length - correctAnswers;
  const roleName =
    RolesIdsToTextMap[interviewRole] ||
    interviewRole.replace(/-/g, ' ') + ' Developer';

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        {level} {roleName}
      </h1>

      <div className={styles.resultSection}>
        <h2 className={styles.subHeader}>Results</h2>
        <div className={styles.resultSectionContent}>
          <span>
            Correct Answers:{' '}
            <strong className={styles.success}>{correctAnswers}</strong>
          </span>
          <span>
            Incorrect Answers:{' '}
            <strong className={styles.error}>{incorrectAnswers}</strong>
          </span>
        </div>

        <div className={styles.questionList}>
          {results.map((result, index) => (
            <div
              key={index}
              className={`${styles.questionItem} ${
                result.isAnswerCorrect
                  ? styles.correctBackground
                  : styles.incorrectBackground
              }`}
            >
              <span className={styles.questionCategory}>
                {result.questionCategory}:
              </span>{' '}
              {result.question} -{' '}
              <strong>
                {result.isAnswerCorrect ? 'Correct' : 'Incorrect'}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {interviewTime && (
        <p className={styles.time}>
          Interview Time: {Math.ceil(interviewTime / 60)} min
        </p>
      )}

      <div className={styles.actions}>
        <a className={styles.button} href='/interview'>
          Finish Interview
        </a>
        <a className={styles.button} href='/'>
          Try Again
        </a>
      </div>
    </div>
  );
};
