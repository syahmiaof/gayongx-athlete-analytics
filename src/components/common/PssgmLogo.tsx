import type { CSSProperties } from "react";
export function PssgmLogo({
  className = "",
  size = 56,
  showText = false,
}: {
  className?: string;
  size?: number | string;
  showText?: boolean;
}) {
  return (
    <span className={`pssgm-logo ${className}`}>
      <img
        src="/assets/pssgm-logo.png"
        alt="Logo rasmi PSSGM"
        style={
          { width: size, height: size, objectFit: "contain" } as CSSProperties
        }
      />
      {showText && <span>PSSGM PERAK</span>}
    </span>
  );
}
