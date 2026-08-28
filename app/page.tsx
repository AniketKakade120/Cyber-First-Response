import { HomeRouter } from '../components/home-router';
import { ServiceLayout } from '../components/service-layout';
import { TrustAccordion } from '../components/trust-accordion';
import { scamCards } from '../lib/demo-data';

const incidentChoices = [
  ['currency_rupee', 'I lost money', 'Transfers, payments, withdrawals, cards, wallets or investments.', '/report/financial-fraud'],
  ['shield_person', 'I am being threatened or harassed', 'Stalking, blackmail, sextortion, bullying or unwanted contact.', '/report/sensitive-harm'],
  ['person_alert', 'Someone is pretending to be me', 'Fake profiles, impersonation and misuse of personal information.', '/report/identity'],
  ['manage_accounts', 'My account was compromised', 'Hacked email, social media, banking or another online account.', '/report/identity'],
  ['child_care', 'A child may be at risk', 'Immediate safety and evidence guidance for an incident involving a child.', '/report/sensitive-harm'],
  ['devices', 'My device or data was attacked', 'Malware, ransomware, data theft or unauthorised access.', '/report'],
  ['travel_explore', 'Something seems suspicious', 'Check a call, message, UPI ID, account, website, profile or app.', '/check'],
  ['psychology_alt', 'I am not sure what happened', 'Describe the incident in plain language and review a suggested route.', '#describe'],
] as const;

const processSteps = [
  ['Tell us what happened', 'Share the details in your own words.'],
  ['Review and correct', 'Check the organised information before it is used.'],
  ['Review next actions', 'See the recommended reporting route and practical next steps.'],
  ['Stay informed', 'Use your acknowledgement number to track progress.'],
] as const;

const evidenceItems = [
  ['calendar_month', 'Approximate date and time'],
  ['receipt_long', 'Transaction or reference details'],
  ['chat', 'Messages, emails or screenshots'],
  ['link', 'Phone numbers, usernames or links'],
] as const;

