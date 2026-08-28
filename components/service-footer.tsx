/* eslint-disable @next/next/no-html-link-for-pages */

const groups = [
  ['Report and track', [['Report an incident', '/report'], ['Track my complaint', '/track'], ['Check something suspicious', '/check']]],
  ['Help and safety', [['Get help', '/help'], ['Learn and stay safe', '/learn'], ['Call 1930', 'tel:1930'], ['Emergency 112', 'tel:112']]],
  ['Information and policies', [['About the service', '/about'], ['Privacy', '/about#privacy'], ['Accessibility statement', '/about#accessibility']]],
] as const;

export function ServiceFooter() {
  return (
    <footer className="service-footer">
      <div className="ux4g-container footer-grid">
        <section className="footer-brand"><a className="site-brand ux4g-d-flex ux4g-ai-center ux4g-gap-x-s" href="/"><span className="brand-mark footer-brand-mark ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true"><span className="ux4g-icon-outlined">hub</span></span><span className="brand-wordmark ux4g-d-flex ux4g-flex-column"><span>Cyber</span><span>First Response</span></span></a><p>Act quickly. Report clearly.<br />Know what happens next.</p></section>
        {groups.map(([title, links]) => <section key={title}><h2 className="ux4g-title-s-strong">{title}</h2><ul>{links.map(([label, href]) => <li key={href}><a className="ux4g-text-link-sm" href={href}>{label}</a></li>)}</ul></section>)}
      </div>
      <div className="ux4g-container footer-note"><span>© 2026 Cyber First Response</span><nav aria-label="Legal links"><a href="/about#privacy">Privacy policy</a><a href="/about#accessibility">Accessibility</a><a href="/about">Terms of use</a></nav></div>
    </footer>
  );
}
