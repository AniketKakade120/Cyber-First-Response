'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DRAFT_STORAGE_KEY, emptyDraft } from '../lib/demo-data';
import { interpretIncident } from '../lib/services';
import type { EvidenceAttachment, IncidentDraft, ReporterRelation, SourceState, TransactionItem } from '../lib/types';
import { VoiceInput } from './voice-input';

const stageNames = [
  'Act now',
  'What happened',
  'Transaction',
  'Suspect',
  'Evidence',
  'Your details',
  'Review',
] as const;

const paymentMethods = ['UPI', 'Bank transfer', 'Card', 'Wallet', 'Cash deposit', 'Cryptocurrency', 'Other'];
const contactChannelOptions = ['Phone call', 'SMS', 'WhatsApp', 'Telegram', 'Social media', 'Email', 'Website or app', 'In person', 'I do not know'];

function SourceBadge({ state }: { state?: SourceState }) {
  if (state === 'description') {
    return <span style={{ color: '#2563EB', fontSize: '0.75rem', fontWeight: 600 }}>✦ Auto-filled</span>;
  }
  return null;
}

function Field({ label, hint, optional, sourceState, children }: { label: string; hint?: string; optional?: boolean; sourceState?: SourceState; children: React.ReactNode }) {
  return (
    <div className="cfr-form-field">
      <div className="cfr-field-header">
        <label className="cfr-field-label">
          <span>{label}</span>
          {!optional && <span className="cfr-field-required">*</span>}
        </label>
        {sourceState && <SourceBadge state={sourceState} />}
      </div>
      {hint && <p style={{ fontSize: '0.775rem', color: '#64748B', margin: '0 0 0.4rem 0', lineHeight: 1.25 }}>{hint}</p>}
      <div className="cfr-field-input-wrap">
        {children}
      </div>
    </div>
  );
}

