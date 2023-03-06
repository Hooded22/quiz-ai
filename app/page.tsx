import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
      <main className={styles.main}>
        <div>
          <h1 className="text-3xl font-bold underline">Hej</h1>
          <Link href={"questions/javascript-interview"} className="text-white">
            Click here
          </Link>
        </div>
      </main>
  );
}
