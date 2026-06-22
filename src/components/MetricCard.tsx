/**
 * MetricCard component - Display a metric with value and description
 */

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
}

export default function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-gray-600 text-sm font-medium mb-2">{label}</div>
      <div className="text-4xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600 text-sm">{description}</div>
    </div>
  );
}
