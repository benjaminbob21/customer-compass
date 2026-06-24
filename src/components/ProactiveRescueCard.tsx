/**
 * ProactiveRescueCard component - Display proactive risk signals
 */

import Card from "./Card";
import Icon from "./Icon";

interface ProactiveRescueCardProps {
  customer: string;
  signals: string[];
  prediction: string;
  confidence: number;
}

export default function ProactiveRescueCard({
  customer,
  signals,
  prediction,
  confidence,
}: ProactiveRescueCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center gap-3 border-b border-[var(--neutral-stroke-1)] bg-[var(--brand-tint)] px-6 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--brand-primary)] text-white">
          <Icon name="signal" size={20} />
        </span>
        <div>
          <h3 className="text-lg font-bold text-[var(--neutral-fg-1)]">{customer}</h3>
          <p className="text-xs font-medium text-[var(--brand-primary)]">Risk signal detected</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-[var(--neutral-fg-2)]">
            Detected risk signals
          </h4>
          <div className="space-y-2">
            {signals.map((signal, index) => (
              <div key={index} className="flex items-start gap-2.5">
                <Icon
                  name="warning"
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--status-warning)]"
                />
                <span className="text-sm text-[var(--neutral-fg-2)]">{signal}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-[var(--neutral-fg-2)]">Predicted issue</h4>
          <p className="mb-3 text-[var(--neutral-fg-1)]">{prediction}</p>
          <span className="ms-badge bg-[var(--brand-tint)] text-[var(--brand-primary)]">
            <Icon name="target" size={13} />
            {confidence}% confidence
          </span>
        </div>
      </div>
    </Card>
  );
}
