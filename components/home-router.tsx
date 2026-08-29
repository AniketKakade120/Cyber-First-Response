'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

function suggestedRoute(value: string) {
  const text = value.toLowerCase();
  if (/money|upi|bank|card|payment|wallet|investment|loan/.test(text)) return '/report/financial-fraud';
  if (/threat|harass|blackmail|stalk|sextortion|child|minor/.test(text)) return '/report/sensitive-harm';
  if (/hacked|account|identity|impersonat|password|profile/.test(text)) return '/report/identity';
  if (/suspicious|message|call|website|link|number/.test(text)) return '/check';
  return '/report';
}

export function HomeRouter() {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length < 5) return;
    router.push(suggestedRoute(description));
  };

  return (
    <div className="own-words-container" style={{ marginBlockStart: '0' }}>
      <div className="own-words-header" style={{ marginBottom: '0.5rem', gap: '0.15rem' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--cfr-navy)', margin: 0, lineHeight: 1.25 }}>
          Or tell us what happened in your own words
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0, lineHeight: 1.35 }}>
          We’ll organise the information and suggest a reporting route for you to review.
        </p>
      </div>

      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBlockStart: '0.5rem' }} noValidate>
        {/* Expanded Writing Box with internal placeholder */}
        <div style={{ position: 'relative' }}>
          <textarea
            className="checker-input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={{ width: '100%', minHeight: '140px', padding: '1rem', fontSize: '0.95rem', borderRadius: '12px', resize: 'vertical', border: '1.5px solid #CBD5E1', fontFamily: 'inherit' }}
            placeholder="Describe what occurred, approximate dates or times, transaction amounts, suspect phone numbers, UPI IDs, website links, or names you remember."
            aria-label="Describe what happened in your own words"
          />
        </div>

        {/* Safety Warning */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FEF2F2', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #FCA5A5' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" style={{ flex: '0 0 auto' }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#991B1B' }}>
            For your safety, do not enter an OTP, PIN, password, CVV or complete card number.
          </span>
        </div>

        {/* Submit button aligned to right (prototype feature text removed) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: '0.25rem' }}>
          <button
            type="submit"
            className="ux4g-btn ux4g-btn-primary"
            style={{ background: 'var(--cfr-blue)', borderColor: 'var(--cfr-blue)', padding: '0.75rem 1.75rem', fontWeight: 700, borderRadius: '10px' }}
          >
            Suggest a reporting route →
          </button>
        </div>
      </form>
    </div>
  );
}
