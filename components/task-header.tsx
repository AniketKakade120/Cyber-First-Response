'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from 'react';
import { CfrLogo } from './cfr-logo';

interface TaskHeaderProps {
  savedLabel: string;
  onClearDraft: () => void;
  onSaveAndExit?: () => void;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', label: 'অসমীয়া (Assamese)' },
  { code: 'ur', label: 'اردو (Urdu)' },
] as const;

export function TaskHeader({ savedLabel, onClearDraft, onSaveAndExit }: TaskHeaderProps) {
  const [selectedLang, setSelectedLang] = useState('en');
  const [showClearModal, setShowClearModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleConfirmClear = () => {
    setShowClearModal(false);
    onClearDraft();
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      
      {/* Compact Focused Task Shell Header */}
      <header className="cfr-task-header" role="banner" style={{ background: '#0D1F33', color: '#FFFFFF', paddingBlock: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="ux4g-container">
          <div className="ux4g-d-flex ux4g-jc-between ux4g-ai-center" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
            
            {/* Logo & Call 1930 */}
            <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-m">
              <a href="/" aria-label="Cyber First Response home" style={{ display: 'flex', alignItems: 'center' }}>
                <CfrLogo inverted size={56} />
              </a>
              <a href="tel:1930" className="ux4g-btn ux4g-btn-sm" style={{ background: '#E87A3A', color: '#FFFFFF', fontWeight: 700, borderRadius: '6px', padding: '0.3rem 0.75rem', fontSize: '0.825rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <span className="ux4g-icon-outlined" style={{ fontSize: '1rem' }}>call</span>
                <span>Call 1930</span>
              </a>
            </div>

            {/* Status, Language & Options */}
            <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-s" style={{ fontSize: '0.825rem', color: '#CBD5E1' }}>
              {/* Autosave badge */}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.775rem' }}>
                <span className="ux4g-icon-outlined" style={{ fontSize: '0.9rem', color: '#6FA8E8' }}>cloud_done</span>
                {savedLabel}
              </span>

              {/* Language Selector */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                <span className="ux4g-icon-outlined" style={{ fontSize: '1rem', color: '#94A3B8' }}>language</span>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  aria-label="Select Language"
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.35rem',
                    fontSize: '0.775rem',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code} style={{ color: '#0F172A', background: '#FFFFFF' }}>{l.label}</option>
                  ))}
                </select>
              </div>

              {/* Save & Exit */}
              <a
                href="/"
                onClick={(e) => {
                  if (onSaveAndExit) {
                    e.preventDefault();
                    onSaveAndExit();
                  }
                }}
                style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600, padding: '0.2rem 0.4rem' }}
              >
                Save & exit
              </a>

              {/* Clear draft action */}
              <button
                type="button"
                onClick={() => setShowClearModal(true)}
                style={{ background: 'none', border: 'none', color: '#FCA5A5', fontSize: '0.775rem', cursor: 'pointer', padding: '0.2rem 0.4rem', textDecoration: 'underline' }}
              >
                Clear draft
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Platform Notice Bar */}
      <div style={{ background: '#EFF6FF', borderBottom: '1px solid #BFDBFE', color: '#1E40AF', padding: '0.35rem 0', fontSize: '0.825rem', textAlign: 'center' }}>
        <div className="ux4g-container">
          <span>
            <strong>Cyber First Response</strong> — Citizen-first cybercrime reporting & rapid response platform.{' '}
          </span>
        </div>
      </div>

      {/* Clear Draft Confirmation Modal */}
      {showClearModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="clear-modal-title" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', maxInlineSize: '460px', inlineSize: '100%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}>
            <h2 id="clear-modal-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.5rem 0' }}>Clear all report data?</h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.4, margin: '0 0 1.25rem 0' }}>
              This will permanently delete your narrative, transaction details, and attached evidence saved in this browser. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="ux4g-btn ux4g-btn-outline-primary"
                style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
              >
                Keep draft
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                style={{ background: '#DC2626', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Yes, clear draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How This Prototype Works Modal */}
      {showInfoModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="info-modal-title" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(3px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', maxInlineSize: '540px', inlineSize: '100%', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '1rem' }}>
              <h2 id="info-modal-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>How Cyber First Response Works</h2>
              <button type="button" onClick={() => setShowInfoModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
              <p style={{ marginBlockEnd: '0.75rem' }}>
                Cyber First Response is an <strong>independent concept prototype</strong> designed to help distressed citizens organize incident facts and prepare an accurate complaint pack.
              </p>
              <ul style={{ paddingLeft: '1.2rem', marginBlockEnd: '1rem' }}>
                <li>Data is saved only locally in your device’s browser storage.</li>
                <li>No information is submitted to police, banks, 1930, or NCRP automatically.</li>
                <li>Once prepared, you can download your official complaint pack and continue to <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>cybercrime.gov.in</a> or call 1930 to file officially.</li>
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowInfoModal(false)}
                className="ux4g-btn ux4g-btn-primary"
                style={{ padding: '0.4rem 1.25rem', fontSize: '0.875rem' }}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
