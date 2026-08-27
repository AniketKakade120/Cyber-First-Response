'use client';

export function PrintButton() {
  return <button className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" onClick={() => window.print()} type="button"><span className="ux4g-icon-outlined" aria-hidden="true">print</span>Print or save as PDF</button>;
}
