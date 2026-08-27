import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';
import { scamCards } from '../../lib/demo-data';

export default function LearnPage() {
  return <ServiceLayout><div className="ux4g-container page-section"><PageIntro eyebrow="Learn and stay safe" title="Recognise common cybercrime patterns" description="Learn the warning signs, pause before acting and verify urgent requests through a separate trusted channel." /><div className="ux4g-grid ux4g-grid-auto-fit-300 incident-grid">{scamCards.map(([title, text]) => <article className="ux4g-card ux4g-card-outline ux4g-card-vertical" key={title}><div className="ux4g-card-body"><div><span className="ux4g-tag-tonal-warning ux4g-tag-s">Safety alert</span><h2 className="ux4g-card-title">{title}</h2><p>{text}</p></div></div><div className="ux4g-card-footer"><a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/check">Check something suspicious</a></div></article>)}</div><section className="guidance-card"><h2>Universal safety steps</h2><ul><li>Never share an OTP, PIN, password or CVV.</li><li>Do not install remote-control apps at a caller’s request.</li><li>Verify urgent requests using a separate trusted channel.</li><li>Call 1930 quickly after financial fraud.</li></ul></section></div></ServiceLayout>;
}
