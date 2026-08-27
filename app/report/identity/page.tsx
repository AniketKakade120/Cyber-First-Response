import { PageIntro } from '../../../components/page-intro';
import { ServiceLayout } from '../../../components/service-layout';

export default function IdentityPage() {
  const steps = ['Change the password using a trusted device.', 'Sign out other sessions.', 'Secure the linked email address and mobile number.', 'Enable multi-factor authentication.', 'Preserve login alerts, account links and screenshots.', 'Contact the platform through its official support route.'];
  return <ServiceLayout><div className="ux4g-container page-section narrow-page"><PageIntro eyebrow="Account and identity" title="Secure the account before reporting" description="Securing access and filing a report are separate actions. Complete the urgent security steps first." /><ol className="numbered-guidance">{steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol><div className="ux4g-alert ux4g-alert-info ux4g-context-alert"><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">Preserve evidence before making major changes</h2><p className="ux4g-alert-message">Keep login alerts, recovery messages, account links and screenshots where it is safe to do so.</p><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/report">Report identity misuse</a></div></div></div></ServiceLayout>;
}
