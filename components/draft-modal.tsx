'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const DRAFT_STORAGE_KEY = 'cfr-draft-v1';

interface DraftData {
  step: number;
  narrative: string;
  amount: string;
  savedAt: string;
  paymentMethod?: string;
}

export function DraftResumeModal({
  isOpen,
  onClose,
  onStartNew,
}: {
  isOpen: boolean;
  onClose: () => void;
  onStartNew: () => void;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftData | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.narrative || parsed.amount || parsed.step > 0) {
          setDraft(parsed);
        } else {
          setDraft(null);
        }
      } catch {
        setDraft(null);
      }
    }
  }, [isOpen]);

  if (!isOpen || !draft) return null;

  const handleResume = () => {
    onClose();
    router.push('/report/guided');
  };

  const handleStartNew = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem('cfr-initial-narrative');
    onClose();
    onStartNew();
  };

  const formatTime = (isoString?: string) => {
    if (!isoString) return 'Recently';
    try {
      const d = new Date(isoString);
      return `Today at ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="draft-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="draft-modal-title">
      <div className="draft-modal-card">
        <div className="draft-modal-header">
          <div className="draft-modal-icon-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div>
            <h2 id="draft-modal-title" className="draft-modal-title">Unfinished Complaint Found</h2>
            <p className="draft-modal-subtitle">You have an in-progress complaint saved on this device.</p>
          </div>
        </div>

        <div className="draft-preview-box">
          <div className="draft-preview-top">
            <span className="draft-tag">Saved Draft</span>
            <span className="draft-time">{formatTime(draft.savedAt)} &bull; Step {draft.step + 1} of 7</span>
          </div>
          {draft.narrative ? (
            <p className="draft-narrative-preview">&ldquo;{draft.narrative.slice(0, 120)}{draft.narrative.length > 120 ? '…' : ''}&rdquo;</p>
          ) : (
            <p className="draft-narrative-preview" style={{ fontStyle: 'italic', color: '#64748B' }}>Draft includes transaction &amp; category details.</p>
          )}
          {draft.amount && (
            <div className="draft-amount-badge">
              Amount reported: <strong>&nbsp;&nbsp;₹{Number(draft.amount).toLocaleString('en-IN')}</strong>
            </div>
          )}
        </div>

        <div className="draft-modal-actions">
          <button className="draft-btn-secondary" onClick={handleStartNew} type="button">
            Start New Report
          </button>
          <button className="draft-btn-primary" onClick={handleResume} type="button">
            Resume Saved Complaint &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export function DraftAlertBanner() {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftData | null>(null);

  useEffect(() => {
    const checkDraft = () => {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.narrative || parsed.amount || parsed.step > 0) {
            setDraft(parsed);
          } else {
            setDraft(null);
          }
        } catch {
          setDraft(null);
        }
      }
    };
    checkDraft();
  }, []);

  if (!draft) return null;

  return (
    <div className="draft-alert-banner">
      <div className="draft-banner-content">
        <span className="draft-banner-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        </span>
        <span>
          <strong>You have an unfinished complaint draft</strong> saved from {draft.savedAt ? new Date(draft.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'earlier'}.
        </span>
      </div>
      <div className="draft-banner-actions">
        <button
          className="draft-banner-btn-text"
          onClick={() => {
            localStorage.removeItem(DRAFT_STORAGE_KEY);
            setDraft(null);
          }}
          type="button"
        >
          Discard
        </button>
        <button
          className="draft-banner-btn-primary"
          onClick={() => router.push('/report/guided')}
          type="button"
        >
          Resume Report &rarr;
        </button>
      </div>
    </div>
  );
}
