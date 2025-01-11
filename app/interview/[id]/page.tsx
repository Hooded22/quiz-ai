import { MakeAnswerForm } from "../../../components/MakeAnswerForm";
import { Question } from "../../../types/question";
import { promises as fs } from "fs";
import path from "path";
import {InterviewConfig} from "../../../types/interviewConfig";

interface QuestionCategoryProps {
  params: {
    id: string;
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

export default async function QuestionCategory(props: QuestionCategoryProps) {
  //based on query params get random number of question for chosen interview

  console.log("props.params.id", props.searchParams)
  const roleId = props.params.id
  const questionsNumber = props.searchParams.questionsNumber ? parseInt(props.searchParams.questionsNumber) : 0

  const questionsWithAnswers = await getDataFromJSONFile(roleId, questionsNumber);

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <MakeAnswerForm questionsWithAnswers={questionsWithAnswers} topic={props.params.id}/>
    </div>
  );
}
