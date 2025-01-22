import { gptMessagesType, sendPromptToGPT } from 'utils';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Actions,
  FormValues,
  GPTAnswerState,
  QuestionsWithAnswer,
} from './types';
import { Question } from '../../types/question';
import {
  prepareGPTPrompt,
  prepareGPTPromptWithCorrectAnswer,
} from '../../utils/prompts.utils';
import {
  getAnswerCheckResponseWithCorrectAnswer,
  getRandomQuestion,
} from '../../utils/question.utils';

export interface UseMakeAnswerFormProps {
  currentQuestion: Question;
  topic: string;
}

const modelAnswerReducer = (
  state: GPTAnswerState,
  action: Actions
): GPTAnswerState => {
  switch (action.type) {
    case 'clearForm':
      return { type: 'START' };
    case 'setLoadingForResponse':
      return { type: 'WAITING_FOR_RESPONSE', loading: true };
    case 'setResponseWithKnownCorrectAnswer':
      return {
        type: 'SUCCESS',
        modalOpen: true,
        response: getAnswerCheckResponseWithCorrectAnswer(
          action.payload.response,
          action.payload.correctAnswer
        ),
      };
    case 'setAIModelResponse':
      return {
        type: 'SUCCESS',
        modalOpen: true,
        response: action.payload.response,
      };
    case 'setError':
      return { type: 'ERROR', errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
};

export const useMakeAnswerForm = ({
  topic,
  currentQuestion,
}: UseMakeAnswerFormProps) => {
  const [aiAnswer, dispatch] = useReducer(modelAnswerReducer, {
    type: 'START',
  });
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const resetForm = () => {
    reset({ answer: '' });
    dispatch({ type: 'clearForm' });
  };

  const checkCorrectAnswer = useCallback(
    async (myAnswer: string) => {
      if (!currentQuestion) {
        dispatch({
          type: 'setError',
          payload: { errorMessage: "Question doesn't exist" },
        });
        return;
      }

      const GPTPrompt = currentQuestion.answer
        ? prepareGPTPromptWithCorrectAnswer(
            currentQuestion.title,
            myAnswer,
            currentQuestion.answer,
            topic
          )
        : prepareGPTPrompt(currentQuestion?.title, myAnswer, topic);

      try {
        dispatch({ type: 'setLoadingForResponse' });
        const GPTResponse = await sendPromptToGPT(GPTPrompt);

        if (currentQuestion.answer) {
          dispatch({
            type: 'setResponseWithKnownCorrectAnswer',
            payload: {
              response: GPTResponse,
              correctAnswer: currentQuestion.answer,
            },
          });
        } else {
          dispatch({
            type: 'setAIModelResponse',
            payload: { response: GPTResponse },
          });
        }
      } catch (error: any) {
        console.log('ERR: ', error);
        dispatch({
          type: 'setError',
          payload: { errorMessage: error.message || 'Something went wrong' },
        });
      }
    },
    [currentQuestion]
  );

  return {
    aiAnswer,
    register,
    resetForm,
    onSubmit: handleSubmit((values: FormValues) =>
      checkCorrectAnswer(values.answer)
    ),
  };
};
