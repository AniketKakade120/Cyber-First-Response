'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from 'react';
import { CfrLogo } from './cfr-logo';

const links = [
  ['/report', 'Report'],
  ['/track', 'Track'],
  ['/faq', 'FAQ'],
  ['/learn', 'Learn'],
  ['/help', 'Help'],
  ['/check', 'Check Suspect'],
] as const;

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'kn', label: 'கன்னட (Kannada)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'as', label: 'অসমীয়া (Assamese)' },
  { code: 'ur', label: 'اردو (Urdu)' },
] as const;

export function ServiceHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedLang, setSelectedLang] = useState('en');

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
      <header className="ux4g-topbar service-utility" role="banner" style={{ padding: '0.25rem 0', minHeight: '34px' }}>
        <div className="ux4g-container">
          <div className="ux4g-topbar__wrap ux4g-d-flex ux4g-jc-between ux4g-ai-center" style={{ minHeight: '34px' }}>
            <nav aria-label="Emergency contacts" className="utility-contacts ux4g-d-flex ux4g-ai-center ux4g-gap-x-l">
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:1930"><span>Financial cyber fraud</span><strong>1930</strong></a>
              <span className="ux4g-bl-1 acc-top-divider" aria-hidden="true" />
              <a className="ux4g-label-m-default ux4g-topbar__skip" href="tel:112"><span>Emergency</span><strong>112</strong></a>
            </nav>
            <nav aria-label="Top utilities" className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-xs">
              <div className="language-selector-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginEnd: '0.5rem' }}>
                <span className="ux4g-icon-outlined" aria-hidden="true" style={{ fontSize: '1.05rem' }}>language</span>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  aria-label="Select Indian Regional Language"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--ux4g-border-color-neutral-default, #CBD5E1)',
                    borderRadius: '6px',
                    padding: '0.15rem 0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'currentColor',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} style={{ color: '#0F172A', background: '#FFFFFF' }}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
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

      <nav className="ux4g-navbar" aria-label="Primary navigation" style={{ paddingBlock: '0.25rem', minHeight: '50px', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
        <div className="ux4g-container" style={{ overflow: 'visible', width: '100%' }}>
          <div className="ux4g-navbar-wrap" style={{ minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'visible' }}>
            <a className="site-brand" href="/" aria-label="Cyber First Response – home" style={{ display: 'inline-flex', alignItems: 'center', overflow: 'visible', margin: 0 }}>
              <CfrLogo size={68} />
            </a>
            <div className="ux4g-navbar-desktop" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="ux4g-d-flex ux4g-ai-center ux4g-gap-x-l" style={{ display: 'flex', alignItems: 'center' }}>
                <ul className="ux4g-navbar-links" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>{links.map(([href, label]) => <li key={href} style={{ display: 'inline-flex', alignItems: 'center' }}><a className="ux4g-text-link-sm" href={href} style={{ display: 'inline-flex', alignItems: 'center' }}>{label}</a></li>)}</ul>
                <a className="ux4g-btn ux4g-btn-primary ux4g-btn-md" href="/report" style={{ background: '#FFFFFF', borderColor: 'var(--cfr-blue)', color: 'var(--cfr-blue)', fontWeight: 700, padding: '0.4rem 1.2rem', height: '36px', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center' }}>Start a report</a>
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
