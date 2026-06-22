/**
 * TrustScoreCard component - Display a trust/confidence score
 */

import Card from "./Card";

interface TrustScoreCardProps {
  score: number;
  label?: string;
  description?: string;
}

export default function TrustScoreCard({
  score,
  label = "Confidence Score",
  description = "Based on similar historical incidents",
}: TrustScoreCardProps) {
  const scoreColor =
    score >= 80 ? "bg-green-100 text-green-800" : score >= 60 ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800";

  const scoreLevel = score >= 80 ? "High" : score >= 60 ? "Medium" : "Low";

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{label}</h3>

      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={score >= 80 ? "#10b981" : score >= 60 ? "#3b82f6" : "#f59e0b"}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 251.2} 251.2`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${scoreColor} px-2 py-1 rounded`}>
              {score}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-900 mb-1">{scoreLevel} Confidence</p>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
}
