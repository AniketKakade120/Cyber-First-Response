'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from 'react';

const links = [
  ['/report', 'Report an incident'],
  ['/track', 'Track my complaint'],
  ['/check', 'Check something suspicious'],
  ['/help', 'Get help'],
  ['/learn', 'Learn and stay safe'],
] as const;

export function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const resizeText = (direction: number) => {
    const current = Number.parseFloat(document.documentElement.style.fontSize || '100');
    document.documentElement.style.fontSize = `${Math.min(125, Math.max(87.5, current + direction))}%`;
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="ux4g-topbar" role="banner">
        <div className="ux4g-container">
          <div className="ux4g-topbar__wrap ux4g-d-flex ux4g-jc-between ux4g-ai-center">
            <span className="ux4g-label-m-strong">Cyber safety and incident support</span>
            <nav aria-label="Top utilities" className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-xs">
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:112">Emergency: 112</a>
              <span className="ux4g-bl-1 acc-top-divider" aria-hidden="true" />
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:1930">Financial fraud: 1930</a>
              <span className="ux4g-bl-1 acc-top-divider" aria-hidden="true" />
              <div aria-label="Text size controls" className="ux4g-topbar__group ux4g-d-flex ux4g-ai-center" role="group">
                <button aria-label="Decrease text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => resizeText(-12.5)} type="button"><span aria-hidden="true">A−</span></button>
                <button aria-label="Reset text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => { document.documentElement.style.fontSize = '100%'; }} type="button"><span aria-hidden="true">A</span></button>
                <button aria-label="Increase text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => resizeText(12.5)} type="button"><span aria-hidden="true">A+</span></button>
              </div>
              <button className="ux4g-topbar__selectbtn ux4g-d-inline-flex ux4g-ai-center" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} type="button" aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} theme`}>
                <span className="ux4g-icon-outlined" aria-hidden="true">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
              </button>
              <span className="limited-language ux4g-label-m-default">English · हिन्दी</span>
            </nav>
          </div>
        </div>
      </header>

      <nav className="ux4g-navbar" aria-label="Primary navigation">
        <div className="ux4g-container">
          <div className="ux4g-navbar-wrap">
            <a className="site-brand ux4g-d-flex ux4g-ai-center ux4g-gap-x-s" href="/">
              <span className="brand-mark ux4g-d-flex ux4g-jc-center ux4g-ai-center" aria-hidden="true"><span className="ux4g-icon-outlined">health_and_safety</span></span>
              <span className="ux4g-d-flex ux4g-flex-column"><span className="ux4g-label-m-strong">Cyber First Response</span><span className="ux4g-body-xs-default brand-description">Citizen-first cyber help</span></span>
            </a>
            <div className="ux4g-navbar-desktop">
              <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-l">
                <ul className="ux4g-navbar-links">{links.slice(0, 4).map(([href, label]) => <li key={href}><a className="ux4g-text-link-sm" href={href}>{label}</a></li>)}</ul>
                <a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/report">Report an incident</a>
              </div>
            </div>
            <div className="ux4g-navbar-mobile">
              <button aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Open menu" className="ux4g-icon-btn ux4g-icon-btn-outline-primary ux4g-icon-btn-md" onClick={() => setMenuOpen(!menuOpen)} type="button"><span className="ux4g-icon-outlined" aria-hidden="true">menu</span></button>
            </div>
          </div>
          {menuOpen && <div id="mobile-menu" className="mobile-menu-panel"><ul className="ux4g-list ux4g-list-default ux4g-list-m">{links.map(([href, label]) => <li className="ux4g-list-item" key={href}><a className="ux4g-list-item-row" href={href}><span className="ux4g-list-item-start">{label}</span><span className="ux4g-list-item-end ux4g-icon-outlined" aria-hidden="true">chevron_right</span></a></li>)}</ul></div>}
        </div>
      </nav>
    </>
  );
}
