import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import '@/frontend/styles/animations.css';
import '@/frontend/styles/responsive.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: 'VerdictAI - AI Legal Analysis Platform',
  description: 'Know where your case stands before court begins. Semantic precedent retrieval, explainable legal scoring, and AI courtroom simulation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-offwhite">
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
