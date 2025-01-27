/*
 * Page to display interview summary
 * Currently interview results are passed on client side using zustand
 * TODO: Save interview results to DB and get them from there on server side
 * */

import { InterviewSummary } from '../../../components/InterviewSummary/InterviewSummary';

function Page() {
  return (
    <InterviewSummary
      interviewRole={'be-java'}
      level={'senior'}
      questionsNumber={10}
      results={[
        {
          questionCategory: 'java',
          question: 'Test123',
          isAnswerCorrect: true,
        },
        {
          questionCategory: 'java',
          question: 'Test1234',
          isAnswerCorrect: true,
        },
        {
          questionCategory: 'java',
          question: 'Test1235',
          isAnswerCorrect: false,
        },
      ]}
    />
  );
}

export default Page;
