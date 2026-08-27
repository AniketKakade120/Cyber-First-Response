import { HomeRouter } from '../components/home-router';
import { ServiceLayout } from '../components/service-layout';
import { TrustAccordion } from '../components/trust-accordion';
import { scamCards } from '../lib/demo-data';

const incidentChoices = [
  ['currency_rupee', 'I lost money', 'Fraudulent transfers, payments, withdrawals or investments.', '/report/financial-fraud'],
  ['shield_person', 'I am being threatened or harassed', 'Stalking, blackmail, sextortion, bullying or unwanted contact.', '/report/sensitive-harm'],
  ['person_alert', 'Someone is pretending to be me', 'Fake profiles, impersonation and identity misuse.', '/report/identity'],
  ['manage_accounts', 'My account was compromised', 'Hacked email, social media, banking or other online accounts.', '/report/identity'],
  ['travel_explore', 'Something seems suspicious', 'Check a call, message, UPI ID, account, website or app.', '/check'],
  ['child_care', 'A child may be at risk', 'Find immediate safety guidance and preserve evidence safely.', '/report/sensitive-harm'],
  ['devices', 'My device or data was attacked', 'Malware, ransomware, data theft or unauthorised access.', '/report'],
  ['psychology_alt', 'I am not sure what happened', 'Describe the incident in plain language and get a suggested route.', '#describe'],
] as const;

const urgentActions = [
  ['emergency', 'Someone is in immediate danger', 'Move to a safe place if possible and contact emergency services.', 'tel:112', 'Call 112', 'error'],
  ['currency_rupee', 'Money just left an account', 'Call the financial cybercrime helpline and notify the bank immediately.', 'tel:1930', 'Call 1930', 'warning'],
  ['lock_reset', 'An account is compromised', 'Change the password on a trusted device and secure linked accounts.', '/report/identity', 'Secure my account', 'info'],
] as const;

const processSteps = [
  ['edit_note', 'Tell us what happened', 'Use plain language. You do not need to know a legal category.'],
  ['task_alt', 'Review your report', 'Check the organised information and correct anything that is inaccurate.'],
  ['track_changes', 'Track progress', 'Use your acknowledgement number to see status and next actions.'],
] as const;

