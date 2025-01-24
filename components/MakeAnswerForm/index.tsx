'use client';

import { useMakeAnswerForm } from './useMakeAnswerForm';
import { Loader } from '../Loader';
import { QuestionsWithAnswer } from './types';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';
import styles from './styles.module.css';
import { Tooltip } from '../Tooltip/Tooltip';
import { useInterviewProcess } from './useInterviewProcess';
import { DynamicTextarea } from '../DynamicTextArea/DynamicTextArea';

interface MakeAnswerFormProps {
  questionsWithAnswers: QuestionsWithAnswer[];
  topic: string;
}

export function MakeAnswerForm({
  questionsWithAnswers,
  topic,
}: MakeAnswerFormProps) {
  //TODO: when all questions done set quiz results to quiz state and move to next screen
  //TODO: Change text are component to show submit button inside it

  const {
    isQuestionsLimitReached,
    currentQuestion,
    nextQuestion,
    addAnswer,
    userAnswers
  } = useInterviewProcess({ allQuestions: questionsWithAnswers });
  const {
    onSubmit,
    control,
    resetForm,
    aiAnswer
  } = useMakeAnswerForm({
    currentQuestion,
    topic,
    addAnswer
  });

  const onNextQuestionButtonClick = () => {
    resetForm();
    nextQuestion();
  };

  const onFinishInterviewButtonClick = () => {
    console.log("Answers", userAnswers)
  }

  const isLoading =
    aiAnswer.type === 'WAITING_FOR_RESPONSE' && aiAnswer.loading;
  const isInterviewFinished = isQuestionsLimitReached && aiAnswer.type === 'SUCCESS';

  console.log('currentQuestion', currentQuestion.level);

  return (
    <div className={styles.Wrapper}>
      <Loader loading={isLoading} text='Waiting for GPT response' />
      <div className={styles.Content}>
        <div className={styles.QuestionHeader}>
          <h1 className={styles.QuestionTitle} data-testid='current-question'>
            {currentQuestion?.title}
          </h1>
          {!!currentQuestion?.answer && (
            <Tooltip
              title={'Answer available'}
              details={currentQuestion.answer}
            />
          )}
        </div>
        <div className={styles.ConversationContainer}>
          {aiAnswer.type === 'SUCCESS' && (
            <div className={styles.ConversationItem}>
              <MarkdownRenderer content={aiAnswer.response} />
            </div>
          )}
          {aiAnswer.type === 'ERROR' && (
            <p className='text-white text-sm text-justify pb-5'>
              {aiAnswer.errorMessage}
            </p>
          )}
        </div>
        <div className={styles.BottomSection}>
          <div className={styles.UserInputContainer}>
            <DynamicTextarea control={control} name='answer' />
            <div className={styles.UserInputContainerButtonsWrapper}>
              <button className={styles.SubmitButton} onClick={onSubmit} type='button'>
                Send answer
              </button>
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <button
              type='button'
              className='btn btn-error'
              disabled={aiAnswer.type !== 'SUCCESS'}
              onClick={resetForm}
            >
              Repeat question
            </button>
            <div className='justify-between gap-8 flex'>
              {!isQuestionsLimitReached && (
                <button
                  type='button'
                  className='btn btn-active'
                  onClick={onNextQuestionButtonClick}
                >
                  Next question
                </button>
              )}
              {isInterviewFinished && (
                <button
                  type='button'
                  className='btn btn-active'
                  onClick={onFinishInterviewButtonClick}
                >
                  Finish quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
