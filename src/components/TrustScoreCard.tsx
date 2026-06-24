/**
 * TrustScoreCard component - Display a trust/confidence score
 */

import Card from "./Card";
import Icon from "./Icon";

interface TrustScoreCardProps {
  score: number;
  label?: string;
  description?: string;
}

export default function TrustScoreCard({
  score,
  label = "Confidence Score",
  description = "Based on similar historical incidents",
}: TrustScoreCardProps) {
  const ring = score >= 80 ? "#0e700e" : score >= 60 ? "#0f6cbd" : "#9a5800";
  const scoreLevel = score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";

  return (
    <Card className="p-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[var(--neutral-fg-1)]">
        <Icon name="gauge" size={18} className="text-[var(--brand-primary)]" />
        {label}
      </h3>

      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24">
          <svg className="h-24 w-24 -rotate-90">
            <circle cx="48" cy="48" r="40" fill="none" stroke="#eaeaea" strokeWidth="8" />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={ring}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: ring }}>
              {score}%
            </span>
          </div>
        </div>

        <div>
          <p className="mb-1 text-lg font-semibold text-[var(--neutral-fg-1)]">
            {scoreLevel} confidence
          </p>
          <p className="text-sm text-[var(--neutral-fg-3)]">{description}</p>
        </div>
      </div>
    </Card>
  );
}
