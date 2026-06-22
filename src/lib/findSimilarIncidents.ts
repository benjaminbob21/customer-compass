import type { Incident } from "./types";

/**
 * ⚠️ TEMPORARY STUB — owned by Vanshika (Backend / Integration Lead).
 *
 * Benjamin created this so `/api/analyze` is a live, testable endpoint today.
 * Vanshika will REPLACE this entire file with:
 *   - a real mock incident dataset (src/lib/data/incidents.ts), and
 *   - real keyword/semantic matching.
 *
 * See docs/VANSHIKA_TASKS.md. Until then, this returns two canned incidents
 * so the pipeline and frontend have something to render.
 */
export function findSimilarIncidents(_issue: string): Incident[] {
  return [
    {
      id: "INC-0001",
      title: "Intermittent networking failures in a regional cluster",
      summary:
        "Customers saw sporadic connection drops to hosted services over a 2-hour window.",
      rootCause:
        "A misconfigured route propagated after a network device update, causing partial packet loss.",
      resolution:
        "Rolled back the route change and added validation to the deployment pipeline.",
      tags: ["networking", "latency", "connectivity"],
    },
    {
      id: "INC-0002",
      title: "Authentication token expiry caused login failures",
      summary:
        "A subset of users were unable to sign in for roughly 30 minutes.",
      rootCause:
        "A token-signing certificate expired earlier than the rotation schedule expected.",
      resolution:
        "Rotated the certificate and added an expiry alert 14 days ahead of renewal.",
      tags: ["auth", "tokens", "login"],
    },
  ];
}
