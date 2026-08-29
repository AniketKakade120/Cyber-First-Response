'use client';

import { useState } from 'react';

const topFaqs = [
  [
    'What is the purpose of Cyber First Response?',
    'This portal is an initiative of Government of India to facilitate victims/complainants to report cyber crime complaints online. It caters to all types of cyber crime complaints including online financial frauds, social media crimes, ransomware, identity theft, CSEAM, and mobile crimes.',
  ],
  [
    'Which type of cybercrimes can I report on the portal?',
    'You can report complaints under two main categories: (1) Crimes related to Women/Child (including anonymous reporting options for sexually explicit content) and (2) Other Cybercrimes including financial fraud, UPI scams, identity theft, hacking, and online cyber trafficking.',
  ],
  [
    'What kind of information should I provide to report a complaint?',
    'Provide accurate incident details including date and time, payment reference numbers (UTR, Txn ID), suspect phone numbers, usernames or links, and supporting evidence such as screenshots or message logs.',
  ],
  [
    'What happens after I submit a complaint on the portal?',
    'Your complaint is assigned a unique Reference Number (e.g. CFR-2026-89412) and automatically routed to the concerned State/UT Police Authority and financial lien desk (1930) for swift investigation and action.',
  ],
  [
    'Apart from this portal, are there alternative ways to report or remove objectionable content?',
    'Yes. For immediate financial fraud lien placement, call the national emergency cyber helpline 1930. For objectionable content on social media (Facebook, Instagram, X, YouTube), you can also report or flag content directly on the platform.',
  ],
] as const;

export function TrustAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="split-faq-container">
      {/* Left Column: Bold Headline */}
      <div className="split-faq-left">
        <h2 className="split-faq-title">
          Frequently asked questions
        </h2>
        <p className="split-faq-sub">
          Official answers and guidance from Cyber First Response.
        </p>
        <div style={{ marginBlockStart: '1.75rem' }}>
          <a href="/faq" className="help-action-btn btn-brand-outline" style={{ width: 'auto', display: 'inline-flex', padding: '0 1.25rem' }}>
            View all FAQs →
          </a>
        </div>
      </div>

      {/* Right Column: Line-separated Accordion List with + / - indicators */}
      <div className="split-faq-right">
        <div className="split-accordion-list">
          {topFaqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <div className={`split-accordion-item${open ? ' open' : ''}`} key={question}>
                <button
                  className="split-accordion-trigger"
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                >
                  <span className="split-accordion-icon" aria-hidden="true">
                    {open ? '−' : '+'}
                  </span>
                  <span className="split-accordion-qtext">{question}</span>
                </button>
                {open && (
                  <div className="split-accordion-answer">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
