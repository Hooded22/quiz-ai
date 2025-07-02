import { AuthProvider } from '../contexts/AuthContext';
import { poppins } from 'styles/fonts/fonts';
import 'styles/globals.css';

export const metadata = {
  title: 'Quiz AI',
  description: 'AI-powered technical interview practice',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-theme='forest' className={`${poppins.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
