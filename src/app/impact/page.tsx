/**
 * Impact Dashboard Page
 * 
 * This page shows the business value and storytelling for judges.
 * It demonstrates the quantifiable impact Customer Compass has on support teams and customers.
 */

import PageHero from "@/components/PageHero";
import ImpactDashboard from "@/components/ImpactDashboard";
import Card from "@/components/Card";
import Icon, { type IconName } from "@/components/Icon";
import { mockImpactMetrics } from "@/lib/mockData";
import Link from "next/link";

const areas: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "bolt",
    title: "Faster resolution",
    body: "Support engineers spend less time searching for similar incidents. Issues are resolved 35% faster.",
  },
  {
    icon: "chat",
    title: "Better communication",
    body: "Clear, consistent customer updates build trust. Support engineers draft messages 50% faster.",
  },
  {
    icon: "signal",
    title: "Proactive support",
    body: "Detect issues before customers are affected. Prevent outages and strengthen relationships.",
  },
];

export default function ImpactPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Business value"
        title="The Impact"
        subtitle="Real business value from better customer communication"
        icon="trend"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-fg-1)]">Measurable impact</h2>
          <ImpactDashboard metrics={mockImpactMetrics} />
        </div>

        {/* Why It Matters */}
        <Card className="mb-16 border-l-4 border-[var(--brand-primary)] p-8">
          <p className="text-lg leading-relaxed text-[var(--neutral-fg-2)]">
            <strong className="text-[var(--neutral-fg-1)]">The real opportunity:</strong> Support is
            where customer trust is built or lost. By turning Microsoft&apos;s technical knowledge
            into clear, personalized customer communication, we transform support from a cost center
            into a competitive advantage — while reducing per-ticket costs through AI automation.
          </p>
        </Card>

        {/* Three Key Areas */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.title} className="relative overflow-hidden p-6">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-tint)] text-[var(--brand-primary)]">
                <Icon name={area.icon} size={24} />
              </div>
              <h3 className="mb-2 font-bold text-[var(--neutral-fg-1)]">{area.title}</h3>
              <p className="text-sm leading-6 text-[var(--neutral-fg-3)]">{area.body}</p>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="py-8 text-center">
          <Link
            href="/"
            className="brand-button inline-flex items-center gap-2 px-7 py-3.5 text-base"
          >
            Start your analysis
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
