import { Question } from '../../types/question';
import { useState } from 'react';

export interface UseInterviewProcessProps {
  allQuestions: Question[];
}

export const useInterviewProcess = ({
  allQuestions,
}: UseInterviewProcessProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const currentQuestion = allQuestions[currentQuestionIndex] || allQuestions[0];
  const isQuestionsLimitReached =
    currentQuestionIndex === allQuestions.length - 1;

  const nextQuestion = () => {
    if (isQuestionsLimitReached) {
      return;
    }

    setCurrentQuestionIndex((state) => state + 1);
  };

  return {
    currentQuestion,
    isQuestionsLimitReached,
    nextQuestion,
  };
};
