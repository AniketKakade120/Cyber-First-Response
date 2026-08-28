import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';
import { TrackTool } from '../../components/track-tool';

export default function TrackPage() {
  return (
    <ServiceLayout>
      <div className="ux4g-container page-section narrow-page">
        <PageIntro
          eyebrow="Saved reports"
          title="Return to a report on this device"
          description="Reopen an incident report you prepared in this browser. Official complaint tracking remains with the organisation where you submitted it."
        />

        <TrackTool />

        <section className="guidance-card-modern" style={{ marginBlockStart: '2rem' }}>
          <div className="guidance-header-row">
            <div className="guidance-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div>
              <h2 className="guidance-title">Tracking an official submission</h2>
              <p className="guidance-sub">
                Use the official acknowledgement number and tracking service provided by the police, national portal (cybercrime.gov.in), bank or payment app that received your complaint.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
}
