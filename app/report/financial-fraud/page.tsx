import { ReportFlow } from '../../../components/report-flow';
import { ServiceLayout } from '../../../components/service-layout';

export default function FinancialFraudPage() {
  return <ServiceLayout><div className="ux4g-container page-section report-page"><header className="report-page-heading"><div><h1 className="ux4g-heading-xl-strong">Report financial cybercrime</h1><p className="ux4g-body-m-default">Act first, describe what happened, review the organised details and prepare your report.</p></div></header><ReportFlow /></div></ServiceLayout>;
}
