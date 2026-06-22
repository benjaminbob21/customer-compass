import Image from "next/image";

interface BrandLogoProps {
  size?: "nav" | "hero" | "badge";
  showText?: boolean;
  className?: string;
}

const imageSizes = {
  nav: { width: 64, height: 36 },
  badge: { width: 120, height: 68 },
  hero: { width: 640, height: 360 },
};

export default function BrandLogo({
  size = "nav",
  showText = false,
  className = "",
}: BrandLogoProps) {
  const dimensions = imageSizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/customer-compass-logo.png"
        alt="Customer Compass logo"
        width={dimensions.width}
        height={dimensions.height}
        priority={size === "hero"}
        style={{ width: "auto", height: "auto" }}
        className="h-auto rounded-2xl"
      />
      {showText && (
        <div className="min-w-0">
          <div className="text-lg font-semibold tracking-tight text-[var(--brand-deep)]">
            Customer Compass
          </div>
          <div className="text-xs uppercase tracking-[0.24em] text-[var(--brand-navy)]/70">
            Clearer support
          </div>
        </div>
      )}
    </div>
  );
}