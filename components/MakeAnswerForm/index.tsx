"use client";

import { useMakeAnswerForm } from "./useMakeAnswerForm";
import { Loader } from "../Loader";
import { QuestionsWithAnswer } from "./types";
import {MarkdownRenderer} from "../MarkdownRenderer/MarkdownRenderer";
import {Styled} from "./styles";
import {Tooltip} from "../Tooltip/Tooltip";
import {useInterviewProcess} from "./useInterviewProcess";

interface MakeAnswerFormProps {
  questionsWithAnswers: QuestionsWithAnswer[];
  topic: string;
}

export function MakeAnswerForm({ questionsWithAnswers, topic }: MakeAnswerFormProps) {


  //TODO: when all questions done set quiz results to quiz state and move to next screen
  //TODO: Change text are component to show submit button inside it

  const {isQuestionsLimitReached, currentQuestion, nextQuestion} = useInterviewProcess({allQuestions: questionsWithAnswers})
  const { register, onSubmit, resetForm, aiAnswer } =
    useMakeAnswerForm({currentQuestion, topic});

  const onNextQuestionButtonClick = () => {
    resetForm();
    nextQuestion()
  }

  const isLoading = aiAnswer.type === "WAITING_FOR_RESPONSE" && aiAnswer.loading;

  console.log("questionsWithAnswers", questionsWithAnswers)

  return (
    <Styled.Wrapper>
      <Loader loading={isLoading} text="Waiting for GPT response" />
      <Styled.Content>
        <Styled.QuestionHeader>
          <Styled.QuestionTitle className="text-xl text-center" data-testid="current-question">
            {currentQuestion?.title}
          </Styled.QuestionTitle>
          {!!currentQuestion?.answer && (
              <Tooltip title={"Answer available"} details={currentQuestion.answer}/>
          )}
        </Styled.QuestionHeader>
        <Styled.ConversationContainer>
          {aiAnswer.type === "SUCCESS" && (
              <MarkdownRenderer content={aiAnswer.response}/>
          )}
          {aiAnswer.type === "ERROR" && (
              <p className="text-white text-sm text-justify pb-5">
                {aiAnswer.errorMessage}
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
            <button className="btn btn-error" disabled={aiAnswer.type !== "SUCCESS"} onClick={resetForm}>
              Repeat question
            </button>
            <div className='justify-between gap-8 flex'>
              <button className="btn btn-primary" onClick={onSubmit}>
                Send answer
              </button>
              {!isQuestionsLimitReached && <button className="btn btn-active" onClick={onNextQuestionButtonClick}>
                Next question
              </button>}
              {isQuestionsLimitReached && aiAnswer.type === "SUCCESS" && <button className="btn btn-active" onClick={onNextQuestionButtonClick}>
               Finish quiz
              </button>}
            </div>
          </div>
        </Styled.UserInputContainer>

      </Styled.Content>
    </Styled.Wrapper>
  );
}
