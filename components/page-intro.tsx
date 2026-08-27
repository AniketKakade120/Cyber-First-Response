export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro"><span className="eyebrow ux4g-label-l-strong">{eyebrow}</span><h1 className="ux4g-heading-xl-strong">{title}</h1><p className="ux4g-body-l-default">{description}</p></header>;
}
