import { PageIntro } from '../../../components/page-intro';
import { ReportFlow } from '../../../components/report-flow';
import { ServiceLayout } from '../../../components/service-layout';

export default function FinancialFraudPage() {
  return <ServiceLayout><div className="ux4g-container page-section"><PageIntro eyebrow="Urgent financial fraud" title="Report financial cybercrime" description="Act first, describe what happened, review the organised details and submit your report." /><div className="ux4g-alert ux4g-alert-warning ux4g-context-alert flow-warning" role="alert"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">call</span><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">Call 1930 now if money just left your account</h2><p className="ux4g-alert-message">Notify your bank or payment provider immediately. Do not wait to complete the report.</p></div></div><ReportFlow /></div></ServiceLayout>;
}
