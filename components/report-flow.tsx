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
  return <div className="form-field"><div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-xs"><span className="ux4g-label-l-strong">{label}</span>{optional && <span className="ux4g-tag-tonal-neutral ux4g-tag-s">Optional</span>}</div>{hint && <p className="field-hint ux4g-body-s-default">{hint}</p>}{children}</div>;
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
    const restoreTimer = window.setTimeout(() => {
      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        try {
          const restored = { ...emptyDraft, ...JSON.parse(stored) };
          setDraft(restored);
          setLastSavedAt(restored.savedAt || '');
        } catch { localStorage.removeItem(DRAFT_STORAGE_KEY); }
      }
      setReady(true);
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
    setMode(result.mode);
    setDraft((current) => ({ ...current, interpretation: result.data, amount: current.amount || (result.data.amount?.toString() ?? ''), paymentMethod: current.paymentMethod || (result.data.paymentMethod ?? ''), step: 2 }));
    setBusy(false);
  };

  const goNext = () => {
    const nextErrors: string[] = [];
    if (draft.step === 1 && !draft.narrative.trim()) nextErrors.push('Describe what happened.');
    if (draft.step === 2) { if (!draft.amount) nextErrors.push('Enter the amount lost or choose I don’t know.'); if (!draft.paymentMethod) nextErrors.push('Choose a payment method.'); if (draft.interpretation && !draft.interpretationConfirmed) nextErrors.push('Review and confirm the interpretation suggestions, then correct the fields below.'); }
    if (draft.step === 5) { if (!draft.fullName.trim()) nextErrors.push('Enter your full name.'); if (!draft.mobile.trim()) nextErrors.push('Enter your mobile number.'); }
    if (draft.step === 6) { if (!draft.reviewed) nextErrors.push('Confirm that you reviewed and corrected the information.'); if (!draft.prototypeConsent) nextErrors.push('Confirm that you consent to submit the information in this report.'); }
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
    const nextErrors = [!draft.reviewed && 'Confirm that you reviewed the information.', !draft.prototypeConsent && 'Confirm that you consent to submit this report.'].filter(Boolean) as string[];
    if (nextErrors.length) { setErrors(nextErrors); return; }
    localStorage.setItem('cfr-demo-submitted', JSON.stringify({ at: new Date().toISOString(), summary: draft.narrative, amount: draft.amount }));
    window.location.href = '/complaint/demo-cfr-2026-001?submitted=1';
  };

  if (!ready) return <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-s" role="status"><span className="ux4g-spinner ux4g-spinner-md" aria-hidden="true" /><span>Restoring local draft…</span></div>;

  return (
    <div className="report-shell">
      <aside className="report-progress" aria-label="Report progress">
        <ol className="ux4g-stepper ux4g-stepper-vertical ux4g-stepper-s">
          {steps.map((label, index) => <li className={`ux4g-stepper-step ${index < draft.step ? 'ux4g-stepper-completed' : index === draft.step ? 'ux4g-stepper-inprogress' : 'ux4g-stepper-step-pending'}`} key={label}><span className="ux4g-stepper-head"><span className="ux4g-stepper-head-icon" aria-hidden="true">{index < draft.step ? '✓' : index + 1}</span><span className="ux4g-stepper-label">{label}</span></span></li>)}
        </ol>
        <div className="draft-panel"><p className="ux4g-label-m-strong" aria-live="polite">{savedLabel}</p><p className="ux4g-body-xs-default">Draft information remains on this device and may be visible to other users.</p><button className="ux4g-btn ux4g-btn-text-danger ux4g-btn-sm" onClick={clearDraft} type="button">Clear this draft</button></div>
      </aside>

      <section className="report-step" aria-labelledby="active-step-title">
        <div className="mobile-progress"><span className="ux4g-label-m-strong">Step {draft.step + 1} of {steps.length}</span><span aria-live="polite">{savedLabel}</span></div>
        {errors.length > 0 && <div className="ux4g-alert ux4g-alert-error ux4g-alert-wide error-summary" role="alert"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">error</span><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">Check the following</h2><ul className="ux4g-alert-message">{errors.map((error) => <li key={error}>{error}</li>)}</ul></div></div>}

        {draft.step === 0 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">First, let’s reduce further loss</h2><p className="ux4g-body-m-default">You can continue even if every action is not complete.</p><div className="action-checklist">{actionItems.map((item) => <fieldset className="action-item" key={item}><legend className="ux4g-label-l-strong">{item}</legend><div className="radio-row">{actionChoices.map((choice) => <label className="ux4g-radio ux4g-radio-md" key={choice}><input className="ux4g-radio-input" type="radio" name={item} checked={draft.immediateActions[item] === choice} onChange={() => update('immediateActions', { ...draft.immediateActions, [item]: choice })} /><span className="ux4g-radio-control" aria-hidden="true" /><span className="ux4g-radio-label">{choice}</span></label>)}</div></fieldset>)}</div></div>}

        {draft.step === 1 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Describe what happened in your own words</h2><p className="ux4g-body-m-default">Include the details you remember. Normal punctuation, URLs, handles and hashtags are allowed.</p><Field label="What happened?" hint="Example: I received an investment message on WhatsApp and transferred ₹25,000 using UPI."><div className="ux4g-textarea ux4g-textarea-default ux4g-textarea-md"><textarea className="ux4g-textarea-input" value={draft.narrative} onChange={(event) => update('narrative', event.target.value)} rows={8} aria-label="Incident description" /></div></Field><div className="voice-mock"><span className="ux4g-icon-outlined" aria-hidden="true">mic</span><span><strong>Voice input</strong> is a future feature and is not recording.</span></div><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" disabled={busy} onClick={organise} type="button">{busy ? 'Organising…' : 'Help organise my report'}</button></div>}

        {draft.step === 2 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Transaction details</h2>{draft.interpretation && <div className="ai-card ux4g-card ux4g-card-solid ux4g-card-vertical"><div className="ux4g-card-body"><div><div className="ux4g-d-flex ux4g-gap-x-s"><span className="ux4g-tag-tonal-info ux4g-tag-s">{mode}</span><span className="ux4g-tag-tonal-warning ux4g-tag-s">Review required</span></div><h3 className="ux4g-card-title">Here is what we understood</h3><dl className="review-list"><div><dt>Suggested category</dt><dd>{draft.interpretation.suggestedCategory || 'Missing'}</dd></div><div><dt>Amount</dt><dd>{draft.interpretation.amount ? `₹${draft.interpretation.amount.toLocaleString('en-IN')}` : 'Missing'}</dd></div><div><dt>Payment method</dt><dd>{draft.interpretation.paymentMethod || 'Missing'}</dd></div><div><dt>Platform</dt><dd>{draft.interpretation.platform || 'Missing'}</dd></div></dl><label className="ux4g-checkbox ux4g-checkbox-md"><input className="ux4g-checkbox-input" type="checkbox" checked={draft.interpretationConfirmed} onChange={(event) => update('interpretationConfirmed', event.target.checked)} /><span className="ux4g-checkbox-control" aria-hidden="true"><span className="ux4g-checkmark" /></span><span className="ux4g-checkbox-label">I reviewed these suggestions. I will correct them below.</span></label></div></div></div>}
          <div className="form-grid"><Field label="Amount lost" hint="Enter the amount shown in your transaction records"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="numeric" value={draft.amount} onChange={(event) => update('amount', event.target.value.replace(/[^0-9]/g, ''))} placeholder="25000" /></div></Field><Field label="Currency"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value="INR" readOnly /></div></Field><Field label="Date" optional><input className="native-field" type="date" value={draft.date} onChange={(event) => update('date', event.target.value)} /></Field><Field label="Approximate time" optional><input className="native-field" type="time" value={draft.time} onChange={(event) => update('time', event.target.value)} /></Field><Field label="Payment method"><select className="native-field" value={draft.paymentMethod} onChange={(event) => update('paymentMethod', event.target.value)}><option value="">Choose one</option>{paymentMethods.map((method) => <option key={method}>{method}</option>)}</select></Field><Field label="Bank or payment provider" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.provider} onChange={(event) => update('provider', event.target.value)} placeholder="Bank or payment provider" /></div></Field><Field label="Transaction/reference ID" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.transactionId} onChange={(event) => update('transactionId', event.target.value)} placeholder="Transaction reference" /></div></Field><Field label="Recipient UPI/account/wallet" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.recipient} onChange={(event) => update('recipient', event.target.value)} placeholder="fraud@upi" /></div></Field></div></div>}

        {draft.step === 3 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Suspect and contact channel</h2><p className="ux4g-body-m-default">All fields may be left unknown. Do not investigate or contact the person yourself.</p><div className="form-grid"><Field label="How did they contact you?"><select className="native-field" value={draft.contactChannel} onChange={(event) => update('contactChannel', event.target.value)}><option value="">I don’t know</option>{contactChannels.map((channel) => <option key={channel}>{channel}</option>)}</select></Field><Field label="Display name used" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectDisplayName} onChange={(event) => update('suspectDisplayName', event.target.value)} /></div></Field><Field label="Phone number" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="tel" value={draft.suspectPhone} onChange={(event) => update('suspectPhone', event.target.value)} placeholder="+91 99990 00000" /></div></Field><Field label="WhatsApp, Telegram or social handle" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectHandle} onChange={(event) => update('suspectHandle', event.target.value)} placeholder="@account-name" /></div></Field><Field label="Website or app" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.suspectWebsite} onChange={(event) => update('suspectWebsite', event.target.value)} placeholder="https://fake-invest.example" /></div></Field></div></div>}

        {draft.step === 4 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Add evidence</h2><div className="ux4g-alert ux4g-alert-warning ux4g-context-alert" role="note"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">warning</span><div className="ux4g-alert-content"><h3 className="ux4g-alert-title">Protect sensitive information</h3><p className="ux4g-alert-message">Do not upload passwords, PINs, CVVs, OTPs or unrelated identity documents.</p></div></div><label className="file-drop"><span className="ux4g-icon-outlined" aria-hidden="true">upload_file</span><strong>Choose screenshots or PDFs</strong><span>PNG, JPG or PDF files</span><input type="file" multiple accept="image/png,image/jpeg,application/pdf" onChange={(event) => addEvidence(event.target.files)} /></label><div className="evidence-list" aria-live="polite">{draft.evidence.map((item) => <div className="evidence-item" key={item.id}><span className="ux4g-icon-outlined" aria-hidden="true">description</span><div><strong>{item.name}</strong><span>{Math.max(1, Math.round(item.size / 1024))} KB · {item.state === 'uploading' ? 'Uploading…' : 'Attached to complaint'}</span></div><button className="ux4g-btn ux4g-btn-text-danger ux4g-btn-sm" onClick={() => update('evidence', draft.evidence.filter((entry) => entry.id !== item.id))} type="button">Remove</button></div>)}</div>{!draft.evidence.length && <p className="ux4g-body-s-default">You can continue without evidence and add it later.</p>}</div>}

        {draft.step === 5 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Your contact details</h2><div className="ux4g-alert ux4g-alert-info ux4g-context-alert" role="note"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">privacy_tip</span><div className="ux4g-alert-content"><p className="ux4g-alert-message">Never enter Aadhaar, PAN, passwords, PINs, CVVs, full card numbers or real OTPs.</p></div></div><div className="form-grid"><Field label="Full name"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.fullName} onChange={(event) => update('fullName', event.target.value)} placeholder="Meena Sharma" /></div></Field><Field label="Mobile number"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" inputMode="tel" value={draft.mobile} onChange={(event) => update('mobile', event.target.value)} placeholder="9999000000" /></div></Field><Field label="Preferred language"><select className="native-field" value={draft.language} onChange={(event) => update('language', event.target.value)}><option>English</option><option>Hindi</option></select></Field><Field label="State or Union Territory"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.state} onChange={(event) => update('state', event.target.value)} placeholder="Karnataka" /></div></Field><Field label="District or city"><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" value={draft.city} onChange={(event) => update('city', event.target.value)} placeholder="Bengaluru" /></div></Field><Field label="Email" optional><div className="ux4g-input ux4g-input-default ux4g-input-md"><input className="ux4g-input-input" type="email" value={draft.email} onChange={(event) => update('email', event.target.value)} placeholder="meena@example.test" /></div></Field></div></div>}

        {draft.step === 6 && <div><h2 id="active-step-title" className="ux4g-heading-l-strong">Review your complaint</h2><div className="review-sections"><section><h3>Incident summary</h3><p>{draft.narrative || 'Not provided'}</p><button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" onClick={() => update('step', 1)} type="button">Edit</button></section><section><h3>Transaction</h3><p>₹{draft.amount || 'Unknown'} · {draft.paymentMethod || 'Unknown'} · {draft.transactionId || 'No reference supplied'}</p><button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" onClick={() => update('step', 2)} type="button">Edit</button></section><section><h3>Suspect details</h3><p>{[draft.contactChannel, draft.suspectPhone, draft.suspectHandle, draft.suspectWebsite].filter(Boolean).join(' · ') || 'Unknown'}</p><button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" onClick={() => update('step', 3)} type="button">Edit</button></section><section><h3>Evidence</h3><p>{draft.evidence.length ? `${draft.evidence.length} attachment(s)` : 'No evidence attached'}</p><button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" onClick={() => update('step', 4)} type="button">Edit</button></section><section><h3>Citizen details</h3><p>{draft.fullName || 'Missing'} · {draft.mobile || 'Missing'} · {draft.state || 'State not provided'}</p><button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-sm" onClick={() => update('step', 5)} type="button">Edit</button></section></div><label className="ux4g-checkbox ux4g-checkbox-md"><input className="ux4g-checkbox-input" type="checkbox" checked={draft.reviewed} onChange={(event) => update('reviewed', event.target.checked)} /><span className="ux4g-checkbox-control" aria-hidden="true"><span className="ux4g-checkmark" /></span><span className="ux4g-checkbox-label">I reviewed the information and corrected anything inaccurate.</span></label><label className="ux4g-checkbox ux4g-checkbox-md"><input className="ux4g-checkbox-input" type="checkbox" checked={draft.prototypeConsent} onChange={(event) => update('prototypeConsent', event.target.checked)} /><span className="ux4g-checkbox-control" aria-hidden="true"><span className="ux4g-checkmark" /></span><span className="ux4g-checkbox-label">I consent to submit this information for cybercrime reporting and follow-up.</span></label><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={submit} type="button">Submit complaint</button></div>}

        <div className="step-actions"><button className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" disabled={draft.step === 0} onClick={() => update('step', Math.max(0, draft.step - 1))} type="button">Back</button>{draft.step < 6 && draft.step !== 1 && <button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={goNext} type="button">Continue</button>}<a className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" href="/">Continue later</a></div>
      </section>
    </div>
  );
}
