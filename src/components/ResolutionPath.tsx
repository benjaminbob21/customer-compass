/**
 * ResolutionPath Component
 * Shows the logical resolution pathway with priority actions
 */

import Card from "@/components/Card";
import Icon from "@/components/Icon";

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
    <Card className="p-8">
      <h3 className="mb-6 flex items-center gap-2 text-base font-semibold text-[var(--neutral-fg-1)]">
        <Icon name="route" size={18} className="text-[var(--brand-primary)]" />
        Resolution path (prioritized actions)
      </h3>

      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.priority}
            className="flex gap-4 rounded-lg border border-[var(--neutral-stroke-1)] bg-white p-4 transition-all hover:border-[var(--brand-primary)] hover:shadow-[var(--shadow-8)]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
              {step.priority}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-[var(--neutral-fg-1)]">{step.action}</p>
                  <p className="mt-1 text-sm text-[var(--neutral-fg-3)]">{step.rationale}</p>
                </div>
                <span className="ms-chip whitespace-nowrap bg-[var(--brand-tint)] text-[var(--brand-primary)]">
                  {step.owner}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[var(--status-success)]/20 bg-[var(--status-success-bg)] p-4">
        <Icon name="checkCircle" size={20} className="mt-0.5 shrink-0 text-[var(--status-success)]" />
        <p className="text-sm text-[var(--neutral-fg-2)]">
          <strong className="text-[var(--status-success)]">Success indicator:</strong> Once these
          steps complete without errors, customer connectivity should be restored with 99%+
          confidence.
        </p>
      </div>
    </Card>
  );
}
