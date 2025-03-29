import { UserAnswer, Question, ANSWER_STATUS } from '../../types/question';
import { useState, useRef } from 'react';

export interface UseInterviewProcessProps {
  allQuestions: Question[];
}

export const useInterviewProcess = ({
  allQuestions,
}: UseInterviewProcessProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Array<UserAnswer>>([]);

  const addAnswer = (question: string, questionCategory: string, isAnswerCorrect: boolean): void => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question,
        questionCategory,
        asnwerStatus: isAnswerCorrect ? ANSWER_STATUS['CORRECT'] : ANSWER_STATUS['INCORRECT']
      }
    ]);
  };

  const skipQuestion = () => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        question: currentQuestion.title,
        questionCategory: currentQuestion.category,
        asnwerStatus: ANSWER_STATUS['SKIPPED']
      }
    ]);
    nextQuestion();
  };


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
    currentQuestionIndex,
    isQuestionsLimitReached,
    nextQuestion,
    addAnswer,
    skipQuestion,
    userAnswers
  };
};
