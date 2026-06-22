/**
 * ProactiveRescueCard component - Display proactive risk signals
 */

import Card from "./Card";

interface ProactiveRescueCardProps {
  customer: string;
  signals: string[];
  prediction: string;
  confidence: number;
}

export default function ProactiveRescueCard({
  customer,
  signals,
  prediction,
  confidence,
}: ProactiveRescueCardProps) {
  return (
    <Card className="p-6 border-l-4 border-blue-600">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{customer}</h3>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Detected Risk Signals</h4>
        <div className="space-y-2">
          {signals.map((signal, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-red-500 font-bold">⚠️</span>
              <span className="text-gray-600">{signal}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-2">Predicted Issue</h4>
        <p className="text-gray-800 mb-3">{prediction}</p>
        <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {confidence}% confidence
        </div>
      </div>

      <button className="brand-button w-full rounded-2xl px-4 py-3 font-medium text-white transition-colors">
        Send Proactive Outreach
      </button>
    </Card>
  );
}
