import { Checker } from '../../components/checker';
import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

export default function CheckPage() {
  return <ServiceLayout><div className="ux4g-container page-section narrow-page"><PageIntro eyebrow="Check before you trust" title="Check a suspicious identifier" description="Search for reports linked to a phone number, email, UPI ID, bank account, website or social profile." /><Checker /><p className="safety-note"><strong>Never share your OTP, PIN or password.</strong> Stop contact and notify your bank if money or account access was lost.</p></div></ServiceLayout>;
}
