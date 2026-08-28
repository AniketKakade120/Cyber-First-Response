import type { Metadata } from 'next';
import 'ux4g-web-components/styles.css';
import 'ux4g-web-components/design-system';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cyber First Response — Act quickly. Report clearly. Know what happens next.',
  description: 'Citizen-first guidance for cybercrime safety, reporting, complaint tracking and recovery in India. Report financial fraud, harassment, identity theft and more.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <template
          id="impeccable-design-contract"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: Cyber help should feel like a modern civic guidance service: calm, spacious and decisive, with hierarchy doing more work than borders or card grids.
OWN-WORLD: Deep navy stages, crisp white space, luminous public-service blue, selective soft panels, editorial type scale, and orange or red reserved for urgency.
STORY: A person sees the urgent action first, understands the promise, selects a plain-language situation, then moves through a clear reporting or recovery route.
FIRST VIEWPORT: A compact utility bar and masthead lead into one urgent rail and a rounded navy hero stage with oversized copy and a polished route interface.
FORM: User-pinned editorial civic service with selective interface islands, derived from the supplied five-reference set; it supersedes but is corroborated by civic-service seed 55b83fb9.
QUALITY BAR: Sleek hierarchy, asymmetric white space, open divided rows, selective navy interface islands, restrained tonal depth, and no decorative labels or repeated faux cards.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
