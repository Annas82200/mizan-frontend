import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
// import Navigation from '../components/navigation'; // Temporarily disabled

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mizan Platform - AI-Powered Organizational Intelligence',
  description: 'Three-Engine AI architecture for culture, structure, skills, and performance analysis',
  keywords: ['organizational culture', 'AI analysis', 'employee engagement', 'skills assessment'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            {/* <Navigation /> Temporarily disabled */}
            <main>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}