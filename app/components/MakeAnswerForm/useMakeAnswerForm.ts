import { sendPromptToGPT } from "@/utils";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Actions, FormValues, GPTAnswerState, QuestionsWithAnswer } from "./types";

function getRandomQuestion<T>(questions: T[]) {
  const min = 0;
  const max = Math.floor(questions.length - 1);
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return questions[randomNumber];
}

export function prepareGPTPrompt(question: string, answer: string) {
  const order = 'Below are two things: "Question" (the sentence after "Question:" word) and "My answer" (the sentences after "Answer:" word). Remember that My Answer is not always true. Your task is to get a correct answer for this question and compare it with my answer. If my answer is correct display "Correct answer!" else display "Incorrect answer" and explain why my answer was incorrect. Remember that all topics are related to the Javascript interview.'
  const questionPrompt = `Question: ${question}`;
  const answerPrompt = `My answer: ${answer}`;
  const finalPrompt = `${order} \n\n ${answerPrompt}\n${questionPrompt}`;
  return finalPrompt;
}

export function prepareGPTPromptWithCorrectAnswer(question: string, myAnswer: string, correctAnswer: string) {
  const order = 'I want you to be teacher and check if my answer is a correct answer for question. I will provide you also correct answer which you should use as a point of comparison. If my answer will be correct then display "Correct answer" else display "Not correct answer", show correct answer and explain why my answer was not correct.';
  const prompt = `${order} \n Question: ${question} \n My answer: ${myAnswer} \n Correct answer: ${correctAnswer}`;
  return prompt
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

export const useMakeAnswerForm = (questionsWithAnswers: QuestionsWithAnswer[]) => {
  const [state, dispatch] = useReducer(reducer, { type: "START" });
  const [drawnQuestion, setDrawnQuestion] = useState<QuestionsWithAnswer>({question: '', answer: undefined});
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const drawNewQuestion = useCallback(() => {
    reset({answer: ""});
    dispatch({type: "clearForm"})
    setDrawnQuestion(getRandomQuestion<QuestionsWithAnswer>(questionsWithAnswers));
  }, [questionsWithAnswers, reset]);

  useEffect(() => {
    drawNewQuestion();
  }, [questionsWithAnswers, drawNewQuestion]);

  const checkCorrectAnswer = useCallback(
    async (myAnswer: string) => {
      let GPTPrompt;
      if(drawnQuestion.answer) {
        GPTPrompt = prepareGPTPromptWithCorrectAnswer(drawnQuestion.question, myAnswer, drawnQuestion.answer);
      } else {
        GPTPrompt = prepareGPTPrompt(drawnQuestion.question, myAnswer);
      }
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
