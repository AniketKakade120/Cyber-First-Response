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

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (description.trim().length < 5) return;
    router.push(suggestedRoute(description));
  };

  return (
    <div className="own-words-container">
      <div className="own-words-header">
        <h3>Or describe what happened in your own words</h3>
        <p>We'll suggest the closest route for you to review.</p>
      </div>
      <form onSubmit={submit} className="own-words-row" noValidate>
        <div className="own-words-input-wrap">
          <span className="ux4g-icon-outlined" aria-hidden="true">chat_bubble_outline</span>
          <input
            type="text"
            className="own-words-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Include dates, amounts, names or anything else you remember."
            aria-label="Describe what happened"
          />
        </div>
        <button type="submit" className="own-words-btn">
          Find the right route <span className="ux4g-icon-outlined" aria-hidden="true">arrow_forward</span>
        </button>
      </form>
    </div>
  );
}
