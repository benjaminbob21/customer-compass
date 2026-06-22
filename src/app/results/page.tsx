/**
 * Analysis Results Page
 * 
 * This page displays a full analysis results view with all sections.
 * It can be used as a standalone demo page to show the "wow" moment.
 */

import PageHero from "@/components/PageHero";
import SimilarIncidentCard from "@/components/SimilarIncidentCard";
import RecommendedActionsList from "@/components/RecommendedActionsList";
import TrustScoreCard from "@/components/TrustScoreCard";
import Card from "@/components/Card";
import {
  mockIncidents,
  mockRecommendedActions,
  mockCustomerMessage,
} from "@/lib/mockData";

export default function ResultsPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Analysis Complete"
        subtitle="Ready to communicate with clarity and confidence"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Issue Summary + Trust Score Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 bg-blue-50">
            <h3 className="font-semibold text-gray-700 mb-2">Reported Issue</h3>
            <p className="text-gray-900">
              Customer experiencing intermittent Azure networking failures.
            </p>
          </Card>
          <TrustScoreCard score={87} />
        </div>

        {/* Similar Incidents Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Found: 3 Similar Incidents</h2>
          <div className="space-y-4">
            {mockIncidents.map((incident) => (
              <SimilarIncidentCard
                key={incident.id}
                id={incident.id}
                title={incident.title}
                resolution={incident.resolution}
                date={incident.date}
                severity={incident.severity}
                resolutionTime={incident.resolutionTime}
              />
            ))}
          </div>
        </div>

        {/* Recommended Actions Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
          <Card className="p-8">
            <RecommendedActionsList actions={mockRecommendedActions} />
          </Card>
        </div>

        {/* Customer Communication Draft Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Tell the Customer</h2>
          <Card className="p-8 bg-blue-50 border-l-4 border-blue-600">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6">
              {mockCustomerMessage}
            </p>
            <button className="brand-button rounded-2xl px-6 py-3 font-medium text-white transition-colors">
              → Copy & Send
            </button>
          </Card>
        </div>
      </div>
    </main>
  );
}

