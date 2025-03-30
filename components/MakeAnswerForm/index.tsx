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
import { MessageItem } from './MessageItem';
import { ISSUE_CODE } from 'constants/issueCode';
import { useAuth } from 'contexts/AuthContext';

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
  const { user } = useAuth()

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
  const handleReportIssue = async (aiMessageIndex: number) => {
    // Implement your report handling logic here
    const aiMessage = messages[aiMessageIndex].content;
    const userAnswer = aiMessageIndex !== 0 ? messages[aiMessageIndex - 1].content : ''
    const title = ISSUE_CODE.wrongAnswer;
    const description = `
      ### Question
      ${currentQuestion.title}

      ### AI answer
      ${aiMessage}

      ### User answer
      ${userAnswer}
    `;

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          user_id: user?.id
        }),
      });

      if (response.ok) {
        console.log("Issue reported successfully");
        // You can add some UI feedback here
      } else {
        console.error("Failed to report issue");
      }
    } catch (error) {
      console.error("Error reporting issue:", error);
    }
  };

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
              <MessageItem
                key={index}
                message={message}
                onReportClick={() => handleReportIssue(index)}
              />
            ))
          }
          <Loader loading={isLoading} />
          {aiAnswer.type === 'ERROR' && (
            <p className='text-white text-sm text-justify pb-5'>
              {aiAnswer.errorMessage}
            </p>
          )}
        </div>
      </div>
      <div className={styles.Footer}>
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
