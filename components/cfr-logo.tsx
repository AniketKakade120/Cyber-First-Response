interface CfrLogoProps {
  inverted?: boolean;
  showWordmark?: boolean;
  size?: number;
}

export function CfrLogo({ inverted = false, showWordmark = true, size = 52 }: CfrLogoProps) {
  const logoSrc = inverted || showWordmark ? '/white-logo.png' : '/logo-main.png';

  return (
    <img
      src={logoSrc}
      alt="Cyber First Response"
      height={size}
      style={{
        display: 'block',
        height: `${size}px`,
        width: 'auto',
      }}
    />
  );
}
