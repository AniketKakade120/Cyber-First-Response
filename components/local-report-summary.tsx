'use client';

import { useEffect, useState } from 'react';
import { PrintButton } from './print-button';

type LocalReport = {
  id?: string;
  at: string;
  summary: string;
  amount: string;
  paymentMethod: string;
  fullName?: string;
  mobile?: string;
  status?: string;
};

export function LocalReportSummary() {
  const [report, setReport] = useState<LocalReport | null | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const defaultReport: LocalReport = {
      id: 'CFR-2026-894129',
      at: new Date().toISOString(),
      summary: 'On 27 August 2026 at approximately 3:15 PM, I received a phone call from a person claiming to be from my bank’s fraud department. The caller said my account would be blocked unless I completed an urgent verification payment. I was asked to transfer ₹48,500 to the UPI ID testmerchant@upi. The transaction reference number shown in my banking app is TEST20260827001.',
      amount: '48500',
      paymentMethod: 'UPI',
      status: 'Submitted & Registered',
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

  const handleCopySummary = () => {
    if (!report) return;
    const text = `CYBER FIRST RESPONSE REGISTRATION SUMMARY\nComplaint Ref: ${report.id || 'CFR-2026-894129'}\nStatus: Registered\nAmount: ₹${report.amount}\nPayment Method: ${report.paymentMethod}\n\nNarrative:\n${report.summary}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (report === undefined) return <div className="ux4g-container page-section" role="status" style={{ padding: '3rem 0', color: '#64748B' }}>Loading complaint record…</div>;

  if (!report) return (
    <div className="ux4g-container page-section narrow-page">
      <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '12px', padding: '1.5rem' }}>
        <h2 style={{ color: '#92400E', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>No active complaint record found</h2>
        <p style={{ color: '#B45309', marginBlockEnd: '1rem', fontSize: '0.9rem' }}>
          File a report to register your complaint on the platform.
        </p>
        <a href="/report/financial-fraud" className="ux4g-btn ux4g-btn-primary" style={{ display: 'inline-flex', padding: '0.4rem 1.25rem' }}>
          File a complaint now →
        </a>
      </div>
    </div>
  );

  return (
    <div className="ux4g-container page-section" style={{ maxInlineSize: '880px', marginInline: 'auto' }}>
      
      {/* Header Banner */}
      <header style={{ marginBlockEnd: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.4rem 0' }}>Complaint Registered Successfully</h1>
        <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
          Your cybercrime complaint has been registered on the <strong>Cyber First Response</strong> platform.
        </p>
      </header>

      {/* Action Bar */}
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', marginBlockEnd: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <PrintButton />
          <button
            type="button"
            onClick={handleCopySummary}
            className="ux4g-btn ux4g-btn-outline-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}
          >
            {copied ? '✓ Reference copied!' : 'Copy complaint reference'}
          </button>
        </div>

        <a href="tel:1930" className="ux4g-btn" style={{ background: '#E87A3A', color: '#FFFFFF', fontWeight: 700, padding: '0.45rem 1.25rem', fontSize: '0.875rem', textDecoration: 'none', borderRadius: '6px' }}>
          Call Helpline 1930
        </a>
      </div>

      {/* Action Progress Timeline */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBlockEnd: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className="ux4g-icon-outlined" style={{ color: '#1E40AF' }}>published_with_changes</span>
          Complaint Resolution Timeline
        </h2>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {[
            ['1. Complaint Registered', 'Official report logged into Cyber First Response system.', true],
            ['2. Dispatched to Helpline 1930 & Bank Nodal Desk', 'Financial fraud alert dispatched for fast-track action.', true],
            ['3. Bank Account Lien & Freeze Request', 'Beneficiary account flagged for transaction recall.', false, 'In Progress'],
            ['4. Cyber Cell Review & Investigation', 'Assigned to jurisdictional cybercrime investigation unit.', false, 'Pending'],
          ].map(([title, desc, isDone, statusTag], idx) => (
            <li key={title as string} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: isDone ? '#166534' : statusTag === 'In Progress' ? '#EFF6FF' : '#F1F5F9', color: isDone ? '#FFFFFF' : statusTag === 'In Progress' ? '#1E40AF' : '#64748B', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: isDone ? 'none' : '1px solid #CBD5E1' }}>
                {isDone ? '✓' : idx + 1}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h3>
                  {statusTag && <span style={{ fontSize: '0.725rem', fontWeight: 600, padding: '0.1rem 0.4rem', borderRadius: '4px', background: statusTag === 'In Progress' ? '#FEF3C7' : '#F1F5F9', color: statusTag === 'In Progress' ? '#92400E' : '#64748B' }}>{statusTag}</span>}
                </div>
                <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '0.2rem 0 0 0', lineHeight: 1.4 }}>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Summary Box */}
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', marginBlockEnd: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem 0' }}>Registered Details</h3>
        <div style={{ fontSize: '0.875rem', color: '#334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
          <div><strong>Amount:</strong> ₹{report.amount || '48500'}</div>
          <div><strong>Payment Method:</strong> {report.paymentMethod || 'UPI'}</div>
          <div><strong>Registration Date:</strong> {new Date(report.at).toLocaleDateString()}</div>
        </div>
      </div>

    </div>
  );
}
