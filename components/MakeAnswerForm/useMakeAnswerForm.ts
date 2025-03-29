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
  checkIsAnswerCorrect,
} from '../../utils/question.utils';
import { useConversation } from "./useConversation";

export interface UseMakeAnswerFormProps {
  currentQuestion: Question;
  topic: string;
  addAnswer: (question: string, questionCategory: string, isAnswerCorrect: boolean) => void;
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
          action.payload.correctAnswer,
          action.payload.isAnswerCorrect
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
  addAnswer,
}: UseMakeAnswerFormProps) => {
  const [aiAnswer, dispatch] = useReducer(modelAnswerReducer, {
    type: 'START',
  });
  const { register, control, reset, handleSubmit } = useForm<FormValues>();
  const { addMessage, resetMessages, messages } = useConversation();

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

      resetForm();
      addMessage("user", myAnswer);


      //TODO: Add previous messages to prompt
      //TODO: Update prompts: at first message indicate if answer is correct or not, at next answrr of user questions etc.
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

        const isAnswerCorrect = checkIsAnswerCorrect(GPTResponse);
        addAnswer(currentQuestion.title, currentQuestion.category, isAnswerCorrect);

        let formattedResponse: string;
        if (currentQuestion.answer) {
          formattedResponse = getAnswerCheckResponseWithCorrectAnswer(
            GPTResponse,
            currentQuestion.answer,
            isAnswerCorrect
          );
          dispatch({
            type: 'setResponseWithKnownCorrectAnswer',
            payload: {
              response: GPTResponse,
              correctAnswer: currentQuestion.answer,
              isAnswerCorrect,
            },
          });
        } else {
          formattedResponse = GPTResponse;
          dispatch({
            type: 'setAIModelResponse',
            payload: { response: GPTResponse },
          });
        }

        // Add AI's response to conversation
        addMessage("ai", formattedResponse);

      } catch (error: any) {
        console.log('ERR: ', error);
        dispatch({
          type: 'setError',
          payload: { errorMessage: error.message || 'Something went wrong' },
        });
      }
    },
    [currentQuestion, addAnswer, addMessage]
  );

  return {
    aiAnswer,
    register,
    control,
    resetForm,
    resetMessages,
    onSubmit: handleSubmit((values: FormValues) =>
      checkCorrectAnswer(values.answer)
    ),
    messages, // Expose messages if needed in the UI
  };
};
