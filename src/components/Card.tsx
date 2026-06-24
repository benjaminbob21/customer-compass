/**
 * Card component - Reusable card for consistent styling
 */

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`brand-panel transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-16)] ${className}`}
    >
      {children}
    </div>
  );
}
