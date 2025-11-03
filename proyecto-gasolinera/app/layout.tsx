import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

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
    <html lang="es">
      <body className="h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}