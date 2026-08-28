'use client';

import { useState } from 'react';

const LOCAL_REFERENCE = 'LOCAL-REPORT';

export function TrackTool() {
  const [ack, setAck] = useState('');
  const [error, setError] = useState('');

  const lookup = () => {
    const hasLocalReport = Boolean(localStorage.getItem('cfr-local-acknowledgement'));
    if (ack.trim().toUpperCase() === LOCAL_REFERENCE && hasLocalReport) {
      window.location.href = '/complaint/local';
      return;
    }
    setError('No locally saved report matches that reference on this device.');
  };

  return <div className="tool-card">
    <label className="ux4g-label-l-strong" htmlFor="acknowledgement">Local report reference</label>
    <p>Use <strong>{LOCAL_REFERENCE}</strong> to reopen a report you previously saved in this browser.</p>
    <div className="track-row">
      <div className={`ux4g-input ${error ? 'ux4g-input-error' : 'ux4g-input-default'} ux4g-input-md`}><input id="acknowledgement" className="ux4g-input-input" placeholder={LOCAL_REFERENCE} value={ack} onChange={(event) => { setAck(event.target.value); setError(''); }} /></div>
      <button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" onClick={lookup} type="button">Open saved report</button>
    </div>
    {error && <p className="field-error" role="alert">{error}</p>}
    <div className="ux4g-alert ux4g-alert-info ux4g-context-alert" role="note"><div className="ux4g-alert-content"><p className="ux4g-alert-message">This feature only reopens an on-device report. It does not retrieve an official police, government or financial-institution complaint.</p></div></div>
  </div>;
}
