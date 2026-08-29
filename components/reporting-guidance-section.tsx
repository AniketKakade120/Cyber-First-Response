'use client';

export function ReportingGuidanceSection() {
  const stepsCard1 = [
    { num: 1, title: 'Tell us what happened', desc: 'Share details in your own words.' },
    { num: 2, title: 'Review and correct', desc: 'Check the organized information.' },
    { num: 3, title: 'See next actions', desc: 'Review reporting route & steps.' },
    { num: 4, title: 'Stay informed', desc: 'Use reference ID to track progress.' },
  ];

  const stepsCard2 = [
    { num: 1, title: 'Date & time details', desc: 'Approximate time of incident.' },
    { num: 2, title: 'Transaction records', desc: 'Payment IDs & UTR reference numbers.' },
    { num: 3, title: 'Messages & evidence', desc: 'Screenshots, emails or chat logs.' },
    { num: 4, title: 'Contact identifiers', desc: 'Phone numbers, links & suspect handles.' },
  ];

  const stepsCard3 = [
    { num: 1, title: 'Structured Evidence', desc: 'Organized formatting for fast police verification.' },
    { num: 2, title: 'Bank Lien Dispatch', desc: 'Connects transaction reference for 1930 recall.' },
    { num: 3, title: 'Live Status Updates', desc: 'Keep follow-up actions & timeline visible.' },
  ];

  return (
    <section className="dark-navy-fullwidth-section">
      <div className="ux4g-container" aria-label="Reporting guidance">
        {/* Section Header */}
        <div className="section-heading editorial-heading guidance-main-heading dark-navy-heading">
          <h2 className="guidance-main-title dark-title">Know what happens before you begin.</h2>
          <p className="guidance-main-sub dark-sub">
            Understand the process, prepare available details and see what happens next.
          </p>
        </div>

        {/* Compact 3-Card Grid */}
        <div className="compact-guidance-grid">
          {/* CARD 1: How reporting works */}
          <div className="dark-guidance-card">
            <div className="guidance-card-header-sm">
              <h3 className="guidance-title-sm dark-card-title">How reporting works</h3>
            </div>

            <div className="compact-stepper-list">
              {stepsCard1.map((step) => (
                <div key={step.num} className="compact-stepper-item">
                  <span className="dark-step-num">{step.num}</span>
                  <div style={{ flex: 1 }}>
                    <strong className="compact-step-title dark-step-title">{step.title}</strong>
                    <span className="compact-step-desc dark-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBlockStart: 'auto', paddingBlockStart: '1.25rem' }}>
              <a href="/learn" className="dark-card-link">
                Learn about the process →
              </a>
            </div>
          </div>

          {/* CARD 2: What to keep ready */}
          <div className="dark-guidance-card">
            <div className="guidance-card-header-sm">
              <h3 className="guidance-title-sm dark-card-title">What to keep ready</h3>
            </div>

            <div className="compact-stepper-list">
              {stepsCard2.map((step) => (
                <div key={step.num} className="compact-stepper-item">
                  <span className="dark-step-num">{step.num}</span>
                  <div style={{ flex: 1 }}>
                    <strong className="compact-step-title dark-step-title">{step.title}</strong>
                    <span className="compact-step-desc dark-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBlockStart: 'auto', paddingBlockStart: '1.25rem' }}>
              <a href="/learn" className="dark-card-link">
                See the evidence guide →
              </a>
            </div>
          </div>

          {/* CARD 3: Tracking & Resolution */}
          <div className="dark-guidance-card">
            <div className="guidance-card-header-sm">
              <h3 className="guidance-title-sm dark-card-title">Clear details & Tracking</h3>
            </div>

            <div className="compact-stepper-list">
              {stepsCard3.map((step) => (
                <div key={step.num} className="compact-stepper-item">
                  <span className="dark-step-num">{step.num}</span>
                  <div style={{ flex: 1 }}>
                    <strong className="compact-step-title dark-step-title">{step.title}</strong>
                    <span className="compact-step-desc dark-step-desc">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBlockStart: 'auto', paddingBlockStart: '1.25rem' }}>
              <a href="/track" className="dark-card-link">
                See how tracking works →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
