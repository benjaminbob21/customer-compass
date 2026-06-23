/**
 * ResolutionPath Component
 * Shows the logical resolution pathway with priority actions
 */

import Card from "@/components/Card";

interface PathStep {
  priority: number;
  action: string;
  rationale: string;
  owner: string;
}

interface ResolutionPathProps {
  steps?: PathStep[];
}

const defaultSteps: PathStep[] = [
  {
    priority: 1,
    action: "Verify Route Table Configuration",
    rationale: "Similar to INC-2024-001, BGP misconfiguration is the most likely cause",
    owner: "Network Engineering",
  },
  {
    priority: 2,
    action: "Check Network Security Group Rules",
    rationale: "INC-2024-002 shows NSG rules can block traffic subtly across regions",
    owner: "Security Team",
  },
  {
    priority: 3,
    action: "Review Recent Infrastructure Changes",
    rationale: "INC-2024-003 resolved by reverting deployment; check recent changes",
    owner: "Infrastructure Team",
  },
  {
    priority: 4,
    action: "Monitor VM Connectivity Patterns",
    rationale: "Distinguish between regional vs. account-specific issues for targeted fix",
    owner: "Monitoring Team",
  },
  {
    priority: 5,
    action: "Validate DNS and Cache Settings",
    rationale: "Secondary check; intermittent failures often hide DNS caching issues",
    owner: "DNS Support",
  },
];

export default function ResolutionPath({ steps = defaultSteps }: ResolutionPathProps) {
  return (
    <Card className="p-8 bg-gradient-to-br from-[var(--brand-mist)] to-white">
      <h3 className="text-lg font-semibold text-[var(--brand-ink)] mb-6">
        Resolution Path (Prioritized Actions)
      </h3>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.priority}
            className="flex gap-4 p-4 rounded-lg bg-white border border-[var(--brand-border)] hover:border-[var(--brand-blue)] hover:shadow-md transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-blue)] text-white font-bold text-sm shrink-0">
              {step.priority}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--brand-ink)]">{step.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{step.rationale}</p>
                </div>
                <span className="px-3 py-1 bg-[var(--brand-sky)]/30 text-[var(--brand-deep)] text-xs font-medium rounded-full whitespace-nowrap">
                  {step.owner}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-gray-700">
          ✅ <strong>Success Indicator:</strong> Once these steps complete without errors,
          customer connectivity should be restored with 99%+ confidence.
        </p>
      </div>
    </Card>
  );
}
