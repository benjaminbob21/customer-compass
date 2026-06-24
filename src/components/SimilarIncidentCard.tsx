/**
 * SimilarIncidentCard component - Display a similar incident
 */

import Card from "./Card";
import Icon from "./Icon";

interface SimilarIncidentCardProps {
  id: string;
  title: string;
  resolution: string;
  date?: string;
  severity?: string;
  resolutionTime?: string;
}

export default function SimilarIncidentCard({
  id,
  title,
  resolution,
  date,
  severity,
  resolutionTime,
}: SimilarIncidentCardProps) {
  const severityStyle =
    severity === "Critical"
      ? "bg-[var(--status-danger-bg)] text-[var(--status-danger)]"
      : severity === "High"
        ? "bg-[var(--status-warning-bg)] text-[var(--status-warning)]"
        : "bg-[var(--brand-tint)] text-[var(--brand-primary)]";

  return (
    <Card className="p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-tint)] text-[var(--brand-primary)]">
            <Icon name="documents" size={18} />
          </span>
          <h3 className="text-base font-semibold text-[var(--neutral-fg-1)]">{title}</h3>
        </div>
        {severity && (
          <span className={`ms-badge ${severityStyle}`}>{severity}</span>
        )}
      </div>

      <p className="mb-4 pl-12 text-sm leading-6 text-[var(--neutral-fg-2)]">{resolution}</p>

      <div className="flex flex-wrap gap-4 pl-12 text-xs text-[var(--neutral-fg-3)]">
        {date && (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="history" size={14} /> {date}
          </span>
        )}
        {resolutionTime && (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={14} /> {resolutionTime}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 font-mono text-[var(--neutral-fg-4)]">
          {id}
        </span>
      </div>
    </Card>
  );
}