function ActNowContent({
  immediateActions,
  onUpdateAction,
  onContinue,
}: {
  immediateActions: Record<string, 'done' | 'help' | 'later'>;
  onUpdateAction: (key: string, val: 'done' | 'help' | 'later') => void;
  onContinue: () => void;
}) {
  const [helpState, setHelpState] = useState<Record<string, boolean>>({});
  const toggleHelp = (key: string) => setHelpState((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div>
      <div style={{ marginBlockEnd: '1.25rem' }}>
        <span style={{ background: '#FFF7ED', color: '#C2410C', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid #FFEDD5' }}>Immediate First Response</span>
        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0.35rem 0 0.25rem 0' }}>First, let’s reduce further loss</h1>
        <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
          These actions may help protect your money and accounts. You can continue preparing your report even if you cannot complete every action now.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBlockEnd: '1.5rem' }}>
        {/* Action 1: Call 1930 */}
        <div style={{ border: '1.5px solid #FDBA74', background: '#FFF7ED', borderRadius: '12px', padding: '1.15rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBlockEnd: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#9A3412', margin: '0 0 0.25rem 0' }}>1. Call 1930 Immediately</h3>
              <p style={{ fontSize: '0.85rem', color: '#C2410C', margin: 0 }}>Report to the financial cyber fraud helpline to request a bank hold on transferred funds.</p>
            </div>
            <a href="tel:1930" className="ux4g-btn" style={{ background: '#E87A3A', color: '#FFFFFF', fontWeight: 700, padding: '0.45rem 1.15rem', fontSize: '0.875rem', textDecoration: 'none', borderRadius: '6px' }}>
              Call 1930 Now
            </a>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onUpdateAction('c1930', 'done')}
              style={{ background: immediateActions.c1930 === 'done' ? '#166534' : '#FFFFFF', color: immediateActions.c1930 === 'done' ? '#FFFFFF' : '#0F172A', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              {immediateActions.c1930 === 'done' ? '✓ Done' : 'Done'}
            </button>
            <button
              type="button"
              onClick={() => toggleHelp('c1930')}
              style={{ background: helpState.c1930 ? '#EFF6FF' : '#FFFFFF', color: helpState.c1930 ? '#1E40AF' : '#1D4ED8', border: helpState.c1930 ? '1.5px solid #2563EB' : '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Help me do this {helpState.c1930 ? '▲' : '▼'}
            </button>
            <button
              type="button"
              onClick={() => onUpdateAction('c1930', 'later')}
              style={{ background: '#FFFFFF', color: '#475569', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Do this later
            </button>
          </div>

          {helpState.c1930 && (
            <div style={{ marginBlockStart: '0.85rem', background: '#FFFFFF', border: '1px solid #FED7AA', borderRadius: '8px', padding: '0.85rem', fontSize: '0.825rem', color: '#475569' }}>
              <strong style={{ color: '#9A3412', display: 'block', marginBlockEnd: '0.35rem' }}>Guidance for Calling 1930:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Keep your banking app open or SMS receipt ready with the Transaction UTR number.</li>
                <li>Note down the exact date, time, and recipient UPI ID or account number.</li>
                <li>Inform the 1930 agent that you transferred funds under deception and request an immediate hold on the beneficiary account.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Action 2: Contact Bank */}
        <div style={{ border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '12px', padding: '1.15rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem 0' }}>2. Contact your bank or payment provider</h3>
          <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0' }}>Ask whether the payment can be stopped, recalled, or marked as fraudulent.</p>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onUpdateAction('bank', 'done')}
              style={{ background: immediateActions.bank === 'done' ? '#166534' : '#FFFFFF', color: immediateActions.bank === 'done' ? '#FFFFFF' : '#0F172A', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              {immediateActions.bank === 'done' ? '✓ Done' : 'Done'}
            </button>
            <button
              type="button"
              onClick={() => toggleHelp('bank')}
              style={{ background: helpState.bank ? '#EFF6FF' : '#FFFFFF', color: helpState.bank ? '#1E40AF' : '#1D4ED8', border: helpState.bank ? '1.5px solid #2563EB' : '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Help me do this {helpState.bank ? '▲' : '▼'}
            </button>
            <button
              type="button"
              onClick={() => onUpdateAction('bank', 'later')}
              style={{ background: '#FFFFFF', color: '#475569', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Do this later
            </button>
          </div>

          {helpState.bank && (
            <div style={{ marginBlockStart: '0.85rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.85rem', fontSize: '0.825rem', color: '#475569' }}>
              <strong style={{ color: '#0F172A', display: 'block', marginBlockEnd: '0.35rem' }}>Guidance for Bank Fraud Reporting:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Call your bank's 24x7 toll-free customer care number (found on the back of your debit card).</li>
                <li>Ask to connect directly with the <strong>Cyber Fraud / Dispute Cell</strong>.</li>
                <li>Request an immediate payment recall and request a temporary block on netbanking if your credentials were compromised.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Action 3: Block cards/UPI */}
        <div style={{ border: '1px solid #E2E8F0', background: '#F8FAFC', borderRadius: '12px', padding: '1.15rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.25rem 0' }}>3. Block affected cards or payment access</h3>
          <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.75rem 0' }}>Secure compromised debit/credit cards, UPI PINs, or mobile banking apps.</p>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onUpdateAction('cards', 'done')}
              style={{ background: immediateActions.cards === 'done' ? '#166534' : '#FFFFFF', color: immediateActions.cards === 'done' ? '#FFFFFF' : '#0F172A', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              {immediateActions.cards === 'done' ? '✓ Done' : 'Done'}
            </button>
            <button
              type="button"
              onClick={() => toggleHelp('cards')}
              style={{ background: helpState.cards ? '#EFF6FF' : '#FFFFFF', color: helpState.cards ? '#1E40AF' : '#1D4ED8', border: helpState.cards ? '1.5px solid #2563EB' : '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Help me do this {helpState.cards ? '▲' : '▼'}
            </button>
            <button
              type="button"
              onClick={() => onUpdateAction('cards', 'later')}
              style={{ background: '#FFFFFF', color: '#475569', border: '1px solid #CBD5E1', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Do this later
            </button>
          </div>

          {helpState.cards && (
            <div style={{ marginBlockStart: '0.85rem', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.85rem', fontSize: '0.825rem', color: '#475569' }}>
              <strong style={{ color: '#0F172A', display: 'block', marginBlockEnd: '0.35rem' }}>Guidance for Securing Payment Access:</strong>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Open your mobile banking app → Card Services → <strong>Temporary Lock / Freeze</strong>.</li>
                <li>If you shared your UPI PIN or clicked a suspicious link, reset your UPI PIN and Netbanking password immediately.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Why this comes first box */}
      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.85rem 1rem', fontSize: '0.825rem', color: '#1E40AF', marginBlockEnd: '1.5rem' }}>
        <strong>Why this comes first:</strong> Fast action within the golden hour may reduce further financial loss. You can prepare the formal complaint report immediately afterwards.
      </div>

      {/* Primary Action Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          type="button"
          onClick={onContinue}
          style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '0.85rem', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
        >
          I have already taken these steps
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="ux4g-btn ux4g-btn-primary"
          style={{ padding: '0.6rem 2rem', fontSize: '0.95rem', fontWeight: 700 }}
        >
          Continue to describe what happened →
        </button>
      </div>
    </div>
  );
}

export function ReportFlow({ onComplete }: { onComplete?: () => void }) {
  const [draft, setDraft] = useState<IncidentDraft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState('');
  const [busy, setBusy] = useState(false);
  const [showActNowDrawer, setShowActNowDrawer] = useState(false);
  const [promptExpanded, setPromptExpanded] = useState(false);
  const [sampleLoadedNotice, setSampleLoadedNotice] = useState(false);

  // Captcha & Mobile OTP Verification State
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('8K2P9Q');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaError('');
  };
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore draft or initial narrative
  useEffect(() => {
    const restoreTimer = window.setTimeout(async () => {
      const initialNarrative = localStorage.getItem('cfr-initial-narrative');
      let baseDraft = emptyDraft;

      const stored = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) {
        try {
          baseDraft = { ...emptyDraft, ...JSON.parse(stored) };
          setLastSavedAt(baseDraft.savedAt || '');
        } catch {
          localStorage.removeItem(DRAFT_STORAGE_KEY);
        }
      }

      if (initialNarrative && initialNarrative.trim()) {
        localStorage.removeItem('cfr-initial-narrative');
        const text = initialNarrative.trim();
        baseDraft = { ...baseDraft, narrative: text, step: 1 };
        setDraft(baseDraft);
        setReady(true);

        setBusy(true);
        const result = await interpretIncident(text);
        const extracted = result.data as any;
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
          suspectOrgClaimed: current.suspectOrgClaimed || (extracted.extractedClaimedOrg ?? ''),
          sourceMap: {
            amount: result.data.amount ? 'description' : 'missing',
            paymentMethod: result.data.paymentMethod ? 'description' : 'missing',
            provider: extracted.extractedProvider ? 'description' : 'missing',
            transactionId: extracted.extractedTxId ? 'description' : 'missing',
            recipient: extracted.extractedRecipient ? 'description' : 'missing',
            date: extracted.extractedDate ? 'description' : 'missing',
            time: extracted.extractedTime ? 'description' : 'missing',
            contactChannel: result.data.platform ? 'description' : 'missing',
            suspectOrgClaimed: extracted.extractedClaimedOrg ? 'description' : 'missing',
          },
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

  // Autosave draft to local storage
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

  const update = <K extends keyof IncidentDraft>(key: K, value: IncidentDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  const currentStage = draft.step; // 1 to 5

  const handleOrganiseNarrative = async () => {
    if (!draft.narrative.trim()) return;
    setBusy(true);
    const result = await interpretIncident(draft.narrative);
    const extracted = result.data as any;
    
    // Construct single transaction if extracted
    const firstTx: TransactionItem = {
      id: 'tx-1',
      amount: result.data.amount?.toString() || draft.amount,
      currency: 'INR',
      date: extracted.extractedDate || draft.date,
      time: extracted.extractedTime || draft.time,
      paymentMethod: result.data.paymentMethod || draft.paymentMethod || 'UPI',
      provider: extracted.extractedProvider || draft.provider || '',
      transactionId: extracted.extractedTxId || draft.transactionId || '',
      recipient: extracted.extractedRecipient || draft.recipient || '',
      status: 'completed',
    };

    setDraft((current) => ({
      ...current,
      interpretation: result.data,
      amount: firstTx.amount,
      paymentMethod: firstTx.paymentMethod,
      provider: firstTx.provider,
      transactionId: firstTx.transactionId,
      recipient: firstTx.recipient,
      date: firstTx.date,
      time: firstTx.time,
      contactChannel: current.contactChannel || result.data.platform || 'Phone call',
      suspectOrgClaimed: current.suspectOrgClaimed || extracted.extractedClaimedOrg || '',
      transactions: current.transactions.length ? current.transactions : [firstTx],
      sourceMap: {
        amount: result.data.amount ? 'description' : 'missing',
        paymentMethod: result.data.paymentMethod ? 'description' : 'missing',
        provider: extracted.extractedProvider ? 'description' : 'missing',
        transactionId: extracted.extractedTxId ? 'description' : 'missing',
        recipient: extracted.extractedRecipient ? 'description' : 'missing',
        date: extracted.extractedDate ? 'description' : 'missing',
        time: extracted.extractedTime ? 'description' : 'missing',
        contactChannel: result.data.platform ? 'description' : 'missing',
      },
      step: 2,
    }));
    setBusy(false);
  };

  const handleAddSampleStory = () => {
    const sample = 'On 27 August 2026 at approximately 3:15 PM, I received a phone call from a person claiming to be from my bank’s fraud department. The caller said my account would be blocked unless I completed an urgent verification payment. I was asked to transfer ₹48,500 to the UPI ID testmerchant@upi. After making the payment, the caller stopped responding, and I realised it was a scam. The transaction reference number shown in my banking app is TEST20260827001.';
    update('narrative', sample);
    setSampleLoadedNotice(true);
  };

  const handleAddEvidenceFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const newAtt: EvidenceAttachment = {
      id: `ev-${Date.now()}`,
      name: file.name,
      type: file.type || 'document',
      size: file.size,
      state: 'ready',
    };
    update('evidence', [...draft.evidence, newAtt]);
  };

  const handleRemoveEvidence = (id: string) => {
    update('evidence', draft.evidence.filter((item) => item.id !== id));
  };

  const handleCreateComplaintPack = () => {
    const ackId = 'NCRP-2026-0827-48391';
    const localAck = {
      id: ackId,
      at: new Date().toISOString(),
      summary: draft.narrative,
      amount: draft.amount || '48500',
      paymentMethod: draft.paymentMethod || 'UPI',
      status: 'Submitted & Registered',
      fullName: draft.fullName,
      mobile: draft.mobile,
    };
    localStorage.setItem('cfr-local-acknowledgement', JSON.stringify(localAck));
    update('step', 7);
  };

  return (
    <div className="report-flow-container" style={{ maxInlineSize: '980px', marginInline: 'auto' }}>
      
      {/* Top Stepper Navigation */}
      <div style={{ marginBlockEnd: '2rem' }}>
        {/* Desktop 7-stage Stepper */}
        <div className="ux4g-d-none ux4g-d-md-block">
          <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
            {stageNames.map((name, stepNum) => {
              const isDone = currentStage > stepNum;
              const isCurrent = currentStage === stepNum;
              return (
                <li
                  key={name}
                  aria-current={isCurrent ? 'step' : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: (isDone || stepNum <= currentStage) ? 'pointer' : 'default' }}
                  onClick={() => { if (isDone || stepNum <= currentStage) update('step', stepNum); }}
                >
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: isDone ? '#1E40AF' : isCurrent ? '#FFFFFF' : '#F1F5F9',
                      color: isDone ? '#FFFFFF' : isCurrent ? '#1E40AF' : '#64748B',
                      border: isCurrent ? '2.5px solid #1E40AF' : isDone ? 'none' : '1px solid #CBD5E1',
                    }}
                  >
                    {isDone ? '✓' : stepNum + 1}
                  </span>
                  <span style={{ fontSize: '0.825rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#0F172A' : '#64748B' }}>
                    {name}
                  </span>
                  {stepNum < stageNames.length - 1 && (
                    <span style={{ height: '2px', width: '24px', background: isDone ? '#1E40AF' : '#E2E8F0', marginInline: '0.35rem' }} />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile Stepper */}
        <div className="ux4g-d-block ux4g-d-md-none" style={{ background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBlockEnd: '0.35rem' }}>
            <span>{currentStage <= 6 ? `Step ${currentStage + 1} of 7 — ${stageNames[currentStage]}` : 'Report complete'}</span>
            {currentStage > 0 && (
              <button
                type="button"
                onClick={() => update('step', 0)}
                style={{ background: 'none', border: 'none', color: '#E87A3A', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
              >
                ← View Step 1 Act now
              </button>
            )}
          </div>
          <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(Math.min(currentStage, 6) / 6) * 100}%`, background: '#1E40AF', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 0 — FIRST RESPONSE SAFETY ACTIONS (ACT NOW) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 0 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <ActNowContent
            immediateActions={draft.immediateActions}
            onUpdateAction={(key, val) => update('immediateActions', { ...draft.immediateActions, [key]: val })}
            onContinue={() => update('step', 1)}
          />
        </div>
      )}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 1 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <header style={{ marginBlockEnd: '1.5rem' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Tell us what happened in your own words</h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              Start wherever feels easiest. Include what you remember; you do not need to know the official cybercrime category.
            </p>
          </header>

          {/* Prompt Guidance Accordion */}
          <div style={{ marginBlockEnd: '1.25rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => setPromptExpanded(!promptExpanded)}
              style={{ width: '100%', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '0.875rem', color: '#1E40AF' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="ux4g-icon-outlined" style={{ fontSize: '1.1rem' }}>help_outline</span>
                What should I include in my description?
              </span>
              <span>{promptExpanded ? '▲' : '▼'}</span>
            </button>
            {promptExpanded && (
              <div style={{ padding: '0 1rem 0.85rem 1rem', fontSize: '0.85rem', color: '#475569', borderTop: '1px solid #E2E8F0', paddingTop: '0.65rem' }}>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <li>How did the person or account contact you? (Phone, SMS, WhatsApp, Email, Website)</li>
                  <li>What did they ask you to do or claim was happening?</li>
                  <li>Did you transfer money, share information, or download an app?</li>
                  <li>Approximate date, time, and amounts transferred</li>
                  <li>Any phone numbers, UPI IDs, bank details, or links you remember</li>
                </ul>
              </div>
            )}
          </div>

          {/* Voice Input Panel */}
          <VoiceInput
            currentNarrative={draft.narrative}
            onTranscript={(text: string) => {
              setDraft((prev) => {
                const trimmed = prev.narrative.trim();
                const separator = trimmed ? ' ' : '';
                return { ...prev, narrative: trimmed + separator + text.trim() };
              });
            }}
          />

          {/* Divider between voice and text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '0.775rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or type below</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Story Narrative Textarea */}
          <Field label="What happened?" hint="Describe the incident naturally. You can correct details on the next step.">
            <textarea
              rows={7}
              value={draft.narrative}
              onChange={(e) => update('narrative', e.target.value)}
              placeholder="Describe what occurred, approximate dates or times, transaction amounts, suspect phone numbers, UPI IDs, website links, or names you remember."
              style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.5, outline: 'none' }}
            />
          </Field>


          {/* Safety warning */}
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '0.75rem 1rem', marginBlockEnd: '1.25rem', fontSize: '0.85rem', color: '#92400E', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="ux4g-icon-outlined" style={{ color: '#D97706' }}>security</span>
            <span><strong>Safety warning:</strong> Do not enter an OTP, PIN, password, CVV, or complete card number.</span>
          </div>

          {/* Sample story quick-fill helper */}
          <div style={{ marginBlockEnd: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleAddSampleStory}
              style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
            >
              + Fill sample financial fraud story
            </button>
            {sampleLoadedNotice && <span style={{ fontSize: '0.775rem', color: '#166534', fontWeight: 600 }}>✓ Sample narrative loaded</span>}
          </div>

          {/* Disclosure notice */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem 1rem', marginBlockEnd: '1.75rem', fontSize: '0.825rem', color: '#475569' }}>
            <span style={{ background: '#E0F2FE', color: '#0369A1', fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', marginInlineEnd: '0.4rem' }}>Demo</span>
            We’ll organise your description into editable details. This does not determine the legal category, and you can correct everything before continuing.
          </div>

          {/* Bottom Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => setShowActNowDrawer(true)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              First-response actions
            </button>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => update('step', 2)}
                className="ux4g-btn ux4g-btn-outline-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
              >
                Skip organising
              </button>
              <button
                type="button"
                disabled={busy || !draft.narrative.trim()}
                onClick={handleOrganiseNarrative}
                className="ux4g-btn ux4g-btn-primary"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem', opacity: (!draft.narrative.trim() || busy) ? 0.6 : 1 }}
              >
                {busy ? 'Organising...' : 'Review what we understood →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 2 — TRANSACTION */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 2 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <header style={{ marginBlockEnd: '1.5rem' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Transaction details</h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
               Check the date and payment information we understood. Correct anything that is wrong and leave anything you do not know blank.
            </p>
          </header>

          {/* SECTION A: TIMELINE */}
          <div style={{ marginBlockEnd: '2rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="ux4g-icon-outlined" style={{ color: '#1E40AF' }}>event</span>
              Section A — Timeline of Incident
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Field label="Incident Date" sourceState={draft.sourceMap.date} optional>
                <input
                  type="date"
                  value={draft.date}
                  onChange={(e) => { update('date', e.target.value); update('sourceMap', { ...draft.sourceMap, date: 'user' }); }}
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Approximate Time" sourceState={draft.sourceMap.time} optional>
                <input
                  type="time"
                  value={draft.time}
                  onChange={(e) => { update('time', e.target.value); update('sourceMap', { ...draft.sourceMap, time: 'user' }); }}
                  className="cfr-input-control"
                />
              </Field>
            </div>
          </div>

          {/* SECTION B: TRANSACTIONS */}
          <div style={{ marginBlockEnd: '2rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="ux4g-icon-outlined" style={{ color: '#1E40AF' }}>payments</span>
              Section B — Financial Transactions
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Field label="Amount Transferred (₹)" sourceState={draft.sourceMap.amount}>
                <input
                  type="text"
                  value={draft.amount}
                  onChange={(e) => { update('amount', e.target.value); update('sourceMap', { ...draft.sourceMap, amount: 'user' }); }}
                  placeholder="e.g. 48500"
                  className="cfr-input-control"
                  style={{ fontWeight: 600 }}
                />
              </Field>
              <Field label="Payment Method" sourceState={draft.sourceMap.paymentMethod}>
                <select
                  value={draft.paymentMethod}
                  onChange={(e) => { update('paymentMethod', e.target.value); update('sourceMap', { ...draft.sourceMap, paymentMethod: 'user' }); }}
                  className="cfr-input-control"
                >
                  <option value="">Select method...</option>
                  {paymentMethods.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Bank / Wallet / Platform" sourceState={draft.sourceMap.provider} optional>
                <input
                  type="text"
                  value={draft.provider}
                  onChange={(e) => { update('provider', e.target.value); update('sourceMap', { ...draft.sourceMap, provider: 'user' }); }}
                  placeholder="e.g. SBI, HDFC Bank, PhonePe"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Transaction / UTR Reference ID" sourceState={draft.sourceMap.transactionId} optional>
                <input
                  type="text"
                  value={draft.transactionId}
                  onChange={(e) => { update('transactionId', e.target.value); update('sourceMap', { ...draft.sourceMap, transactionId: 'user' }); }}
                  placeholder="e.g. TEST20260827001"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Recipient UPI ID / Account Number" sourceState={draft.sourceMap.recipient} optional>
                <input
                  type="text"
                  value={draft.recipient}
                  onChange={(e) => { update('recipient', e.target.value); update('sourceMap', { ...draft.sourceMap, recipient: 'user' }); }}
                  placeholder="e.g. testmerchant@upi"
                  className="cfr-input-control"
                />
              </Field>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => update('step', 1)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              ← Back to what happened
            </button>
            <button
              type="button"
              onClick={() => update('step', 3)}
              className="ux4g-btn ux4g-btn-primary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              Continue to suspect details →
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* STAGE 3 — SUSPECT */}
      {/* ──────────────────────────────────────────────────────────── */}
      {currentStage === 3 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <header style={{ marginBlockEnd: '1.5rem' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Suspect and contact details</h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              Add only information you already know. Every field on this step can be left blank.
            </p>
          </header>

          {/* SECTION C: PERSON, ACCOUNT OR ORGANISATION INVOLVED */}
          <div style={{ marginBlockEnd: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="ux4g-icon-outlined" style={{ color: '#1E40AF' }}>person_search</span>
              Section C — Person, Account or Organisation Involved
            </h2>

            <div style={{ marginBlockEnd: '1.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B', display: 'block', marginBlockEnd: '0.5rem' }}>
                How did they contact you? <span style={{ color: '#64748B', fontWeight: 400 }}>(Select all that apply)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {contactChannelOptions.map((channel) => {
                  const selectedList = draft.contactChannels || (draft.contactChannel ? [draft.contactChannel] : []);
                  const isSelected = selectedList.includes(channel);
                  return (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => {
                        const updated = isSelected
                          ? selectedList.filter((c) => c !== channel)
                          : [...selectedList, channel];
                        update('contactChannels', updated);
                        update('contactChannel', updated.join(', '));
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        color: isSelected ? '#1E40AF' : '#475569',
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: '0.825rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', color: isSelected ? '#2563EB' : '#94A3B8' }}>
                        {isSelected ? '☑' : '☐'}
                      </span>
                      {channel}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <Field label="Name or Handle Used" optional>
                <input
                  type="text"
                  value={draft.suspectDisplayName}
                  onChange={(e) => update('suspectDisplayName', e.target.value)}
                  placeholder="e.g. Officer Sharma, @trading_guru"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Organisation They Claimed to Represent" optional>
                <input
                  type="text"
                  value={draft.suspectOrgClaimed}
                  onChange={(e) => update('suspectOrgClaimed', e.target.value)}
                  placeholder="e.g. Bank fraud department, Police, Customs"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Caller / Contact Phone Number" optional>
                <input
                  type="text"
                  value={draft.suspectPhone}
                  onChange={(e) => update('suspectPhone', e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Website Link or App Name" optional>
                <input
                  type="text"
                  value={draft.suspectWebsite}
                  onChange={(e) => update('suspectWebsite', e.target.value)}
                  placeholder="e.g. https://scam-site.example"
                  className="cfr-input-control"
                />
              </Field>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.825rem', color: '#475569' }}>
              <strong>Guidance:</strong> Do not investigate or contact the person yourself. Add only what you already know from your records.
            </div>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => update('step', 2)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              ← Back to transaction
            </button>
            <button
              type="button"
              onClick={() => update('step', 4)}
              className="ux4g-btn ux4g-btn-primary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              Continue to evidence →
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 4 — ADD EVIDENCE */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 4 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <header style={{ marginBlockEnd: '1.5rem' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Add any evidence you have</h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              Evidence can help support the complaint, but you can continue without it and add it later where the official service allows.
            </p>
          </header>

          {/* Safety Notice */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.85rem 1rem', marginBlockEnd: '1.5rem', fontSize: '0.85rem', color: '#1E40AF' }}>
            <strong>Protect sensitive information:</strong> Do not upload passwords, PINs, CVVs, OTPs, complete card numbers, or unrelated identity documents.
          </div>

          {/* Upload Drop Zone */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed #CBD5E1',
            borderRadius: '12px',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            background: '#F8FAFC',
            marginBlockEnd: '1.5rem'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBlockEnd: '0.85rem'
            }}>
              <span className="ux4g-icon-outlined" style={{ fontSize: '2rem', color: '#1E40AF', display: 'block' }}>cloud_upload</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Upload transaction receipt, screenshot, or call log</h3>
            <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '0 0 1.25rem 0' }}>Supports PNG, JPG, PDF up to 10 MB per file</p>
            
            <label className="ux4g-btn ux4g-btn-primary" style={{ padding: '0.55rem 1.35rem', fontSize: '0.875rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', borderRadius: '6px' }}>
              <span className="ux4g-icon-outlined" style={{ fontSize: '1.15rem' }}>attach_file</span>
              Choose file from device
              <input type="file" onChange={handleAddEvidenceFile} style={{ display: 'none' }} accept="image/*,.pdf" />
            </label>
          </div>

          {/* Evidence Attachments List */}
          {draft.evidence.length > 0 && (
            <div style={{ marginBlockEnd: '1.5rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem 0' }}>
                Attached evidence ({draft.evidence.length} file{draft.evidence.length > 1 ? 's' : ''})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {draft.evidence.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: '#F1F5F9', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="ux4g-icon-outlined" style={{ color: '#1E40AF' }}>insert_drive_file</span>
                      <div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>{item.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>({Math.round(item.size / 1024)} KB)</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveEvidence(item.id)}
                      style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Storage Explanation */}
          <div style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.4, marginBlockEnd: '1.75rem' }}>
            Keep original files on your device. Files attached here are stored locally in your browser memory for preparing your complaint pack and are not uploaded to any remote server.
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => update('step', 3)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              ← Back to suspect details
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {draft.evidence.length === 0 && (
                <button
                  type="button"
                  onClick={() => update('step', 5)}
                  className="ux4g-btn ux4g-btn-outline-primary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
                >
                  Continue without evidence
                </button>
              )}
              <button
                type="button"
                onClick={() => update('step', 5)}
                className="ux4g-btn ux4g-btn-primary"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
              >
                Continue to About you →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 5 — YOUR DETAILS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 5 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <header style={{ marginBlockEnd: '1.5rem' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>About you</h1>
            <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
              Provide contact details needed for complaint preparation and verification.
            </p>
          </header>

          {/* First Question: Reporter relation */}
          <div style={{ marginBlockEnd: '1.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.15rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBlockEnd: '0.65rem' }}>
              Who experienced this incident?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
              {[
                ['self', 'I did'],
                ['child', 'A child in my care'],
                ['family', 'A family member or friend'],
                ['assisted', 'Someone I am assisting'],
                ['org', 'An organisation'],
              ].map(([val, lbl]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => update('reporterRelation', val as ReporterRelation)}
                  style={{
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: draft.reporterRelation === val ? '2px solid #1E40AF' : '1px solid #CBD5E1',
                    background: draft.reporterRelation === val ? '#EFF6FF' : '#FFFFFF',
                    color: draft.reporterRelation === val ? '#1E40AF' : '#334155',
                    fontWeight: draft.reporterRelation === val ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Contact Form Fields */}
          {draft.reporterRelation === 'org' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBlockEnd: '1.5rem' }}>
              
              {/* Organisation Details Box */}
              <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.85rem' }}>
                  <span className="ux4g-icon-outlined" style={{ color: '#1E40AF', fontSize: '1.1rem' }}>domain</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Organisation / Business Entity Details
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Organisation Name">
                    <input
                      type="text"
                      value={draft.orgName}
                      onChange={(e) => update('orgName', e.target.value)}
                      placeholder="e.g. Acme Technologies Pvt Ltd"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Organisation Type">
                    <select
                      value={draft.orgType}
                      onChange={(e) => update('orgType', e.target.value)}
                      className="cfr-input-control"
                    >
                      <option value="Private Company">Private Limited / Public Co</option>
                      <option value="LLP / Partnership">Partnership / LLP</option>
                      <option value="Proprietorship">Proprietorship / SME</option>
                      <option value="Non-Profit">Non-Profit / NGO / Trust</option>
                      <option value="Educational">Educational Institution</option>
                      <option value="Government">Government Department / PSU</option>
                    </select>
                  </Field>

                  <Field label="Registration / CIN / GSTIN Number" optional hint="CIN, GSTIN, or Corporate Identification Number">
                    <input
                      type="text"
                      value={draft.orgRegId}
                      onChange={(e) => update('orgRegId', e.target.value)}
                      placeholder="e.g. 27AAAAA0000A1Z5 / U12345MH2020PTC123456"
                      className="cfr-input-control"
                    />
                  </Field>
                </div>
              </div>

              {/* Authorised Representative Details Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.85rem' }}>
                  <span className="ux4g-icon-outlined" style={{ color: '#1E40AF', fontSize: '1.1rem' }}>badge</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Authorised Nodal Representative (Person Filing This Report)
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Representative Full Name">
                    <input
                      type="text"
                      value={draft.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Designation / Role in Organisation">
                    <input
                      type="text"
                      value={draft.reporterDesignation}
                      onChange={(e) => update('reporterDesignation', e.target.value)}
                      placeholder="e.g. IT Security Manager / Director / Legal Counsel"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Authorised Mobile Number" hint="Where OTP verification & status updates will be sent">
                    <input
                      type="tel"
                      value={draft.mobile}
                      onChange={(e) => update('mobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Official Corporate Email">
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="nodal-cyber@company.com"
                      className="cfr-input-control"
                    />
                  </Field>
                </div>
              </div>

              {/* Location Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <Field label="Registered State / Union Territory">
                  <input
                    type="text"
                    value={draft.state}
                    onChange={(e) => update('state', e.target.value)}
                    placeholder="e.g. Maharashtra, Delhi"
                    className="cfr-input-control"
                  />
                </Field>
                <Field label="City / Head Office Location">
                  <input
                    type="text"
                    value={draft.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="e.g. Mumbai, New Delhi"
                    className="cfr-input-control"
                  />
                </Field>
              </div>

            </div>
          ) : draft.reporterRelation !== 'self' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBlockEnd: '1.5rem' }}>
              
              {/* Victim Details Box */}
              <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.85rem' }}>
                  <span className="ux4g-icon-outlined" style={{ color: '#0284C7', fontSize: '1.1rem' }}>person</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0369A1', margin: 0 }}>
                    Victim's Details (Person Who Lost Money / Account)
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Victim's Full Name">
                    <input
                      type="text"
                      value={draft.victimName}
                      onChange={(e) => update('victimName', e.target.value)}
                      placeholder="e.g. Ramesh Kumar (Father)"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Victim's Bank-Registered Mobile" hint="Mobile number linked to the affected bank account (crucial for 1930 / bank freeze)">
                    <input
                      type="tel"
                      value={draft.victimMobile}
                      onChange={(e) => update('victimMobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      className="cfr-input-control"
                    />
                  </Field>
                </div>
              </div>

              {/* Reporter Details Box */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.85rem' }}>
                  <span className="ux4g-icon-outlined" style={{ color: '#1E40AF', fontSize: '1.1rem' }}>assignment_ind</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Your Details (Person Filing This Report)
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <Field label="Your Full Name">
                    <input
                      type="text"
                      value={draft.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Your Mobile Number" hint="Where OTP & status SMS updates will be sent">
                    <input
                      type="tel"
                      value={draft.mobile}
                      onChange={(e) => update('mobile', e.target.value)}
                      placeholder="10-digit mobile number"
                      className="cfr-input-control"
                    />
                  </Field>

                  <Field label="Your Email Address" optional>
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="name@example.com"
                      className="cfr-input-control"
                    />
                  </Field>
                </div>
              </div>

              {/* Primary Contact Preference */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBlockEnd: '0.5rem' }}>
                  Who should police / bank fraud cell call for follow-up?
                </label>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#1E40AF' }}>
                    <input
                      type="radio"
                      name="primaryContact"
                      checked={draft.primaryContactRole === 'reporter'}
                      onChange={() => update('primaryContactRole', 'reporter')}
                    />
                    <span>Contact Me (Reporter) — Recommended for elderly/assisted victims</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#475569' }}>
                    <input
                      type="radio"
                      name="primaryContact"
                      checked={draft.primaryContactRole === 'victim'}
                      onChange={() => update('primaryContactRole', 'victim')}
                    />
                    <span>Contact Victim Directly</span>
                  </label>
                </div>
              </div>

              {/* Location Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <Field label="State / Union Territory">
                  <input
                    type="text"
                    value={draft.state}
                    onChange={(e) => update('state', e.target.value)}
                    placeholder="e.g. Maharashtra, Delhi"
                    className="cfr-input-control"
                  />
                </Field>
                <Field label="District / City">
                  <input
                    type="text"
                    value={draft.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="e.g. Mumbai, New Delhi"
                    className="cfr-input-control"
                  />
                </Field>
              </div>

            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBlockEnd: '1.5rem' }}>
              <Field label="Full Name">
                <input
                  type="text"
                  value={draft.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Mobile Number">
                <input
                  type="tel"
                  value={draft.mobile}
                  onChange={(e) => update('mobile', e.target.value)}
                  placeholder="10-digit mobile number"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="Email Address" optional>
                <input
                  type="email"
                  value={draft.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="name@example.com"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="State / Union Territory">
                <input
                  type="text"
                  value={draft.state}
                  onChange={(e) => update('state', e.target.value)}
                  placeholder="e.g. Maharashtra, Delhi"
                  className="cfr-input-control"
                />
              </Field>
              <Field label="District / City">
                <input
                  type="text"
                  value={draft.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="e.g. Mumbai, New Delhi"
                  className="cfr-input-control"
                />
              </Field>
            </div>
          )}

          {/* Privacy Box */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', marginBlockEnd: '1.75rem', fontSize: '0.85rem', color: '#475569' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.35rem 0' }}>Why we ask</h3>
            <p style={{ margin: 0, lineHeight: 1.4 }}>
              These details help prepare the complaint and may be required for verification on the official reporting service. This prototype does not contact you or submit the information. Do not enter Aadhaar, PAN, passwords, PINs, or CVVs.
            </p>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => update('step', 4)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              ← Back to evidence
            </button>
            <button
              type="button"
              onClick={() => update('step', 6)}
              className="ux4g-btn ux4g-btn-primary"
              style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}
            >
              Review your complaint →
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 6 — REVIEW AND PREPARE */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 6 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          {/* Status Notice */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.15rem', marginBlockEnd: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="ux4g-icon-outlined" style={{ color: '#1E40AF', fontSize: '1.5rem' }}>verified</span>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E40AF', margin: 0 }}>Ready for submission</h2>
                <p style={{ fontSize: '0.875rem', color: '#1E3A8A', margin: '0.2rem 0 0 0' }}>Review your information below before submitting your complaint to Cyber First Response.</p>
              </div>
            </div>
          </div>

          {/* Section Breakdown Summaries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBlockEnd: '1.75rem' }}>
            
            {/* Story Summary */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>1. Incident Description</h3>
                <button type="button" onClick={() => update('step', 1)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#334155', margin: 0, lineHeight: 1.4 }}>{draft.narrative || 'No description provided.'}</p>
            </div>

            {/* Transactions Summary */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>2. Organised Transaction Details</h3>
                <button type="button" onClick={() => update('step', 2)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                <div><strong>Amount:</strong> ₹{draft.amount || 'Not specified'}</div>
                <div><strong>Method:</strong> {draft.paymentMethod || 'Not specified'}</div>
                <div><strong>Bank/App:</strong> {draft.provider || 'Not specified'}</div>
                <div><strong>UTR / Txn ID:</strong> {draft.transactionId || 'Not specified'}</div>
                <div><strong>Recipient:</strong> {draft.recipient || 'Not specified'}</div>
              </div>
            </div>

            {/* Suspect Summary */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>3. Suspect &amp; Contact Details</h3>
                <button type="button" onClick={() => update('step', 3)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0 }}>
                {[draft.contactChannel, draft.suspectDisplayName, draft.suspectPhone, draft.suspectWebsite].filter(Boolean).join(' · ') || 'No suspect details provided.'}
              </p>
            </div>

            {/* Evidence Summary */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>4. Attached Evidence</h3>
                <button type="button" onClick={() => update('step', 4)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', margin: 0 }}>
                {draft.evidence.length > 0 ? `${draft.evidence.length} evidence attachment(s) included.` : 'No evidence attachments added.'}
              </p>
            </div>

            {/* About You / Reporter & Victim Summary */}
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', background: '#F8FAFC' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>5. Reporter & Victim Contact Details</h3>
                <button type="button" onClick={() => update('step', 5)} style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
              </div>

              {draft.reporterRelation === 'org' ? (
                <div style={{ fontSize: '0.85rem', color: '#334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <div><strong>Organisation:</strong> {draft.orgName || 'Not specified'} ({draft.orgType})</div>
                  <div><strong>CIN/GSTIN:</strong> {draft.orgRegId || 'Not specified'}</div>
                  <div><strong>Nodal Representative:</strong> {draft.fullName || 'Not specified'}</div>
                  <div><strong>Designation:</strong> {draft.reporterDesignation || 'Not specified'}</div>
                  <div><strong>Mobile (OTP):</strong> {draft.mobile || 'Not specified'}</div>
                  <div><strong>Corporate Email:</strong> {draft.email || 'Not specified'}</div>
                  <div><strong>Location:</strong> {[draft.city, draft.state].filter(Boolean).join(', ') || 'Not specified'}</div>
                </div>
              ) : draft.reporterRelation !== 'self' ? (
                <div style={{ fontSize: '0.85rem', color: '#334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  <div><strong>Victim Name:</strong> {draft.victimName || 'Not specified'}</div>
                  <div><strong>Victim Bank Phone:</strong> {draft.victimMobile || 'Not specified'}</div>
                  <div><strong>Reporter Name:</strong> {draft.fullName || 'Not specified'}</div>
                  <div><strong>Reporter Mobile (OTP):</strong> {draft.mobile || 'Not specified'}</div>
                  <div><strong>Primary Call Contact:</strong> {draft.primaryContactRole === 'reporter' ? 'Reporter (Me)' : 'Victim'}</div>
                  <div><strong>Location:</strong> {[draft.city, draft.state].filter(Boolean).join(', ') || 'Not specified'}</div>
                </div>
              ) : (
                <div style={{ fontSize: '0.85rem', color: '#334155', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem' }}>
                  <div><strong>Name:</strong> {draft.fullName || 'Not specified'}</div>
                  <div><strong>Mobile:</strong> {draft.mobile || 'Not specified'}</div>
                  <div><strong>Location:</strong> {[draft.city, draft.state].filter(Boolean).join(', ') || 'Not specified'}</div>
                </div>
              )}
            </div>
          </div>

          {/* Unselected Confirmation Checkbox */}
          <div style={{ marginBlockEnd: '1.75rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '0.85rem 1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.875rem', color: '#92400E', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={draft.reviewed}
                onChange={(e) => update('reviewed', e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span>I have reviewed the information and corrected anything I know is inaccurate.</span>
            </label>
          </div>

          {/* Bottom Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => update('step', 5)}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              ← Back to About you
            </button>

            <button
              type="button"
              onClick={() => {
                refreshCaptcha();
                setShowVerifyModal(true);
              }}
              className="ux4g-btn ux4g-btn-primary"
              style={{ padding: '0.6rem 2.25rem', fontSize: '0.95rem', fontWeight: 700 }}
            >
              Submit complaint →
            </button>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* STAGE 7 — COMPLAINT SUBMISSION SUCCESS CONFIRMATION */}
      {/* ───────────────────────────────────────────────────────────── */}
      {currentStage === 7 && (
        <div className="reporting-card-stage" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2.5rem 2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}>
          
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', color: '#15803D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBlockEnd: '1.25rem' }}>
            <span className="ux4g-icon-outlined" style={{ fontSize: '2.5rem' }}>check_circle</span>
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem 0' }}>Complaint Registered Successfully!</h1>
          <p style={{ fontSize: '1rem', color: '#475569', maxInlineSize: '580px', marginInline: 'auto', marginBlockEnd: '1.75rem', lineHeight: 1.5 }}>
            Your financial cyber fraud complaint has been registered on <strong>Cyber First Response</strong> and dispatched for fast-track financial cell review.
          </p>

          {/* Reference Card */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '1.5rem', maxInlineSize: '580px', marginInline: 'auto', marginBlockEnd: '2rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginBlockEnd: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Complaint Reference ID</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E40AF', letterSpacing: '0.5px' }}>
                {(() => {
                  try {
                    const ack = localStorage.getItem('cfr-local-acknowledgement');
                    return ack ? JSON.parse(ack).id || 'CFR-2026-894129' : 'CFR-2026-894129';
                  } catch {
                    return 'CFR-2026-894129';
                  }
                })()}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem', fontSize: '0.875rem', color: '#334155' }}>
              <div><strong>Amount Flagged:</strong> ₹{draft.amount || '48,500'}</div>
              <div><strong>Payment Method:</strong> {draft.paymentMethod || 'UPI'}</div>
              <div><strong>Reporter Name:</strong> {draft.fullName || 'Rahul'}</div>
              <div><strong>Mobile:</strong> {draft.mobile || 'Registered'}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/complaint/local"
              className="ux4g-btn ux4g-btn-primary"
              style={{ padding: '0.65rem 2rem', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span>Go to Official Complaint Tracking Page →</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="ux4g-btn ux4g-btn-outline-primary"
              style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
            >
              Print Receipt
            </button>
          </div>

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CAPTCHA & MOBILE OTP VERIFICATION MODAL */}
      {/* ───────────────────────────────────────────────────────────── */}
      {showVerifyModal && (
        <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxInlineSize: '540px', inlineSize: '100%', padding: '1.75rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBlockEnd: '1rem' }}>
              <div>
                <span style={{ background: '#EFF6FF', color: '#1E40AF', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid #BFDBFE' }}>Security Verification</span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.35rem 0 0 0' }}>Verify to submit complaint</h2>
              </div>
              <button type="button" onClick={() => setShowVerifyModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#64748B' }}>✕</button>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#475569', margin: '0 0 1.25rem 0', lineHeight: 1.4 }}>
              Confirm security Captcha and verify mobile number <strong>{draft.mobile || '+91 98765 43210'}</strong> to register your report.
            </p>

            {/* 1. Visual Captcha Challenge */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', marginBlockEnd: '1.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', display: 'block', marginBlockEnd: '0.5rem' }}>
                1. Security Captcha Challenge
              </label>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '0.65rem' }}>
                <div style={{ background: '#0F172A', color: '#38BDF8', letterSpacing: '6px', fontFamily: 'monospace', fontSize: '1.35rem', fontWeight: 900, padding: '0.45rem 1.25rem', borderRadius: '6px', userSelect: 'none', textDecoration: 'line-through' }}>
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', color: '#1E40AF', padding: '0.45rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <span className="ux4g-icon-outlined" style={{ fontSize: '0.9rem' }}>refresh</span> Refresh
                </button>
              </div>

              <input
                type="text"
                value={captchaInput}
                onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(''); }}
                placeholder="Enter characters shown above"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: captchaError ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.9rem', textTransform: 'uppercase' }}
              />
              {captchaError && <p style={{ fontSize: '0.775rem', color: '#DC2626', margin: '0.35rem 0 0 0', fontWeight: 600 }}>{captchaError}</p>}
            </div>

            {/* 2. Mobile OTP Verification */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', marginBlockEnd: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  2. Mobile OTP Verification
                </label>
                <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#15803D', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>Demo OTP: 123456</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 0.5rem 0' }}>
                Enter the 6-digit OTP code sent to {draft.mobile || 'your mobile number'}.
              </p>

              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => { setOtpInput(e.target.value); setOtpError(''); }}
                placeholder="Enter 6-digit OTP (123456)"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: otpError ? '1.5px solid #DC2626' : '1px solid #CBD5E1', fontSize: '0.95rem', letterSpacing: '2px', fontWeight: 600 }}
              />
              {otpError && <p style={{ fontSize: '0.775rem', color: '#DC2626', margin: '0.35rem 0 0 0', fontWeight: 600 }}>{otpError}</p>}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowVerifyModal(false)}
                className="ux4g-btn ux4g-btn-outline-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  let valid = true;
                  if (captchaInput.trim().toUpperCase() !== captchaCode) {
                    setCaptchaError('Incorrect Captcha code. Try again.');
                    valid = false;
                  }
                  if (!otpInput.trim() || (otpInput.trim() !== '123456' && otpInput.trim().length !== 6)) {
                    setOtpError('Enter valid 6-digit OTP (use 123456 for demo).');
                    valid = false;
                  }
                  if (valid) {
                    setShowVerifyModal(false);
                    handleCreateComplaintPack();
                  }
                }}
                className="ux4g-btn ux4g-btn-primary"
                style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: 700 }}
              >
                {isSubmitting ? 'Registering complaint...' : 'Confirm & Submit Complaint →'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
