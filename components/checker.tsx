'use client';

import { useState } from 'react';
import { checkIdentifier } from '../lib/services';

export function Checker() {
  const [type, setType] = useState('phone');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<ReturnType<typeof checkIdentifier> | null>(null);
  return <div className="tool-card"><div className="form-grid"><div className="form-field"><label className="ux4g-label-l-strong" htmlFor="check-type">Identifier type</label><select id="check-type" className="native-field" value={type} onChange={(event) => setType(event.target.value)}><option value="phone">Phone</option><option value="email">Email</option><option value="upi">UPI ID</option><option value="bank">Bank account</option><option value="website">Website or link</option><option value="social">Social profile</option></select></div><div className="form-field"><label className="ux4g-label-l-strong" htmlFor="check-value">Identifier</label><div className="ux4g-input ux4g-input-default ux4g-input-md"><input id="check-value" className="ux4g-input-input" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Phone, UPI ID, website or account" /></div></div></div><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={() => setResult(checkIdentifier(type, value))} type="button">Check identifier</button>{result && <div className={`ux4g-alert ux4g-alert-${result.state === 'reported' ? 'warning' : result.state === 'no-match' ? 'info' : 'error'} ux4g-context-alert result-alert`} role="status"><span className="ux4g-alert-icon ux4g-icon-outlined" aria-hidden="true">fact_check</span><div className="ux4g-alert-content"><h2 className="ux4g-alert-title">{result.message}</h2><p className="ux4g-alert-message">A “no match” result does not prove that an identifier is safe. Verify it through a separate trusted channel.</p><div className="ux4g-alert-actions"><a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/report">Report an attempted scam</a><a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/report/financial-fraud">Report financial loss</a></div></div></div>}</div>;
}
