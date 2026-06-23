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

import { useMemo, useSyncExternalStore } from "react";
import type { AnalyzeResponse } from "@/lib/types";
import PageHero from "@/components/PageHero";
import SimilarIncidentCard from "@/components/SimilarIncidentCard";
import RecommendedActionsList from "@/components/RecommendedActionsList";
import TrustScoreCard from "@/components/TrustScoreCard";
import ResolutionPath from "@/components/ResolutionPath";
import CustomerExpectations from "@/components/CustomerExpectations";
import Card from "@/components/Card";
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
  const emailBody = analysis?.emailBody ?? customerMessage;
  const mailtoHref = `mailto:?subject=${encodeURIComponent(
    emailSubject,
  )}&body=${encodeURIComponent(emailBody)}`;

  return (
    <main className="flex-1 bg-gradient-to-b from-white to-[var(--brand-mist)]">
      <PageHero
        title="Analysis Complete"
        subtitle="Ready to communicate with clarity and confidence"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Source indicator */}
        <div className="mb-6 flex justify-end">
          {isLive ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
              ● Live AI analysis
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
              ● Demo data (no live analysis)
            </span>
          )}
        </div>

        {/* Section 1: Issue Summary + Trust Score */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>📊</span> The Issue & Our Confidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-[var(--brand-blue)]">
              <h3 className="font-semibold text-[var(--brand-ink)] mb-2">Reported Issue</h3>
              <p className="text-gray-800 leading-relaxed">{reportedIssue}</p>
            </Card>
            <TrustScoreCard score={trustScore} />
          </div>
        </section>

        {/* Section 2: What We Found */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>🔍</span> What We Found: {incidents.length} Similar Incidents
          </h2>
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
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>🛣️</span> Your Resolution Path
          </h2>
          <ResolutionPath />
        </section>

        {/* Section 4: What to Expect */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>⏱️</span> What Your Customer Should Expect
          </h2>
          <CustomerExpectations />
        </section>

        {/* Section 5: Recommended Actions */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>✅</span> Recommended Actions for Your Team
          </h2>
          <Card className="p-8">
            <RecommendedActionsList actions={recommendedActions} />
          </Card>
        </section>

        {/* Section 6: Customer Communication */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>💬</span> What to Tell the Customer
          </h2>
          <Card className="p-8 border-l-4 border-[var(--brand-blue)] bg-gradient-to-br from-blue-50 to-white">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6">
              {customerMessage}
            </p>
            <a
              href={mailtoHref}
              className="brand-button inline-flex rounded-2xl px-6 py-3 font-medium text-white transition-colors"
            >
              → Copy &amp; Send
            </a>
          </Card>
        </section>

      </div>
    </main>
  );
}

