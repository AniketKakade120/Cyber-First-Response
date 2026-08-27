import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

const routes = [
  ['currency_rupee', 'Financial fraud', 'Money transfers, payments, investments, cards or banking fraud.', '/report/financial-fraud'],
  ['shield_person', 'Threats or harassment', 'Blackmail, stalking, sextortion, bullying or unwanted contact.', '/report/sensitive-harm'],
  ['child_care', 'Child safety', 'Immediate safety and evidence-preservation guidance involving a child.', '/report/sensitive-harm'],
  ['manage_accounts', 'Account compromise', 'Secure a hacked email, social media, banking or other account.', '/report/identity'],
  ['person_alert', 'Identity misuse', 'Impersonation, fake profiles or misuse of personal information.', '/report/identity'],
  ['devices', 'Device or data attack', 'Malware, ransomware, unauthorised access or data theft.', '/report/identity'],
  ['travel_explore', 'Suspicious contact or website', 'Check an identifier or report an attempted scam.', '/check'],
  ['visibility_off', 'Anonymous reporting', 'Understand available options and limitations.', '/report/anonymous'],
] as const;

export default function ReportPage() {
  return <ServiceLayout><div className="ux4g-container page-section"><PageIntro eyebrow="Report an incident" title="What happened?" description="Choose the situation that is closest. You do not need to know a legal category." /><div className="ux4g-grid ux4g-grid-auto-fit-300 incident-grid">{routes.map(([icon, title, description, href]) => <article className="ux4g-card ux4g-card-outline ux4g-card-vertical" key={`${title}-${href}`}><div className="ux4g-card-body"><div><span className="ux4g-icon-outlined card-icon ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true">{icon}</span><h2 className="ux4g-card-title">{title}</h2><p>{description}</p></div></div><div className="ux4g-card-footer"><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md ux4g-w-100" href={href}>Continue</a></div></article>)}</div></div></ServiceLayout>;
}
