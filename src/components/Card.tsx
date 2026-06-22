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
      className={`brand-panel rounded-[24px] transition-shadow duration-200 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
