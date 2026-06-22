/**
 * SimilarIncidentCard component - Display a similar incident
 */

import Card from "./Card";

interface SimilarIncidentCardProps {
  id: string;
  title: string;
  resolution: string;
  date?: string;
  severity?: string;
  resolutionTime?: string;
}

export default function SimilarIncidentCard({
  id,
  title,
  resolution,
  date,
  severity,
  resolutionTime,
}: SimilarIncidentCardProps) {
  const severityColor =
    severity === "Critical"
      ? "bg-red-100 text-red-800"
      : severity === "High"
        ? "bg-orange-100 text-orange-800"
        : "bg-yellow-100 text-yellow-800";

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {severity && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityColor}`}>
            {severity}
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{resolution}</p>

      <div className="flex gap-4 text-sm text-gray-500">
        {date && <div>📅 {date}</div>}
        {resolutionTime && <div>⏱️ {resolutionTime}</div>}
      </div>

      <div className="text-xs text-gray-400 mt-3">ID: {id}</div>
    </Card>
  );
}
