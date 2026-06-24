/**
 * Customer Journey Page
 * 
 * This page shows the before/after story of how Customer Compass transforms
 * the customer support experience.
 */

import PageHero from "@/components/PageHero";
import CustomerJourney from "@/components/CustomerJourney";
import Card from "@/components/Card";
import Icon, { type IconName } from "@/components/Icon";
import Link from "next/link";
import {
  mockCustomerJourneyBefore,
  mockCustomerJourneyAfter,
} from "@/lib/mockData";

const results: { icon: IconName; value: string; label: string }[] = [
  { icon: "bolt", value: "35%", label: "Faster issue diagnosis" },
  { icon: "chat", value: "50%", label: "Less time drafting updates" },
  { icon: "shield", value: "+85%", label: "Communication consistency" },
];

export default function JourneyPage() {
  return (
    <main className="flex-1">
      <PageHero
        eyebrow="The story"
        title="The Customer Journey"
        subtitle="From frustration to trust"
        icon="compass"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Problem + Solution */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-[var(--status-danger)] p-8">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--neutral-fg-1)]">
              <Icon name="warning" size={20} className="text-[var(--status-danger)]" />
              The problem today
            </h3>
            <p className="text-sm leading-relaxed text-[var(--neutral-fg-2)]">
              Customers report issues and get confusing technical jargon, slow updates, and
              inconsistent communication. They don&apos;t know what&apos;s happening or what to
              expect. Trust erodes.
            </p>
          </Card>

          <Card className="border-l-4 border-[var(--status-success)] p-8">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--neutral-fg-1)]">
              <Icon name="checkCircle" size={20} className="text-[var(--status-success)]" />
              With Customer Compass
            </h3>
            <p className="text-sm leading-relaxed text-[var(--neutral-fg-2)]">
              Issues are analyzed in seconds. Customers receive clear, personalized explanations of
              what&apos;s happening, what we&apos;re doing, and what to expect. Trust builds.
            </p>
          </Card>
        </div>

        {/* Journey Comparison */}
        <div className="mb-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--neutral-fg-1)]">
            The support flow
          </h2>
          <CustomerJourney
            before={mockCustomerJourneyBefore}
            after={mockCustomerJourneyAfter}
          />
        </div>

        {/* The Outcome */}
        <Card className="p-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-[var(--neutral-fg-1)]">
            The result
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {results.map((r) => (
              <div key={r.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-tint)] text-[var(--brand-primary)]">
                  <Icon name={r.icon} size={24} />
                </div>
                <div className="text-4xl font-bold text-brand-gradient">{r.value}</div>
                <p className="mt-2 text-sm text-[var(--neutral-fg-3)]">{r.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Call to Action */}
        <div className="py-12 text-center">
          <Link
            href="/"
            className="brand-button mr-3 inline-flex items-center gap-2 px-7 py-3.5 text-base"
          >
            Start your analysis
            <Icon name="arrowRight" size={18} />
          </Link>
          <Link
            href="/impact"
            className="brand-outline-button inline-flex items-center gap-2 px-7 py-3.5 text-base"
          >
            See the impact
          </Link>
        </div>
      </div>
    </main>
  );
}
