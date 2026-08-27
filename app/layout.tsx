import type { Metadata } from 'next';
import 'ux4g-web-components/styles.css';
import 'ux4g-web-components/design-system';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cyber First Response',
  description: 'Citizen-first guidance for cybercrime safety, reporting, complaint tracking and recovery in India.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
