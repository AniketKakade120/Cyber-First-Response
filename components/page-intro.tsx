export function PageIntro({ title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro"><h1 className="ux4g-heading-xl-strong">{title}</h1><p className="ux4g-body-l-default">{description}</p></header>;
}
