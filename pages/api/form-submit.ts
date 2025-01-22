import { NextApiRequest, NextApiResponse } from 'next';
import {
  InterviewConfig,
  QuestionsNumber,
  RoleType,
  SeniorityLevel,
  TimeLimit,
} from '../../types/interviewConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formState: InterviewConfig = req.body;

    // Validate the formState object
    if (!Object.values(RoleType).includes(formState.roleType)) {
      return res.status(400).json({ error: 'Valid roleType is required' });
    }

    if (!Object.values(QuestionsNumber).includes(formState.questionsNumber)) {
      return res
        .status(400)
        .json({ error: 'Valid questionsNumber is required' });
    }

    if (!Object.values(SeniorityLevel).includes(formState.seniorityLevel)) {
      return res
        .status(400)
        .json({ error: 'Valid seniorityLevel is required' });
    }

    if (!Object.values(TimeLimit).includes(formState.timeLimit)) {
      return res.status(400).json({ error: 'Valid timeLimit is required' });
    }

    // Construct the search parameters
    const searchParams = new URLSearchParams({
      seniorityLevel: formState.seniorityLevel,
      questionsNumber: formState.questionsNumber,
      timeLimit: formState.timeLimit,
      questionsCanRepeat: formState.questionsCanRepeat.toString(),
    });

    // Construct the redirect URL
    const redirectUrl = `/interview/${formState.roleType}/?${searchParams.toString()}`;
    console.log('Redirecting to', redirectUrl);

    // Set the status code to 307 Temporary Redirect or 302 Found
    res.setHeader('Location', redirectUrl);
    res.status(307).end();
  } catch (err) {
    // Log the error and respond with server error status
    console.error('Error processing request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
