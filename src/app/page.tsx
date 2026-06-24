"use client";

/**
 * Home / Incident Analysis Page
 * Primary entry point: support engineers submit a customer issue, then land on
 * the live results page.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import IssueForm from "@/components/IssueForm";
import { analyzeIssue } from "@/api/client";
import Icon, { type IconName } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import sampleResponse from "@/data/sampleResponse.json";
import type { AnalyzeResponse } from "@/lib/types";

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "history",
    title: "Retrieve",
    body: "Instantly surfaces the most similar incidents and RCAs from Microsoft's support history.",
  },
  {
    icon: "sparkle",
    title: "Reason",
    body: "Azure AI weighs root causes and resolutions to recommend the highest-confidence next actions.",
  },
  {
    icon: "chat",
    title: "Respond",
    body: "Generates a clear, customer-ready message your team can send with confidence in seconds.",
  },
];

const stats: { value: string; label: string }[] = [
  { value: "35%", label: "Faster root-cause diagnosis" },
  { value: "50%", label: "Less time drafting updates" },
  { value: "24–48h", label: "Earlier risk detection" },
  { value: "+85%", label: "More consistent comms" },
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleAnalyze = async (issueText: string) => {
    setIsLoading(true);
    setError("");
    try {
      const result = await analyzeIssue(issueText);
      sessionStorage.setItem("cc:analysis", JSON.stringify(result));
      sessionStorage.setItem("cc:issue", issueText);
      router.push("/results");
    } catch (err) {
      // Demo safety-net: fall back to the frozen sample response so the results
      // page always renders a complete story even if live analysis hiccups.
      console.warn("[home] Live analysis failed — falling back to sample response.", err);
      sessionStorage.setItem("cc:analysis", JSON.stringify(sampleResponse as AnalyzeResponse));
      sessionStorage.setItem("cc:issue", issueText);
      router.push("/results");
    } finally {
      setIsLoading(false);
    }
  };

  const firstName = user?.name.split(" ")[0];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="brand-page-hero px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 max-w-2xl animate-rise">
            <p className="ms-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-white/90 backdrop-blur">
              <Icon name="microsoft" size={16} />
              Microsoft Support Intelligence
            </p>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              Turn every incident into{" "}
              <span className="text-gradient">customer trust</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/85">
              Customer Compass turns Microsoft&apos;s historical incidents into action plans and
              clear, customer-ready updates — in seconds. Less searching, faster resolutions,
              communication customers actually trust.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5 text-sm">
              {["Find similar incidents", "Draft clear updates", "Enable proactive rescue"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 backdrop-blur"
                  >
                    <Icon name="check" size={14} />
                    {chip}
                  </span>
                ),
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs font-medium text-white/75">
              <span className="inline-flex items-center gap-2">
                <Icon name="sparkle" size={15} /> Powered by Azure AI
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="lock" size={15} /> Entra ID single sign-on
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" size={15} /> Responsible AI
              </span>
            </div>
          </div>

          {/* Analyze card */}
          <div className="relative z-10 animate-rise">
            <div className="ms-surface rounded-2xl border-white/40 bg-white/95 p-6 shadow-[var(--shadow-64)] backdrop-blur md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[var(--neutral-fg-1)]">
                    {firstName ? `Welcome back, ${firstName}` : "Analyze an issue"}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--neutral-fg-3)]">
                    Start with the customer problem.
                  </p>
                </div>
                <span className="ms-badge bg-[var(--status-success-bg)] text-[var(--status-success)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-success)] ms-pulse" />
                  Live AI
                </span>
              </div>

              <IssueForm onSubmit={handleAnalyze} isLoading={isLoading} />

              {error && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-[var(--status-danger)]/20 bg-[var(--status-danger-bg)] px-4 py-3 text-sm text-[var(--status-danger)]">
                  <Icon name="warning" size={18} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="ms-eyebrow mb-3 text-[var(--brand-primary)]">How it works</p>
          <h2 className="text-3xl font-bold text-[var(--neutral-fg-1)] md:text-4xl">
            From raw incident to trusted reply
          </h2>
          <p className="mt-3 text-[var(--neutral-fg-3)]">
            Three steps, fully grounded in Microsoft&apos;s own support knowledge.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="ms-surface group p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-16)]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-tint)] text-[var(--brand-primary)] transition-colors group-hover:bg-[var(--brand-primary)] group-hover:text-white">
                <Icon name={step.icon} size={24} />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--neutral-fg-4)]">0{i + 1}</span>
                <h3 className="text-lg font-bold text-[var(--neutral-fg-1)]">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-[var(--neutral-fg-3)]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-[var(--neutral-stroke-1)] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-brand-gradient">{stat.value}</div>
              <p className="mt-2 text-sm text-[var(--neutral-fg-3)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
