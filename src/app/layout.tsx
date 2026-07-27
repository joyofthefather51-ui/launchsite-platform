import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Launchsite Platform',
  description: 'Multi-tenant automated website generation & dashboard platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
