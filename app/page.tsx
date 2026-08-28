import { ReportingGuidanceSection } from '../components/reporting-guidance-section';
import { UsefulActionsSection } from '../components/useful-actions-section';
import { HomeRouter } from '../components/home-router';
import { ServiceLayout } from '../components/service-layout';
import { TrustAccordion } from '../components/trust-accordion';
import { scamCards } from '../lib/demo-data';

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
  return (
    <ServiceLayout>
      <section className="priority-section" aria-label="Urgent actions">
        <div className="ux4g-container">
          <div className="priority-alert ux4g-alert ux4g-alert-error ux4g-alert-wide" role="note">
            <span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">warning</span>
            <div className="ux4g-alert-content priority-alert-content">
              <div>
                <h2 className="ux4g-alert-title">Did money just leave your account?</h2>
                <p className="ux4g-alert-message">Call 1930 immediately if money has been transferred.</p>
              </div>
              <div className="ux4g-alert-actions priority-actions">
                <a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="tel:112">
                  <span className="ux4g-icon-outlined" aria-hidden="true">call</span> Emergency 112
                </a>
                <a
                  className="ux4g-btn ux4g-btn-primary ux4g-btn-md"
                  href="tel:1930"
                  style={{ background: 'var(--cfr-orange)', borderColor: 'var(--cfr-orange)' }}
                >
                  Call 1930 now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="service-hero" aria-labelledby="hero-title">
        <div className="ux4g-container hero-layout">
          <div className="hero-content">
            <h1 id="hero-title" className="ux4g-heading-xl-strong">
              Tell us what happened.<br /><span>We'll guide you.</span>
            </h1>
            <p className="ux4g-body-l-default">Report cybercrime, get guidance, and track progress. All in one place.</p>
            <div className="hero-actions">
              <a
                className="ux4g-btn ux4g-btn-primary ux4g-btn-lg"
                href="/report"
                style={{ background: 'var(--cfr-orange)', borderColor: 'var(--cfr-orange)' }}
              >
                Start a report →
              </a>
              <a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-lg" href="/track">
                Track existing report
              </a>
            </div>
          </div>
          <div className="hero-illustration-container" aria-hidden="true">
            <img
              src="/illustration-for-hero.png"
              alt="Cyber guidance illustration"
              className="hero-illustration-img"
            />
          </div>
        </div>
      </section>

      {/* Start with the situation, not the category (Triage Section matching Reference Image) */}
      <section id="triage" className="ux4g-container page-section triage-section" aria-labelledby="triage-title">
        <div className="section-heading editorial-heading">
          <h2 id="triage-title" className="triage-heading-title">
            Let us know what happened.<br /><span>We'll help you take the right step.</span>
          </h2>
          <p className="triage-heading-sub">Pick what's closest, you can change it as you go.</p>
        </div>

        {/* 2 Featured Priority Cards */}
        <div className="featured-triage-grid">
          {/* Card 1: Money Loss */}
          <a href="/report/financial-fraud" className="featured-card featured-card-orange">
            <div className="featured-card-top">
              <div className="featured-card-icon-wrap icon-wrap-orange">₹</div>
              <div className="featured-card-body">
                <h3>I lost money</h3>
                <p>Transfers, payments, withdrawals, cards, wallets or investments.</p>
              </div>
            </div>
            <div>
              <div className="featured-card-divider" />
              <div className="featured-card-bottom">
                <div className="featured-card-tag tag-orange">
                  <span className="ux4g-icon-outlined" aria-hidden="true">schedule</span>
                  <span>Time matters — report quickly</span>
                </div>
                <span className="ux4g-icon-outlined tag-orange" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </a>

          {/* Card 2: Threat / Harassment */}
          <a href="/report/sensitive-harm" className="featured-card featured-card-blue">
            <div className="featured-card-top">
              <div className="featured-card-icon-wrap icon-wrap-blue">
                <span className="ux4g-icon-outlined" aria-hidden="true">shield_person</span>
              </div>
              <div className="featured-card-body">
                <h3>I am being threatened or harassed</h3>
                <p>Stalking, blackmail, sextortion, bullying or unwanted contact.</p>
              </div>
            </div>
            <div>
              <div className="featured-card-divider" />
              <div className="featured-card-bottom">
                <div className="featured-card-tag tag-blue">
                  <span className="ux4g-icon-outlined" aria-hidden="true">shield</span>
                  <span>Get safety guidance</span>
                </div>
                <span className="ux4g-icon-outlined tag-blue" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </a>
        </div>

        {/* Other Situations Sub-heading */}
        <h3 className="other-situations-title">Other situations</h3>

        {/* 3-Column x 2-Row Grid for Other Situations */}
        <div className="other-situations-grid">
          <a href="/report/identity" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">person</span>
            </div>
            <div className="situation-card-content">
              <strong>Someone is pretending to be me</strong>
              <span>Fake profiles, impersonation and misuse of personal information.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>

          <a href="/report/identity" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">lock</span>
            </div>
            <div className="situation-card-content">
              <strong>My account was compromised</strong>
              <span>Hacked email, social media, banking or another online account.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>

          <a href="/report/sensitive-harm" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">person</span>
            </div>
            <div className="situation-card-content">
              <strong>A child may be at risk</strong>
              <span>Immediate safety and evidence guidance for an incident involving a child.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>

          <a href="/report" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">laptop</span>
            </div>
            <div className="situation-card-content">
              <strong>My device or data was attacked</strong>
              <span>Malware, ransomware, data theft or unauthorised access.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>

          <a href="/check" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">search</span>
            </div>
            <div className="situation-card-content">
              <strong>Something seems suspicious</strong>
              <span>Check a call, message, UPI ID, account, website, profile or app.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>

          <a href="#describe" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">help</span>
            </div>
            <div className="situation-card-content">
              <strong>I am not sure what happened</strong>
              <span>Describe the incident in plain language and review a suggested route.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>
        </div>

        {/* Describe in your own words */}
        <div id="describe">
          <HomeRouter />
        </div>
      </section>

      {/* Useful Actions Section (Redesigned matching reference images) */}
      <UsefulActionsSection />

      {/* Reporting Guidance (Redesigned matching reference image) */}
      <ReportingGuidanceSection />

      {/* Trust Band */}
      <section className="ux4g-container trust-band" aria-labelledby="trust-title">
        <div className="trust-band-intro">
          <span className="trust-shield ux4g-icon-outlined" aria-hidden="true">shield</span>
          <div>
            <h2 id="trust-title">Trust and transparency</h2>
            <p>Understand how information is handled and what choices you have.</p>
          </div>
        </div>
        <TrustAccordion />
      </section>

      {/* Safety Band */}
      <section className="ux4g-container safety-band" aria-labelledby="scams-title">
        <div className="safety-band-intro">
          <span className="trust-shield ux4g-icon-outlined" aria-hidden="true">policy</span>
          <div>
            <h2 id="scams-title">Stay safe. Spot common patterns early.</h2>
            <p>Recognise suspicious pressure, payment and impersonation tactics.</p>
          </div>
        </div>
        <div className="safety-cards">
          {scamCards.map(([title, description]) => (
            <article key={title}>
              <span className="ux4g-icon-outlined" aria-hidden="true">verified_user</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
          <a className="safety-all-link" href="/learn">
            Explore all safety guidance
            <span className="ux4g-icon-outlined" aria-hidden="true">arrow_forward</span>
          </a>
        </div>
      </section>
    </ServiceLayout>
  );
}
