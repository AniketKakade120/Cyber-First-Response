/* eslint-disable @next/next/no-html-link-for-pages */

import { CfrLogo } from './cfr-logo';

const groups = [
  ['Report', [['Start a report', '/report'], ['Track my complaint', '/track'], ['Continue saved draft', '/complaint/local'], ['Official cybercrime.gov.in portal ↗', 'https://cybercrime.gov.in']]],
  ['Get help', [['Call 1930 Helpline', 'tel:1930'], ['Emergency 112', 'tel:112'], ['Safety guidance', '/learn'], ['Check suspicious item', '/check']]],
  ['Information', [['Privacy policy', '/about#privacy'], ['Accessibility statement', '/about#accessibility'], ['Terms of use', '/about'], ['How this prototype works', '/about-prototype']]],
  ['About', [['About the concept', '/about'], ['Prototype limitations', '/about-prototype']]],
] as const;

export function ServiceFooter() {
  return (
    <footer className="service-footer">
      <div className="ux4g-container footer-grid">
        <section className="footer-brand">
          <a className="site-brand" href="/" aria-label="Cyber First Response – home">
            <CfrLogo inverted />
          </a>
          <p style={{ marginBlockStart: '0.75rem', fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.85 }}>
            <strong>Cyber First Response is an independent design prototype.</strong><br />
            It is not operated by the Government of India, NCRP, police or a bank, and it does not submit real complaints.
          </p>
        </section>
        {groups.map(([title, links]) => (
          <section key={title}>
            <h2 className="ux4g-title-s-strong">{title}</h2>
            <ul>{links.map(([label, href]) => <li key={href}><a className="ux4g-text-link-sm" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{label}</a></li>)}</ul>
          </section>
        ))}
      </div>
      <div className="ux4g-container footer-note">
        <span>© 2026 Cyber First Response &bull; Independent Concept Prototype</span>
        <nav aria-label="Legal links"><a href="/about#privacy">Privacy policy</a><a href="/about#accessibility">Accessibility</a><a href="/about">Terms of use</a></nav>
      </div>
    </footer>
  );
}
