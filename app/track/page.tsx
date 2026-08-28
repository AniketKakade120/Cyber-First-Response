import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';
import { TrackTool } from '../../components/track-tool';

export default function TrackPage() {
  return <ServiceLayout><div className="ux4g-container page-section narrow-page"><PageIntro eyebrow="Saved reports" title="Return to a report on this device" description="Reopen an incident report you prepared in this browser. Official complaint tracking remains with the organisation where you submitted it." /><TrackTool /><section className="guidance-card"><h2>Tracking an official submission</h2><p>Use the acknowledgement number and tracking service provided by the police, government portal, bank or other organisation that received your report.</p></section></div></ServiceLayout>;
}
