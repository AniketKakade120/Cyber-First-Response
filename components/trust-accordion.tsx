'use client';

import { useState } from 'react';

const items = [
  ['I do not know the cybercrime category. Can I still report?', 'Yes. Start by describing what happened in your own words. The service will organise the details and let you review the suggested route before you continue.'],
  ['What information should I keep ready?', 'Keep dates, transaction references, phone numbers, usernames, website links, messages and screenshots. Never include a password, PIN, CVV or OTP.'],
  ['How can I protect my information?', 'Use a trusted device, avoid public Wi-Fi, review every field before submission and clear locally saved drafts when using a shared device.'],
  ['Can money recovery be guaranteed?', 'No. A hold request, investigation or complaint does not guarantee a refund. The dashboard separates complaint progress from money-recovery status.'],
] as const;

export function TrustAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="ux4g-accordion ux4g-accordion-bordered">
      {items.map(([question, answer], index) => {
        const open = openIndex === index;
        return <section className="ux4g-accordion__item" key={question}>
          <h3 className="ux4g-accordion__header">
            <button className={`ux4g-accordion__button${open ? '' : ' collapsed'}`} type="button" aria-expanded={open} aria-controls={`trust-panel-${index}`} onClick={() => setOpenIndex(open ? -1 : index)}>{question}</button>
          </h3>
          <div className={`ux4g-accordion__collapse${open ? ' show' : ''}`} id={`trust-panel-${index}`} hidden={!open}>
            <div className="ux4g-accordion__body"><p>{answer}</p></div>
          </div>
        </section>;
      })}
    </div>
  );
}
