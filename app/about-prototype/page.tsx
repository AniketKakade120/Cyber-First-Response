import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

const sections = [
  ['What the service helps you do', ['Choose the right reporting path without knowing a legal category', 'Take urgent safety and account-protection steps', 'Organise incident, transaction and suspect details', 'Attach evidence and review information before submission', 'Track complaint progress separately from money-recovery status']],
  ['How we support safer reporting', ['Plain-language questions', 'Editable assistance instead of automatic decisions', 'Visible progress and locally saved drafts', 'Clear explanations of status, responsibilities and next actions']],
] as const;

export default function AboutPage() {
  return <ServiceLayout><div className="ux4g-container page-section narrow-page"><PageIntro eyebrow="About the service" title="Clear support through a difficult cyber incident" description="Cyber First Response helps people act quickly, organise evidence, report an incident and understand what happens next." />{sections.map(([title, items]) => <section className="guidance-card" key={title}><h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}<section id="privacy" className="guidance-card"><h2>Privacy</h2><p>Your draft is saved on this device so you can continue later. On a shared device, clear the draft when you finish. Never include passwords, PINs, CVVs or OTPs in a report.</p></section><section id="accessibility" className="guidance-card"><h2>Accessibility statement</h2><p>The service supports keyboard navigation, visible focus, linked error messages, responsive reflow, reduced motion, text-size controls and light or dark themes.</p></section><section className="guidance-card"><h2>Legal information</h2><p>Guidance explains the reporting process and immediate safety actions. It is not legal advice and does not guarantee an investigation outcome or financial recovery.</p></section></div></ServiceLayout>;
}
