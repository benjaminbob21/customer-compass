import type { Incident } from "./types";
import type { IncidentRecord } from "@/data/incidentTypes";
import rawIncidents from "@/data/incidents.json";

// Keyword-overlap retrieval over the incident dataset. Dependency-free so it
// can be swapped for semantic search later without changing the `Incident`
// contract the API and frontend depend on.

const incidents = rawIncidents as IncidentRecord[];

const MAX_RESULTS = 3;

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "to", "of", "in", "on", "for", "with", "at", "by", "from", "as",
  "it", "its", "this", "that", "these", "those", "they", "we", "our", "us",
  "i", "you", "your", "their", "have", "has", "had", "not", "no", "can",
  "cannot", "could", "would", "should", "after", "before", "during", "when",
  "while", "customer", "customers", "issue", "issues", "azure",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function keywordsFor(record: IncidentRecord): Set<string> {
  const haystack = [
    record.title,
    record.service,
    record.category,
    record.problemDescription,
    record.rootCause,
    ...record.symptoms,
    ...record.similarIncidentHints,
  ].join(" ");
  return new Set(tokenize(haystack));
}

function toIncident(record: IncidentRecord): Incident {
  return {
    id: record.id,
    title: record.title,
    summary: record.problemDescription,
    rootCause: record.rootCause,
    resolution: record.resolution,
    tags: record.similarIncidentHints,
  };
}

export function findSimilarIncidents(issue: string): Incident[] {
  const issueTokens = tokenize(issue);
  if (issueTokens.length === 0) {
    return incidents.slice(0, MAX_RESULTS).map(toIncident);
  }

  const issueSet = new Set(issueTokens);

  const scored = incidents.map((record) => {
    const keywords = keywordsFor(record);
    let score = 0;
    for (const token of issueSet) {
      if (keywords.has(token)) score += 1;
    }
    return { record, score };
  });

  const matches = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((s) => toIncident(s.record));

  // Never return an empty list — fall back to the first few records.
  return matches.length > 0
    ? matches
    : incidents.slice(0, MAX_RESULTS).map(toIncident);
}
