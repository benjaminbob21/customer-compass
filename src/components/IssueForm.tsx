"use client";

/**
 * IssueForm component
 * 
 * This component displays a text input for customers to describe their issue.
 * It captures user input and calls a callback when the form is submitted.
 * 
 * React concepts:
 * - "use client" = This component uses interactive features (like state)
 * - useState = Hook that lets React "remember" data (the input value)
 * - onChange = Runs when the user types in the input
 * - onSubmit = Runs when the user clicks submit
 */

import { useState } from "react";

interface IssueFormProps {
  onSubmit: (issue: string) => void; // Callback function parent can use
  isLoading?: boolean; // Shows if we're waiting for API response
}

export default function IssueForm({ onSubmit, isLoading = false }: IssueFormProps) {
  // useState creates a state variable and a function to update it
  // [value, setValue] = [current value, function to change it]
  const [issue, setIssue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh (default form behavior)
    
    if (issue.trim()) {
      onSubmit(issue);
      setIssue(""); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
          Describe the Customer Issue
        </label>
        <textarea
          id="issue"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Example: Customer experiencing intermittent networking failures..."
          className="w-full rounded-2xl border border-[var(--brand-border)] bg-white/90 px-4 py-3 text-[var(--brand-ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
          rows={5}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !issue.trim()}
        className="brand-button w-full rounded-2xl px-4 py-3 font-medium text-white transition-colors"
      >
        {isLoading ? "Analyzing..." : "Analyze Issue"}
      </button>
    </form>
  );
}
