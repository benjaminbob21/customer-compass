/**
 * ImpactDashboard component - Display impact metrics
 */

import MetricCard from "./MetricCard";

interface ImpactMetric {
  label: string;
  value: string;
  description: string;
}

interface ImpactDashboardProps {
  metrics: ImpactMetric[];
}

export default function ImpactDashboard({ metrics }: ImpactDashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          description={metric.description}
        />
      ))}
    </div>
  );
}
