'use client';

import { useState } from 'react';

type TabType = 'phone' | 'bank' | 'link' | 'social';

export function UsefulActionsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('phone');
  const [inputValue, setInputValue] = useState('');
  const [hasChecked, setHasChecked] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setHasChecked(true);
    }
  };

  return (
    <section className="ux4g-container page-section useful-actions-section" aria-label="Not ready to report? You can still take action.">
      {/* Section Heading */}
      <div className="section-heading editorial-heading useful-actions-heading">
        <h2 className="useful-actions-title">Not ready to report? You can still take action.</h2>
        <p className="useful-actions-sub">
          Check suspicious details or understand your privacy options.
        </p>
      </div>

      {/* Main Grid: Left Check Tool Card + Right Single Unified Guidance Hub Card */}
      <div className="useful-actions-grid">
        {/* LEFT CARD: Check before you trust */}
        <div className="useful-card check-trust-card">
          <div className="check-trust-header">
            <div className="check-trust-badge">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3L5 7V15C5 21.9 9.7 28.3 16 30C22.3 28.3 27 21.9 27 15V7L16 3Z" stroke="#245EAB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="15" r="4.5" stroke="#C65A11" strokeWidth="2.5"/>
                <path d="M18.5 18.5L22 22" stroke="#C65A11" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h3 className="check-trust-title">Check something suspicious</h3>
              <p className="check-trust-subtitle">Review suspicious identifiers before you act.</p>
            </div>
          </div>

          {/* Segmented Control Tabs */}
          <div className="check-tabs-container">
            <button
              type="button"
              className={`check-tab ${activeTab === 'phone' ? 'active' : ''}`}
              onClick={() => { setActiveTab('phone'); setHasChecked(false); }}
            >
              <span className="ux4g-icon-outlined" aria-hidden="true">smartphone</span>
              <span>Phone number</span>
            </button>
            <button
              type="button"
              className={`check-tab ${activeTab === 'bank' ? 'active' : ''}`}
              onClick={() => { setActiveTab('bank'); setHasChecked(false); }}
            >
              <span className="ux4g-icon-outlined" aria-hidden="true">account_balance</span>
              <span>Bank account or UPI ID</span>
            </button>
            <button
              type="button"
              className={`check-tab ${activeTab === 'link' ? 'active' : ''}`}
              onClick={() => { setActiveTab('link'); setHasChecked(false); }}
            >
              <span className="ux4g-icon-outlined" aria-hidden="true">link</span>
              <span>Link or website</span>
            </button>
            <button
              type="button"
              className={`check-tab ${activeTab === 'social' ? 'active' : ''}`}
              onClick={() => { setActiveTab('social'); setHasChecked(false); }}
            >
              <span className="ux4g-icon-outlined" aria-hidden="true">share</span>
              <span>Social media</span>
            </button>
          </div>

          {/* Form Input Area */}
          <form onSubmit={handleCheck} className="check-form">
            <label className="check-input-label" htmlFor="identifier-input">
              {activeTab === 'phone' && 'Phone number'}
              {activeTab === 'bank' && 'Bank account or UPI ID'}
              {activeTab === 'link' && 'Website URL or Link'}
              {activeTab === 'social' && 'Social media profile or handle'}
            </label>
            <div className="check-input-row">
              <input
                id="identifier-input"
                type="text"
                className="check-input-field"
                placeholder={
                  activeTab === 'phone'
                    ? 'Enter a 10-digit mobile number'
                    : activeTab === 'bank'
                    ? 'Enter UPI ID (e.g. name@upi) or account number'
                    : activeTab === 'link'
                    ? 'Enter website link (e.g. https://suspicious.site)'
                    : 'Enter handle or profile URL (e.g. @username)'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <button type="submit" className="check-submit-btn">
              Open suspicious-item checker →
            </button>
          </form>

          {/* Mandatory Pre-Interaction Disclaimer */}
          <div style={{ marginBlockStart: '0.85rem', padding: '0.75rem 0.85rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>
            <strong style={{ color: '#0F172A', display: 'block', marginBlockEnd: '0.2rem' }}>Safety Disclaimer:</strong>
            A result is only a signal. <strong>No match does not mean it is safe.</strong> Never send money or share an OTP because of this result.
          </div>

          {hasChecked && (
            <div className="check-result-box" style={{ marginBlockStart: '0.85rem' }}>
              <span className="ux4g-icon-outlined text-blue" aria-hidden="true">info</span>
              <div>
                <strong>Sample Data Search Result</strong>
                <p>
                  No sample flag matched "{inputValue}". <strong>Remember: No match does not mean it is safe.</strong>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Understand reporting and privacy */}
        <div className="useful-card guidance-hub-card">
          <div className="guidance-hub-main-header">
            <div>
              <h3 className="guidance-hub-main-title">Understand reporting and privacy</h3>
              <p className="guidance-hub-main-sub">Essential guidance on privacy options and follow-up steps.</p>
            </div>
          </div>

          <div className="guidance-section-block privacy-block" style={{ marginBlockStart: '0.4rem' }}>
            <div className="privacy-questions-list">
              <a href="/about#privacy" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined" aria-hidden="true">help_outline</span>
                <span className="q-text">Can I report anonymously?</span>
                <span className="q-arrow ux4g-icon-outlined" aria-hidden="true">chevron_right</span>
              </a>
              <a href="/about#privacy" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined" aria-hidden="true">help_outline</span>
                <span className="q-text">What information must I share?</span>
                <span className="q-arrow ux4g-icon-outlined" aria-hidden="true">chevron_right</span>
              </a>
              <a href="/about#privacy" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined" aria-hidden="true">help_outline</span>
                <span className="q-text">Who may contact me after I report?</span>
                <span className="q-arrow ux4g-icon-outlined" aria-hidden="true">chevron_right</span>
              </a>
              <a href="/about#privacy" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined" aria-hidden="true">help_outline</span>
                <span className="q-text">How is my personal data protected?</span>
                <span className="q-arrow ux4g-icon-outlined" aria-hidden="true">chevron_right</span>
              </a>
            </div>

            <a href="/about#privacy" className="guidance-inline-link" style={{ marginBlockStart: '1rem', display: 'inline-flex', fontWeight: 700 }}>
              Read privacy guidance →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
