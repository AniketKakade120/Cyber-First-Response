'use client';

import { useState } from 'react';

const LOCAL_REFERENCE = 'LOCAL-REPORT';

export function TrackTool() {
  const [ack, setAck] = useState('');
  const [error, setError] = useState('');

  const lookup = () => {
    const defaultReport = {
      id: ack.trim() ? ack.trim().toUpperCase() : 'NCRP-2026-0827-48391',
      at: '2026-08-27T15:15:00.000Z',
      summary: 'On 27 August 2026 at approximately 3:15 PM, I received a phone call from a person claiming to be from my bank’s fraud department. The caller said my account would be blocked unless I completed an urgent verification payment. I was asked to transfer ₹48,500 to the UPI ID testmerchant@upi. After making the payment, the caller stopped responding, and I realised it was a scam. The transaction reference number shown in my banking app is TEST20260827001.',
      amount: '48500',
      paymentMethod: 'UPI',
      provider: 'Bank Fraud Department Impersonation',
      transactionId: 'TEST20260827001',
      recipient: 'testmerchant@upi',
      caller: '+91 98765 43210'
    };

    if (!localStorage.getItem('cfr-local-acknowledgement')) {
      localStorage.setItem('cfr-local-acknowledgement', JSON.stringify(defaultReport));
    }
    window.location.href = '/complaint/local';
  };

  return (
    <div className="checker-card-modern">
      <div className="form-field">
        <label className="field-label-bold" htmlFor="acknowledgement">
          Local report reference <span style={{ color: '#DC2626', fontWeight: 700 }}>*</span>
        </label>
        <p className="help-card-desc" style={{ marginBlockEnd: '0.85rem' }}>
          Use <strong>{LOCAL_REFERENCE}</strong> to reopen a report you previously saved in this browser.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div className="checker-input-wrapper" style={{ flex: 1, minWidth: '16rem' }}>
            <input
              id="acknowledgement"
              className="checker-input-field"
              placeholder={LOCAL_REFERENCE}
              value={ack}
              onChange={(event) => {
                setAck(event.target.value);
                setError('');
              }}
            />
          </div>
          <button className="checker-submit-btn" onClick={lookup} type="button">
            Open saved report →
          </button>
        </div>
      </div>

      <div style={{ marginBlockStart: '1.25rem', paddingBlockStart: '1rem', borderBlockStart: '1px solid #F1F5F9' }}>
        <p className="field-label-bold" style={{ marginBlockEnd: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cfr-navy)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Recent reports saved on this device
        </p>

        <div
          onClick={lookup}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.15rem',
            background: '#F8FAFC',
            border: '1.5px solid #E2E8F0',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#1D4ED8';
            e.currentTarget.style.background = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.background = '#F8FAFC';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.925rem', color: 'var(--cfr-navy)' }}>Report #CFR-2026-89412</strong>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Financial Fraud &bull; ₹48,500 &bull; Saved 27 Aug 2026</span>
            </div>
          </div>

          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View Status →
          </span>
        </div>
      </div>
    </div>
  );
}
