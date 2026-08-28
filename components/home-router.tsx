'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

function suggestedRoute(value: string) {
  const text = value.toLowerCase();
  if (/money|upi|bank|card|payment|wallet|investment|loan/.test(text)) return '/report/financial-fraud';
  if (/threat|harass|blackmail|stalk|sextortion|child|minor/.test(text)) return '/report/sensitive-harm';
  if (/hacked|account|identity|impersonat|password|profile/.test(text)) return '/report/identity';
  if (/suspicious|message|call|website|link|number/.test(text)) return '/check';
  return '/report';
}

export function HomeRouter() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length < 12) {
      setError('Add a little more detail so we can suggest the right route.');
      return;
    }
    router.push(suggestedRoute(description));
  };

  return (
    <form className="own-words" onSubmit={submit} noValidate>
      <div className="home-router-content">
        <div className="home-router-heading"><h3>Or describe what happened in your own words</h3><p>We’ll suggest the closest route for you to review.</p></div>
        <div className="home-router-control">
          <div className="home-router-field">
            <div className={`ux4g-textarea ux4g-textarea-md ${error ? 'ux4g-textarea-error' : 'ux4g-textarea-default'}`}>
              <label className="ux4g-label-m-strong" htmlFor="home-description">What happened?</label>
              <textarea className="ux4g-textarea-input" id="home-description" aria-describedby="home-description-hint home-description-error" aria-invalid={Boolean(error)} value={description} onChange={(event) => { setDescription(event.target.value); setError(''); }} rows={4} maxLength={1000} placeholder="Include dates, amounts, names or anything else you remember." />
            </div>
            <div className="home-router-meta"><span id="home-description-hint">Do not enter passwords, PINs, CVVs or OTPs.</span><span>{description.length} / 1000</span></div>
            {error && <span className="ux4g-textarea-helper" id="home-description-error" role="alert">{error}</span>}
          </div>
          <div className="home-router-action"><button className="ux4g-btn ux4g-btn-primary ux4g-btn-lg" type="submit">Continue <span className="ux4g-icon-outlined" aria-hidden="true">arrow_forward</span></button><span><span className="ux4g-icon-outlined" aria-hidden="true">lock</span> Kept private on this device</span></div>
        </div>
      </div>
    </form>
  );
}
