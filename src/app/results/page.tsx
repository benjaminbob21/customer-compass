/**
 * Analysis Results Page
 * 
 * Displays comprehensive analysis dashboard with:
 * - Trust Score & Issue Summary
 * - Similar Historical Incidents
 * - Prioritized Resolution Path
 * - Customer Expectations & Timeline
 * - Recommended Actions
 * - Customer Communication Draft
 */

import PageHero from "@/components/PageHero";
import SimilarIncidentCard from "@/components/SimilarIncidentCard";
import RecommendedActionsList from "@/components/RecommendedActionsList";
import TrustScoreCard from "@/components/TrustScoreCard";
import ResolutionPath from "@/components/ResolutionPath";
import CustomerExpectations from "@/components/CustomerExpectations";
import Card from "@/components/Card";
import {
  mockIncidents,
  mockRecommendedActions,
  mockCustomerMessage,
} from "@/lib/mockData";

export default function ResultsPage() {
  return (
    <main className="flex-1 bg-gradient-to-b from-white to-[var(--brand-mist)]">
      <PageHero
        title="Analysis Complete"
        subtitle="Ready to communicate with clarity and confidence"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section 1: Issue Summary + Trust Score */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>📊</span> The Issue & Our Confidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-[var(--brand-blue)]">
              <h3 className="font-semibold text-[var(--brand-ink)] mb-2">Reported Issue</h3>
              <p className="text-gray-800 leading-relaxed">
                Customer experiencing intermittent Azure networking failures.
              </p>
            </Card>
            <TrustScoreCard score={87} />
          </div>
        </section>

        {/* Section 2: What We Found */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>🔍</span> What We Found: 3 Similar Incidents
          </h2>
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
        </section>

        {/* Section 3: Resolution Path */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>🛣️</span> Your Resolution Path
          </h2>
          <ResolutionPath />
        </section>

        {/* Section 4: What to Expect */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>⏱️</span> What Your Customer Should Expect
          </h2>
          <CustomerExpectations />
        </section>

        {/* Section 5: Recommended Actions */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>✅</span> Recommended Actions for Your Team
          </h2>
          <Card className="p-8">
            <RecommendedActionsList actions={mockRecommendedActions} />
          </Card>
        </section>

        {/* Section 6: Customer Communication */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[var(--brand-ink)] mb-6 flex items-center gap-2">
            <span>💬</span> What to Tell the Customer
          </h2>
          <Card className="p-8 border-l-4 border-[var(--brand-blue)] bg-gradient-to-br from-blue-50 to-white">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6">
              {mockCustomerMessage}
            </p>
            <button className="brand-button rounded-2xl px-6 py-3 font-medium text-white transition-colors">
              → Copy & Send
            </button>
          </Card>
        </section>

      </div>
    </main>
  );
}

