"use client";

import { useMakeAnswerForm } from "./useMakeAnswerForm";
import { Loader } from "../Loader";
import { QuestionsWithAnswer } from "./types";
import {MarkdownRenderer} from "../MarkdownRenderer/MarkdownRenderer";
import {Styled} from "./styles";
import {Tooltip} from "../Tooltip/Tooltip";

interface MakeAnswerFormProps {
  questionsWithAnswers: QuestionsWithAnswer[];
  topic: string;
}

export function MakeAnswerForm({ questionsWithAnswers, topic }: MakeAnswerFormProps) {
  /**This component should be for whole interview process
    * showing current question
    * interaction with Interviewer
    * moving to next question
  **/


  //set current question from 5 randomly selected on parent page
  //when next question set new question reset form
  //when all questions done set quiz results to quiz state and move to next screen

  const { register, onSubmit, drawNewQuestion, drawnQuestion, repeatQuestion, state } =
    useMakeAnswerForm(questionsWithAnswers, topic);

  const isLoading = state.type === "WAITING_FOR_RESPONSE" && state.loading;

  return (
    <Styled.Wrapper>
      <Loader loading={isLoading} text="Waiting for GPT response" />
      <Styled.Content>
        <Styled.QuestionHeader>
          <Styled.QuestionTitle className="text-xl text-center" data-testid="current-question">
            {drawnQuestion?.title}
          </Styled.QuestionTitle>
          {!!drawnQuestion?.answer && (
              <Tooltip title={"Answer available"} details={drawnQuestion.answer}/>
          )}
        </Styled.QuestionHeader>
        <Styled.ConversationContainer>
          {state.type === "SUCCESS" && (
              <MarkdownRenderer content={state.response}/>
          )}
          {state.type === "ERROR" && (
              <p className="text-white text-sm text-justify pb-5">
                {state.errorMessage}
              </p>
          )}
        </Styled.ConversationContainer>

        <Styled.UserInputContainer>
          <textarea
              title="answer"
              className="textarea textarea-bordered mb-10 mt-5 resize-none text-sm"
              {...register("answer")}
              rows={5}
          />
          <div className="card-actions justify-between pt-4">
            <button className="btn btn-error" disabled={state.type !== "SUCCESS"} onClick={repeatQuestion}>
              Repeat question
            </button>
            <div className='justify-between gap-8 flex'>
              <button className="btn btn-primary" onClick={onSubmit}>
                Send answer
              </button>
              <button className="btn btn-active" onClick={drawNewQuestion}>
                Next question
              </button>
            </div>
          </div>
        </Styled.UserInputContainer>

      </Styled.Content>
    </Styled.Wrapper>
  );
}
