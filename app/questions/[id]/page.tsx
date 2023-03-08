import { MakeAnswerForm } from "@/components/MakeAnswerForm";
import { promises as fs } from "fs";
import path from "path";

interface QuestionCategoryProps {
  params: {
    id: string;
  };
}

async function getQuestionsFromJSONFile(id: string): Promise<string[]> {
  const jsonDirectory = path.join(process.cwd(), "/app/json");
  try {
    const fileContents = await fs.readFile(
      `${jsonDirectory}/${id}.json`,
      "utf8"
    );
    const questions = JSON.parse(fileContents).questions
    return questions || [];
  } catch (error) {
    return [];
  }
}



export default async function QuestionCategory(props: QuestionCategoryProps) {
  const questions = await getQuestionsFromJSONFile(props.params.id);


  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <MakeAnswerForm questions={questions}/>
    </div>
  );
}
