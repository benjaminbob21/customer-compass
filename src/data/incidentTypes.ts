// Shape of the raw incident dataset in `incidents.json`. Richer than the app's
// `Incident` contract in `@/lib/types`; the retrieval layer maps the relevant
// fields down to that contract.

export type IncidentCategory =
  | "Networking"
  | "Identity"
  | "Compute"
  | "Database"
  | "Storage"
  | "AI"
  | "Messaging";

export type IncidentSeverity = "Sev1" | "Sev2" | "Sev3";

export type DocumentationType =
  | "Runbook"
  | "RCA"
  | "Service Health"
  | "Monitoring"
  | "KB";

export interface IncidentDocumentation {
  title: string;
  type: DocumentationType;
  snippet: string;
}

export interface IncidentRecord {
  id: string;
  title: string;
  service: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  regions: string[];
  customer: string;
  industry: string;
  symptoms: string[];
  problemDescription: string;
  rootCause: string;
  mitigation: string[];
  resolution: string;
  prevention: string[];
  customerSummary: string;
  recommendedInvestigation: string[];
  similarIncidentHints: string[];
  documentation: IncidentDocumentation[];
  communicationDraft: string;
  proactiveRescueCandidate: boolean;
  trustSignals: string[];
}
