/**
 * Shared backend types — THE CONTRACT.
 *
 * Both halves of the backend agree on these shapes:
 *   - Vanshika's `findSimilarIncidents()` RETURNS `Incident[]`
 *   - Benjamin's `/api/analyze` route RETURNS `AnalyzeResponse`
 *
 * The frontend also builds against `AnalyzeResponse`.
 * Change these shapes only after telling the team — everything depends on them.
 */

/** A single historical support incident / RCA record. */
export interface Incident {
  id: string;
  /** Short human title, e.g. "Intermittent networking failures in West US". */
  title: string;
  /** Customer-neutral description of what happened. */
  summary: string;
  /** The root cause analysis. */
  rootCause: string;
  /** How the incident was resolved/mitigated. */
  resolution: string;
  /** Keywords used for matching, e.g. ["networking", "latency"]. */
  tags: string[];
}

/** Body of a POST /api/analyze request. */
export interface AnalyzeRequest {
  /** The customer issue described in free text. */
  issue: string;
}

/** Shape returned by POST /api/analyze. */
export interface AnalyzeResponse {
  /** Historical incidents most similar to the issue. */
  similarIncidents: Incident[];
  /** Next-best actions for the support engineer. */
  recommendedActions: string[];
  /** AI-generated, customer-friendly explanation. */
  customerMessage: string;
  /** Specific things the engineer should investigate to confirm the cause. */
  recommendedInvestigation: string[];
  /** AI-estimated match strength, e.g. "83% similarity". Generated, not computed. */
  confidence: string;
  /** AI-estimated resolution path, e.g. "Historically resolved within 3 steps". */
  resolutionTimeline: string;
}
