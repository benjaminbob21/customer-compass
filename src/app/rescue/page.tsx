/**
 * Proactive Customer Rescue Page
 * 
 * This page showcases the future vision: detecting risk signals before customers
 * experience issues and proactively reaching out with preventive guidance.
 */

import PageHero from "@/components/PageHero";
import ProactiveRescueCard from "@/components/ProactiveRescueCard";
import Card from "@/components/Card";
import Icon, { type IconName } from "@/components/Icon";
import { mockProactiveRescueScenario } from "@/lib/mockData";
import Link from "next/link";

const howItWorks: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "chart",
    title: "Analyze",
    body: "Customer Compass continuously analyzes telemetry from thousands of deployments.",
  },
  {
    icon: "bolt",
    title: "Predict",
    body: "AI identifies patterns that match known issues before they impact production.",
  },
  {
    icon: "chat",
    title: "Reach out",
    body: "Sends personalized, actionable guidance before customers experience problems.",
  },
];

export default function RescuePage() {
  const scenario = mockProactiveRescueScenario;
  const outreachSubject = `Proactive Support Guidance for ${scenario.customer}`;
  const outreachMailtoHref = `mailto:?subject=${encodeURIComponent(outreachSubject)}&body=${encodeURIComponent(
    scenario.recommendedOutreach,
  )}`;

  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Future vision"
        title="Proactive Customer Rescue"
        subtitle="Detect risk signals before customers experience impact"
        icon="signal"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Vision Statement */}
        <Card className="mb-12 border-l-4 border-[var(--brand-primary)] p-8">
          <p className="text-lg leading-relaxed text-[var(--neutral-fg-2)]">
            Before customers experience outages, Customer Compass detects early warning signals by
            analyzing patterns from thousands of historical incidents. We predict issues and send
            proactive guidance — preventing customer impact and turning Microsoft support into a
            competitive advantage.
          </p>
        </Card>

        {/* Proactive Rescue Scenario */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-fg-1)]">
            Real-time example: risk detected
          </h2>
          <ProactiveRescueCard
            customer={scenario.customer}
            signals={scenario.detectedSignals}
            prediction={scenario.prediction}
            confidence={scenario.confidence}
          />
        </div>

        {/* Recommended Outreach */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-fg-1)]">
            Recommended outreach message
          </h2>
          <Card className="p-8">
            <div className="rounded-lg bg-[var(--brand-tint)] p-5">
              <pre className="whitespace-pre-wrap font-sans text-[var(--neutral-fg-1)]">
                {scenario.recommendedOutreach}
              </pre>
            </div>
            <div className="mt-6">
              <a
                href={outreachMailtoHref}
                className="brand-button inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <Icon name="mail" size={16} />
                Send outreach email
              </a>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-fg-1)]">
            How Proactive Rescue works
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorks.map((item, i) => (
              <Card key={item.title} className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-tint)] text-[var(--brand-primary)]">
                  <Icon name={item.icon} size={24} />
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-bold text-[var(--neutral-fg-4)]">0{i + 1}</span>
                  <h3 className="text-lg font-bold text-[var(--neutral-fg-1)]">{item.title}</h3>
                </div>
                <p className="text-sm leading-6 text-[var(--neutral-fg-3)]">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-fg-1)]">Business impact</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="p-6 border-l-4 border-[var(--brand-primary)]">
              <h3 className="mb-3 font-bold text-[var(--neutral-fg-1)]">Customer benefits</h3>
              <ul className="space-y-2.5">
                {[
                  "Prevent issues before they impact users",
                  "Receive proactive guidance from experts",
                  "Higher uptime and reliability",
                  "Greater trust in Microsoft support",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-[var(--neutral-fg-2)]">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--status-success)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-[var(--brand-primary-pressed)]">
              <h3 className="mb-3 font-bold text-[var(--neutral-fg-1)]">Microsoft benefits</h3>
              <ul className="space-y-2.5">
                {[
                  "Reduce support ticket volume",
                  "Improve customer satisfaction scores",
                  "Strengthen customer relationships",
                  "Scale support team efficiency",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-[var(--neutral-fg-2)]">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--brand-primary)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-8 text-center">
          <Link
            href="/future-vision"
            className="brand-button inline-flex items-center gap-2 px-7 py-3.5 text-base"
          >
            View Proactive Rescue roadmap
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
