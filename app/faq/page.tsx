import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

const officialFaqs = [
  {
    q: 'What is the purpose of Cyber First Response?',
    a: 'This portal is an initiative of Government of India to facilitate victims/complainants to report cyber crime complaints online. It caters to all types of cyber crime complaints including online financial frauds, social media crimes, ransomware, hacking, cryptocurrency crimes, CSEAM, and mobile crimes.',
  },
  {
    q: 'Which type of cybercrimes can I report on the portal?',
    a: 'You can report complaints under two main categories: (1) Crimes related to Women/Child (including anonymous reporting options for sexually explicit or objectionable content) and (2) Other Cybercrimes including financial fraud, UPI scams, identity theft, hacking, ransomware, and online cyber trafficking.',
  },
  {
    q: 'What kind of information should I provide to report a complaint?',
    a: 'Provide accurate and complete incident details including date and time, payment transaction reference numbers (UTR/Txn ID), suspect phone numbers, email IDs, website URLs or handles, and supporting evidence such as screenshots or chat logs.',
  },
  {
    q: 'What happens after I submit a complaint on the portal?',
    a: 'Your complaint is assigned a unique Reference Number (e.g. CFR-2026-89412) and automatically routed to the concerned State/UT Police Authority and financial lien desk (1930) for swift verification, account freezing, and investigation.',
  },
  {
    q: 'Apart from this portal, are there alternative ways to report or remove objectionable content?',
    a: 'Yes. For immediate financial fraud lien placement, call the 24x7 helpline 1930 immediately. For objectionable content on social media (Facebook, Instagram, X, YouTube), you can also report or flag content directly on the platform as per their content policies.',
  },
  {
    q: 'Can I report a complaint anonymously?',
    a: 'Yes. The portal provides an option of reporting an anonymous complaint specifically for online sexually explicit content, child abuse material (CSEAM), or severe harassment content without disclosing personal identity.',
  },
  {
    q: 'Is my personal information kept confidential?',
    a: 'Yes. All personal information and complaint data submitted on the portal is encrypted and shared strictly with authorized law enforcement officers investigating the incident.',
  },
  {
    q: 'What should I do if I lost money in a financial cyber fraud?',
    a: 'Act immediately within the golden hour. Call 1930 or file a report on this portal with your transaction ID, UPI ID, and bank details so a lien/freeze request can be dispatched to the destination bank.',
  },
];

export default function FAQPage() {
  return (
    <ServiceLayout>
      <div className="ux4g-container page-section">
        <PageIntro
          eyebrow="Official Knowledge Base"
          title="Frequently Asked Questions (FAQ)"
          description="Official answers and guidelines sourced from Cyber First Response."
        />

        <div className="help-grid-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBlockEnd: '2.5rem' }}>
          {officialFaqs.map((faq, idx) => (
            <div className="checker-card-modern" key={idx} style={{ padding: '1.5rem 1.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--cfr-navy)', marginBlockEnd: '0.65rem' }}>
                {idx + 1}. {faq.q}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ServiceLayout>
  );
}
