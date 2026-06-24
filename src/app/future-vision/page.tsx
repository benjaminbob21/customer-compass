/**
 * Future Vision Roadmap Page
 *
 * Clarifies that proactive rescue is a roadmap capability,
 * not fully shipped MVP functionality.
 */

import PageHero from "@/components/PageHero";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Link from "next/link";

const phases: { tag: string; title: string; body: string }[] = [
  {
    tag: "Phase 1",
    title: "Pilot",
    body: "Enable proactive signal detection for a limited customer cohort and validate precision/recall of alerts.",
  },
  {
    tag: "Phase 2",
    title: "Assist",
    body: "Provide human-in-the-loop outreach drafts with approval workflows and guardrails for customer messaging.",
  },
  {
    tag: "Phase 3",
    title: "Scale",
    body: "Expand to broader segments with measurable impact on prevention rate, satisfaction, and support efficiency.",
  },
];

const dependencies = [
  "Telemetry signal quality and alert confidence thresholds",
  "Approval workflows for proactive customer outreach",
  "Governance and compliance checks for outbound messaging",
  "Success metrics instrumentation (prevention rate, CSAT, time-to-resolution)",
];

export default function FutureVisionPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Roadmap"
        title="Future Vision: Proactive Rescue"
        subtitle="Roadmap capability for phased rollout"
        icon="target"
      />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <Card className="mb-10 border-l-4 border-[var(--brand-primary)] p-8">
          <h2 className="mb-3 text-2xl font-bold text-[var(--neutral-fg-1)]">Roadmap status</h2>
          <p className="leading-relaxed text-[var(--neutral-fg-2)]">
            Proactive Customer Rescue is part of our future roadmap. The concept and user experience
            are validated in this demo, while production rollout depends on additional data
            integrations, alert quality validation, and operational readiness.
          </p>
        </Card>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {phases.map((phase) => (
            <Card key={phase.title} className="relative overflow-hidden p-6">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
              <p className="ms-eyebrow mb-2 text-[var(--neutral-fg-4)]">{phase.tag}</p>
              <h3 className="mb-2 text-lg font-bold text-[var(--neutral-fg-1)]">{phase.title}</h3>
              <p className="text-sm leading-6 text-[var(--neutral-fg-3)]">{phase.body}</p>
            </Card>
          ))}
        </div>

        <Card className="mb-10 p-8">
          <h3 className="mb-4 text-xl font-bold text-[var(--neutral-fg-1)]">Dependencies before GA</h3>
          <ul className="space-y-2.5">
            {dependencies.map((dep) => (
              <li key={dep} className="flex items-start gap-2.5 text-[var(--neutral-fg-2)]">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-[var(--brand-primary)]" />
                {dep}
              </li>
            ))}
          </ul>
        </Card>

        <div className="py-4 text-center">
          <Link
            href="/rescue"
            className="brand-outline-button inline-flex items-center gap-2 px-6 py-3 text-base"
          >
            <Icon name="arrowRight" size={16} className="rotate-180" />
            Back to Proactive Rescue demo
          </Link>
        </div>
      </div>
    </main>
  );
}
