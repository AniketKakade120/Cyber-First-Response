/**
 * CfrLogo – Cyber First Response brand mark.
 * Renders the official logo image.
 */

interface CfrLogoProps {
  /** Use inverted colours for dark navy backgrounds (footer). */
  inverted?: boolean;
  /** Show wordmark alongside icon. Defaults to true. (Ignored for image-based logo as wordmark is included) */
  showWordmark?: boolean;
  /** Size in px. We will use this to set the height of the image. Defaults to 40. */
  size?: number;
}

export function CfrLogo({ inverted = false, showWordmark = true, size = 40 }: CfrLogoProps) {
  return (
    <img
      src="/logo-main.png"
      alt="Cyber First Response"
      height={size}
      style={{
        display: 'block',
        height: `${size}px`,
        width: 'auto',
        // For the inverted footer variant, we apply a brightness filter to make it stand out on the dark background
        // Alternatively, if a specific white-logo asset is provided, we would use that.
        filter: inverted ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  );
}
