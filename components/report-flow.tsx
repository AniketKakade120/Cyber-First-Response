'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useMemo, useRef, useState } from 'react';
import { DRAFT_STORAGE_KEY, emptyDraft } from '../lib/demo-data';
import { interpretIncident } from '../lib/services';
import type { IncidentDraft } from '../lib/types';

const steps = ['Act now', 'What happened', 'Transaction', 'Suspect', 'Evidence', 'Your details', 'Review'];
const actionItems = ['Call 1930', 'Contact the bank or payment provider', 'Block affected cards or payment access', 'Do not make another payment', 'Do not share an OTP, PIN or password', 'Preserve messages and transaction records'];
const actionChoices = ['I have done this', 'Help me do this', 'Not applicable'];
const paymentMethods = ['UPI', 'Bank transfer', 'Card', 'Wallet', 'Cash deposit', 'Cryptocurrency', 'Other'];
const contactChannels = ['Phone call', 'WhatsApp', 'Telegram', 'Email', 'Social media', 'Website or app', 'Other'];

function Field({ label, hint, optional, children }: { label: string; hint?: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="form-field">
      <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-xs">
        <span className="ux4g-label-l-strong">
          {label}
          {!optional && <span className="mandatory-asterisk" style={{ color: '#DC2626', marginLeft: '3px', fontWeight: 'bold' }}>*</span>}
        </span>
        {optional && <span className="ux4g-tag-tonal-neutral ux4g-tag-s">Optional</span>}
      </div>
      {hint && <p className="field-hint ux4g-body-s-default">{hint}</p>}
      {children}
    </div>
  );
}

