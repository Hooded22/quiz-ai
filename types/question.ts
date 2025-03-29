import { SeniorityLevelType } from './interviewConfig';

export const QuestionDifficultyEnum = {
  ENTRY: 'ENTRY',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  EXPERT: 'EXPERT',
} as const;

export const ANSWER_STATUS = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  SKIPPED: 'skipped'
} as const

export type AsnwerStatus = (typeof ANSWER_STATUS)[keyof typeof ANSWER_STATUS];

export type QuestionDifficultyValues =
  (typeof QuestionDifficultyEnum)[keyof typeof QuestionDifficultyEnum];

export interface Question {
  id: number;
  title: string;
  answer?: string;
  level?: SeniorityLevelType;
  category: string;
}

export interface UserAnswer {
  question: string;
  questionCategory: string;
  asnwerStatus: AsnwerStatus
}
