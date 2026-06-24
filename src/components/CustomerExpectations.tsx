/**
 * CustomerExpectations Component
 * Shows what the customer should expect during resolution
 * Includes timeline, ETA, and communication cadence
 */

import Card from "@/components/Card";
import Icon, { type IconName } from "@/components/Icon";

interface Expectation {
  timeframe: string;
  title: string;
  description: string;
  icon: IconName;
}

interface CustomerExpectationsProps {
  expectations?: Expectation[];
}

const defaultExpectations: Expectation[] = [
  {
    timeframe: "Now",
    title: "Initial Analysis",
    description: "We're analyzing the root cause based on historical incidents",
    icon: "search",
  },
  {
    timeframe: "15-30 min",
    title: "First Update",
    description: "Initial findings and preliminary root cause assessment",
    icon: "documents",
  },
  {
    timeframe: "1-2 hours",
    title: "Action Plan",
    description: "Detailed mitigation steps and engineering team assignment",
    icon: "route",
  },
  {
    timeframe: "2-4 hours",
    title: "Resolution Path",
    description: "Implementation of fix with real-time progress updates",
    icon: "bolt",
  },
  {
    timeframe: "4+ hours",
    title: "Monitoring & Validation",
    description: "Continuous monitoring and customer confirmation of resolution",
    icon: "checkCircle",
  },
];

export default function CustomerExpectations({
  expectations = defaultExpectations,
}: CustomerExpectationsProps) {
  return (
    <Card className="p-8">
      <h3 className="mb-6 flex items-center gap-2 text-base font-semibold text-[var(--neutral-fg-1)]">
        <Icon name="clock" size={18} className="text-[var(--brand-primary)]" />
        What your customer should expect
      </h3>

      <div className="relative space-y-1">
        {expectations.map((expectation, index) => (
          <div
            key={index}
            className="flex gap-4 border-b border-[var(--neutral-stroke-1)] py-4 last:border-b-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-tint)] text-[var(--brand-primary)]">
              <Icon name={expectation.icon} size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--neutral-fg-1)]">{expectation.title}</p>
                  <p className="mt-1 text-sm text-[var(--neutral-fg-3)]">{expectation.description}</p>
                </div>
                <span className="ms-chip whitespace-nowrap bg-[var(--neutral-bg-2)]">
                  {expectation.timeframe}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[var(--brand-primary)]/15 bg-[var(--brand-tint)] p-4">
        <Icon name="chat" size={20} className="mt-0.5 shrink-0 text-[var(--brand-primary)]" />
        <p className="text-sm text-[var(--neutral-fg-2)]">
          <strong className="text-[var(--brand-primary)]">Communication cadence:</strong> We&apos;ll
          send updates every 30 minutes or when significant progress is made. You can reach our team
          at any time with questions.
        </p>
      </div>
    </Card>
  );
}