export function ReportFlow() {
  const [draft, setDraft] = useState<IncidentDraft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState('');
  const [mode, setMode] = useState<'AI-assisted' | 'Guided assistance'>('Guided assistance');
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const restoreTimer = window.setTimeout(async () => {
      const initialNarrative = localStorage.getItem('cfr-initial-narrative');
      let baseDraft = emptyDraft;

      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        try {
          baseDraft = { ...emptyDraft, ...JSON.parse(stored) };
          setLastSavedAt(baseDraft.savedAt || '');
        } catch { localStorage.removeItem(DRAFT_STORAGE_KEY); }
      }

      if (initialNarrative && initialNarrative.trim()) {
        localStorage.removeItem('cfr-initial-narrative');
        const text = initialNarrative.trim();
        baseDraft = { ...baseDraft, narrative: text, step: 2 };
        setDraft(baseDraft);
        setReady(true);

        setBusy(true);
        const result = await interpretIncident(text);
        const extracted = result.data as any;
        setMode(result.mode);
        setDraft((current) => ({
          ...current,
          interpretation: result.data,
          amount: current.amount || (result.data.amount?.toString() ?? ''),
          paymentMethod: current.paymentMethod || (result.data.paymentMethod ?? ''),
          provider: current.provider || (extracted.extractedProvider ?? ''),
          transactionId: current.transactionId || (extracted.extractedTxId ?? ''),
          recipient: current.recipient || (extracted.extractedRecipient ?? ''),
          date: current.date || (extracted.extractedDate ?? ''),
          time: current.time || (extracted.extractedTime ?? ''),
          contactChannel: current.contactChannel || (result.data.platform ?? ''),
          step: 2,
        }));
        setBusy(false);
      } else {
        setDraft(baseDraft);
        setReady(true);
      }
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const next = { ...draft, savedAt: new Date().toISOString() };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(next));
      setLastSavedAt(next.savedAt);
    }, 500);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [draft, ready]);

  const savedLabel = useMemo(() => lastSavedAt ? `Saved locally at ${new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Saving locally…', [lastSavedAt]);
  const update = <K extends keyof IncidentDraft>(key: K, value: IncidentDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const organise = async () => {
    if (!draft.narrative.trim()) { setErrors(['Describe what happened before asking for help to organise it.']); return; }
    setBusy(true); setErrors([]);
    const result = await interpretIncident(draft.narrative.slice(0, 5000));
    const extracted = result.data as any;
    setMode(result.mode);
    setDraft((current) => ({
      ...current,
      interpretation: result.data,
      amount: current.amount || (result.data.amount?.toString() ?? ''),
      paymentMethod: current.paymentMethod || (result.data.paymentMethod ?? ''),
      provider: current.provider || (extracted.extractedProvider ?? ''),
      transactionId: current.transactionId || (extracted.extractedTxId ?? ''),
      recipient: current.recipient || (extracted.extractedRecipient ?? ''),
      date: current.date || (extracted.extractedDate ?? ''),
      time: current.time || (extracted.extractedTime ?? ''),
      contactChannel: current.contactChannel || (result.data.platform ?? ''),
      step: 2,
    }));
    setBusy(false);
  };

  const goNext = () => {
    const nextErrors: string[] = [];
    if (draft.step === 1 && !draft.narrative.trim()) nextErrors.push('Describe what happened.');
    if (draft.step === 2) { if (!draft.amount) nextErrors.push('Enter the amount lost or choose I don’t know.'); if (!draft.paymentMethod) nextErrors.push('Choose a payment method.'); if (draft.interpretation && !draft.interpretationConfirmed) nextErrors.push('Review and confirm the interpretation suggestions, then correct the fields below.'); }
    if (draft.step === 5) { if (!draft.fullName.trim()) nextErrors.push('Enter your full name.'); if (!draft.mobile.trim()) nextErrors.push('Enter your mobile number.'); }
    if (draft.step === 6) { if (!draft.reviewed) nextErrors.push('Confirm that you reviewed and corrected the information.'); if (!draft.prototypeConsent) nextErrors.push('Confirm that you consent to save this report on this device.'); }
    setErrors(nextErrors);
    if (!nextErrors.length) update('step', Math.min(6, draft.step + 1));
  };

  const addEvidence = (files: FileList | null) => {
    if (!files) return;
    const additions = Array.from(files).map((file, index) => ({ id: `${Date.now()}-${index}`, name: file.name, type: file.type || 'Unknown', size: file.size, state: 'uploading' as const }));
    update('evidence', [...draft.evidence, ...additions]);
    window.setTimeout(() => setDraft((current) => ({ ...current, evidence: current.evidence.map((item) => additions.some((added) => added.id === item.id) ? { ...item, state: 'attached' } : item) })), 700);
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setDraft(emptyDraft);
    setErrors([]);
  };

  const submit = () => {
    const nextErrors = [!draft.reviewed && 'Confirm that you reviewed the information.', !draft.prototypeConsent && 'Confirm that you consent to save this report on this device.'].filter(Boolean) as string[];
    if (nextErrors.length) { setErrors(nextErrors); return; }
    localStorage.setItem('cfr-local-acknowledgement', JSON.stringify({ id: 'LOCAL-REPORT', at: new Date().toISOString(), summary: draft.narrative, amount: draft.amount, paymentMethod: draft.paymentMethod }));
    window.location.href = '/complaint/local';
  };

  if (!ready) return <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-s" role="status"><span className="ux4g-spinner ux4g-spinner-md" aria-hidden="true" /><span>Restoring local draft…</span></div>;

  return (
    <div className="report-workspace">
      <div className="report-toolbar">
        <p className="ux4g-label-m-strong" aria-live="polite"><span className="ux4g-icon-outlined" aria-hidden="true">check_circle</span>{savedLabel}</p>
        <div><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="tel:1930"><span className="ux4g-icon-outlined" aria-hidden="true">call</span> Call 1930</a><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/"><span className="ux4g-icon-outlined" aria-hidden="true">bookmark</span> Save and continue later</a><button className="ux4g-btn ux4g-btn-text-danger ux4g-btn-sm" onClick={clearDraft} type="button">Clear draft</button></div>
      </div>
      <nav className="custom-report-progress" aria-label="Report progress">
        <ol className="custom-stepper-list">
          {steps.map((label, index) => {
            const isCompleted = index < draft.step;
            const isCurrent = index === draft.step;
            const isPending = index > draft.step;

            return (
              <li
                key={label}
                className={`custom-step-item ${isCompleted ? 'is-completed' : ''} ${isCurrent ? 'is-current' : ''} ${isPending ? 'is-pending' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Connecting Line */}
                {index > 0 && <div className="step-connector" />}

                <div className="step-content">
                  {/* Circular Number Badge */}
                  <div className="step-badge">
                    {isCompleted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Step Title Label */}
                  <span className="step-label">{label}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className={`report-shell ${draft.step > 0 ? 'has-no-sidebar' : ''}`}>
        <section className="report-step" aria-labelledby="active-step-title">
        <div className="mobile-progress"><span className="ux4g-label-m-strong">Step {draft.step + 1} of {steps.length}</span><span aria-live="polite">{savedLabel}</span></div>
        {/* Toastr Error Notification */}
        {errors.length > 0 && (
          <div className="toastr-error-container" role="alert">
            <div className="toastr-error-card">
              <div className="toastr-icon-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div className="toastr-content">
                <strong className="toastr-title">Please check the following:</strong>
                <ul className="toastr-list">
                  {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
              </div>
              <button className="toastr-close-btn" onClick={() => setErrors([])} type="button" aria-label="Close error toast">
                &times;
              </button>
            </div>
          </div>
        )}

        {draft.step === 0 && (
          <div>
            <h2 id="active-step-title" className="ux4g-heading-l-strong">First, let’s reduce further loss</h2>
            <p className="ux4g-body-m-default">You can continue even if every action is not complete.</p>

            <div className="action-checklist">
              {actionItems.map((item) => (
                <div className="action-question-card" key={item}>
                  <h3 className="action-question-title">{item}</h3>
                  <div className="action-radio-group">
                    {actionChoices.map((choice) => {
                      const isChecked = draft.immediateActions[item] === choice;
                      return (
                        <label key={choice} className={`action-radio-option ${isChecked ? 'is-active' : ''}`}>
                          <input
                            type="radio"
                            name={item}
                            className="action-radio-native"
                            checked={isChecked}
                            onChange={() => update('immediateActions', { ...draft.immediateActions, [item]: choice })}
                          />
                          <span className="action-radio-circle">
                            {isChecked && <span className="action-radio-dot" />}
                          </span>
                          <span className="action-radio-text">{choice}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {draft.step === 1 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Describe what happened in your own words</h2><p className="ux4g-body-m-default">Include the details you remember. Normal punctuation, URLs, handles and hashtags are allowed.</p><Field label="What happened?" hint="Example: I received an investment message on WhatsApp and transferred ₹25,000 using UPI."><div className="ux4g-textarea ux4g-textarea-default ux4g-textarea-md"><textarea className="ux4g-textarea-input" value={draft.narrative} onChange={(event) => update('narrative', event.target.value)} rows={8} aria-label="Incident description" /></div></Field><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" disabled={busy} onClick={organise} type="button">{busy ? 'Organising…' : 'Help organise my report'}</button></div>}

        {draft.step === 2 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Transaction details</h2>{draft.interpretation && <div className="ai-card ux4g-card ux4g-card-solid ux4g-card-vertical"><div className="ux4g-card-body"><div><h3 className="ux4g-card-title">Here is what we understood</h3><dl className="review-list"><div><dt>Suggested category</dt><dd>{draft.interpretation.suggestedCategory || 'Missing'}</dd></div><div><dt>Amount</dt><dd>{draft.interpretation.amount ? `₹${draft.interpretation.amount.toLocaleString('en-IN')}` : 'Missing'}</dd></div><div><dt>Payment method</dt><dd>{draft.interpretation.paymentMethod || 'Missing'}</dd></div><div><dt>Platform</dt><dd>{draft.interpretation.platform || 'Missing'}</dd></div></dl><label className="ux4g-checkbox ux4g-checkbox-md"><input className="ux4g-checkbox-input" type="checkbox" checked={draft.interpretationConfirmed} onChange={(event) => update('interpretationConfirmed', event.target.checked)} /><span className="ux4g-checkbox-control" aria-hidden="true"><span className="ux4g-checkmark" /></span><span className="ux4g-checkbox-label">I reviewed these suggestions. I will correct them below.</span></label></div></div></div>}
          <div className="form-grid"><Field label="Amount lost" hint="Enter the amount shown in your transaction records"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="numeric" value={draft.amount} onChange={(event) => update('amount', event.target.value.replace(/[^0-9]/g, ''))} placeholder="25000" /></div></Field><Field label="Currency"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value="INR" readOnly /></div></Field><Field label="Date" optional><input className="native-field" type="date" value={draft.date} onChange={(event) => update('date', event.target.value)} /></Field><Field label="Approximate time" optional><input className="native-field" type="time" value={draft.time} onChange={(event) => update('time', event.target.value)} /></Field><Field label="Payment method"><select className="native-field" value={draft.paymentMethod} onChange={(event) => update('paymentMethod', event.target.value)}><option value="">Choose one</option>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></Field><Field label="Bank or payment provider" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.provider} onChange={(event) => update('provider', event.target.value)} placeholder="Bank or payment provider" /></div></Field><Field label="Transaction/reference ID" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.transactionId} onChange={(event) => update('transactionId', event.target.value)} placeholder="Transaction reference" /></div></Field><Field label="Recipient UPI/account/wallet" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.recipient} onChange={(event) => update('recipient', event.target.value)} placeholder="fraud@upi" /></div></Field></div></div>}

        {draft.step === 3 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Suspect and contact channel</h2><p className="ux4g-body-m-default">All fields may be left unknown. Do not investigate or contact the person yourself.</p><div className="form-grid"><Field label="How did they contact you?"><select className="native-field" value={draft.contactChannel} onChange={(event) => update('contactChannel', event.target.value)}><option value="">I don’t know</option>{contactChannels.map((channel) => <option key={channel}>{channel}</option>)}</select></Field><Field label="Display name used" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectDisplayName} onChange={(event) => update('suspectDisplayName', event.target.value)} /></div></Field><Field label="Phone number" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="tel" value={draft.suspectPhone} onChange={(event) => update('suspectPhone', event.target.value)} placeholder="+91 99990 00000" /></div></Field><Field label="WhatsApp, Telegram or social handle" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectHandle} onChange={(event) => update('suspectHandle', event.target.value)} placeholder="@account-name" /></div></Field><Field label="Website or app" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectWebsite} onChange={(event) => update('suspectWebsite', event.target.value)} placeholder="https://fake-invest.example" /></div></Field></div></div>}

        {draft.step === 4 && (
          <div>
            <div className="form-strip-alert form-strip-warning" role="note">
              <div className="form-strip-icon warning-icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <strong style={{ display: 'inline', fontWeight: 700 }}>Protect sensitive information &bull; </strong>
                <span>Do not upload passwords, PINs, CVVs, OTPs or unrelated identity documents.</span>
              </div>
            </div>
            <h2 id="active-step-title" className="ux4g-heading-l-strong">Add evidence</h2>
            <label className="file-drop">
              <span className="ux4g-icon-outlined" aria-hidden="true">upload_file</span>
              <strong>Choose screenshots or PDFs</strong>
              <span>PNG, JPG or PDF files</span>
              <input type="file" multiple accept="image/png,image/jpeg,application/pdf" onChange={(event) => addEvidence(event.target.files)} />
            </label>
            <div className="evidence-list" aria-live="polite">
              {draft.evidence.map((item) => (
                <div className="evidence-item" key={item.id}>
                  <span className="ux4g-icon-outlined" aria-hidden="true">description</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{Math.max(1, Math.round(item.size / 1024))} KB · {item.state === 'uploading' ? 'Uploading…' : 'Attached to complaint'}</span>
                  </div>
                  <button className="ux4g-btn ux4g-btn-text-danger ux4g-btn-sm" onClick={() => update('evidence', draft.evidence.filter((entry) => entry.id !== item.id))} type="button">Remove</button>
                </div>
              ))}
            </div>
            {!draft.evidence.length && <p className="ux4g-body-s-default">You can continue without evidence and add it later.</p>}
          </div>
        )}

        {draft.step === 5 && (
          <div>
            <div className="form-strip-alert form-strip-info" role="note">
              <div className="form-strip-icon info-icon-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <strong style={{ display: 'inline', fontWeight: 700 }}>Privacy protection &bull; </strong>
                <span>Never enter Aadhaar, PAN, passwords, PINs, CVVs, full card numbers or real OTPs.</span>
              </div>
            </div>
            <h2 id="active-step-title" className="ux4g-heading-l-strong">Your contact details</h2>
            <div className="form-grid">
              <Field label="Full name"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="Meena Sharma" /></div></Field>
              <Field label="Mobile number"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="tel" value={draft.mobile} onChange={(event) => update('mobile', event.target.value)} placeholder="9999000000" /></div></Field>
              <Field label="Preferred language"><select className="native-field" value={draft.language} onChange={(event) => update('language', event.target.value)}><option>English</option><option>Hindi</option></select></Field>
              <Field label="State or Union Territory"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.state} onChange={(event) => update('state', event.target.value)} placeholder="Karnataka" /></div></Field>
              <Field label="District or city"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.city} onChange={(event) => update('city', event.target.value)} placeholder="Bengaluru" /></div></Field>
              <Field label="Email" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} placeholder="meena@example.test" /></div></Field>
            </div>
          </div>
        )}

        {draft.step === 6 && (
          <div className="review-step-container">
            <h2 id="active-step-title" className="ux4g-heading-l-strong">Review your complaint</h2>
            <p className="ux4g-body-m-default" style={{ marginBlockEnd: '1.5rem', color: '#64748B' }}>
              Please verify that all details are accurate before generating your official complaint summary.
            </p>

            <div className="review-cards-list">
              {/* 1. Incident summary */}
              <div className="review-card-item">
                <div className="review-card-header">
                  <div className="review-card-title-group">
                    <span className="review-card-icon-square">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                      </svg>
                    </span>
                    <h3 className="review-card-title">Incident summary</h3>
                  </div>
                  <button className="review-edit-btn" onClick={() => update('step', 1)} type="button">
                    Edit
                  </button>
                </div>
                <p className="review-card-body-text">{draft.narrative || 'Not provided'}</p>
              </div>

              {/* 2. Transaction details */}
              <div className="review-card-item">
                <div className="review-card-header">
                  <div className="review-card-title-group">
                    <span className="review-card-icon-square">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                    </span>
                    <h3 className="review-card-title">Transaction details</h3>
                  </div>
                  <button className="review-edit-btn" onClick={() => update('step', 2)} type="button">
                    Edit
                  </button>
                </div>
                <div className="review-card-grid">
                  <div><span className="review-meta-label">Amount Lost</span><strong className="review-meta-value">{draft.amount ? `₹${Number(draft.amount).toLocaleString('en-IN')}` : 'Unknown'}</strong></div>
                  <div><span className="review-meta-label">Payment Method</span><strong className="review-meta-value">{draft.paymentMethod || 'Unknown'}</strong></div>
                  <div><span className="review-meta-label">Reference / UTR ID</span><strong className="review-meta-value">{draft.transactionId || 'Not provided'}</strong></div>
                  <div><span className="review-meta-label">Recipient Handle</span><strong className="review-meta-value">{draft.recipient || 'Not provided'}</strong></div>
                </div>
              </div>

              {/* 3. Suspect & Contact details */}
              <div className="review-card-item">
                <div className="review-card-header">
                  <div className="review-card-title-group">
                    <span className="review-card-icon-square">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <h3 className="review-card-title">Suspect & contact details</h3>
                  </div>
                  <button className="review-edit-btn" onClick={() => update('step', 3)} type="button">
                    Edit
                  </button>
                </div>
                <div className="review-card-grid">
                  <div><span className="review-meta-label">Contact Channel</span><strong className="review-meta-value">{draft.contactChannel || 'Unknown'}</strong></div>
                  <div><span className="review-meta-label">Phone Number</span><strong className="review-meta-value">{draft.suspectPhone || 'Unknown'}</strong></div>
                  <div><span className="review-meta-label">Handle / Social</span><strong className="review-meta-value">{draft.suspectHandle || 'Unknown'}</strong></div>
                  <div><span className="review-meta-label">Website / App</span><strong className="review-meta-value">{draft.suspectWebsite || 'Unknown'}</strong></div>
                </div>
              </div>

              {/* 4. Evidence */}
              <div className="review-card-item">
                <div className="review-card-header">
                  <div className="review-card-title-group">
                    <span className="review-card-icon-square">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                    </span>
                    <h3 className="review-card-title">Evidence</h3>
                  </div>
                  <button className="review-edit-btn" onClick={() => update('step', 4)} type="button">
                    Edit
                  </button>
                </div>
                <p className="review-card-body-text">
                  {draft.evidence.length ? `${draft.evidence.length} file(s) attached` : 'No evidence attached'}
                </p>
              </div>

              {/* 5. Citizen details */}
              <div className="review-card-item">
                <div className="review-card-header">
                  <div className="review-card-title-group">
                    <span className="review-card-icon-square">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </span>
                    <h3 className="review-card-title">Citizen details</h3>
                  </div>
                  <button className="review-edit-btn" onClick={() => update('step', 5)} type="button">
                    Edit
                  </button>
                </div>
                <div className="review-card-grid">
                  <div><span className="review-meta-label">Full Name</span><strong className="review-meta-value">{draft.fullName || 'Missing'}</strong></div>
                  <div><span className="review-meta-label">Mobile Number</span><strong className="review-meta-value">{draft.mobile || 'Missing'}</strong></div>
                  <div><span className="review-meta-label">State</span><strong className="review-meta-value">{draft.state || 'Missing'}</strong></div>
                  <div><span className="review-meta-label">District / City</span><strong className="review-meta-value">{draft.city || 'Missing'}</strong></div>
                </div>
              </div>
            </div>

            <div className="review-consent-block">
              <label className="custom-checkbox-card">
                <input type="checkbox" checked={draft.reviewed} onChange={(e) => update('reviewed', e.target.checked)} />
                <span className="checkbox-box" />
                <span className="checkbox-text">I reviewed the information and corrected anything inaccurate.</span>
              </label>

              <label className="custom-checkbox-card">
                <input type="checkbox" checked={draft.prototypeConsent} onChange={(e) => update('prototypeConsent', e.target.checked)} />
                <span className="checkbox-box" />
                <span className="checkbox-text">I consent to save this report on this device and view its acknowledgement summary.</span>
              </label>
            </div>

            <div style={{ marginBlockStart: '2rem' }}>
              <button className="submit-complaint-btn" onClick={submit} type="button">
                Save report and view acknowledgement →
              </button>
            </div>
          </div>
        )}

          <div className="step-actions">
            <button className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" disabled={draft.step === 0} onClick={() => update('step', Math.max(0, draft.step - 1))} type="button">
              <span className="ux4g-icon-outlined" aria-hidden="true">arrow_back</span> Back
            </button>
            {draft.step < 6 && draft.step !== 1 && (
              <button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={goNext} type="button">
                Continue <span className="ux4g-icon-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            )}
          </div>
        </section>
        {draft.step === 0 && (
          <aside className="report-sidebar-guidance" aria-label="Immediate safety guidance">
            <div className="sidebar-card-container">
              <h2 className="sidebar-card-title">First, reduce further loss</h2>
              <p className="sidebar-card-subtitle">Essential immediate actions to protect your account.</p>

              <div className="sidebar-action-cards-list">
                {/* 1. Call 1930 */}
                <a href="tel:1930" className="sidebar-action-card-item">
                  <div className="sidebar-card-left">
                    <div className="sidebar-icon-square support-action-danger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div>
                      <span className="sidebar-card-label">Call 1930</span>
                      <span className="sidebar-card-subtext">Report immediately if money has been transferred.</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>

                {/* 2. Contact your bank */}
                <a href="/help" className="sidebar-action-card-item">
                  <div className="sidebar-card-left">
                    <div className="sidebar-icon-square">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="21" x2="21" y2="21"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M12 3L2 10h20L12 3z"/><line x1="6" y1="10" x2="6" y2="21"/><line x1="10" y1="10" x2="10" y2="21"/><line x1="14" y1="10" x2="14" y2="21"/><line x1="18" y1="10" x2="18" y2="21"/>
                      </svg>
                    </div>
                    <div>
                      <span className="sidebar-card-label">Contact your bank</span>
                      <span className="sidebar-card-subtext">Ask about stopping or recalling the transaction.</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>

                {/* 3. Do not pay again */}
                <a href="/help" className="sidebar-action-card-item">
                  <div className="sidebar-card-left">
                    <div className="sidebar-icon-square support-action-warning">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                      </svg>
                    </div>
                    <div>
                      <span className="sidebar-card-label">Do not pay again</span>
                      <span className="sidebar-card-subtext">Ignore requests for recovery fees or verification payments.</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>

                {/* 4. Preserve evidence */}
                <a href="/learn" className="sidebar-action-card-item">
                  <div className="sidebar-card-left">
                    <div className="sidebar-icon-square">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                      </svg>
                    </div>
                    <div>
                      <span className="sidebar-card-label">Preserve evidence</span>
                      <span className="sidebar-card-subtext">Keep original messages, receipts and screenshots.</span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
              </div>

              {/* Note 1: Why we ask this */}
              <div className="sidebar-info-banner" style={{ marginBlockStart: '1rem' }}>
                <div className="sidebar-shield-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--cfr-navy)', fontSize: '0.875rem' }}>Why we ask this</strong>
                  <span>These details help organise the report and guide you to the right next step.</span>
                </div>
              </div>

              {/* Note 2: Using a shared device? */}
              <div className="sidebar-info-banner" style={{ marginBlockStart: '0.75rem', background: '#FFFBEB', borderColor: '#FDE68A', color: '#B45309' }}>
                <div className="sidebar-shield-badge" style={{ background: '#FFFFFF' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <strong style={{ display: 'block', color: '#92400E', fontSize: '0.875rem' }}>Using a shared device?</strong>
                  <span>Clear this draft and sign out when you finish.</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
