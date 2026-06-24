/**
 * CustomerJourney component - Display before/after customer journey
 */

import Card from "./Card";
import Icon from "./Icon";

interface JourneyStep {
  step: number;
  title: string;
  description: string;
}

interface CustomerJourneyProps {
  before: JourneyStep[];
  after: JourneyStep[];
}

interface JourneyTimelineProps {
  steps: JourneyStep[];
  isBefore: boolean;
}

function JourneyTimeline({ steps, isBefore }: JourneyTimelineProps) {
  return (
    <div className="space-y-1">
      {steps.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                isBefore ? "bg-[var(--status-danger)]" : "bg-[var(--status-success)]"
              }`}
            >
              {item.step}
            </div>
            {index !== steps.length - 1 && (
              <div className="my-1 w-0.5 flex-1 bg-[var(--neutral-stroke-1)]" />
            )}
          </div>
          <div className="pb-6 pt-1.5">
            <h3 className="font-semibold text-[var(--neutral-fg-1)]">{item.title}</h3>
            <p className="mt-1 text-sm text-[var(--neutral-fg-3)]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CustomerJourney({ before, after }: CustomerJourneyProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Before */}
      <Card className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--status-danger-bg)] text-[var(--status-danger)]">
            <Icon name="warning" size={20} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-[var(--neutral-fg-1)]">Before</h2>
            <p className="text-sm text-[var(--neutral-fg-3)]">How customers experience support today</p>
          </div>
        </div>
        <JourneyTimeline steps={before} isBefore={true} />
      </Card>

      {/* After */}
      <Card className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--status-success-bg)] text-[var(--status-success)]">
            <Icon name="checkCircle" size={20} />
          </span>
          <div>
            <h2 className="text-xl font-bold text-[var(--neutral-fg-1)]">After</h2>
            <p className="text-sm text-[var(--neutral-fg-3)]">How Customer Compass transforms support</p>
          </div>
        </div>
        <JourneyTimeline steps={after} isBefore={false} />
      </Card>
    </div>
  );
}
