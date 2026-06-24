/**
 * MetricCard component - Display a metric with value and description
 */

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
}

export default function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="ms-surface relative overflow-hidden p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-16)]">
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
      <div className="mb-2 text-sm font-medium text-[var(--neutral-fg-3)]">{label}</div>
      <div className="mb-2 text-4xl font-bold text-brand-gradient">{value}</div>
      <div className="text-sm text-[var(--neutral-fg-3)]">{description}</div>
    </div>
  );
}
