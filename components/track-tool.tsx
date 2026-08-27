'use client';

import { useState } from 'react';
import { DEMO_ACKNOWLEDGEMENT, DEMO_OTP } from '../lib/demo-data';
import { lookupComplaint } from '../lib/services';

export function TrackTool() {
  const [ack, setAck] = useState(DEMO_ACKNOWLEDGEMENT);
  const [error, setError] = useState('');
  const [recover, setRecover] = useState(false);
  const [otp, setOtp] = useState(DEMO_OTP);
  const [recoveryStatus, setRecoveryStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const lookup = () => { if (lookupComplaint(ack)) window.location.href = '/complaint/demo-cfr-2026-001'; else setError('We could not find that acknowledgement number. Check it and try again.'); };
  const recoverAcknowledgement = () => setRecoveryStatus(otp === DEMO_OTP ? 'success' : 'error');
  return <div className="tool-card"><label className="ux4g-label-l-strong" htmlFor="acknowledgement">Acknowledgement number</label><div className="track-row"><div className={`ux4g-input ${error ? 'ux4g-input-error' : 'ux4g-input-default'} ux4g-input-md`}><input id="acknowledgement" className="ux4g-input-input" value={ack} onChange={(event) => { setAck(event.target.value); setError(''); }} /></div><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={lookup} type="button">Track complaint</button></div>{error && <p className="field-error" role="alert">{error}</p>}<button className="ux4g-btn ux4g-btn-text-primary ux4g-btn-md" onClick={() => setRecover(!recover)} type="button" aria-expanded={recover}>Recover acknowledgement number</button>{recover && <div className="recovery-panel"><h2 className="ux4g-title-m-strong">Verify your mobile number</h2><p>Enter the six-digit code sent to your registered mobile number.</p><label className="ux4g-label-l-strong" htmlFor="recovery-otp">Verification code</label><div className={`ux4g-input ${recoveryStatus === 'error' ? 'ux4g-input-error' : 'ux4g-input-default'} ux4g-input-md`}><input id="recovery-otp" className="ux4g-input-input" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, '')); setRecoveryStatus('idle'); }} /></div><button className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" onClick={recoverAcknowledgement} type="button">Verify and recover</button>{recoveryStatus === 'success' && <p className="success-text" role="status">Acknowledgement number: {DEMO_ACKNOWLEDGEMENT}</p>}{recoveryStatus === 'error' && <p className="field-error" role="alert">The verification code is incorrect. Try again.</p>}</div>}</div>;
}
