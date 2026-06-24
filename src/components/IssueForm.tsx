"use client";

/**
 * IssueForm — support engineer enters a customer issue for analysis.
 */

import { useState } from "react";
import Icon from "@/components/Icon";

interface IssueFormProps {
  onSubmit: (issue: string) => void;
  isLoading?: boolean;
}

const examples = [
  "Customer experiencing intermittent Azure networking failures in West US",
  "VMs in East US 2 randomly losing outbound connectivity after deployment",
  "Storage account requests timing out during peak hours",
];

export default function IssueForm({ onSubmit, isLoading = false }: IssueFormProps) {
  const [issue, setIssue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (issue.trim()) {
      onSubmit(issue);
      setIssue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="issue"
          className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--neutral-fg-1)]"
        >
          <Icon name="chat" size={16} className="text-[var(--brand-primary)]" />
          Describe the customer issue
        </label>
        <textarea
          id="issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="e.g. Customer reports intermittent networking failures across multiple regions since this morning…"
          className="w-full resize-y rounded-lg border border-[var(--neutral-stroke-2)] bg-white px-4 py-3 text-[var(--neutral-fg-1)] shadow-sm outline-none transition-colors placeholder:text-[var(--neutral-fg-4)] focus:border-[var(--brand-primary)] focus:ring-2 focus:ring-[var(--brand-primary)]/25"
          rows={5}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="self-center text-xs font-medium text-[var(--neutral-fg-3)]">Try:</span>
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            disabled={isLoading}
            onClick={() => setIssue(ex)}
            className="ms-chip max-w-full truncate transition-colors hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] disabled:opacity-50"
            title={ex}
          >
            {ex.length > 42 ? `${ex.slice(0, 42)}…` : ex}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || !issue.trim()}
        className="brand-button flex w-full items-center justify-center gap-2 px-4 py-3"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Analyzing…
          </>
        ) : (
          <>
            <Icon name="sparkle" size={18} />
            Analyze issue
          </>
        )}
      </button>
    </form>
  );
}