export default function Home() {
  return <ServiceLayout>
    <section className="service-hero" aria-labelledby="hero-title">
      <div className="ux4g-container hero-layout">
        <div className="hero-content">
          <span className="eyebrow ux4g-label-l-strong">Cybercrime help, reporting and recovery</span>
          <h1 id="hero-title" className="ux4g-heading-xl-strong">Get the right help for a cyber incident</h1>
          <p className="ux4g-body-l-default">Tell us what happened in your own words. We’ll guide you through immediate safety steps, evidence and reporting.</p>
          <div className="hero-actions"><a className="ux4g-btn ux4g-btn-primary ux4g-btn-lg" href="#triage">Choose what happened</a><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-lg" href="/track">Track a complaint</a></div>
        </div>
        <div className="hero-support-card ux4g-card ux4g-card-solid ux4g-card-vertical">
          <div className="ux4g-card-body"><div><span className="card-icon ux4g-icon-outlined ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true">support_agent</span><h2 className="ux4g-card-title">Not sure where to begin?</h2><p>Start with the situation that feels closest. You can review and change the reporting route later.</p><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="#describe">Describe it in your own words</a></div></div>
        </div>
      </div>
    </section>

    <section className="ux4g-container urgent-section page-section" aria-labelledby="urgent-title">
      <div className="section-heading"><span className="eyebrow ux4g-label-l-strong">Act now</span><h2 id="urgent-title">Do any of these need immediate action?</h2></div>
      <div className="urgent-grid">{urgentActions.map(([icon, title, description, href, action, tone]) => <article className={`urgent-card urgent-card-${tone}`} key={title}><span className="ux4g-icon-outlined" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{description}</p></div><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href={href}>{action}</a></article>)}</div>
    </section>

    <section id="triage" className="ux4g-container page-section" aria-labelledby="triage-title">
      <div className="section-heading"><span className="eyebrow ux4g-label-l-strong">Report a cyber incident</span><h2 id="triage-title" className="ux4g-heading-xl-strong">What happened?</h2><p className="ux4g-body-l-default">Choose the closest situation. You do not need to identify the official cybercrime category.</p></div>
      <div className="ux4g-grid ux4g-grid-auto-fit-300 incident-grid">{incidentChoices.map(([icon, title, description, href]) => <article className="ux4g-card ux4g-card-outline ux4g-card-vertical triage-card" key={title}><div className="ux4g-card-body triage-card-body"><div className="card-icon ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true"><span className="ux4g-icon-outlined">{icon}</span></div><div className="triage-card-content"><h3 className="ux4g-card-title">{title}</h3><p>{description}</p></div></div><div className="ux4g-card-footer"><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md ux4g-w-100" href={href}>Choose this situation</a></div></article>)}</div>
      <div id="describe"><HomeRouter /></div>
    </section>

    <section className="ux4g-container page-section service-grid" aria-label="Complaint and prevention services">
      <article className="service-preview"><div><span className="eyebrow ux4g-label-l-strong">Already reported?</span><h2>Track your complaint</h2><p>View the current status, requested actions and recovery information.</p></div><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/track">Track complaint</a></article>
      <article className="service-preview"><div><span className="eyebrow ux4g-label-l-strong">Check before you trust</span><h2>Check a suspicious identifier</h2><p>Look for reported phone numbers, UPI IDs, accounts, websites or social profiles.</p></div><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/check">Open checker</a></article>
      <article className="service-preview"><div><span className="eyebrow ux4g-label-l-strong">Protect your identity</span><h2>Understand anonymous reporting</h2><p>Learn when anonymous reporting may be available and what it means for follow-up.</p></div><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/report/anonymous">Read the guidance</a></article>
    </section>

    <section className="ux4g-container page-section" aria-labelledby="process-title"><div className="section-heading"><span className="eyebrow ux4g-label-l-strong">How it works</span><h2 id="process-title">A clear reporting journey</h2></div><div className="ux4g-grid ux4g-grid-auto-fit-300 incident-grid">{processSteps.map(([icon, title, description], index) => <article className="ux4g-card ux4g-card-outline ux4g-card-vertical" key={title}><div className="ux4g-card-body"><div><span className="card-icon ux4g-icon-outlined ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true">{icon}</span><span className="eyebrow ux4g-label-m-strong">Step {index + 1}</span><h3 className="ux4g-card-title">{title}</h3><p>{description}</p></div></div></article>)}</div></section>

    <section className="ux4g-container page-section" aria-labelledby="ready-title"><div className="ready-panel"><div><span className="eyebrow ux4g-label-l-strong">Before you start</span><h2 id="ready-title">Keep useful evidence ready</h2><ul><li>Approximate dates, times and amounts</li><li>Transaction or reference identifiers</li><li>Phone numbers, usernames, URLs or account handles</li><li>Original screenshots, messages or documents</li></ul></div><a className="ux4g-btn ux4g-btn-primary ux4g-btn-lg" href="/report">Start a report</a></div></section>

    <section className="trust-section page-section" aria-labelledby="trust-title"><div className="ux4g-container"><div className="section-heading"><span className="eyebrow ux4g-label-l-strong">Your questions answered</span><h2 id="trust-title">Reporting with clarity and confidence</h2></div><TrustAccordion /></div></section>

    <section className="ux4g-container page-section" aria-labelledby="scams-title"><div className="section-heading"><span className="eyebrow ux4g-label-l-strong">Learn and stay safe</span><h2 id="scams-title">Recognise common cybercrime patterns</h2></div><div className="ux4g-grid ux4g-grid-auto-fit-300 incident-grid">{scamCards.map(([title, description]) => <article className="ux4g-card ux4g-card-outline ux4g-card-vertical" key={title}><div className="ux4g-card-body"><div><span className="ux4g-tag-tonal-warning ux4g-tag-s">Safety alert</span><h3 className="ux4g-card-title">{title}</h3><p>{description}</p></div></div></article>)}</div><div className="section-action"><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/learn">See all safety guidance</a></div></section>

    <section className="ux4g-container page-section"><div className="ux4g-alert ux4g-alert-info ux4g-alert-wide"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">support_agent</span><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">Need help another way?</h2><p className="ux4g-alert-message">Find emergency contacts, financial-fraud support, account-security steps and accessibility assistance.</p><div className="ux4g-alert-actions"><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/help">See help options</a></div></div></div></section>
  </ServiceLayout>;
}
