import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';
import { scamCards } from '../../lib/demo-data';

export default function LearnPage() {
  return (
    <ServiceLayout>
      <div className="ux4g-container page-section">
        <PageIntro
          eyebrow="Learn and stay safe"
          title="Recognise common cybercrime patterns"
          description="Learn the warning signs, pause before acting and verify urgent requests through a separate trusted channel."
        />

        <div className="help-grid-container" style={{ marginBlockEnd: '2.5rem' }}>
          {scamCards.map(([title, text]) => (
            <div className="help-card" key={title}>
              <div className="help-card-body" style={{ marginBlockStart: 0 }}>
                <h3 className="help-card-title">{title}</h3>
                <p className="help-card-desc">{text}</p>
              </div>

              <div className="help-card-footer">
                <a href="/check" className="help-action-btn btn-brand-outline">
                  Check something suspicious →
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="guidance-card-modern">
          <div className="guidance-header-row" style={{ marginBlockEnd: '1rem' }}>
            <div className="guidance-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h2 className="guidance-title">Universal safety steps</h2>
              <p className="guidance-sub">Essential precautions to protect yourself and your family online.</p>
            </div>
          </div>

          <ul style={{ display: 'grid', gap: '0.75rem', paddingLeft: '1.25rem', color: '#334155', fontSize: '0.95rem', lineHeight: '1.5' }}>
            <li><strong>Never share credentials:</strong> Do not give out an OTP, PIN, password or card CVV.</li>
            <li><strong>Refuse remote access:</strong> Do not install AnyDesk, TeamViewer or remote control apps at a caller's request.</li>
            <li><strong>Verify independently:</strong> Verify urgent requests using a separate, official phone number or in-person visit.</li>
            <li><strong>Act immediately:</strong> Call <strong>1930</strong> quickly after financial fraud to request transaction freezes.</li>
          </ul>
        </section>
      </div>
    </ServiceLayout>
  );
}
