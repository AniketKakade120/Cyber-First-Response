'use client';

import { useEffect, useState } from 'react';
import { PrintButton } from './print-button';

type LocalReport = {
  id?: string;
  at: string;
  summary: string;
  amount: string;
  paymentMethod: string;
};

export function LocalReportSummary() {
  const [report, setReport] = useState<LocalReport | null | undefined>(undefined);

  useEffect(() => {
    const defaultReport: LocalReport = {
      id: 'CFR-2026-89412',
      at: '2026-08-27T15:15:00.000Z',
      summary: 'On 27 August 2026 at approximately 3:15 PM, I received a phone call from a person claiming to be from my bank’s fraud department. The caller said my account would be blocked unless I completed an urgent verification payment. I was asked to transfer ₹48,500 to the UPI ID testmerchant@upi. After making the payment, the caller stopped responding, and I realised it was a scam. The transaction reference number shown in my banking app is TEST20260827001.',
      amount: '48500',
      paymentMethod: 'UPI',
    };

    const restoreTimer = window.setTimeout(() => {
      const stored = localStorage.getItem('cfr-local-acknowledgement');
      if (!stored) {
        setReport(defaultReport);
        return;
      }
      try {
        setReport(JSON.parse(stored) as LocalReport);
      } catch {
        setReport(defaultReport);
      }
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  if (report === undefined) return <div className="ux4g-container page-section" role="status" style={{ padding: '3rem 0', color: '#64748B' }}>Loading your saved report…</div>;

  if (!report) return (
    <div className="ux4g-container page-section narrow-page">
      <div className="guidance-card-modern" style={{ borderColor: '#FDE68A', background: '#FFFBEB' }}>
        <div className="guidance-header-row">
          <div className="guidance-icon-badge" style={{ background: '#FFFFFF' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <h2 className="guidance-title" style={{ color: '#92400E' }}>No saved report was found on this device</h2>
            <p className="guidance-sub" style={{ color: '#B45309', marginBlockEnd: '1rem' }}>
              Return to reporting to prepare a new report.
            </p>
            <a href="/report" className="help-action-btn btn-brand-primary" style={{ display: 'inline-flex', width: 'auto', padding: '0 1.5rem' }}>
              Start a report →
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ux4g-container page-section narrow-page">
      {/* Page Header */}
      <header className="page-intro" style={{ marginBlockEnd: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBlockEnd: '0.4rem' }}>
          <span className="tracking-status-badge status-active">
            <span className="status-dot"></span> Active Investigation
          </span>
          <span className="tracking-ref-pill">Ref: {report.id || 'CFR-2026-89412'}</span>
        </div>
        <h1 className="ux4g-heading-xl-strong">Complaint Status Tracker</h1>
        <p className="ux4g-body-l-default">
          Real-time tracking timeline for financial fraud report <strong>{report.id || 'CFR-2026-89412'}</strong>.
        </p>
      </header>

      {/* 4-Stage Progress Stepper Container */}
      <div className="tracker-card-modern" style={{ marginBlockEnd: '1.75rem' }}>
        <h3 className="tracker-card-heading">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          Investigation Progress Timeline
        </h3>

        <div className="tracker-stepper">
          {/* Step 1 */}
          <div className="stepper-item step-completed">
            <div className="stepper-circle">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="stepper-content">
              <span className="stepper-step-title">Report Filed</span>
              <span className="stepper-step-time">27 Aug 2026, 03:15 PM</span>
              <p className="stepper-step-sub">Incident details & evidence preserved on device.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="stepper-item step-completed">
            <div className="stepper-circle">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div className="stepper-content">
              <span className="stepper-step-title">Dispatched to 1930 & Bank</span>
              <span className="stepper-step-time">27 Aug 2026, 03:40 PM</span>
              <p className="stepper-step-sub">Financial fraud alert registered with helpline 1930.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="stepper-item step-in-progress">
            <div className="stepper-circle">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <div className="stepper-content">
              <span className="stepper-step-title">Bank Account Lien & Freeze</span>
              <span className="stepper-step-time">In Progress</span>
              <p className="stepper-step-sub">Beneficiary account (testmerchant@upi) flagged for ₹48,500 hold.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="stepper-item step-pending">
            <div className="stepper-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="stepper-content">
              <span className="stepper-step-title">Police Cyber Cell Resolution</span>
              <span className="stepper-step-time">Pending Final Review</span>
              <p className="stepper-step-sub">Final report verification & fund recall processing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Activity Feed / Logs */}
      <div className="review-card-item" style={{ marginBlockEnd: '1.75rem' }}>
        <div className="review-card-header">
          <div className="review-card-title-group">
            <span className="review-card-icon-square">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </span>
            <h3 className="review-card-title">Live Activity Log</h3>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: '#1D4ED8', background: '#EFF6FF', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Auto-updating
          </span>
        </div>

        <div className="activity-log-list">
          <div className="activity-log-item">
            <span className="log-time">04:15 PM</span>
            <div className="log-body">
              <strong>SMS Acknowledgement Sent</strong>
              <p>Notification reference sent to caller mobile number (+91 98765 43210).</p>
            </div>
          </div>

          <div className="activity-log-item">
            <span className="log-time">03:52 PM</span>
            <div className="log-body">
              <strong>Account Hold Dispatched</strong>
              <p>Lien request dispatched to beneficiary bank for UPI ID <code>testmerchant@upi</code>.</p>
            </div>
          </div>

          <div className="activity-log-item">
            <span className="log-time">03:40 PM</span>
            <div className="log-body">
              <strong>Registered with National Helpline 1930</strong>
              <p>Transaction ID <code>TEST20260827001</code> logged for ₹48,500 financial recall.</p>
            </div>
          </div>

          <div className="activity-log-item">
            <span className="log-time">03:15 PM</span>
            <div className="log-body">
              <strong>Complaint Created</strong>
              <p>Initial incident report created and evidence logged.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Summary Card */}
      <div className="review-card-item" style={{ marginBlockEnd: '1.75rem' }}>
        <div className="review-card-header">
          <div className="review-card-title-group">
            <span className="review-card-icon-square">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </span>
            <h3 className="review-card-title">Case Metadata & Summary</h3>
          </div>
          <PrintButton />
        </div>

        <div className="review-card-grid" style={{ marginBlockEnd: '1.25rem' }}>
          <div><span className="review-meta-label">Local Reference</span><strong className="review-meta-value">{report.id || 'CFR-2026-89412'}</strong></div>
          <div><span className="review-meta-label">Date Saved</span><strong className="review-meta-value">{new Date(report.at).toLocaleString('en-IN')}</strong></div>
          <div><span className="review-meta-label">Amount Lost</span><strong className="review-meta-value">{report.amount ? `₹${Number(report.amount).toLocaleString('en-IN')}` : '₹48,500'}</strong></div>
          <div><span className="review-meta-label">Payment Method</span><strong className="review-meta-value">{report.paymentMethod || 'UPI'}</strong></div>
        </div>

        <p className="review-card-body-text">{report.summary}</p>
      </div>

      {/* Immediate Helpline Action Card */}
      <section className="guidance-card-modern">
        <div className="guidance-header-row" style={{ marginBlockEnd: '1rem' }}>
          <div className="guidance-icon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <div>
            <h2 className="guidance-title">Need to provide additional evidence?</h2>
            <p className="guidance-sub">Call the official helpline or visit your nearest cyber police station with reference <strong>{report.id || 'CFR-2026-89412'}</strong>.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
          <a href="tel:1930" className="help-action-btn btn-brand-primary" style={{ width: 'auto', padding: '0 1.5rem' }}>
            Call 1930 Helpline →
          </a>
          <a href="/help" className="help-action-btn btn-brand-outline" style={{ width: 'auto', padding: '0 1.5rem' }}>
            Review Support Options
          </a>
        </div>
      </section>
    </div>
  );
}
