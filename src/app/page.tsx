"use client";

/**
 * Home / Incident Analysis Page
 * Main entry point for Customer Compass demo
 * 
 * This is the primary page where support engineers submit customer issues.
 * After analysis, navigates to the results page.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import IssueForm from "@/components/IssueForm";
import { analyzeIssue } from "@/api/client";
import BrandLogo from "@/components/BrandLogo";

export default function Home() {
  const router = useRouter();
  
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  /**
   * Handle form submission
   * Calls the backend API to analyze the customer issue
   * Then navigates to the results page
   */
  const handleAnalyze = async (issueText: string) => {
    setIsLoading(true);
    setError("");

    try {
      await analyzeIssue(issueText);
      // Navigate to results page after successful analysis
      router.push("/results");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while analyzing the issue."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="brand-page-hero px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-white/80">
              Customer trust, made visible
            </p>
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">Customer Compass</h1>
            <p className="mt-4 text-xl text-white/88 md:text-2xl">
              Guiding customers through uncertainty with clarity, trust, and proactive support.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/82 md:text-lg">
              When support teams understand the issue quickly and explain it clearly, customers stay confident. Customer Compass turns historical incidents into action plans and customer-ready updates in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/88">
              <span className="rounded-full border border-white/20 bg-white/12 px-4 py-2 backdrop-blur">Find similar incidents</span>
              <span className="rounded-full border border-white/20 bg-white/12 px-4 py-2 backdrop-blur">Draft clear updates</span>
              <span className="rounded-full border border-white/20 bg-white/12 px-4 py-2 backdrop-blur">Enable proactive rescue</span>
            </div>
          </div>
          <div className="relative z-10">
            <div className="rounded-[32px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <BrandLogo size="hero" className="justify-center" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="brand-panel mb-12 rounded-[28px] p-8">
          <h2 className="text-2xl font-bold text-[var(--brand-ink)] mb-2">Analyze an Issue</h2>
          <p className="mb-6 text-[var(--brand-ink)]/70">
            Start with the customer problem. Customer Compass will surface similar incidents, recommended actions, and a message you can send with confidence.
          </p>
          <IssueForm onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-[var(--brand-deep)]"></div>
            </div>
            <p className="text-gray-600 mt-4">Analyzing issue...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (
          <div className="text-center py-12 text-[var(--brand-ink)]/68">
            <p className="text-lg">Enter a customer issue above to see the full support story unfold.</p>
            <p className="mt-2 text-sm">Example: &quot;Customer experiencing intermittent Azure networking failures&quot;</p>
          </div>
        )}
      </div>
    </main>
  );
}
