/**
 * Future Vision Roadmap Page
 *
 * Clarifies that proactive rescue is a roadmap capability,
 * not fully shipped MVP functionality.
 */

import PageHero from "@/components/PageHero";
import Card from "@/components/Card";
import Link from "next/link";

export default function FutureVisionPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Future Vision: Proactive Rescue"
        subtitle="Roadmap capability for phased rollout"
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Card className="mb-10 border-l-4 border-[var(--brand-blue)] bg-[linear-gradient(135deg,rgba(141,217,255,0.18),rgba(255,255,255,0.92))] p-8">
          <h2 className="mb-3 text-2xl font-bold text-[var(--brand-ink)]">Roadmap Status</h2>
          <p className="text-gray-800 leading-relaxed">
            Proactive Customer Rescue is part of our future roadmap. The concept and user
            experience are validated in this demo, while production rollout depends on additional
            data integrations, alert quality validation, and operational readiness.
          </p>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
          <Card className="p-6 border-t-4 border-[var(--brand-blue)]">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Phase 1: Pilot</h3>
            <p className="text-sm text-gray-700">
              Enable proactive signal detection for a limited customer cohort and validate
              precision/recall of alerts.
            </p>
          </Card>

          <Card className="p-6 border-t-4 border-[var(--brand-navy)]">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Phase 2: Assist</h3>
            <p className="text-sm text-gray-700">
              Provide human-in-the-loop outreach drafts with approval workflows and guardrails
              for customer messaging.
            </p>
          </Card>

          <Card className="p-6 border-t-4 border-[var(--brand-deep)]">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Phase 3: Scale</h3>
            <p className="text-sm text-gray-700">
              Expand to broader segments with measurable impact on prevention rate,
              satisfaction, and support efficiency.
            </p>
          </Card>
        </div>

        <Card className="p-8 mb-10">
          <h3 className="mb-4 text-xl font-bold text-[var(--brand-ink)]">Dependencies Before GA</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Telemetry signal quality and alert confidence thresholds</li>
            <li>• Approval workflows for proactive customer outreach</li>
            <li>• Governance and compliance checks for outbound messaging</li>
            <li>• Success metrics instrumentation (prevention rate, CSAT, time-to-resolution)</li>
          </ul>
        </Card>

        <div className="text-center py-4">
          <Link
            href="/rescue"
            className="brand-outline-button inline-flex rounded-2xl px-6 py-3 text-base font-semibold transition-colors"
          >
            Back to Proactive Rescue Demo
          </Link>
        </div>
      </div>
    </main>
  );
}
