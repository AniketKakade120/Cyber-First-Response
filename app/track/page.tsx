import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';
import { TrackTool } from '../../components/track-tool';

export default function TrackPage() {
  return <ServiceLayout><div className="ux4g-container page-section narrow-page"><PageIntro eyebrow="Track my complaint" title="Enter your acknowledgement number" description="View the current status, responsible organisation, requested actions and recovery information." /><TrackTool /><section className="guidance-card"><h2>What status terms mean</h2><p>A complaint, FIR and financial-recovery action are different processes. The dashboard shows who is responsible, when the status changed and what you need to do next.</p></section></div></ServiceLayout>;
}
