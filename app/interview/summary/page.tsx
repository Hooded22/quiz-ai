/*
 * Page to display interview summary
 * Currently interview results are passed on client side using zustand
 * TODO: Save interview results to DB and get them from there on server side
 * */

"use client"

import { useSearchParams } from 'next/navigation';
import { InterviewSummary } from '../../../components/InterviewSummary/InterviewSummary';
import { RoleType, SeniorityLevelType } from '../../../types/interviewConfig';
import { UserAnswer } from '../../../types/question';
import { useEffect, useMemo, useState } from 'react';

interface PageProps {
  searchParams: {
    role?: string;
    level?: string;
    questionsNumber?: string;
    results?: string;
  };
}

export default function Page() {
  const params = useSearchParams();
  const role = params?.get('role') as RoleType;
  const level = params?.get('level') as SeniorityLevelType;
  const questionsNumber = Number(params?.get('questionsNumber') || 0);

  const parsedResults = useMemo(() => {
    const resultsParam = params?.get('results');

    if (!resultsParam) {
      return []
    }

    try {
      const decoded = decodeURIComponent(resultsParam);
      return JSON.parse(decoded) as UserAnswer[];
    } catch (error) {
      return []
    }
  }, [params])



  return (
    <InterviewSummary
      interviewRole={role}
      level={level}
      questionsNumber={questionsNumber}
      results={parsedResults}
    />
  );
}
