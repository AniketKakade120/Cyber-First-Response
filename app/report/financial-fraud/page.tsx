'use client';

import { useState, useEffect } from 'react';
import { TaskHeader } from '../../../components/task-header';
import { ReportFlow } from '../../../components/report-flow';
import { DRAFT_STORAGE_KEY } from '../../../lib/demo-data';

export default function FinancialFraudPage() {
  const [savedLabel, setSavedLabel] = useState('Saving locally...');

  useEffect(() => {
    const updateTime = () => {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.savedAt) {
            const time = new Date(parsed.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSavedLabel(`Saved on this device at ${time}`);
            return;
          }
        } catch {}
      }
      setSavedLabel('Saved on this device');
    };
    updateTime();
    const interval = setInterval(updateTime, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    window.location.reload();
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TaskHeader
        savedLabel={savedLabel}
        onClearDraft={handleClearDraft}
        onSaveAndExit={() => { window.location.href = '/'; }}
      />
      <main id="main-content" style={{ flex: 1, paddingBlock: '2rem' }}>
        <ReportFlow />
      </main>
      <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '1.5rem 0', fontSize: '0.825rem', textAlign: 'center', borderTop: '1px solid #1E293B' }}>
        <div className="ux4g-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span>Independent concept prototype — prepares information locally for official submission.</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/about#privacy" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Privacy</a>
            <a href="/help" style={{ color: '#CBD5E1', textDecoration: 'none' }}>Accessibility</a>
            <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: '#6FA8E8', textDecoration: 'none', fontWeight: 600 }}>Official Portal ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
