import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'src/app/json');
  const fileContents = await fs.readFile(`${jsonDirectory}/javascript-interview.json`, 'utf8');
  console.log("FILE: ", fileContents);
  return new Response(fileContents)
}