export default function Home() {
  return <ServiceLayout>
    <section className="priority-section" aria-label="Urgent actions">
      <div className="ux4g-container">
        <div className="priority-alert ux4g-alert ux4g-alert-error ux4g-alert-wide" role="note">
          <span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">emergency</span>
          <div className="ux4g-alert-content priority-alert-content">
            <div><h2 className="ux4g-alert-title">Need urgent help?</h2><p className="ux4g-alert-message">Act now before you continue reporting.</p></div>
            <div className="ux4g-alert-actions priority-actions"><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="tel:112"><span className="ux4g-icon-outlined" aria-hidden="true">call</span> Call 112 for immediate danger</a><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="tel:1930">Call 1930 for money loss</a></div>
          </div>
        </div>
      </div>
    </section>

    <section className="service-hero" aria-labelledby="hero-title">
      <div className="ux4g-container hero-layout">
        <div className="hero-content">
          <h1 id="hero-title" className="ux4g-heading-xl-strong">Tell us what happened.<br /><span>We’ll guide you.</span></h1>
          <p className="ux4g-body-l-default">Start with your situation—not a legal category. We’ll help you take the safest next step and prepare the right details.</p>
          <div className="hero-actions"><a className="ux4g-btn ux4g-btn-primary ux4g-btn-lg" href="#triage">Choose what happened</a><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-lg" href="#describe">Describe it in your own words</a></div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-top"><span>YOUR NEXT SAFE STEP</span><span>GUIDED</span></div>
          <div className="route-motif">
            <span className="route-node route-node-start"><span className="ux4g-icon-outlined">person</span></span>
            <span className="route-line route-line-one" />
            <span className="route-line route-line-two" />
            <span className="route-line route-line-three" />
            <span className="route-node route-node-end"><span className="ux4g-icon-outlined">verified_user</span></span>
          </div>
          <div className="hero-visual-steps"><span><strong>01</strong> Describe</span><span><strong>02</strong> Act</span><span><strong>03</strong> Prepare</span></div>
        </div>
      </div>
    </section>

    <section id="triage" className="ux4g-container page-section triage-section" aria-labelledby="triage-title">
      <div className="section-heading editorial-heading"><h2 id="triage-title" className="ux4g-heading-l-strong">Start with the situation,<br /><span>not the category.</span></h2><p className="ux4g-body-m-default">Choose the closest option. You can review and change the reporting route later.</p></div>
      <div className="incident-grid">{incidentChoices.map(([icon, title, description, href], index) => <a className="incident-choice" href={href} key={title}><span className={`incident-choice-icon ${index === 0 ? 'incident-choice-icon-accent' : ''}`} aria-hidden="true"><span className="ux4g-icon-outlined">{icon}</span></span><strong>{title}</strong><span>{description}</span><span className="incident-choice-arrow ux4g-icon-outlined" aria-hidden="true">arrow_forward</span></a>)}</div>
      <div id="describe"><HomeRouter /></div>
    </section>

    <section className="ux4g-container service-mosaic" aria-label="Complaint and prevention services">
      <div className="section-heading editorial-heading service-mosaic-heading"><h2 className="ux4g-heading-l-strong">One place for the<br /><span>next useful action.</span></h2><p>Track a report, check something suspicious or understand privacy choices without losing your place.</p></div>
      <article className="service-module service-module-track"><div><h2>Return to a saved report</h2><p>Open a report that was prepared and saved on this device. Its local reference is <strong>LOCAL-REPORT</strong>.</p></div><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/complaint/local">Open saved report</a><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" href="/track">How local report tracking works</a></article>
      <article className="service-module"><div><h2>Check before you trust</h2><p>Review suspicious identifiers before you act.</p></div><ul className="service-link-list"><li><a href="/check"><span className="ux4g-icon-outlined" aria-hidden="true">phone_in_talk</span>Phone numbers<span className="ux4g-icon-outlined" aria-hidden="true">chevron_right</span></a></li><li><a href="/check"><span className="ux4g-icon-outlined" aria-hidden="true">account_balance</span>Bank accounts and UPI IDs<span className="ux4g-icon-outlined" aria-hidden="true">chevron_right</span></a></li><li><a href="/check"><span className="ux4g-icon-outlined" aria-hidden="true">language</span>Links and websites<span className="ux4g-icon-outlined" aria-hidden="true">chevron_right</span></a></li></ul></article>
      <article className="service-module service-module-anonymous"><div><h2>You can ask about anonymous reporting</h2><p>Understand what information is needed, what can remain private and how follow-up works.</p></div><ul className="service-check-list"><li><span className="ux4g-icon-outlined" aria-hidden="true">check_circle</span>Share only what is necessary</li><li><span className="ux4g-icon-outlined" aria-hidden="true">check_circle</span>Review privacy guidance first</li><li><span className="ux4g-icon-outlined" aria-hidden="true">check_circle</span>Know when follow-up details are required</li></ul><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/report/anonymous">Read anonymous reporting guidance</a></article>
    </section>

    <section className="ux4g-container public-service-grid page-section" aria-label="Reporting guidance">
      <div className="section-heading editorial-heading guidance-heading"><h2 className="ux4g-heading-l-strong">Know what happens<br /><span>before you begin.</span></h2><p>Simple steps, clear evidence guidance and no hidden process.</p></div>
      <article className="guidance-module"><h2>How reporting works</h2><ol className="process-list">{processSteps.map(([title, description], index) => <li key={title}><span className="process-marker">{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></li>)}</ol><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/learn">Learn about the process</a></article>
      <article className="guidance-module"><h2>What to keep ready</h2><ul className="evidence-ready-list">{evidenceItems.map(([icon, label]) => <li key={label}><span className="ux4g-icon-outlined" aria-hidden="true">{icon}</span>{label}</li>)}</ul><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/learn">See the evidence guide</a></article>
      <article className="guidance-module guidance-module-impact"><h2>Clear details support the next action</h2><p>Organised information helps you review the incident and identify what to do next.</p><ul className="evidence-ready-list"><li><span className="ux4g-icon-outlined" aria-hidden="true">fact_check</span>Review the important details</li><li><span className="ux4g-icon-outlined" aria-hidden="true">hub</span>Connect related indicators</li><li><span className="ux4g-icon-outlined" aria-hidden="true">notifications_active</span>Keep requested actions visible</li></ul><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/track">See how tracking works</a></article>
    </section>

    <section className="ux4g-container trust-band" aria-labelledby="trust-title"><div className="trust-band-intro"><span className="trust-shield ux4g-icon-outlined" aria-hidden="true">shield</span><div><h2 id="trust-title">Trust and transparency</h2><p>Understand how information is handled and what choices you have.</p></div></div><TrustAccordion /></section>

    <section className="ux4g-container safety-band" aria-labelledby="scams-title"><div className="safety-band-intro"><span className="trust-shield ux4g-icon-outlined" aria-hidden="true">policy</span><div><h2 id="scams-title">Stay safe. Spot common patterns early.</h2><p>Recognise suspicious pressure, payment and impersonation tactics.</p></div></div><div className="safety-cards">{scamCards.map(([title, description]) => <article key={title}><span className="ux4g-icon-outlined" aria-hidden="true">verified_user</span><h3>{title}</h3><p>{description}</p></article>)}<a className="safety-all-link" href="/learn">Explore all safety guidance<span className="ux4g-icon-outlined" aria-hidden="true">arrow_forward</span></a></div></section>
  </ServiceLayout>;
}
