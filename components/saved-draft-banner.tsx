'use client';

import { useEffect, useState } from 'react';

export function SavedDraftBanner() {
  const [draft, setDraft] = useState<{ id?: string; at?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cfr-local-acknowledgement');
      if (stored) {
        setDraft(JSON.parse(stored));
      }
    } catch {
      setDraft(null);
    }
  }, []);

  if (!draft) return null;

  const deleteDraft = () => {
    if (window.confirm('Are you sure you want to delete this saved draft? This action cannot be undone.')) {
      localStorage.removeItem('cfr-local-acknowledgement');
      setDraft(null);
    }
  };

  const formattedDate = draft.at ? new Date(draft.at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'recently';

  return (
    <div className="ux4g-container" style={{ marginBlockStart: '1.5rem' }}>
      <div
        style={{
          background: '#EFF6FF',
          border: '1.5px solid #93C5FD',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '12px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
          </div>
          <div>
            <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--cfr-navy)' }}>
              Continue your saved report
            </strong>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              Saved on this device at <strong>{formattedDate}</strong> (Ref: {draft.id || 'CFR-2026-89412'}). This draft has not been submitted.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/complaint/local"
            className="ux4g-btn ux4g-btn-primary"
            style={{ background: 'var(--cfr-blue)', borderColor: 'var(--cfr-blue)', padding: '0.6rem 1.25rem', fontSize: '0.9rem', fontWeight: 700, borderRadius: '8px' }}
          >
            Continue report →
          </a>
          <button
            type="button"
            onClick={deleteDraft}
            className="ux4g-btn ux4g-btn-outline-primary"
            style={{ padding: '0.6rem 1rem', fontSize: '0.9rem', color: '#DC2626', borderColor: '#FCA5A5', borderRadius: '8px' }}
          >
            Delete draft
          </button>
        </div>
      </div>
    </div>
  );
}
