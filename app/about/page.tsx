import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

const sections = [
  {
    title: 'What the service helps you do',
    items: [
      'Choose the right reporting path without knowing complex legal jargon',
      'Take urgent safety and account-protection steps to prevent further loss',
      'Organise incident, transaction, bank and suspect details deterministically',
      'Attach evidence and review information before official submission',
      'Track complaint progress independently from money-recovery status',
    ],
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    title: 'How we support safer reporting',
    items: [
      'Plain-language questions designed for high-stress situations',
      'Editable AI assistance instead of automatic or black-box decisions',
      'Visible 3-state progress steppers and automatically saved local drafts',
      'Clear explanations of responsibilities, bank recall windows, and next actions',
    ],
    iconSvg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <ServiceLayout>
      <div className="ux4g-container page-section narrow-page">
        <PageIntro
          eyebrow="About the service"
          title="Clear support through a difficult cyber incident"
          description="Cyber First Response helps people act quickly, organise evidence, report an incident and understand what happens next."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sections.map((sec) => (
            <section className="guidance-card-modern" key={sec.title}>
              <div className="guidance-header-row" style={{ marginBlockEnd: '1rem' }}>
                <div className="guidance-icon-badge">{sec.iconSvg}</div>
                <h2 className="guidance-title">{sec.title}</h2>
              </div>
              <ul style={{ display: 'grid', gap: '0.65rem', paddingLeft: '1.25rem', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {sec.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}

          <section id="privacy" className="guidance-card-modern">
            <div className="guidance-header-row" style={{ marginBlockEnd: '0.75rem' }}>
              <div className="guidance-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <h2 className="guidance-title">Privacy & Local Storage</h2>
                <p className="guidance-sub">
                  Your draft is saved locally on this browser so you can continue seamlessly. On a shared or public computer, clear the draft when finished. Never upload passwords, PINs, CVVs or OTPs.
                </p>
              </div>
            </div>
          </section>

          <section id="accessibility" className="guidance-card-modern">
            <div className="guidance-header-row" style={{ marginBlockEnd: '0.75rem' }}>
              <div className="guidance-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                  <path d="M12 12v6"/>
                  <path d="M9 15h6"/>
                </svg>
              </div>
              <div>
                <h2 className="guidance-title">Accessibility Statement</h2>
                <p className="guidance-sub">
                  This portal supports keyboard navigation, visible focus indicators, screen-reader alert regions, WCAG AA color contrast ratios, responsive reflow, and text resizing.
                </p>
              </div>
            </div>
          </section>

          <section className="guidance-card-modern">
            <div className="guidance-header-row" style={{ marginBlockEnd: '0.75rem' }}>
              <div className="guidance-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </div>
              <div>
                <h2 className="guidance-title">Legal Disclaimer</h2>
                <p className="guidance-sub">
                  Guidance explains the reporting process and immediate safety actions. It is not formal legal advice and does not guarantee an investigation outcome or financial recovery.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ServiceLayout>
  );
}
