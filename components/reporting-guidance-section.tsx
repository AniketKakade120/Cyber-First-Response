'use me';
'use client';

export function ReportingGuidanceSection() {
  const steps = [
    {
      num: 1,
      title: 'Tell us what happened',
      desc: 'Share the details in your own words.',
    },
    {
      num: 2,
      title: 'Review and correct',
      desc: 'Check the organised information.',
    },
    {
      num: 3,
      title: 'See next actions',
      desc: 'Review the reporting route and practical steps.',
    },
    {
      num: 4,
      title: 'Stay informed',
      desc: 'Use your acknowledgement number to track progress.',
    },
  ];

  const readyItems = [
    { icon: 'calendar_month', text: 'Approximate date and time' },
    { icon: 'receipt_long', text: 'Transaction or reference details' },
    { icon: 'chat', text: 'Messages, emails or screenshots' },
    { icon: 'link', text: 'Phone numbers, usernames or links' },
  ];

  return (
    <section className="ux4g-container page-section reporting-guidance-section" aria-label="Reporting guidance">
      {/* Section Header */}
      <div className="section-heading editorial-heading guidance-main-heading">
        <h2 className="guidance-main-title">Know what happens before you begin.</h2>
        <p className="guidance-main-sub">
          Understand the process, prepare available details and see what happens next.
        </p>
      </div>

      {/* Top 2 Cards Grid */}
      <div className="guidance-top-grid">
        {/* LEFT CARD: How reporting works */}
        <div className="guidance-card works-card">
          <div className="guidance-card-header">
            <h3 className="guidance-card-title">How reporting works</h3>
          </div>

          {/* Stepper */}
          <div className="guidance-stepper">
            {steps.map((step, idx) => (
              <div key={step.num} className="stepper-item">
                <div className="stepper-left">
                  <div className="stepper-circle">{step.num}</div>
                  {idx < steps.length - 1 && <div className="stepper-line" />}
                </div>
                <div className="stepper-content">
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a href="/learn" className="guidance-card-link">
            Learn about the process →
          </a>
        </div>

        {/* RIGHT CARD: What to keep ready */}
        <div className="guidance-card ready-card">
          <div className="guidance-card-header">
            <h3 className="guidance-card-title">What to keep ready</h3>
          </div>

          <ul className="ready-items-list">
            {readyItems.map((item) => (
              <li key={item.text} className="ready-item">
                <span className="ux4g-icon-outlined ready-item-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
            <li className="ready-item ready-item-highlight">
              <span className="ux4g-icon-outlined ready-item-icon-orange" aria-hidden="true">verified</span>
              <strong>You can still begin if something is missing.</strong>
            </li>
          </ul>

          <a href="/learn" className="guidance-card-link">
            See the evidence guide →
          </a>
        </div>
      </div>

      {/* Bottom Full Width Impact Card */}
      <div className="guidance-bottom-card">
        <div className="guidance-bottom-left">
          <div className="guidance-bottom-badge">
            <span className="ux4g-icon-outlined" aria-hidden="true">verified_user</span>
          </div>
          <div>
            <h3 className="guidance-bottom-title">Clear details support the next action</h3>
            <p className="guidance-bottom-sub">
              Organised information helps you review the incident and understand what to do next.
            </p>
            <a href="/track" className="guidance-card-link">
              See how tracking works →
            </a>
          </div>
        </div>

        <div className="guidance-bottom-divider" />

        <div className="guidance-bottom-right">
          <div className="bottom-feature-row">
            <span className="ux4g-icon-outlined feature-icon" aria-hidden="true">search</span>
            <span>Review important details</span>
          </div>
          <div className="bottom-feature-row">
            <span className="ux4g-icon-outlined feature-icon" aria-hidden="true">hub</span>
            <span>Connect related information</span>
          </div>
          <div className="bottom-feature-row">
            <span className="ux4g-icon-outlined feature-icon" aria-hidden="true">notifications_active</span>
            <span>Keep follow-up actions visible</span>
          </div>
        </div>
      </div>
    </section>
  );
}
