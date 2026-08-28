import { PageIntro } from '../../components/page-intro';
import { ServiceLayout } from '../../components/service-layout';

const helps = [
  {
    title: 'Immediate danger',
    desc: 'Call 112 if someone is in immediate physical danger.',
    href: 'tel:112',
    action: 'Call 112',
    isEmergency: true,
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    title: 'Financial fraud helpline',
    desc: 'Call 1930 immediately when money has just left an account.',
    href: 'tel:1930',
    action: 'Call 1930',
    isPrimaryCall: true,
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    title: 'Account security',
    desc: 'Secure a compromised account, linked email and mobile number.',
    href: '/report/identity',
    action: 'See security steps →',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: 'Bank or payment provider',
    desc: 'Use the official support route in your banking or payment app.',
    href: '/report/financial-fraud',
    action: 'See first actions →',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="21" x2="21" y2="21"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M12 3L2 10h20L12 3z"/>
        <line x1="6" y1="10" x2="6" y2="21"/>
        <line x1="10" y1="10" x2="10" y2="21"/>
        <line x1="14" y1="10" x2="14" y2="21"/>
        <line x1="18" y1="10" x2="18" y2="21"/>
      </svg>
    ),
  },
  {
    title: 'Accessibility assistance',
    desc: 'Use text-size, theme controls or review accessibility support.',
    href: '/about#accessibility',
    action: 'Accessibility statement →',
    iconSvg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M12 12v6"/>
        <path d="M9 15h6"/>
      </svg>
    ),
  },
];

export default function HelpPage() {
  return (
    <ServiceLayout>
      <div className="ux4g-container page-section">
        <PageIntro
          eyebrow="Get help"
          title="Choose the fastest safe action"
          description="Start with immediate safety, then preserve evidence and report what happened."
        />

        <div className="help-grid-container">
          {helps.map((item) => (
            <div className="help-card" key={item.title}>
              <div className="help-card-header">
                <div
                  className="help-icon-circle"
                  style={{
                    backgroundColor: item.isEmergency ? '#FEF2F2' : '#EFF6FF',
                  }}
                >
                  {item.iconSvg}
                </div>
              </div>

              <div className="help-card-body">
                <h3 className="help-card-title">{item.title}</h3>
                <p className="help-card-desc">{item.desc}</p>
              </div>

              <div className="help-card-footer">
                <a
                  href={item.href}
                  className={`help-action-btn ${
                    item.isEmergency
                      ? 'btn-danger'
                      : item.isPrimaryCall
                      ? 'btn-brand-primary'
                      : 'btn-brand-outline'
                  }`}
                >
                  {item.action}
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="guidance-card-modern">
          <div className="guidance-header-row">
            <div className="guidance-icon-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h2 className="guidance-title">Local cybercrime contacts</h2>
              <p className="guidance-sub">
                Use your State or Union Territory police website to find the official cybercrime unit contact. Verify phone numbers before sharing personal information.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ServiceLayout>
  );
}
