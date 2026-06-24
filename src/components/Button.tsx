/**
 * Button component - Reusable button for consistent styling
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm transition-all duration-150 disabled:cursor-not-allowed";

  const variantStyles =
    variant === "primary" ? "brand-button" : "brand-outline-button";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
}
