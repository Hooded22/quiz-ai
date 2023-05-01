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

export function prepareGPTPrompt(question: string, answer: string, topic: string) {
  const order = `Act as world calss teacher and expert in ${topic} Below are two things: a "Question" related to a ${topic} (the sentence after "Question:") and "My answer" (the sentences after "Answer:"). Keep in mind that "My answer" might not always be true. Your task is to determine the correct answer for this question and compare it with "My answer." If "My answer" is correct, display "Correct answer!" Otherwise, display "Incorrect answer" and explain why "My answer" was incorrect.`
  const questionPrompt = `Question\n${question}`;
  const answerPrompt = `My answer\n${answer}`;
  const finalPrompt = `${order}\n\n ${answerPrompt}\n\n${questionPrompt}\n\n`;
  return finalPrompt;
}

export function prepareGPTPromptWithCorrectAnswer(question: string, myAnswer: string, correctAnswer: string, topic: string) {
  const order = `As a teacher, check if my answer is correct for a question related to ${topic}. I will provide the correct answer for comparison. If my answer is correct, respond with 'Correct answer.' If it is not correct, respond with 'Not correct answer,' show the correct answer, and explain why my answer was not correct.`
  const prompt = `${order}\n\nQuestion\n ${question}\n\nMy answer\n${myAnswer}\n\nCorrect answer\n${correctAnswer}\n\n`;
  console.log("PROMPT: ", prompt);
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

export const useMakeAnswerForm = (questionsWithAnswers: QuestionsWithAnswer[], topic: string) => {
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
        GPTPrompt = prepareGPTPromptWithCorrectAnswer(drawnQuestion.question, myAnswer, drawnQuestion.answer, topic);
      } else {
        GPTPrompt = prepareGPTPrompt(drawnQuestion.question, myAnswer, topic);
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
