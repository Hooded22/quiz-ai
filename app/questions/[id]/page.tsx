import { MakeAnswerForm } from "../../../components/MakeAnswerForm";
import { Question } from "../../../types/question";
import { promises as fs } from "fs";
import path from "path";

interface QuestionCategoryProps {
  params: {
    id: string;
  };
}

async function getDataFromJSONFile(id: string): Promise<Question[]> {
  const jsonDirectory = path.join(process.cwd(), "/data");
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/${id}.json`,
      "utf8"
    );
    const question: Question[] = JSON.parse(fileContents)


    return question;
  } catch (error) {
    return []
  }
}

export default async function QuestionCategory(props: QuestionCategoryProps) {
  const questionsWithAnswers = await getDataFromJSONFile(props.params.id);


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <MakeAnswerForm questionsWithAnswers={questionsWithAnswers} topic={props.params.id}/>
    </div>
  );
}
