import { sendPromptToGPT } from "@/utils";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Actions, FormValues, GPTAnswerState } from "./types";

function getRandomQuestion(questions: string[]) {
  const min = 0;
  const max = Math.floor(questions.length - 1);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return questions[randomNumber];
}

function prepareGPTPrompt(question: string, answer: string) {
  const defaultPrompt =
    'Below are two things, "Question" (the sentence after "Question:" word) and my answer (the sentences after "Answer:" word). Answer not always is true. Your task is to get correct answer for this question and compare with my answer. If my answer is correct and correct and explains completely the question then display "Correct answer!". In other case display word "Icorect answer" and correct answer.';
  const questionPrompt = `Question: ${question}`;
  const answerPrompt = `Answer: ${answer}`;
  const finalPrompt = `${defaultPrompt} \n\n ${answerPrompt}\n${questionPrompt}`;
  return finalPrompt;
}

const reducer = (state: GPTAnswerState, action: Actions): GPTAnswerState => {
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

export const useMakeAnswerForm = (questions: string[]) => {
  const [state, dispatch] = useReducer(reducer, { type: "START" });
  const [drawnQuestion, setDrawnQuestion] = useState<string>("");
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const drawNewQuestion = useCallback(() => {
    reset();
    setDrawnQuestion(getRandomQuestion(questions));
  }, [questions, reset]);

  useEffect(() => {
    drawNewQuestion();
  }, [questions, drawNewQuestion]);

  const checkCorrectAnswer = useCallback(
    async (answer: string) => {
      const GPTPrompt = prepareGPTPrompt(drawnQuestion, answer);
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

  return {
    drawnQuestion,
    state,
    register,
    drawNewQuestion,
    onSubmit: handleSubmit((values: FormValues) => checkCorrectAnswer(values.answer))
  };
};
