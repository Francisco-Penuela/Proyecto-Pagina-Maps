import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Gas Station Finder',
  description: 'Find the nearest and cheapest gas stations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Providers>
          {/* Header fijo arriba */}
          <Header />

          {/* Contenido principal */}
          <main className="pt-20 min-h-screen">{children}</main>

          {/* Footer al final */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
