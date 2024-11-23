import {gptMessagesType, sendPromptToGPT} from "@/utils";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Actions, FormValues, GPTAnswerState, QuestionsWithAnswer } from "./types";
import {Question} from "@/types/question";
import {prepareGPTPrompt, prepareGPTPromptWithCorrectAnswer} from "@/utils/prompts.utils";
import {getRandomQuestion} from "@/utils/question.utils";

const modelAnswerReducer = (state: GPTAnswerState, action: Actions): GPTAnswerState => {
  switch (action.type) {
    case "clearForm":
      return { type: "START" };
    case "setLoadingForResponse":
      return { type: "WAITING_FOR_RESPONSE", loading: true };
    case "setResponse":
      return {
        type: "SUCCESS",
        modalOpen: true,
        response: action.payload.response,
      };
    case "setError":
      return { type: "ERROR", errorMessage: action.payload.errorMessage };
    default:
      return state;
  }
};

export const useMakeAnswerForm = (questionsWithAnswers: QuestionsWithAnswer[], topic: string) => {
  const [state, dispatch] = useReducer(modelAnswerReducer, { type: "START" });
  const [drawnQuestion, setDrawnQuestion] = useState<Question>();
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const drawNewQuestion = useCallback(() => {
    reset({answer: ""});
    dispatch({type: "clearForm"})
    setDrawnQuestion(getRandomQuestion<QuestionsWithAnswer>(questionsWithAnswers));
  }, [questionsWithAnswers, reset]);

  const checkCorrectAnswer = useCallback(
    async (myAnswer: string) => {
      if(!drawnQuestion) {
        dispatch({ type: "setError", payload: { errorMessage: "Question doesn't exist" } });
        return
      }

      const GPTPrompt = drawnQuestion.answer
          ? prepareGPTPromptWithCorrectAnswer(drawnQuestion.title, myAnswer, drawnQuestion.answer, topic)
          : prepareGPTPrompt(drawnQuestion?.title, myAnswer, topic)

      try {
        dispatch({ type: "setLoadingForResponse" });
        const GPTResponse = await sendPromptToGPT(GPTPrompt);
        dispatch({ type: "setResponse", payload: { response: GPTResponse } });
      } catch (error: any) {
        dispatch({ type: "setError", payload: { errorMessage: error } });
      }
    },
    [drawnQuestion]
  );

  const repeatQuestion = () => {
    dispatch({type: "clearForm"});
    reset({answer: ""});
  }

  useEffect(() => {
    drawNewQuestion();
  }, [questionsWithAnswers, drawNewQuestion]);

  return {
    drawnQuestion,
    state,
    register,
    drawNewQuestion,
    repeatQuestion,
    onSubmit: handleSubmit((values: FormValues) => checkCorrectAnswer(values.answer))
  };
};
