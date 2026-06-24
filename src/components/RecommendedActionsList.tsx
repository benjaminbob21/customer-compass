/**
 * RecommendedActionsList component - Display a list of recommended actions
 */

import Icon from "./Icon";

interface RecommendedActionsListProps {
  actions: string[];
}

export default function RecommendedActionsList({ actions }: RecommendedActionsListProps) {
  return (
    <div className="space-y-2">
      {actions.map((action, index) => (
        <div
          key={index}
          className="flex items-start gap-4 rounded-lg border border-transparent p-3 transition-colors hover:border-[var(--neutral-stroke-1)] hover:bg-[var(--neutral-bg-2)]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-tint)] text-sm font-bold text-[var(--brand-primary)]">
            {index + 1}
          </div>
          <p className="pt-1 text-sm leading-6 text-[var(--neutral-fg-1)]">{action}</p>
          <Icon
            name="arrowRight"
            size={16}
            className="ml-auto mt-1.5 shrink-0 text-[var(--neutral-fg-disabled)]"
          />
        </div>
      ))}
    </div>
  );
}
