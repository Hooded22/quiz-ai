import { MakeAnswerForm } from "../../../components/MakeAnswerForm";
import { Question } from "../../../types/question";
import { promises as fs } from "fs";
import path from "path";
import {InterviewConfig, QuestionsSets, QuestionsSetsValues, RoleType} from "../../../types/interviewConfig";
import {RolesConfig} from "../../../constants/rolesConfig";

interface QuestionCategoryProps {
  params: {
    id: RoleType;
  };
  searchParams: InterviewConfig
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

function getRandomQuestions(questions: Question[], numberOfQuestionsToGet: number) {
  const idsArray: number[] = generateUniqueRandomNumbers(numberOfQuestionsToGet, 0, questions.length-1);

  return questions.filter((item, index) => idsArray.includes(index));
}

async function getDataFromJSONFile(id: string, questionsNumber: number): Promise<Question[]> {
  const jsonDirectory = path.join(process.cwd(), "/data");
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/${id}.json`,
      "utf8"
    );
    const questions: Question[] = JSON.parse(fileContents)


    return getRandomQuestions(questions, questionsNumber);
  } catch (error) {
    return []
  }
}

async function getQuestionsSetForSelectedRole(
    role: RoleType,
    questionsLimit: number
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
    const questionsForSet = await getDataFromJSONFile(key, count);
    questionsForRole.push(...questionsForSet.slice(0, count));
  }

  return questionsForRole;
}

export default async function QuestionCategory(props: QuestionCategoryProps) {
  //based on query params get random number of question for chosen interview

  console.log("props.params.id", props.searchParams)
  const roleId = props.params.id
  const questionsNumber = props.searchParams.questionsNumber ? parseInt(props.searchParams.questionsNumber) : 0


  const questionsWithAnswers = await getQuestionsSetForSelectedRole(roleId, questionsNumber);

  console.log("questionsForRole",questionsWithAnswers)


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <MakeAnswerForm questionsWithAnswers={questionsWithAnswers} topic={props.params.id}/>
    </div>
  );
}
