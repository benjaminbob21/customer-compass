/**
 * CustomerJourney component - Display before/after customer journey
 */

import Card from "./Card";

interface JourneyStep {
  step: number;
  title: string;
  description: string;
}

interface CustomerJourneyProps {
  before: JourneyStep[];
  after: JourneyStep[];
}

interface JourneyTimelineProps {
  steps: JourneyStep[];
  isBefore: boolean;
}

function JourneyTimeline({ steps, isBefore }: JourneyTimelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                isBefore ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {item.step}
            </div>
            {index !== steps.length - 1 && <div className="w-1 h-12 bg-gray-300 mt-2"></div>}
          </div>
          <div className="pt-2">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CustomerJourney({ before, after }: CustomerJourneyProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Before */}
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">❌ Before</h2>
          <p className="text-gray-600">How customers experience support today</p>
        </div>
        <JourneyTimeline steps={before} isBefore={true} />
      </Card>

      {/* After */}
      <Card className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">✅ After</h2>
          <p className="text-gray-600">How Customer Compass transforms support</p>
        </div>
        <JourneyTimeline steps={after} isBefore={false} />
      </Card>
    </div>
  );
}
