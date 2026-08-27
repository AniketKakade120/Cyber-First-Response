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
    <form className="own-words ux4g-card ux4g-card-solid ux4g-card-vertical" onSubmit={submit} noValidate>
      <div className="ux4g-card-body home-router-body">
        <div className="home-router-content">
          <h3 className="ux4g-card-title">Not sure which option fits?</h3>
          <p>Describe what happened in your own words. We’ll suggest the closest reporting route for you to review.</p>
          <div className={`ux4g-textarea ux4g-textarea-md ${error ? 'ux4g-textarea-error' : 'ux4g-textarea-default'}`}>
            <label htmlFor="home-description">What happened?</label>
            <textarea className="ux4g-textarea-input" id="home-description" aria-describedby="home-description-hint home-description-error" aria-invalid={Boolean(error)} value={description} onChange={(event) => { setDescription(event.target.value); setError(''); }} rows={4} placeholder="For example: I paid a seller by UPI and then they stopped replying." />
            <span className="ux4g-textarea-helper" id="home-description-hint">Do not enter real account numbers, passwords, OTPs or personal information.</span>
            {error && <span className="ux4g-textarea-helper" id="home-description-error" role="alert">{error}</span>}
          </div>
        </div>
      </div>
      <div className="ux4g-card-footer"><button className="ux4g-btn ux4g-btn-primary ux4g-btn-md" type="submit">Suggest a route</button></div>
    </form>
  );
}
