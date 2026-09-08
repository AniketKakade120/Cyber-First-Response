'use client';

import React, { useState, useEffect } from 'react';
import {
  defaultTrackingRecord,
  type TrackingRecord,
  type ComplaintEvent,
  type EvidenceFile,
  type ComplaintAmendment,
} from '../lib/complaint-tracking-data';

export function OfficialComplaintView() {
  const [record, setRecord] = useState<TrackingRecord>(defaultTrackingRecord);
  const [expandedMeans, setExpandedMeans] = useState<Record<string, boolean>>({});
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    incident: true,
    actions: false,
    transactions: true,
    suspect: false,
    evidence: false,
    citizen: false,
    jurisdiction: false,
  });

  // Action status states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [srnSubmitted, setSrnSubmitted] = useState(false);
  const [bankSrnInput, setBankSrnInput] = useState('');

  // Modals
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showAmendmentModal, setShowAmendmentModal] = useState(false);
  const [showTimingModal, setShowTimingModal] = useState(false);
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [showBankSrnModal, setShowBankSrnModal] = useState(false);
  const [showCommPrefModal, setShowCommPrefModal] = useState(false);

  // Form states for modals
  const [newEvidenceName, setNewEvidenceName] = useState('');
  const [newEvidenceDesc, setNewEvidenceDesc] = useState('');
  const [amendmentField, setAmendmentField] = useState('Transaction / UTR Reference');
  const [amendmentOriginal, setAmendmentOriginal] = useState('TEST20260827001');
  const [amendmentCorrected, setAmendmentCorrected] = useState('');
  const [amendmentReason, setAmendmentReason] = useState('');
  const [grievanceCategory, setGrievanceCategory] = useState('No progress after 72 hours');
  const [grievanceText, setGrievanceText] = useState('');
  const [commPhone, setCommPhone] = useState(record.citizenMobileMasked);
  const [commEmail, setCommEmail] = useState(record.citizenEmailMasked);
  const [commOtpSent, setCommOtpSent] = useState(false);

  // Hydrate with local report if present from filing flow
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cfr-local-acknowledgement');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id || parsed.summary || parsed.amount) {
          setRecord((prev) => ({
            ...prev,
            acknowledgementNumber: parsed.id || prev.acknowledgementNumber,
            citizenName: parsed.fullName || prev.citizenName,
            narrativeSummary: parsed.summary || prev.narrativeSummary,
            financialResponse: {
              ...prev.financialResponse,
              amountReported: Number(parsed.amount) || prev.financialResponse.amountReported,
              paymentMethod: parsed.paymentMethod || prev.financialResponse.paymentMethod,
            },
          }));
        }
      }
    } catch {
      // Keep default official mock data
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(record.acknowledgementNumber);
    showToast('Complaint number copied.');
  };

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setRecord((prev) => ({
        ...prev,
        lastUpdatedAt: `${prev.registeredDate} at ${timeStr}`,
      }));
      setRefreshing(false);
      showToast(`Status refreshed from NCRP Gateway at ${timeStr}`);
    }, 850);
  };

  const toggleMeans = (id: string) => {
    setExpandedMeans((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddEvidenceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidenceName.trim()) return;
    const newFile: EvidenceFile = {
      id: `EV-0${record.evidenceFiles.length + 1}`,
      name: newEvidenceName.trim(),
      type: 'Uploaded Supplementary File',
      size: '1.5 MB',
      uploadedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Security scan in progress',
      referenceId: `EV-${Math.floor(10000 + Math.random() * 90000)}`,
      description: newEvidenceDesc || 'Additional supplementary evidence provided by citizen.',
    };
    setRecord((prev) => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, newFile],
    }));
    setShowEvidenceModal(false);
    setNewEvidenceName('');
    setNewEvidenceDesc('');
    showToast('Supplementary evidence uploaded and queued for security scan.');
  };

  const handleAmendmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amendmentCorrected.trim() || !amendmentReason.trim()) return;
    const newAmendment: ComplaintAmendment = {
      id: `AMD-${Math.floor(1000 + Math.random() * 9000)}`,
      field: amendmentField,
      originalValue: amendmentOriginal,
      correctedValue: amendmentCorrected,
      reason: amendmentReason,
      submittedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'Submitted — Under Review by Nodal Desk',
    };
    setRecord((prev) => ({
      ...prev,
      amendments: [...prev.amendments, newAmendment],
    }));
    setShowAmendmentModal(false);
    setAmendmentCorrected('');
    setAmendmentReason('');
    showToast('Correction submitted. Nodal desk review logged in audit trail.');
  };

  const handleBankSrnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankSrnInput.trim()) return;
    setSrnSubmitted(true);
    setShowBankSrnModal(false);
    showToast(`Bank SRN ${bankSrnInput.trim()} linked to case.`);
  };

  const handleDownloadAcknowledgement = () => {
    const dataStr = `data:text/json;charset=utf-8,` + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Acknowledgement_${record.acknowledgementNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Official JSON acknowledgement downloaded.');
  };

  const handleShareSecurely = () => {
    if (navigator.share) {
      navigator.share({
        title: `Cyber Complaint ${record.acknowledgementNumber}`,
        text: `Official cybercrime complaint registered: ${record.acknowledgementNumber} (Amount: ₹${record.financialResponse.amountReported.toLocaleString('en-IN')})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Secure tracking link copied to clipboard.');
    }
  };

  return (
    <main className="official-tracking-page">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="official-toast" role="status" aria-live="polite">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {refreshing ? 'Refreshing complaint status from national gateway...' : ''}
      </div>

      {/* ========================================================================= */}
      {/* 1. OFFICIAL REGISTRATION CONFIRMATION */}
      {/* ========================================================================= */}
      <header className="official-conf-header">
        <div className="official-conf-top">
          <div className="official-conf-icon-wrap" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>

          <div>
            <div className="official-badge-tag">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#166534', display: 'inline-block' }}></span>
              Official National Cybercrime Intake
            </div>
            <h1 className="official-conf-title">Your complaint has been registered</h1>
            <p className="official-conf-copy">
              We have received your financial cyber-fraud complaint. Save your acknowledgement number to track progress and share it when contacting support.
            </p>
          </div>
        </div>

        {/* Structured summary */}
        <div className="official-meta-strip">
          <div className="official-meta-cell">
            <span className="official-meta-label">Official Acknowledgement</span>
            <span className="official-meta-val" style={{ color: '#1E3A8A' }}>
              {record.acknowledgementNumber}
            </span>
          </div>

          <div className="official-meta-cell">
            <span className="official-meta-label">Registered At</span>
            <span className="official-meta-val">
              {record.registeredDate} at {record.registeredTime}
            </span>
          </div>

          <div className="official-meta-cell">
            <span className="official-meta-label">Current Status</span>
            <span className="official-meta-val" style={{ color: '#1D4ED8' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1D4ED8', display: 'inline-block' }}></span>
              {record.currentStatus}
            </span>
          </div>

          <div className="official-meta-cell">
            <span className="official-meta-label">Assigned Jurisdiction</span>
            <span className="official-meta-val">
              {record.assignedState}
            </span>
          </div>

          <div className="official-meta-cell">
            <span className="official-meta-label">Last Updated</span>
            <span className="official-meta-val">
              {record.lastUpdatedAt}
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. COMPLAINT REFERENCE AND PRIMARY ACTIONS */}
      {/* ========================================================================= */}
      <section className="official-ref-card" aria-label="Complaint Reference and Actions">
        <div className="official-ref-heading-wrap">
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748B' }}>
              Complaint Reference ID
            </span>
            <div className="official-ref-number">{record.acknowledgementNumber}</div>
          </div>

          <div className="official-ref-actions">
            <button
              type="button"
              onClick={handleCopyRef}
              className="official-btn-ref"
              aria-label="Copy acknowledgement number"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              Copy reference
            </button>

            <button
              type="button"
              onClick={handleDownloadAcknowledgement}
              className="official-btn-ref"
              aria-label="Download acknowledgement document"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download acknowledgement
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="official-btn-ref"
              aria-label="Print official acknowledgement receipt"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect width="12" height="8" x="6" y="14"/>
              </svg>
              Print
            </button>

            <button
              type="button"
              onClick={handleShareSecurely}
              className="official-btn-ref"
              aria-label="Share reference securely"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              Share securely
            </button>
          </div>
        </div>

        {/* Primary and Secondary CTA hierarchy */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
          <a
            href="#complaint-status"
            className="official-btn-ref official-btn-ref-primary"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
          >
            Track complaint ↓
          </a>

          <a
            href="#submitted-complaint"
            className="official-btn-ref"
            style={{ padding: '0.55rem 1rem', fontSize: '0.9rem' }}
          >
            View submitted complaint
          </a>
        </div>
      </section>

      {/* Main Content Layout Grid */}
      <div className="official-content-grid">
        {/* ========================================================================= */}
        {/* LEFT / MAIN COLUMN */}
        {/* ========================================================================= */}
        <div className="official-main-col">
          
          {/* ========================================================================= */}
          {/* 3. PERSONALISED URGENT NEXT ACTION BANNER (CONDITIONAL) */}
          {/* ========================================================================= */}
          <section aria-label="Urgent Next Action">
            <div className="urgent-banner urgent-banner-blue">
              <div className="urgent-banner-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h2 className="urgent-banner-title">Your financial-fraud alert has been shared</h2>
              </div>
              <p className="urgent-banner-copy">
                Your transaction details were shared with the financial cyber-fraud response system on {record.financialResponse.alertDispatchedAt}.
              </p>
              <p className="urgent-banner-copy" style={{ color: '#475569', fontSize: '0.85rem' }}>
                You do not need to report the same transaction again unless an authorised official asks you to do so.
              </p>
              <div className="urgent-banner-actions">
                <a
                  href="#financial-response"
                  className="official-btn-ref official-btn-ref-primary"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                >
                  View financial response
                </a>
                <button
                  type="button"
                  onClick={() => setShowBankSrnModal(true)}
                  className="official-btn-ref"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                >
                  {srnSubmitted ? '✓ Bank SRN linked' : '+ Add bank service-request number'}
                </button>
                <a
                  href="tel:18001234"
                  className="official-btn-ref"
                  style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                >
                  Contact your bank
                </a>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. CURRENT COMPLAINT STATUS (TIMELINE) */}
          {/* ========================================================================= */}
          <section id="complaint-status" className="official-card" aria-label="Complaint status timeline">
            <div className="official-card-header">
              <div>
                <h2 className="official-card-title">
                  <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>timeline</span>
                  Complaint status
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBlockStart: '0.35rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
                    Last verified: <strong>{record.lastUpdatedAt}</strong>
                  </span>
                  <span style={{ fontSize: '0.75rem', background: '#F1F5F9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
                    ● Auto-sync with NCRP Gateway
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="official-btn-ref"
                aria-label="Refresh status from central gateway"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: refreshing ? 'rotate(180deg)' : 'none', transition: 'transform 0.5s ease' }}
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                </svg>
                {refreshing ? 'Verifying...' : 'Refresh status'}
              </button>
            </div>

            {/* Accessible Timeline using ordered list */}
            <ol className="official-status-timeline">
              {record.events.map((event, idx) => {
                const isExpanded = expandedMeans[event.id];
                return (
                  <li key={event.id} className="timeline-event-item">
                    <div className={`timeline-event-dot timeline-dot-${event.status}`}>
                      {event.status === 'completed' ? '✓' : idx + 1}
                    </div>

                    <div className="timeline-event-body">
                      <div className="timeline-event-header">
                        <h3 className="timeline-event-title">{event.title}</h3>
                        <span className={`status-badge badge-${event.status}`}>
                          {event.status.replace('_', ' ')}
                        </span>
                      </div>

                      <p className="timeline-event-text">{event.citizenExplanation}</p>

                      <div className="timeline-event-meta">
                        {event.occurredAt && <span><strong>Time:</strong> {event.occurredAt}</span>}
                        {event.responsibleEntity && <span><strong>Responsible:</strong> {event.responsibleEntity}</span>}
                        {event.sourceSystem && <span><strong>System:</strong> {event.sourceSystem}</span>}
                        {event.sourceReference && <span><strong>Ref:</strong> {event.sourceReference}</span>}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleMeans(event.id)}
                        className="timeline-toggle-btn"
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? '▲ Hide what this means' : '▼ What this means'}
                      </button>

                      {isExpanded && (
                        <div className="timeline-explanation-box">
                          <strong>Official Guidance:</strong> {event.whatThisMeans}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* ========================================================================= */}
          {/* 5. "WHAT YOU NEED TO DO NOW" TASK CARD */}
          {/* ========================================================================= */}
          <section className="task-now-card" aria-label="What you need to do now">
            <div className="task-now-header">
              <span style={{ fontSize: '1.4rem' }}>📋</span>
              <h2 className="task-now-title">What you need to do now</h2>
            </div>

            {!srnSubmitted ? (
              <div>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#92400E', lineHeight: 1.5 }}>
                  The Nodal Bank Desk has flagged your reported transaction and requested the internal bank dispute reference.
                </p>

                <div className="task-now-grid">
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>What is needed</span>
                    <p style={{ margin: '0.2rem 0 0', fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>Bank Service Request Number (SRN)</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Why it is needed</span>
                    <p style={{ margin: '0.2rem 0 0', color: '#334155', fontSize: '0.85rem' }}>Synchronises police lien request with your bank's internal fraud ticket</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Deadline</span>
                    <p style={{ margin: '0.2rem 0 0', fontWeight: 700, color: '#B45309', fontSize: '0.9rem' }}>Within 24 hours of reporting</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Requested by</span>
                    <p style={{ margin: '0.2rem 0 0', color: '#334155', fontSize: '0.85rem' }}>Nodal Bank Coordinator Cell</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setShowBankSrnModal(true)}
                    className="ux4g-btn"
                    style={{ background: '#B45309', color: '#FFFFFF', padding: '0.5rem 1.25rem', fontWeight: 700, borderRadius: '8px' }}
                  >
                    Provide bank service-request number
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTimingModal(true)}
                    className="timeline-toggle-btn"
                    style={{ color: '#92400E', fontWeight: 600 }}
                  >
                    Where do I find my bank SRN?
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '1rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#166534', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="ux4g-icon-outlined" style={{ color: '#166534' }}>check_circle</span>
                  No action is required right now
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                  Your bank service-request number has been recorded and submitted to the investigating desk. We will notify you via SMS and email if any additional information or verification is required. Keep your complaint number and evidence safe.
                </p>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 6. FINANCIAL RESPONSE DETAILS */}
          {/* ========================================================================= */}
          <section id="financial-response" className="official-card" aria-label="Financial response details">
            <div className="official-card-header">
              <h2 className="official-card-title">
                <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>account_balance</span>
                Financial response
              </h2>
              <span className="status-badge badge-in_progress">
                {record.financialResponse.currentInstitutionResponse}
              </span>
            </div>

            <div className="fin-response-grid">
              <div className="fin-response-cell">
                <span className="official-meta-label">Amount Reported</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  ₹{record.financialResponse.amountReported.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Payment Method</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                  {record.financialResponse.paymentMethod}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Transaction Date & Time</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0F172A' }}>
                  {record.financialResponse.transactionDate} at {record.financialResponse.transactionTime}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">UTR / Reference ID</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', color: '#1E40AF' }}>
                  {record.financialResponse.utrReference}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Beneficiary Recipient</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'monospace', color: '#334155' }}>
                  {record.financialResponse.recipientMasked}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Dispatched to 1930 / CFCFRMS</span>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#166534' }}>
                  {record.financialResponse.alertDispatchedAt}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Confirmed Amount Held</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: record.financialResponse.amountHeld ? '#166534' : '#64748B' }}>
                  {record.financialResponse.amountHeld ? `₹${record.financialResponse.amountHeld.toLocaleString('en-IN')}` : '₹0 (Awaiting Bank Lien Hold)'}
                </div>
              </div>

              <div className="fin-response-cell">
                <span className="official-meta-label">Confirmed Amount Recovered</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: record.financialResponse.amountRecovered ? '#166534' : '#64748B' }}>
                  {record.financialResponse.amountRecovered ? `₹${record.financialResponse.amountRecovered.toLocaleString('en-IN')}` : '₹0 (Pending Court/Lien Order)'}
                </div>
              </div>
            </div>

            {/* Clear Legal Disclaimer Callout */}
            <div className="fin-disclaimer-box">
              <strong style={{ display: 'block', marginBlockEnd: '0.35rem' }}>Important Transparency Notice:</strong>
              {record.financialResponse.disclaimer}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 7. SUBMITTED COMPLAINT SUMMARY & AMENDMENT AUDIT TRAIL */}
          {/* ========================================================================= */}
          <section id="submitted-complaint" className="official-card" aria-label="Your submitted complaint summary">
            <div className="official-card-header">
              <div>
                <h2 className="official-card-title">
                  <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>assignment</span>
                  Your submitted complaint
                </h2>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                  Recorded on official intake file. All changes must be recorded as audited amendments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAmendmentModal(true)}
                className="official-btn-ref"
                style={{ fontSize: '0.825rem' }}
              >
                ✎ Report an error / Amendment
              </button>
            </div>

            {/* Accordion list */}
            <div>
              {/* Accordion 1: Incident summary */}
              <div className="complaint-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleAccordion('incident')}
                  className="complaint-accordion-header"
                  aria-expanded={openAccordions.incident}
                >
                  <span>1. Incident Narrative & Summary</span>
                  <span>{openAccordions.incident ? '▲' : '▼'}</span>
                </button>
                {openAccordions.incident && (
                  <div className="complaint-accordion-body">
                    <p style={{ margin: 0 }}>{record.narrativeSummary}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Immediate actions */}
              <div className="complaint-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleAccordion('actions')}
                  className="complaint-accordion-header"
                  aria-expanded={openAccordions.actions}
                >
                  <span>2. Immediate First-Response Actions Logged</span>
                  <span>{openAccordions.actions ? '▲' : '▼'}</span>
                </button>
                {openAccordions.actions && (
                  <div className="complaint-accordion-body">
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <li><strong>National Helpline 1930:</strong> Financial fraud alert dispatched via CFCFRMS API.</li>
                      <li><strong>Bank Notification:</strong> Inquired regarding transaction freeze and beneficiary lien.</li>
                      <li><strong>Device & Credentials Safety:</strong> Confirmed no OTP/PIN was disclosed after realization.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Transaction details */}
              <div className="complaint-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleAccordion('transactions')}
                  className="complaint-accordion-header"
                  aria-expanded={openAccordions.transactions}
                >
                  <span>3. Transaction & Payment Details</span>
                  <span>{openAccordions.transactions ? '▲' : '▼'}</span>
                </button>
                {openAccordions.transactions && (
                  <div className="complaint-accordion-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      <div><strong>Amount:</strong> ₹{record.financialResponse.amountReported.toLocaleString('en-IN')}</div>
                      <div><strong>Method:</strong> {record.financialResponse.paymentMethod}</div>
                      <div><strong>UTR / Ref:</strong> {record.financialResponse.utrReference}</div>
                      <div><strong>Provider:</strong> {record.financialResponse.bankOrProvider}</div>
                      <div><strong>Recipient:</strong> {record.financialResponse.recipientMasked}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 4: Suspect details */}
              <div className="complaint-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleAccordion('suspect')}
                  className="complaint-accordion-header"
                  aria-expanded={openAccordions.suspect}
                >
                  <span>4. Suspect & Contact Channels</span>
                  <span>{openAccordions.suspect ? '▲' : '▼'}</span>
                </button>
                {openAccordions.suspect && (
                  <div className="complaint-accordion-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      <div><strong>Channel Used:</strong> {record.suspectDetails.contactChannel}</div>
                      <div><strong>Suspect Phone:</strong> {record.suspectDetails.suspectPhone}</div>
                      <div><strong>Suspect Handle/VPA:</strong> {record.suspectDetails.suspectHandle}</div>
                      <div><strong>Claimed Organization:</strong> {record.suspectDetails.suspectClaimedOrg}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 5: Citizen & Jurisdiction */}
              <div className="complaint-accordion-item">
                <button
                  type="button"
                  onClick={() => toggleAccordion('citizen')}
                  className="complaint-accordion-header"
                  aria-expanded={openAccordions.citizen}
                >
                  <span>5. Citizen Details & Jurisdiction</span>
                  <span>{openAccordions.citizen ? '▲' : '▼'}</span>
                </button>
                {openAccordions.citizen && (
                  <div className="complaint-accordion-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                      <div><strong>Complainant:</strong> {record.citizenName}</div>
                      <div><strong>Mobile:</strong> {record.citizenMobileMasked}</div>
                      <div><strong>Email:</strong> {record.citizenEmailMasked}</div>
                      <div><strong>State:</strong> {record.assignedState}</div>
                      <div><strong>Investigating Unit:</strong> {record.jurisdictionUnit}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Audit Trail of Amendments */}
            {record.amendments.length > 0 && (
              <div style={{ marginBlockStart: '1.25rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1E293B', margin: '0 0 0.5rem 0' }}>
                  Audited Complaint Amendments ({record.amendments.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {record.amendments.map((amd) => (
                    <div key={amd.id} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBlockEnd: '0.35rem' }}>
                        <strong>{amd.field}</strong>
                        <span className="status-badge badge-action_required">{amd.status}</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        <span>Original: <del>{amd.originalValue}</del></span> → <strong style={{ color: '#0F172A' }}>{amd.correctedValue}</strong>
                      </div>
                      <div style={{ color: '#475569', marginBlockStart: '0.25rem' }}>
                        <em>Reason: {amd.reason}</em> — <span style={{ fontSize: '0.775rem' }}>{amd.submittedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 8. EVIDENCE RECEIPT */}
          {/* ========================================================================= */}
          <section className="official-card" aria-label="Evidence received receipt">
            <div className="official-card-header">
              <div>
                <h2 className="official-card-title">
                  <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>attachment</span>
                  Evidence received
                </h2>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748B' }}>
                  Receipt of electronic files submitted during complaint intake.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(true)}
                  className="official-btn-ref official-btn-ref-primary"
                  style={{ fontSize: '0.825rem' }}
                >
                  + Add more evidence
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="evidence-receipt-table">
                <thead>
                  <tr>
                    <th>Evidence Item</th>
                    <th>Type / Size</th>
                    <th>Uploaded</th>
                    <th>Security Scan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {record.evidenceFiles.map((ev) => (
                    <tr key={ev.id}>
                      <td>
                        <strong style={{ color: '#0F172A', display: 'block' }}>{ev.name}</strong>
                        <span style={{ fontSize: '0.775rem', color: '#64748B' }}>Ref: {ev.referenceId}</span>
                      </td>
                      <td>{ev.type} <br /><span style={{ fontSize: '0.775rem', color: '#64748B' }}>{ev.size}</span></td>
                      <td style={{ fontSize: '0.825rem' }}>{ev.uploadedAt}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            ev.status === 'Accepted' ? 'badge-completed'
                            : ev.status === 'Could not be processed' ? 'badge-failed'
                            : 'badge-waiting'
                          }`}
                        >
                          {ev.status}
                        </span>
                      </td>
                      <td>
                        {ev.status === 'Could not be processed' ? (
                          <button
                            type="button"
                            onClick={() => setShowEvidenceModal(true)}
                            className="official-btn-ref"
                            style={{ color: '#DC2626', borderColor: '#FCA5A5', padding: '0.25rem 0.65rem' }}
                          >
                            Upload again
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => showToast(`Viewing verification hash for ${ev.name}`)}
                            className="timeline-toggle-btn"
                          >
                            View details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginBlockStart: '1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.85rem', fontSize: '0.825rem', color: '#475569' }}>
              <strong style={{ color: '#1E293B' }}>Preservation Instruction:</strong> Keep the original files, SMS receipts, and physical devices intact. Uploaded digital copies may not replace original evidence if required for forensic examination by an investigating officer.
            </div>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT / SIDE COLUMN */}
        {/* ========================================================================= */}
        <div className="official-side-col">
          
          {/* ========================================================================= */}
          {/* 9. COMMUNICATION PREFERENCES */}
          {/* ========================================================================= */}
          <section className="official-card" aria-label="How we will contact you">
            <div className="official-card-header" style={{ marginBlockEnd: '0.75rem' }}>
              <h2 className="official-card-title" style={{ fontSize: '1.1rem' }}>
                <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>notifications</span>
                How we will contact you
              </h2>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 1rem 0' }}>
              Status updates will refer to your official complaint number <code>{record.acknowledgementNumber}</code>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Registered Mobile:</span>
                <strong>{record.citizenMobileMasked}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Registered Email:</span>
                <strong>{record.citizenEmailMasked}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>Preferred Language:</span>
                <strong>{record.preferredLanguage}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                <span style={{ color: '#64748B' }}>SMS Update Dispatch:</span>
                <span style={{ color: '#166534', fontWeight: 700 }}>● Active</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Email Delivery:</span>
                <span style={{ color: '#166534', fontWeight: 700 }}>● Active</span>
              </div>
            </div>

            <div style={{ marginBlockStart: '1.15rem' }}>
              <button
                type="button"
                onClick={() => setShowCommPrefModal(true)}
                className="official-btn-ref"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Update notification preference
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 11. SECURITY WARNING: STAY ALERT FOR RECOVERY SCAMS */}
          {/* ========================================================================= */}
          <section className="official-card" style={{ border: '1.5px solid #E11D48', background: '#FFF1F2' }} aria-label="Stay alert for recovery scams">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBlockEnd: '0.75rem' }}>
              <span style={{ fontSize: '1.35rem' }}>🛡️</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#9F1239', margin: 0 }}>
                Stay alert for recovery scams
              </h2>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#BE123C', lineHeight: 1.45, marginBlockEnd: '0.85rem' }}>
              Fraudsters monitor social forums and may contact you claiming they can recover your lost funds for an upfront fee.
            </p>

            <ul style={{ margin: 0, paddingLeft: '1.15rem', fontSize: '0.825rem', color: '#881337', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li><strong>Never share</strong> an OTP, PIN, password, CVV, or full card details.</li>
              <li><strong>Do not pay a recovery fee</strong> to any unknown person or private recovery agency.</li>
              <li><strong>Do not install</strong> AnyDesk, TeamViewer, or screen-sharing apps on advice of callers.</li>
              <li><strong>Do not move money</strong> to a supposed "RBI safe account" or "police escrow".</li>
            </ul>

            <div style={{ marginBlockStart: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="/check"
                className="official-btn-ref"
                style={{ background: '#FFFFFF', color: '#9F1239', borderColor: '#FECDD3', justifyContent: 'center' }}
              >
                Check a suspicious caller / identifier →
              </a>
              <button
                type="button"
                onClick={() => showToast('Suspicious contact reporting form logged.')}
                className="timeline-toggle-btn"
                style={{ color: '#9F1239', alignSelf: 'center', fontSize: '0.8rem' }}
              >
                Report a suspicious follow-up contact
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 10. HELP AND ESCALATION */}
          {/* ========================================================================= */}
          <section id="help-section" className="official-card" aria-label="Need help with this complaint">
            <h2 className="official-card-title" style={{ fontSize: '1.1rem', marginBlockEnd: '0.75rem' }}>
              <span className="ux4g-icon-outlined" style={{ color: '#1D4ED8' }}>support_agent</span>
              Need help with this complaint?
            </h2>

            <p style={{ fontSize: '0.825rem', color: '#64748B', marginBlockEnd: '1rem', lineHeight: 1.4 }}>
              Choose the appropriate department based on your requirement:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a
                href="tel:1930"
                className="official-btn-ref"
                style={{ background: '#FFF7ED', borderColor: '#FDBA74', color: '#9A3412', justifyContent: 'space-between' }}
              >
                <span><strong>Helpline 1930</strong> (Financial Fraud Desk)</span>
                <span>Call ↗</span>
              </a>

              <button
                type="button"
                onClick={() => showToast('Connecting to Pune Rural Cyber Police Station desk: 020-2565-XXXX')}
                className="official-btn-ref"
                style={{ justifyContent: 'space-between' }}
              >
                <span>Assigned Police Station Desk</span>
                <span>Inquire ↗</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGrievanceModal(true)}
                className="official-btn-ref"
                style={{ justifyContent: 'space-between', color: '#1D4ED8' }}
              >
                <span>Raise a grievance / Nodal escalation</span>
                <span>File ↗</span>
              </button>

              <a
                href="tel:112"
                className="official-btn-ref"
                style={{ color: '#DC2626', borderColor: '#FCA5A5', justifyContent: 'space-between' }}
              >
                <span>Emergency Police Control: <strong>112</strong></span>
                <span>Emergency ↗</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS AND DRAWERS */}
      {/* ========================================================================= */}

      {/* Modal 1: Add More Evidence */}
      {showEvidenceModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Upload Supplementary Evidence</h3>
              <button
                type="button"
                onClick={() => setShowEvidenceModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEvidenceSubmit}>
              <div className="modal-card-body">
                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">File Name or Description *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Additional WhatsApp chat export.pdf"
                    value={newEvidenceName}
                    onChange={(e) => setNewEvidenceName(e.target.value)}
                    className="checker-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Evidence Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what this evidence shows (e.g. caller UPI handle, transfer confirmation SMS, timestamp)"
                    value={newEvidenceDesc}
                    onChange={(e) => setNewEvidenceDesc(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ background: '#F8FAFC', border: '1px dashed #94A3B8', borderRadius: '8px', padding: '1.25rem', textAlign: 'center' }}>
                  <span className="ux4g-icon-outlined" style={{ fontSize: '2rem', color: '#64748B' }}>cloud_upload</span>
                  <p style={{ margin: '0.35rem 0', fontSize: '0.85rem', color: '#334155' }}>
                    Select file from your device (PDF, PNG, JPG, MP3 up to 10MB)
                  </p>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>File will be verified with SHA-256 integrity hash</span>
                </div>
              </div>

              <div className="modal-card-footer">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="official-btn-ref"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="official-btn-ref official-btn-ref-primary"
                >
                  Confirm & Upload Evidence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Report Error / File Amendment */}
      {showAmendmentModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Report Error / File Complaint Amendment</h3>
              <button
                type="button"
                onClick={() => setShowAmendmentModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAmendmentSubmit}>
              <div className="modal-card-body">
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 1rem 0' }}>
                  Submitted complaints cannot be silently edited. Amendments are logged in the official audit trail and reviewed by the nodal desk.
                </p>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Field to Correct</label>
                  <select
                    value={amendmentField}
                    onChange={(e) => {
                      setAmendmentField(e.target.value);
                      if (e.target.value === 'Transaction / UTR Reference') setAmendmentOriginal('TEST20260827001');
                      if (e.target.value === 'Amount Transferred') setAmendmentOriginal('₹48,500');
                      if (e.target.value === 'Suspect Phone Number') setAmendmentOriginal('+91 98765 43210');
                    }}
                    className="cfr-form-select"
                  >
                    <option value="Transaction / UTR Reference">Transaction / UTR Reference</option>
                    <option value="Amount Transferred">Amount Transferred</option>
                    <option value="Suspect Phone Number">Suspect Phone Number</option>
                    <option value="Recipient UPI ID">Recipient UPI ID</option>
                  </select>
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Original Recorded Value</label>
                  <input
                    type="text"
                    disabled
                    value={amendmentOriginal}
                    className="checker-input-field"
                    style={{ width: '100%', background: '#F1F5F9', color: '#64748B' }}
                  />
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Corrected Value *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter correct detail"
                    value={amendmentCorrected}
                    onChange={(e) => setAmendmentCorrected(e.target.value)}
                    className="checker-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Reason for Correction *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Explain why this correction is needed (e.g. typo on bank statement, updated UTR from branch)"
                    value={amendmentReason}
                    onChange={(e) => setAmendmentReason(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div className="modal-card-footer">
                <button
                  type="button"
                  onClick={() => setShowAmendmentModal(false)}
                  className="official-btn-ref"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="official-btn-ref official-btn-ref-primary"
                >
                  Submit Official Amendment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Add Bank SRN */}
      {showBankSrnModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Link Bank Service Request Number</h3>
              <button
                type="button"
                onClick={() => setShowBankSrnModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBankSrnSubmit}>
              <div className="modal-card-body">
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem 0' }}>
                  When you report unauthorized or deceptive payments to your bank, they generate a <strong>Complaint or Service Request Number (SRN)</strong>. Providing this links the police lien tracking with your bank.
                </p>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Bank Name</label>
                  <input
                    type="text"
                    disabled
                    value="State Bank of India (SBI)"
                    className="checker-input-field"
                    style={{ width: '100%', background: '#F1F5F9' }}
                  />
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Bank Dispute / SRN Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SBI-DISP-2026-94812"
                    value={bankSrnInput}
                    onChange={(e) => setBankSrnInput(e.target.value)}
                    className="checker-input-field"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div className="modal-card-footer">
                <button
                  type="button"
                  onClick={() => setShowBankSrnModal(false)}
                  className="official-btn-ref"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="official-btn-ref official-btn-ref-primary"
                >
                  Save & Link SRN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Why Timing Matters */}
      {showTimingModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Why Timing Matters in Financial Cyber Fraud</h3>
              <button
                type="button"
                onClick={() => setShowTimingModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <div className="modal-card-body">
              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                Financial cyber fraudsters transfer money across multiple "mule" bank accounts within minutes of receiving funds to evade freezing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
                <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.85rem' }}>
                  <strong style={{ color: '#1E40AF', display: 'block' }}>First 2 Hours (Golden Window):</strong>
                  <span style={{ fontSize: '0.825rem', color: '#1E3A8A' }}>
                    Calling 1930 within 2 hours enables the CFCFRMS system to send real-time API holds before funds reach final withdrawal ATMs or crypto conversions.
                  </span>
                </div>

                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '0.85rem' }}>
                  <strong style={{ color: '#92400E', display: 'block' }}>What Helpline 1930 Does:</strong>
                  <span style={{ fontSize: '0.825rem', color: '#78350F' }}>
                    1930 operators connect simultaneously to participating bank nodal officers to place temporary liens on the destination account without waiting for a written FIR.
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-card-footer">
              <a
                href="tel:1930"
                className="ux4g-btn"
                style={{ background: '#EA580C', color: '#FFFFFF', padding: '0.45rem 1rem', textDecoration: 'none', borderRadius: '6px', fontWeight: 700 }}
              >
                Call 1930 Now
              </a>
              <button
                type="button"
                onClick={() => setShowTimingModal(false)}
                className="official-btn-ref"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 5: Raise Grievance */}
      {showGrievanceModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Escalate Grievance / Nodal Review</h3>
              <button
                type="button"
                onClick={() => setShowGrievanceModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowGrievanceModal(false);
                showToast('Grievance logged under reference GRV-MH-2026-8914.');
              }}
            >
              <div className="modal-card-body">
                <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 1rem 0' }}>
                  If your complaint has not progressed or you believe the response was inappropriate, you may escalate to the State Nodal Officer.
                </p>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Grievance Category</label>
                  <select
                    value={grievanceCategory}
                    onChange={(e) => setGrievanceCategory(e.target.value)}
                    className="cfr-form-select"
                  >
                    <option value="No progress after 72 hours">No progress after 72 hours</option>
                    <option value="Bank did not respond to lien">Bank did not respond to lien request</option>
                    <option value="Jurisdiction assignment delayed">Jurisdiction assignment delayed</option>
                    <option value="Other administrative concern">Other administrative concern</option>
                  </select>
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Describe Grievance *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide specific details on why you are escalating this complaint"
                    value={grievanceText}
                    onChange={(e) => setGrievanceText(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div className="modal-card-footer">
                <button
                  type="button"
                  onClick={() => setShowGrievanceModal(false)}
                  className="official-btn-ref"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="official-btn-ref official-btn-ref-primary"
                >
                  Submit Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 6: Update Notification Preferences */}
      {showCommPrefModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-card-header">
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Notification & Communication Settings</h3>
              <button
                type="button"
                onClick={() => setShowCommPrefModal(false)}
                className="timeline-toggle-btn"
                style={{ fontSize: '1.25rem', color: '#64748B' }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowCommPrefModal(false);
                showToast('Notification preferences updated and verified.');
              }}
            >
              <div className="modal-card-body">
                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Mobile Number for SMS Alerts</label>
                  <input
                    type="text"
                    value={commPhone}
                    onChange={(e) => setCommPhone(e.target.value)}
                    className="checker-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ marginBlockEnd: '1rem' }}>
                  <label className="field-label-bold">Email Address</label>
                  <input
                    type="email"
                    value={commEmail}
                    onChange={(e) => setCommEmail(e.target.value)}
                    className="checker-input-field"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.85rem', marginBlockEnd: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked />
                    Send immediate SMS whenever bank responds
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', marginBlockStart: '0.4rem' }}>
                    <input type="checkbox" defaultChecked />
                    Send email summary with case officer assignment
                  </label>
                </div>

                {!commOtpSent ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCommOtpSent(true);
                      showToast('Security verification OTP sent to registered mobile.');
                    }}
                    className="official-btn-ref"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Send OTP to verify changes
                  </button>
                ) : (
                  <div style={{ marginBlockStart: '0.5rem' }}>
                    <label className="field-label-bold">Enter OTP sent to mobile</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 482910"
                      className="checker-input-field"
                      style={{ width: '100%' }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-card-footer">
                <button
                  type="button"
                  onClick={() => setShowCommPrefModal(false)}
                  className="official-btn-ref"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="official-btn-ref official-btn-ref-primary"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
