'use client';

import { useMakeAnswerForm } from './useMakeAnswerForm';
import { Loader } from '../Loader';
import { QuestionsWithAnswer } from './types';
import { MarkdownRenderer } from '../MarkdownRenderer/MarkdownRenderer';
import styles from './styles.module.css';
import { Tooltip } from '../Tooltip/Tooltip';
import { useInterviewProcess } from './useInterviewProcess';
import { DynamicTextarea } from '../DynamicTextArea/DynamicTextArea';
import { SeniorityLevelBadge } from 'components/SeniorotyLevelTooltip/SeniorityLevelBadge';
import { useRouter } from 'next/navigation';
import { SkipQuestionButton } from '../SkipQuestionButton';
import { useRef } from 'react';

const SHOW_ANSWER_TOOLTIP = false

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

  const router = useRouter();
  const allQuestions = useRef(questionsWithAnswers)

  const {
    isQuestionsLimitReached,
    currentQuestion,
    currentQuestionIndex,
    nextQuestion,
    addAnswer,
    skipQuestion,
    userAnswers
  } = useInterviewProcess({ allQuestions: allQuestions.current });


  const {
    aiAnswer,
    control,
    resetForm,
    resetMessages,
    onSubmit,
    messages,
  } = useMakeAnswerForm({
    currentQuestion,
    topic,
    addAnswer,
  });


  const onNextQuestionButtonClick = () => {
    resetForm();
    resetMessages();
    nextQuestion();
  };

  const onFinishInterviewButtonClick = () => {

    const answersParam = encodeURIComponent(JSON.stringify(userAnswers));


    const queryParams = new URLSearchParams({
      role: topic,
      level: currentQuestion.level || 'junior',
      questionsNumber: questionsWithAnswers.length.toString(),
      results: answersParam
    });


    router.push(`/interview/summary?${queryParams.toString()}`);
  }


  const isLoading =
    aiAnswer.type === 'WAITING_FOR_RESPONSE' && aiAnswer.loading;

  const isInterviewFinished = isQuestionsLimitReached && aiAnswer.type === 'SUCCESS';
  const isConversationStarted = !!messages.length


  return (
    <div className={styles.Wrapper}>
      <div className={styles.Content}>
        <div className={styles.QuestionHeader}>
          <div className={styles.QuestionCounter}>
            Question {currentQuestionIndex + 1}/{questionsWithAnswers.length}
          </div>
          <h1 className={styles.QuestionTitle} data-testid='current-question'>
            {currentQuestion?.title}
          </h1>
          {currentQuestion.level && <SeniorityLevelBadge level={currentQuestion.level} />}
          {!!currentQuestion?.answer && SHOW_ANSWER_TOOLTIP && (
            <Tooltip
              title='Answer available'
              details={currentQuestion.answer}
              variant="success"
            />
          )}
        </div>
        <div className={styles.ConversationContainer}>
          {
            messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.Message} ${message.sender === "user" ? styles.UserMessage : styles.AIMessage
                  }`}
              >
                <MarkdownRenderer content={message.content} />
              </div>))
          }
          <Loader loading={isLoading} />
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
              {!isConversationStarted && <button className={styles.SubmitButton} onClick={onSubmit} type='button'>
                Send answer
              </button>}
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <SkipQuestionButton
              onSkip={skipQuestion}
              onLastQuestionSkip={onFinishInterviewButtonClick}
              isDisabled={isConversationStarted}
              isLastQuestion={isQuestionsLimitReached}
            />
            <div className='justify-between gap-8 flex'>
              {!isQuestionsLimitReached && isConversationStarted && (
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
