interface CfrLogoProps {
  inverted?: boolean;
  showWordmark?: boolean;
  size?: number;
}

export function CfrLogo({ inverted = false, showWordmark = true, size = 72 }: CfrLogoProps) {
  const logoSrc = inverted || showWordmark ? '/white-logo.png' : '/logo-main.png';

  return (
    <img
      src={logoSrc}
      alt="Cyber First Response"
      height={size}
      style={{
        display: 'block',
        height: `${size}px`,
        maxHeight: `${size}px`,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  );
}
