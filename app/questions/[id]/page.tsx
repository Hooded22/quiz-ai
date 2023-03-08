import { MakeAnswerForm } from "@/components/MakeAnswerForm";
import { QuestionsWithAnswer } from "@/components/MakeAnswerForm/types";
import { promises as fs } from "fs";
import path from "path";

interface QuestionCategoryProps {
  params: {
    id: string;
  };
}

async function getDataFromJSONFile(id: string): Promise<QuestionsWithAnswer[]> {
  const jsonDirectory = path.join(process.cwd(), "/app/json");
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/${id}.json`,
      "utf8"
    );
    const questions = JSON.parse(fileContents).questions
    const answers = JSON.parse(fileContents).answers;

    const questionsWithAnswers = createQuestionAnswerMap(questions, answers);

    return questionsWithAnswers;
  } catch (error) {
    return []
  }
}

function createQuestionAnswerMap(questions: string[], answers: string[]) {
  const answersMap = new Map<string, string>();
  answers.forEach(answer => {
    const answerNumber = getAnswerNumber(answer);
    if(answerNumber) {
      answersMap.set(answerNumber, answer);
    }
  })
  const result = questions.map(question => {
    const questionNumber = getQuestionNumber(question);
    return {
      question,
      answer: questionNumber ? answersMap.get(questionNumber) || undefined : undefined
    }
  })

  return result;
}

function getAnswerNumber(answer: string) {
  return answer.match(/^A([0-9]*)\:.*$/)?.[1];
}

function getQuestionNumber(question: string) {
  return question.match(/^Q([0-9]*)\:.*$/)?.[1];
}



export default async function QuestionCategory(props: QuestionCategoryProps) {
  const questionsWithAnswers = await getDataFromJSONFile(props.params.id);


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <MakeAnswerForm questionsWithAnswers={questionsWithAnswers}/>
    </div>
  );
}
