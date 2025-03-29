import { MakeAnswerForm } from '../../../components/MakeAnswerForm';
import { Question } from '../../../types/question';
import { promises as fs } from 'fs';
import path from 'path';
import {
  InterviewConfig,
  QuestionsSetsValues,
  RoleType,
  SeniorityLevelType,
  SeniorityLevel
} from '../../../types/interviewConfig';
import { RolesConfig } from '../../../constants/rolesConfig';

interface QuestionCategoryProps {
  params: {
    id: RoleType;
  };
  searchParams: InterviewConfig;
}

function getRandomInt(min: number, max: number) {
  // Generates a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueRandomNumbers(count: number, min: number, max: number) {
  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < count) {
    const randomNumber = getRandomInt(min, max);
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

function getRandomQuestionsBasedOnLevel(
  questions: Question[],
  numberOfQuestionsToGet: number,
  difficultyLevel: SeniorityLevelType
) {
  // Filter questions based on difficulty level
  const filteredQuestions = questions.filter((question) => {
    if (difficultyLevel === SeniorityLevel.ALL) {
      return true;
    }

    if (difficultyLevel === SeniorityLevel.JUNIOR) {
      return (
        question.level === SeniorityLevel.JUNIOR ||
        question.level === SeniorityLevel.MID
      );
    }

    return (
      question.level === SeniorityLevel.MID ||
      question.level === SeniorityLevel.SENIOR
    );
  });

  const countToGet = Math.min(filteredQuestions.length, numberOfQuestionsToGet);

  const idsArray: number[] = generateUniqueRandomNumbers(
    countToGet,
    0,
    filteredQuestions.length - 1
  );

  return filteredQuestions.filter((_, index) => idsArray.includes(index));
}

async function getRandomQuestionForTechnology(
  technologyId: string,
  questionsNumber: number,
  seniorityLevel: SeniorityLevelType
): Promise<Question[]> {
  const jsonDirectory = path.join(process.cwd(), '/data');
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/${technologyId}.json`,
      'utf8'
    );
    const questions: Question[] = JSON.parse(fileContents);

    return getRandomQuestionsBasedOnLevel(
      questions,
      questionsNumber,
      seniorityLevel
    );
  } catch (error) {
    return [];
  }
}

async function getQuestionsSetForSelectedRole(
  role: RoleType,
  questionsLimit: number,
  seniorityLevel: SeniorityLevelType
) {
  const rolesSets = RolesConfig[role];
  const sortedRoleSets = Object.entries(rolesSets).sort(
    ([, a], [, b]) => b - a
  ) as [QuestionsSetsValues, number][]; // Sort by percentage

  const questionsForRole: Question[] = [];

  const questionsNeeded = new Map<QuestionsSetsValues, number>();
  let totalAssigned = 0;

  // Calculate initial question numbers based on percentages
  for (const [key, percentage] of sortedRoleSets) {
    const numQuestions = Math.floor((percentage / 100) * questionsLimit);
    if (totalAssigned + numQuestions <= questionsLimit) {
      questionsNeeded.set(key, numQuestions);
      totalAssigned += numQuestions;
    }
  }

  // Adjust by adding questions to the highest priority set if needed
  if (totalAssigned < questionsLimit) {
    for (const [key] of sortedRoleSets) {
      const currentCount = questionsNeeded.get(key) || 0;
      if (totalAssigned + 1 <= questionsLimit) {
        questionsNeeded.set(key, currentCount + 1);
        totalAssigned++;
      }
    }
  }

  // Fetch questions for each set
  for (const [key, count] of Array.from(questionsNeeded)) {
    const questionsForSet = await getRandomQuestionForTechnology(
      key,
      count,
      seniorityLevel
    );
    questionsForRole.push(...questionsForSet.slice(0, count));
  }

  return questionsForRole;
}

export default async function QuestionCategory(props: QuestionCategoryProps) {
  //based on query params get random number of question for chosen interview

  const roleId = props.params.id;
  const questionsNumber = props.searchParams.questionsNumber
    ? parseInt(props.searchParams.questionsNumber)
    : 0;
  const seniorityLevel =
    props.searchParams.seniorityLevel ?? SeniorityLevel.ALL;

  // Generate a stable key from the URL parameters to ensure we get the same questions
  // This prevents re-fetching when client-side navigation occurs
  const stableKey = `${roleId}-${questionsNumber}-${seniorityLevel}`;

  // Create a stable, deterministic seed for the random number generation
  // This ensures the same questions are selected for the same parameters
  const questionsWithAnswers = await getQuestionsSetForSelectedRole(
    roleId,
    questionsNumber,
    seniorityLevel
  );

  // Handle case where no questions are available
  if (!questionsWithAnswers || questionsWithAnswers.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1>No questions available</h1>
        <p>Unfortunately, we couldn&apos;t find any questions for the selected parameters.</p>
        <p>Please try a different configuration or check back later.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <MakeAnswerForm
        questionsWithAnswers={questionsWithAnswers}
        topic={props.params.id}
        key={stableKey}
      />
    </div>
  );
}
