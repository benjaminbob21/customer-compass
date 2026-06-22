/**
 * Mock data for Customer Compass demo
 * This file contains sample data for all pages and components
 */

export const mockIncidents = [
  {
    id: "INC-2024-001",
    title: "Azure Networking Connectivity Degradation",
    resolution:
      "BGP route flapping in region causing intermittent packet loss. Resolved by stabilizing route advertisements and increasing convergence time.",
    date: "March 15, 2024",
    severity: "High",
    resolutionTime: "2.5 hours",
  },
  {
    id: "INC-2024-002",
    title: "Regional VM Connectivity Failures",
    resolution:
      "Network Security Group (NSG) rule misconfiguration blocking outbound traffic. Fixed by auditing and correcting NSG rules.",
    date: "March 8, 2024",
    severity: "Critical",
    resolutionTime: "45 minutes",
  },
  {
    id: "INC-2024-003",
    title: "Route Configuration Regression",
    resolution:
      "Recent infrastructure deployment introduced conflicting routes. Resolved by reverting to previous route configuration.",
    date: "March 1, 2024",
    severity: "High",
    resolutionTime: "1.5 hours",
  },
];

export const mockRecommendedActions = [
  "Verify route table configuration in the affected region",
  "Check backend dependency health using Azure Monitor",
  "Review recent infrastructure changes in the audit logs",
  "Monitor VM connectivity patterns to identify if issue is region-specific",
  "Validate DNS resolution and check for DNS caching issues",
  "Review Network Watcher diagnostics for packet loss patterns",
];

export const mockCustomerMessage = `Thank you for reporting this issue. We've analyzed similar incidents in our support history and identified patterns matching your case.

Based on our analysis, this appears to be related to network connectivity or routing configuration. We're taking the following actions:

1. Our engineering team is actively investigating potential routing or dependency-related causes
2. We're monitoring your service connectivity in real-time
3. We'll validate the mitigation path and prepare a fix

Based on similar historical cases, we expect to have a resolution path within 2-4 hours. We'll provide clear updates every 30 minutes and keep you informed as we learn more.

Thank you for your patience.`;

export const mockImpactMetrics = [
  {
    label: "Faster Issue Understanding",
    value: "35%",
    description: "Reduction in time to identify root cause",
  },
  {
    label: "Less Time Drafting Updates",
    value: "50%",
    description: "Time saved on customer communication",
  },
  {
    label: "Communication Consistency",
    value: "+85%",
    description: "Improved clarity and professionalism in messages",
  },
  {
    label: "Earlier Risk Detection",
    value: "24-48h",
    description: "Earlier warning before issues impact customers",
  },
];

export const mockProactiveRescueScenario = {
  customer: "Contoso Retail",
  detectedSignals: [
    "Increased connection timeout rate (+15% in last 2 hours)",
    "Region-specific packet loss pattern (us-west-2)",
    "Similar pattern to March 1 support incident",
  ],
  prediction: "Potential networking degradation within 24-48 hours",
  confidence: 87,
  recommendedOutreach: `Hi Contoso Retail team,

We proactively detected signals in your environment that resemble previous networking incidents affecting similar workloads.

We recommend reviewing these settings before this impacts your users:
1. Route table configuration in us-west-2
2. NSG rules for outbound connectivity
3. Recent infrastructure changes

This is a preventive measure. Would you like our team to review your configuration?`,
};

export const mockCustomerJourneyBefore = [
  {
    step: 1,
    title: "Customer Reports Issue",
    description: "Customer experiences problem and opens support ticket",
  },
  {
    step: 2,
    title: "Manual Investigation Begins",
    description: "Support engineer manually searches documentation and past cases",
  },
  {
    step: 3,
    title: "Slow Updates",
    description: "Customer receives infrequent, sometimes confusing technical updates",
  },
  {
    step: 4,
    title: "Trust Erodes",
    description: "Customer frustrated by lack of clarity and slow communication",
  },
  {
    step: 5,
    title: "Delayed Resolution",
    description: "Issue takes longer to resolve due to inefficient investigation",
  },
];

export const mockCustomerJourneyAfter = [
  {
    step: 1,
    title: "Customer Reports Issue",
    description: "Customer submits issue to Customer Compass platform",
  },
  {
    step: 2,
    title: "AI Analysis in Seconds",
    description: "Similar incidents and recommendations instantly identified",
  },
  {
    step: 3,
    title: "Clear Communication",
    description: "Customer receives clear, personalized next steps and timeline",
  },
  {
    step: 4,
    title: "Trust Builds",
    description: "Customer understands the path forward and feels heard",
  },
  {
    step: 5,
    title: "Faster Resolution",
    description: "Issue resolved quickly with confidence and customer satisfaction",
  },
];
