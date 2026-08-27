const groups = [
  ['Report and track', [['Report an incident', '/report'], ['Track my complaint', '/track'], ['Check something suspicious', '/check']]],
  ['Help and safety', [['Get help', '/help'], ['Learn and stay safe', '/learn'], ['Call 1930', 'tel:1930'], ['Emergency 112', 'tel:112']]],
  ['Information and policies', [['About the service', '/about-prototype'], ['Privacy', '/about-prototype#privacy'], ['Accessibility statement', '/about-prototype#accessibility']]],
] as const;

export function ServiceFooter() {
  return (
    <footer className="service-footer">
      <div className="ux4g-container footer-grid">
        {groups.map(([title, links]) => <section key={title}><h2 className="ux4g-title-s-strong">{title}</h2><ul>{links.map(([label, href]) => <li key={href}><a className="ux4g-text-link-sm" href={href}>{label}</a></li>)}</ul></section>)}
      </div>
      <div className="ux4g-container footer-note"><strong>Cyber First Response</strong><span> · Clear guidance for reporting, tracking and recovering from cybercrime.</span></div>
    </footer>
  );
}
