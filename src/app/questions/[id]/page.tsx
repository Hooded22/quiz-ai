import { promises as fs } from "fs";
import path from "path";

interface QuestionCategoryProps {
  id: string;
  name: string;
  params: {
    id: string;
  };
}

async function getQuestionsFromJSONFile(): Promise<string[]> {
  const jsonDirectory = path.join(process.cwd(), "src/app/json");
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/javascript-interview.json`,
      "utf8"
    );
    const questions = JSON.parse(fileContents).questions
    return questions || [];
  } catch (error) {
    return [];
  }
}

function getRandomQuestion(questions: string[]) {
    const min = 0
    const max = Math.floor(questions.length - 1);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return questions[randomNumber];
  }

export default async function QuestionCategory(props: QuestionCategoryProps) {
  const { id } = props.params;
  const questions = await getQuestionsFromJSONFile();
  const randomQuestion = getRandomQuestion(questions);


  //TODO: Component to draw question and add answer
  //TODO: Connect with GPT
  return (
    <div>
      <h1>{randomQuestion}</h1>
    </div>
  );
}
