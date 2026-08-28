'use me';
'use client';

import { useState } from 'react';

type TabType = 'phone' | 'bank' | 'link';

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
    <section className="ux4g-container page-section useful-actions-section" aria-label="Useful things you can do right now">
      {/* Section Heading */}
      <div className="section-heading editorial-heading useful-actions-heading">
        <h2 className="useful-actions-title">Useful things you can do right now</h2>
        <p className="useful-actions-sub">
          Check suspicious details, understand your privacy options or learn what happens after you report.
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
              <h3 className="check-trust-title">Check before you trust</h3>
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
          </div>

          {/* Form Input Area */}
          <form onSubmit={handleCheck} className="check-form">
            <label className="check-input-label" htmlFor="identifier-input">
              {activeTab === 'phone' && 'Phone number'}
              {activeTab === 'bank' && 'Bank account or UPI ID'}
              {activeTab === 'link' && 'Website URL or Link'}
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
                    : 'Enter website link (e.g. https://suspicious.site)'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <button type="submit" className="check-submit-btn">
              Check now →
            </button>
          </form>

          {hasChecked && (
            <div className="check-result-box">
              <span className="ux4g-icon-outlined text-blue" aria-hidden="true">info</span>
              <div>
                <strong>Initial Safety Assessment</strong>
                <p>
                  No active high-risk flags reported for "{inputValue}". Always verify bank credentials and avoid sharing OTPs or pin numbers.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Alert Banner */}
          <div className="check-alert-banner">
            <span className="ux4g-icon-outlined alert-shield-icon" aria-hidden="true">security</span>
            <div>
              <strong className="alert-banner-title">Check first. Act second.</strong>
              <p className="alert-banner-sub">We'll show available safety information and suggested next steps.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Unified Guidance Hub Card (Single Cohesive Component) */}
        <div className="useful-card guidance-hub-card">
          {/* Card Main Header */}
          <div className="guidance-hub-main-header">
            <div>
              <h3 className="guidance-hub-main-title">Reporting & Privacy Guidance</h3>
              <p className="guidance-hub-main-sub">Essential information before you start your report.</p>
            </div>
          </div>

          {/* SECTION 1: Privacy & Anonymous Options */}
          <div className="guidance-section-block privacy-block">
            <div className="guidance-block-header">
              <span className="ux4g-icon-outlined block-icon-blue" aria-hidden="true">shield</span>
              <div>
                <h4 className="guidance-block-title">Can I report anonymously?</h4>
                <p className="guidance-block-sub">Understand what stays private and when follow-up details are required.</p>
              </div>
            </div>

            <div className="privacy-questions-list">
              <a href="/report/anonymous" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined">help_outline</span>
                <span className="q-text">What information must I share?</span>
                <span className="q-arrow ux4g-icon-outlined">chevron_right</span>
              </a>
              <a href="/report/anonymous" className="privacy-q-item">
                <span className="q-icon ux4g-icon-outlined">help_outline</span>
                <span className="q-text">Will someone contact me?</span>
                <span className="q-arrow ux4g-icon-outlined">chevron_right</span>
              </a>
            </div>

            <a href="/report/anonymous" className="guidance-inline-link">
              Read privacy guidance →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Notice Bar across full width */}
      <div className="useful-bottom-bar">
        <span className="ux4g-icon-outlined bottom-lock-icon" aria-hidden="true">lock</span>
        <span>You can explore these tools without starting a report.</span>
      </div>
    </section>
  );
}
