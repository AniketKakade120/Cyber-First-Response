'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from 'react';
import { CfrLogo } from './cfr-logo';

const links = [
  ['/report', 'Report'],
  ['/track', 'Track'],
  ['/learn', 'Learn'],
  ['/help', 'Help'],
] as const;

export function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Inject Noto Sans from Google Fonts once
  useEffect(() => {
    if (document.getElementById('cfr-google-fonts')) return;
    const link = document.createElement('link');
    link.id = 'cfr-google-fonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const resizeText = (direction: number) => {
    const current = Number.parseFloat(document.documentElement.style.fontSize || '100');
    document.documentElement.style.fontSize = `${Math.min(125, Math.max(87.5, current + direction))}%`;
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="ux4g-topbar service-utility" role="banner">
        <div className="ux4g-container">
          <div className="ux4g-topbar__wrap ux4g-d-flex ux4g-jc-between ux4g-ai-center">
            <nav aria-label="Emergency contacts" className="utility-contacts ux4g-d-flex ux4g-ai-center ux4g-gap-x-l">
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:1930"><span>Financial cyber fraud</span><strong>1930</strong></a>
              <span className="ux4g-bl-1 acc-top-divider" aria-hidden="true" />
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:112"><span>Emergency</span><strong>112</strong></a>
            </nav>
            <nav aria-label="Top utilities" className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-xs">
              <span className="limited-language ux4g-label-m-default"><span className="ux4g-icon-outlined" aria-hidden="true">language</span> English · हिन्दी</span>
              <div aria-label="Text size controls" className="ux4g-topbar__group ux4g-d-flex ux4g-ai-center" role="group">
                <button aria-label="Decrease text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => resizeText(-12.5)} type="button"><span aria-hidden="true">A−</span></button>
                <button aria-label="Reset text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => { document.documentElement.style.fontSize = '100%'; }} type="button"><span aria-hidden="true">A</span></button>
                <button aria-label="Increase text size" className="ux4g-topbar__iconbtn ux4g-d-flex ux4g-jc-center ux4g-ai-center" onClick={() => resizeText(12.5)} type="button"><span aria-hidden="true">A+</span></button>
              </div>
              <button className="ux4g-topbar__selectbtn ux4g-d-inline-flex ux4g-ai-center" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} type="button" aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} theme`}>
                <span className="ux4g-icon-outlined" aria-hidden="true">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <nav className="ux4g-navbar" aria-label="Primary navigation">
        <div className="ux4g-container">
          <div className="ux4g-navbar-wrap">
            <a className="site-brand" href="/" aria-label="Cyber First Response – home">
              <CfrLogo />
            </a>
            <div className="ux4g-navbar-desktop">
              <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-l">
                <ul className="ux4g-navbar-links">{links.map(([href, label]) => <li key={href}><a className="ux4g-text-link-sm" href={href}>{label}</a></li>)}</ul>
                <a className="ux4g-btn ux4g-btn-outline-primary ux4g-btn-md" href="/check">Check suspicious</a>
                <a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/report" style={{ background: 'var(--cfr-orange)', borderColor: 'var(--cfr-orange)' }}>Start a report →</a>
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
