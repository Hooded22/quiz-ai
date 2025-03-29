'use client';

import {
  QuestionsNumber,
  RoleType,
  SeniorityLevelType,
} from '../../types/interviewConfig';
import styles from './styles.module.css';
import { RolesIdsToTextMap } from '../../constants/questionsParamsToTextMap';
import { ScoreCounter } from '../ScoreCounter/ScoreCounter';
import { ANSWER_STATUS, UserAnswer } from 'types/question';

export interface InterviewSummaryProps {
  interviewRole: RoleType;
  level: SeniorityLevelType;
  questionsNumber: number;
  results: UserAnswer[];
  interviewTime?: number;
}

export const InterviewSummary = ({
  interviewRole,
  level,
  results,
  interviewTime,
}: InterviewSummaryProps) => {
  const correctAnswers = results.filter((r) => r.asnwerStatus === ANSWER_STATUS.CORRECT).length;
  const incorrectAnswers = results.length - correctAnswers;
  const roleName =
    RolesIdsToTextMap[interviewRole] ||
    interviewRole?.replace(/-/g, ' ') + ' Developer';
  const score = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;

  const getAnswerBackgroundClass = (asnwerStatus: typeof ANSWER_STATUS[keyof typeof ANSWER_STATUS]) => {
    switch (asnwerStatus) {
      case ANSWER_STATUS.CORRECT:
        return styles.correctBackground;
      case ANSWER_STATUS.SKIPPED:
        return styles.skippedBackground;
      case ANSWER_STATUS.INCORRECT:
      default:
        return styles.incorrectBackground;
    }
  };

  const getAnswerStatusText = (asnwerStatus: typeof ANSWER_STATUS[keyof typeof ANSWER_STATUS]) => {
    switch (asnwerStatus) {
      case ANSWER_STATUS.CORRECT:
        return 'Correct';
      case ANSWER_STATUS.SKIPPED:
        return 'Skipped';
      case ANSWER_STATUS.INCORRECT:
      default:
        return 'Incorrect';
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        {level} {roleName}
      </h1>

      <div className={styles.resultSection}>
        <ScoreCounter score={score} />
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
              className={`${styles.questionItem} ${getAnswerBackgroundClass(result.asnwerStatus)}`}
            >
              <span className={styles.questionCategory}>
                {result.questionCategory}:
              </span>{' '}
              {result.question} -{' '}
              <strong>
                {getAnswerStatusText(result.asnwerStatus)}
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
        <a className={styles.button} href='/'>
          Finish Interview
        </a>
        <a className={styles.button} href='/interview'>
          Try Again
        </a>
      </div>
    </div>
  );
};
