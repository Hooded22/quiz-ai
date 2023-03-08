"use client";

import { useMakeAnswerForm } from "./useMakeAnswerForm";
import { Loader } from "../Loader";

interface MakeAnswerFormProps {
  questions: string[];
}

export function MakeAnswerForm({ questions }: MakeAnswerFormProps) {
  const { register, onSubmit, drawNewQuestion, drawnQuestion, state } =
    useMakeAnswerForm(questions);

  const isLoading = state.type === "WAITING_FOR_RESPONSE" && state.loading;

  return (
    <div className="card bg-neutral w-3/5 relative">
      <Loader loading={isLoading} text="Waiting for GPT response"/>
      <div className="card-body">
        <h1 className="text-2xl text-center mb-5">{drawnQuestion}</h1>
        <textarea className="textarea textarea-bordered mb-10 resize-none" {...register("answer")} rows={5}/>
        {state.type === "SUCCESS" && (
          <p className="text-white text-xl text-justify pb-5">{state.response}</p>
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
