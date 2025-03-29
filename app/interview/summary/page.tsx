/*
 * Page to display interview summary
 * Currently interview results are passed on client side using zustand
 * TODO: Save interview results to DB and get them from there on server side
 * */

import { InterviewSummary } from '../../../components/InterviewSummary/InterviewSummary';
import { RoleType, SeniorityLevelType } from '../../../types/interviewConfig';
import { UserAnswer } from '../../../types/question';

interface PageProps {
  searchParams: {
    role?: string;
    level?: string;
    questionsNumber?: string;
    results?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const role = searchParams.role as RoleType;
  const level = searchParams.level as SeniorityLevelType;
  const questionsNumber = Number(searchParams.questionsNumber);
  const results = searchParams.results
    ? JSON.parse(decodeURIComponent(searchParams.results)) as UserAnswer[]
    : [];

  return (
    <InterviewSummary
      interviewRole={role}
      level={level}
      questionsNumber={questionsNumber}
      results={results}
    />
  );
}
