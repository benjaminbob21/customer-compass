"use client";

/**
 * Analysis Results Page
 *
 * Renders the live /api/analyze response stored by the home page. Mock data is
 * used ONLY as a fallback (e.g. when the page is opened directly with nothing
 * stored), never when a real analysis is available.
 *
 * Sections:
 * - Trust Score & Issue Summary
 * - Similar Historical Incidents
 * - Prioritized Resolution Path (static — no API field yet)
 * - Customer Expectations & Timeline (static — no API field yet)
 * - Recommended Actions
 * - Customer Communication Draft + Copy & Send
 */

import { useMemo, useState, useSyncExternalStore } from "react";
import type { AnalyzeResponse } from "@/lib/types";
import PageHero from "@/components/PageHero";
import SimilarIncidentCard from "@/components/SimilarIncidentCard";
import RecommendedActionsList from "@/components/RecommendedActionsList";
import TrustScoreCard from "@/components/TrustScoreCard";
import ResolutionPath from "@/components/ResolutionPath";
import CustomerExpectations from "@/components/CustomerExpectations";
import Card from "@/components/Card";
import Icon, { type IconName } from "@/components/Icon";
import {
  mockIncidents,
  mockRecommendedActions,
  mockCustomerMessage,
} from "@/lib/mockData";

/** Pull the leading integer out of a confidence string like "85% similarity". */
function parseConfidence(confidence: string): number {
  const match = confidence.match(/\d+/);
  return match ? Number(match[0]) : 87;
}

/** Subscribe to cross-tab sessionStorage changes (no-op server-side). */
function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

/** Read a sessionStorage key as a stable string (null server-side / when absent). */
function useSessionValue(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => sessionStorage.getItem(key),
    () => null,
  );
}

function SectionHeading({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-[var(--neutral-fg-1)]">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand-tint)] text-[var(--brand-primary)]">
        <Icon name={icon} size={18} />
      </span>
      {children}
    </h2>
  );
}

export default function ResultsPage() {
  const storedAnalysis = useSessionValue("cc:analysis");
  const storedIssue = useSessionValue("cc:issue");

  const analysis = useMemo<AnalyzeResponse | null>(() => {
    if (!storedAnalysis) return null;
    try {
      return JSON.parse(storedAnalysis) as AnalyzeResponse;
    } catch {
      return null;
    }
  }, [storedAnalysis]);

  const isLive = analysis !== null;

  // Real values when available, otherwise the demo mock.
  const reportedIssue =
    storedIssue || "Customer experiencing intermittent Azure networking failures.";
  const trustScore = analysis ? parseConfidence(analysis.confidence) : 87;
  const incidents = analysis?.similarIncidents ?? mockIncidents;
  const recommendedActions =
    analysis?.recommendedActions ?? mockRecommendedActions;
  const customerMessage = analysis?.customerMessage ?? mockCustomerMessage;

  const emailSubject = analysis?.emailSubject ?? "Update on your support issue";
  // Always email the exact message shown on screen so what you see is what you send.
  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(customerMessage)}`;

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customerMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the email action still works */
    }
  };

  return (
    <main className="flex-1">
      <PageHero
        eyebrow="Analysis complete"
        title="Ready to communicate with confidence"
        subtitle="Grounded in Microsoft's support history, tailored to this customer"
        icon="checkCircle"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Source indicator */}
        <div className="mb-6 flex justify-end">
          {isLive ? (
            <span className="ms-badge bg-[var(--status-success-bg)] text-[var(--status-success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-success)] ms-pulse" />
              Live AI analysis
            </span>
          ) : (
            <span className="ms-badge bg-[var(--status-warning-bg)] text-[var(--status-warning)]">
              <Icon name="warning" size={13} />
              Demo data (no live analysis)
            </span>
          )}
        </div>

        {/* Section 1: Issue Summary + Trust Score */}
        <section className="mb-16">
          <SectionHeading icon="chart">The issue &amp; our confidence</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-[var(--brand-primary)]">
              <h3 className="font-semibold text-[var(--neutral-fg-1)] mb-2">Reported issue</h3>
              <p className="leading-relaxed text-[var(--neutral-fg-2)]">{reportedIssue}</p>
            </Card>
            <TrustScoreCard score={trustScore} />
          </div>
        </section>

        {/* Section 2: What We Found */}
        <section className="mb-16">
          <SectionHeading icon="search">
            What we found: {incidents.length} similar incidents
          </SectionHeading>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <SimilarIncidentCard
                key={incident.id}
                id={incident.id}
                title={incident.title}
                resolution={incident.resolution}
                date={"date" in incident ? incident.date : undefined}
                severity={"severity" in incident ? incident.severity : undefined}
                resolutionTime={
                  "resolutionTime" in incident ? incident.resolutionTime : undefined
                }
              />
            ))}
          </div>
        </section>

        {/* Section 3: Resolution Path */}
        <section className="mb-16">
          <SectionHeading icon="route">Your resolution path</SectionHeading>
          <ResolutionPath />
        </section>

        {/* Section 4: What to Expect */}
        <section className="mb-16">
          <SectionHeading icon="clock">What your customer should expect</SectionHeading>
          <CustomerExpectations />
        </section>

        {/* Section 5: Recommended Actions */}
        <section className="mb-16">
          <SectionHeading icon="check">Recommended actions for your team</SectionHeading>
          <Card className="p-8">
            <RecommendedActionsList actions={recommendedActions} />
          </Card>
        </section>

        {/* Section 6: Customer Communication */}
        <section className="mb-16">
          <SectionHeading icon="chat">What to tell the customer</SectionHeading>
          <Card className="p-8 border-l-4 border-[var(--brand-primary)]">
            <div className="rounded-lg bg-[var(--brand-tint)] p-5">
              <p className="whitespace-pre-wrap leading-relaxed text-[var(--neutral-fg-1)]">
                {customerMessage}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="brand-outline-button inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <Icon name={copied ? "check" : "copy"} size={16} />
                {copied ? "Copied" : "Copy message"}
              </button>
              <a
                href={mailtoHref}
                className="brand-button inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <Icon name="mail" size={16} />
                Send as email
              </a>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}

