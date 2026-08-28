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
    const restoreTimer = window.setTimeout(() => {
      const stored = localStorage.getItem('cfr-local-acknowledgement');
      if (!stored) { setReport(null); return; }
      try { setReport(JSON.parse(stored) as LocalReport); } catch { setReport(null); }
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  if (report === undefined) return <div className="ux4g-container page-section" role="status">Loading your saved report…</div>;

  if (!report) return <div className="ux4g-container page-section narrow-page"><div className="ux4g-alert ux4g-alert-warning ux4g-alert-wide" role="alert"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">warning</span><div className="ux4g-alert-content"><h1 className="ux4g-alert-title">No saved report was found on this device</h1><p className="ux4g-alert-message">Return to reporting to prepare a new report.</p><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/report">Start a report</a></div></div></div>;

  return <div className="ux4g-container page-section narrow-page"><header className="page-intro"><h1 className="ux4g-heading-xl-strong">Your report is ready</h1><p className="ux4g-body-l-default">Review this on-device copy, then use the appropriate official reporting channel for the incident.</p></header><div className="ux4g-alert ux4g-alert-success ux4g-alert-wide"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">check_circle</span><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">Saved on this device</h2><p className="ux4g-alert-message">This page confirms a local save. It does not confirm submission to a police, government or financial institution.</p><div className="ux4g-alert-actions"><PrintButton /></div></div></div><dl className="case-meta"><div><dt>Local reference</dt><dd><strong>{report.id || 'LOCAL-REPORT'}</strong></dd></div><div><dt>Saved</dt><dd><strong>{new Date(report.at).toLocaleString('en-IN')}</strong></dd></div><div><dt>Amount</dt><dd><strong>{report.amount ? `₹${Number(report.amount).toLocaleString('en-IN')}` : 'Not provided'}</strong></dd></div><div><dt>Payment method</dt><dd><strong>{report.paymentMethod || 'Not provided'}</strong></dd></div></dl><section className="guidance-card"><h2>Incident summary</h2><p>{report.summary}</p></section><section className="guidance-card"><h2>Choose the next official action</h2><div className="local-report-actions"><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="tel:1930">Call 1930 for financial fraud</a><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/help">Review other help routes</a></div></section></div>;
}
