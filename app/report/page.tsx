'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceLayout } from '../../components/service-layout';
import { DraftResumeModal, DraftAlertBanner } from '../../components/draft-modal';

interface CategoryCard {
  id: string;
  title: string;
  desc: string;
  href: string;
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeType?: 'time-sensitive' | 'privacy';
  keyboardPill?: boolean;
  specialCard?: boolean;
  iconSvg: React.ReactNode;
}

export default function ReportPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [describeText, setDescribeText] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [targetHref, setTargetHref] = useState('/report/guided');

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const stored = localStorage.getItem('cfr-draft-v1');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.narrative || parsed.amount || parsed.step > 0) {
          e.preventDefault();
          setTargetHref(href);
          setShowModal(true);
        }
      } catch {}
    }
  };

  const categories: CategoryCard[] = [
    {
      id: 'financial-fraud',
      title: 'Financial fraud',
      desc: 'Money transfers, payments, investments, cards or banking fraud.',
      href: '/report/financial-fraud',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12M6 8h12M6 13h7M6 13a4 4 0 0 0 4 4h1M6 13c1 0 7 7 7 7" />
        </svg>
      ),
    },
    {
      id: 'threats-harassment',
      title: 'Threats or harassment',
      desc: 'Blackmail, stalking, sextortion, bullying or unwanted contact.',
      href: '/report/sensitive-harm',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 18a5 5 0 0 1 10 0" />
        </svg>
      ),
    },
    {
      id: 'child-safety',
      title: 'Child safety',
      desc: 'Immediate safety and evidence-preservation guidance involving a child.',
      href: '/report/sensitive-harm',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 10h.01M15 10h.01M9 15c1.5 1 4.5 1 6 0" />
        </svg>
      ),
    },
    {
      id: 'account-compromise',
      title: 'Account compromise',
      desc: 'Secure a hacked email, social media, banking or other account.',
      href: '/report/identity',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="8" r="4" />
          <path d="M2 20a8 8 0 0 1 12.5-6.5" />
          <rect x="15" y="11" width="7" height="9" rx="1.5" />
          <path d="M17 11V9a2 2 0 0 1 4 0v2" />
        </svg>
      ),
    },
    {
      id: 'identity-misuse',
      title: 'Identity misuse',
      desc: 'Impersonation, fake profiles or misuse of personal information.',
      href: '/report/identity',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2.5" />
          <path d="M5 17a4 4 0 0 1 8 0M15 9h4M15 13h4" />
        </svg>
      ),
    },
    {
      id: 'device-data-attack',
      title: 'Device or data attack',
      desc: 'Malware, ransomware, unauthorised access or data theft.',
      href: '/report/identity',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="10" rx="1.5" />
          <path d="M2 18h20M12 9v2M10 10h4M9 8l1 1M15 8l-1 1" />
        </svg>
      ),
    },
    {
      id: 'suspicious-contact',
      title: 'Suspicious contact or website',
      desc: 'Check an identifier or report an attempted scam.',
      href: '/check',
      iconBg: '#EFF6FF',
      iconColor: '#1D4ED8',
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
          <path d="M15 15l4 4m0-4l-4 4" />
        </svg>
      ),
    },
    {
      id: 'anonymous-reporting',
      title: 'Anonymous reporting',
      desc: 'Understand available options and limitations.',
      href: '/report/anonymous',
      iconBg: '#DBEAFE',
      iconColor: '#1E40AF',
      badge: 'Privacy guidance',
      badgeType: 'privacy',
      specialCard: true,
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10h18M6 10l2-5h8l2 5" />
          <circle cx="8.5" cy="15.5" r="2.5" />
          <circle cx="15.5" cy="15.5" r="2.5" />
          <path d="M11 15.5h2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <DraftAlertBanner />
      <ServiceLayout>
        <div className="ux4g-container page-section report-selector-page">
          {/* Header Bar */}
          <div className="report-selector-header">
            <div>
              <h1 className="report-selector-title">What type of incident do you need to report?</h1>
              <p className="report-selector-sub">
                Select the category that best matches what happened. You can change your choice later.
              </p>
            </div>
            <button
              className="lang-selector-btn"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              type="button"
            >
              <span>{lang === 'en' ? 'English · हिंदी' : 'हिंदी · English'}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* 4x2 Grid */}
          <div className="report-cards-grid">
            {categories.map((cat) => {
              const isSelected = selectedId === cat.id;
              return (
                <a
                  key={cat.id}
                  href={cat.href}
                  onClick={(e) => {
                    setSelectedId(cat.id);
                    handleCategoryClick(e, cat.href);
                  }}
                  className={`report-select-card ${isSelected ? 'is-selected' : ''} ${cat.specialCard ? 'is-special' : ''}`}
                >
                  {/* Top Badge if any */}
                  {cat.badge && cat.badgeType === 'privacy' && (
                    <span className="privacy-badge">{cat.badge}</span>
                  )}

                  {/* Circular Icon */}
                  <div
                    className="report-card-icon"
                    style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                  >
                    {cat.iconSvg}
                  </div>

                  {/* Content */}
                  <div className="report-card-body">
                    <h2 className="report-card-heading">{cat.title}</h2>
                    <p className="report-card-desc">{cat.desc}</p>
                  </div>

                  {/* Footer / Action row */}
                  <div className="report-card-footer">
                    {cat.keyboardPill ? (
                      <span className="keyboard-pill">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
                        </svg>
                        Press Enter to select
                      </span>
                    ) : <span />}

                    <span className="card-chevron">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Bottom Describe Banner */}
          <form
            className="report-describe-banner"
            onSubmit={(e) => {
              e.preventDefault();
              if (describeText.trim()) {
                localStorage.setItem('cfr-initial-narrative', describeText.trim());
              }
              const stored = localStorage.getItem('cfr-draft-v1');
              if (stored) {
                try {
                  const parsed = JSON.parse(stored);
                  if (parsed.narrative || parsed.amount || parsed.step > 0) {
                    setTargetHref('/report/guided');
                    setShowModal(true);
                    return;
                  }
                } catch {}
              }
              router.push('/report/guided');
            }}
          >
            <div className="describe-header">
              <h3 className="describe-title">Or describe what happened in your own words</h3>
              <span className="describe-sub">We'll suggest the closest route for you to review.</span>
            </div>

            <div className="describe-input-row">
              <div className="describe-input-wrapper">
                <svg className="describe-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <input
                  type="text"
                  className="describe-input"
                  value={describeText}
                  onChange={(e) => setDescribeText(e.target.value)}
                  placeholder="Include dates, amounts, names or anything else you remember."
                />
              </div>

              <button type="submit" className="describe-submit-btn">
                Find the right route →
              </button>
            </div>
          </form>
        </div>
      </ServiceLayout>

      <DraftResumeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStartNew={() => {
          router.push(targetHref);
        }}
      />
    </>
  );
}
