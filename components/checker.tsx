'use client';

import { useState } from 'react';
import { checkIdentifier } from '../lib/services';

export function Checker() {
  const [type, setType] = useState('phone');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<ReturnType<typeof checkIdentifier> | null>(null);

  return (
    <div className="checker-card-modern">
      <div className="checker-form-grid">
        <div className="form-field">
          <label className="field-label-bold" htmlFor="check-type">
            Identifier type <span style={{ color: '#DC2626', fontWeight: 700 }}>*</span>
          </label>
          <div className="checker-select-wrapper">
            <select
              id="check-type"
              className="checker-select-field"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="phone">Phone Number</option>
              <option value="email">Email Address</option>
              <option value="upi">UPI ID / VPA</option>
              <option value="bank">Bank Account Number</option>
              <option value="website">Website / Domain Link</option>
              <option value="social">Social Media Handle</option>
            </select>
            <span className="checker-select-arrow" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <div className="form-field">
          <label className="field-label-bold" htmlFor="check-value">
            Identifier <span style={{ color: '#DC2626', fontWeight: 700 }}>*</span>
          </label>
          <div className="checker-input-wrapper">
            <input
              id="check-value"
              className="checker-input-field"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="e.g. +91 98765 43210, fraud@upi, or website link"
            />
          </div>
        </div>
      </div>

      <div style={{ marginBlockStart: '1.25rem' }}>
        <button
          className="checker-submit-btn"
          onClick={() => setResult(checkIdentifier(type, value))}
          type="button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Check identifier
        </button>
      </div>

      {result && (
        <div
          className="result-notification-card"
          style={{
            borderColor: result.state === 'reported' ? '#FDE68A' : result.state === 'no-match' ? '#BFDBFE' : '#FCA5A5',
            background: result.state === 'reported' ? '#FFFBEB' : result.state === 'no-match' ? '#EFF6FF' : '#FEF2F2',
          }}
          role="status"
        >
          <div className="result-header">
            <div
              className="result-icon-badge"
              style={{
                backgroundColor: '#FFFFFF',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={result.state === 'reported' ? '#D97706' : result.state === 'no-match' ? '#1D4ED8' : '#DC2626'} strokeWidth="2.2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <h3
                className="result-title"
                style={{
                  color: result.state === 'reported' ? '#92400E' : result.state === 'no-match' ? '#1E40AF' : '#991B1B',
                }}
              >
                {result.message}
              </h3>
              <p
                className="result-sub"
                style={{
                  color: result.state === 'reported' ? '#B45309' : result.state === 'no-match' ? '#1E3A8A' : '#7F1D1D',
                }}
              >
                A “no match” result does not prove that an identifier is completely safe. Verify through a separate trusted channel before transferring money.
              </p>
            </div>
          </div>

          <div className="result-actions-row">
            <a href="/report" className="help-action-btn btn-brand-outline" style={{ width: 'auto', padding: '0 1.25rem', height: '2.5rem' }}>
              Report an attempted scam
            </a>
            <a href="/report/financial-fraud" className="help-action-btn btn-brand-primary" style={{ width: 'auto', padding: '0 1.25rem', height: '2.5rem' }}>
              Report financial loss →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
