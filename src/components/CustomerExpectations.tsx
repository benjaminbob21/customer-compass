/**
 * CustomerExpectations Component
 * Shows what the customer should expect during resolution
 * Includes timeline, ETA, and communication cadence
 */

import Card from "@/components/Card";

interface Expectation {
  timeframe: string;
  title: string;
  description: string;
  icon: string;
}

interface CustomerExpectationsProps {
  expectations?: Expectation[];
}

const defaultExpectations: Expectation[] = [
  {
    timeframe: "Now",
    title: "Initial Analysis",
    description: "We're analyzing the root cause based on historical incidents",
    icon: "🔍",
  },
  {
    timeframe: "15-30 min",
    title: "First Update",
    description: "Initial findings and preliminary root cause assessment",
    icon: "📋",
  },
  {
    timeframe: "1-2 hours",
    title: "Action Plan",
    description: "Detailed mitigation steps and engineering team assignment",
    icon: "🛠️",
  },
  {
    timeframe: "2-4 hours",
    title: "Resolution Path",
    description: "Implementation of fix with real-time progress updates",
    icon: "⚡",
  },
  {
    timeframe: "4+ hours",
    title: "Monitoring & Validation",
    description: "Continuous monitoring and customer confirmation of resolution",
    icon: "✅",
  },
];

export default function CustomerExpectations({
  expectations = defaultExpectations,
}: CustomerExpectationsProps) {
  return (
    <Card className="p-8 border-l-4 border-[var(--brand-blue)]">
      <h3 className="text-lg font-semibold text-[var(--brand-ink)] mb-6">
        What Your Customer Should Expect
      </h3>

      <div className="space-y-4">
        {expectations.map((expectation, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
            <div className="text-2xl shrink-0">{expectation.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--brand-ink)]">{expectation.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{expectation.description}</p>
                </div>
                <span className="px-3 py-1 bg-[var(--brand-mist)] text-[var(--brand-deep)] text-xs font-medium rounded-full whitespace-nowrap">
                  {expectation.timeframe}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-[var(--brand-border)]">
        <p className="text-sm text-gray-700">
          <strong>Communication Cadence:</strong> We'll send updates every 30 minutes or when
          significant progress is made. You can reach our team at any time with questions.
        </p>
      </div>
    </Card>
  );
}
