import { SeniorityLevelType } from './interviewConfig';

export const QuestionDifficultyEnum = {
  ENTRY: 'ENTRY',
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  EXPERT: 'EXPERT',
} as const;

export type QuestionDifficultyValues =
  (typeof QuestionDifficultyEnum)[keyof typeof QuestionDifficultyEnum];

export interface Question {
  id: number;
  title: string;
  answer?: string;
  level?: SeniorityLevelType;
  category: string;
}

export interface AnswersStatus {
  question: string;
  questionCategory: string;
  isAnswerCorrect: boolean;
}
