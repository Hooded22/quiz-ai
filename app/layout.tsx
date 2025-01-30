import { AuthProvider } from "../contexts/AuthContext";
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Quiz AI',
  description: 'AI-powered technical interview practice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' data-theme='forest'>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
