"use client";

import { useMakeAnswerForm } from "./useMakeAnswerForm";
import { Loader } from "../Loader";
import { QuestionsWithAnswer } from "./types";

interface MakeAnswerFormProps {
  questionsWithAnswers: QuestionsWithAnswer[];
  topic: string;
}

export function MakeAnswerForm({ questionsWithAnswers, topic }: MakeAnswerFormProps) {
  const { register, onSubmit, drawNewQuestion, drawnQuestion, state } =
    useMakeAnswerForm(questionsWithAnswers, topic);

  const isLoading = state.type === "WAITING_FOR_RESPONSE" && state.loading;

  return (
    <div className="card bg-neutral w-3/5 relative">
      <Loader loading={isLoading} text="Waiting for GPT response" />
      <div className="card-body">
        <h1 className="text-xl text-center" data-testid="current-question">
          {drawnQuestion.question}
        </h1>
        {!!drawnQuestion.answer && (
          <div className="flex w-full justify-center">
            <div
              className="tooltip tooltip-bottom"
              data-tip={drawnQuestion.answer}
            >
              <div className="badge badge-primary badge-outline uppercase mt-1">
                answer available
              </div>
            </div>
          </div>
        )}
        <textarea
          title="answer"
          className="textarea textarea-bordered mb-10 mt-5 resize-none text-sm"
          {...register("answer")}
          rows={5}
        />
        {state.type === "SUCCESS" && (
          <p className="text-white text-sm text-justify pb-5">
            {state.response}
          </p>
        )}
        <div className="card-actions justify-between">
          <button className="btn btn-error" onClick={drawNewQuestion}>
            Get new question
          </button>
          <button className="btn btn-primary" onClick={onSubmit}>
            Send answer
          </button>
        </div>
      </div>
    </div>
  );
}
