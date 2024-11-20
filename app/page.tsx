import Link from "next/link";

type QuestionCategory = {
  id: string;
  name: string;
};

const categories: QuestionCategory[] = [
  {
    id: "javascript-interview",
    name: "JavaScript Interview",
  },
  {
    id: "nodejs-interview",
    name: "Node.js Interview",
  },
  {
    id: "java-interview",
    name: "Java Interview",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center p-6 min-h-full pt-[112px]">
      <div className="mt-10">
        <h1 className="text-3xl font-bold">Choose questions category</h1>
        <ol className="list-disc">
          {categories.map((category) => (
            <Link
              href={"questions/javascript-interview"}
              className="text-white"
              key={category.id}
            >
              <li className="py-5 border-b border-white">{category.name}</li>
            </Link>
          ))}
        </ol>
      </div>
    </main>
  );
}
