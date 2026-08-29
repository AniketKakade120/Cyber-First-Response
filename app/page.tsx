import { ReportingGuidanceSection } from '../components/reporting-guidance-section';
import { UsefulActionsSection } from '../components/useful-actions-section';
import { HomeRouter } from '../components/home-router';
import { ServiceLayout } from '../components/service-layout';
import { TrustAccordion } from '../components/trust-accordion';
import { SavedDraftBanner } from '../components/saved-draft-banner';

export default function Home() {
  return (
    <ServiceLayout>
      {/* Priority Actions Banner */}
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
                style={{ background: '#FFFFFF', borderColor: '#FFFFFF', color: 'var(--cfr-navy)', fontWeight: 700 }}
              >
                Start a report
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

      {/* Situation-based Triage Section */}
      <section id="triage" className="ux4g-container page-section triage-section" aria-labelledby="triage-title" style={{ marginBlockStart: '1.5rem' }}>
        <div className="section-heading editorial-heading" style={{ marginBlockEnd: '2rem' }}>
          <h2 id="triage-title" className="triage-heading-title">
            Let us know what happened.<br />
            <span>We'll help you take the right step.</span>
          </h2>
          <p className="triage-heading-sub" style={{ marginBlockStart: '0.65rem', fontSize: '1.05rem', color: '#64748B' }}>
            Choose the situation that feels closest. You can review and change the reporting route later.
          </p>
        </div>

        {/* 3 Top Visually Prioritised Situation Cards */}
        <div className="featured-triage-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
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
                  <span>Time matters — act quickly</span>
                </div>
                <span className="ux4g-icon-outlined tag-orange" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </a>

          {/* Card 2: Threat / Harassment */}
          <a href="/report/sensitive-harm" className="featured-card featured-card-blue">
            <div className="featured-card-top">
              <div className="featured-card-icon-wrap icon-wrap-blue">
                <span className="ux4g-icon-outlined" aria-hidden="true">security</span>
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

          {/* Card 3: Child Safety */}
          <a href="/report/sensitive-harm" className="featured-card featured-card-red">
            <div className="featured-card-top">
              <div className="featured-card-icon-wrap icon-wrap-red">
                <span className="ux4g-icon-outlined" aria-hidden="true">child_care</span>
              </div>
              <div className="featured-card-body">
                <h3>A child may be at risk</h3>
                <p>Immediate safety and evidence guidance for an incident involving a child.</p>
              </div>
            </div>
            <div>
              <div className="featured-card-divider" />
              <div className="featured-card-bottom">
                <div className="featured-card-tag tag-red">
                  <span className="ux4g-icon-outlined" aria-hidden="true">shield</span>
                  <span>See child-safety steps</span>
                </div>
                <span className="ux4g-icon-outlined tag-red" aria-hidden="true">arrow_forward</span>
              </div>
            </div>
          </a>
        </div>

        {/* Other Situations Sub-heading */}
        <h3 className="other-situations-title" style={{ marginBlockStart: '2.5rem', marginBlockEnd: '1rem', fontSize: '1.2rem', fontWeight: 700, color: 'var(--cfr-navy)' }}>
          More situations
        </h3>

        {/* 3-Column Grid for Other Situations */}
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

          <a href="/report" className="situation-card">
            <div className="situation-card-icon">
              <span className="ux4g-icon-outlined" aria-hidden="true">group</span>
            </div>
            <div className="situation-card-content">
              <strong>I am reporting for someone else</strong>
              <span>Assist a family member, friend or elderly relative to prepare details.</span>
            </div>
            <span className="ux4g-icon-outlined situation-card-arrow" aria-hidden="true">arrow_forward</span>
          </a>
        </div>

        {/* 7. Describe in your own words */}
        <div id="describe" style={{ marginBlockStart: '1.25rem' }}>
          <HomeRouter />
        </div>
      </section>

      {/* 8. Immediate tools for people not ready to report */}
      <UsefulActionsSection />

      {/* 9. What happens before and after reporting */}
      <ReportingGuidanceSection />

      {/* 10. Priority FAQs */}
      <section className="ux4g-container page-section" style={{ marginBlock: '4rem 3.5rem' }}>
        <TrustAccordion />
      </section>

      {/* Scam Warning Callout Section */}
      <section className="ux4g-container page-section" style={{ marginBlockStart: '2.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #17345B 0%, #245EAB 100%)',
            borderRadius: '16px',
            padding: '2.5rem 2.25rem',
            color: '#FFFFFF',
            boxShadow: '0 10px 25px -5px rgba(23, 52, 91, 0.25)',
          }}
        >
          <div style={{ maxInlineSize: '48rem' }}>
            <h2 id="scam-awareness-title" style={{ fontSize: '1.75rem', fontWeight: 800, marginBlockEnd: '0.85rem', lineHeight: 1.25, color: '#FFFFFF' }}>
              Stay safe. Spot pressure before you act.
            </h2>
            <p style={{ fontSize: '1rem', color: '#BFDBFE', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              Scammers often create urgency, promise guaranteed returns, impersonate authorities or ask for secrecy, remote access, advance fees or OTPs.
            </p>
            <div>
              <a
                href="/learn"
                className="ux4g-btn ux4g-btn-primary"
                style={{ background: '#E87A3A', borderColor: '#E87A3A', padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: 700, borderRadius: '8px', textDecoration: 'none', display: 'inline-block' }}
              >
                Explore scam warning signs
              </a>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
