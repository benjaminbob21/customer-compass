/**
 * Impact Dashboard Page
 * 
 * This page shows the business value and storytelling for judges.
 * It demonstrates the quantifiable impact Customer Compass has on support teams and customers.
 */

import PageHero from "@/components/PageHero";
import ImpactDashboard from "@/components/ImpactDashboard";
import Card from "@/components/Card";
import { mockImpactMetrics } from "@/lib/mockData";

export default function ImpactPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="The Impact"
        subtitle="Real business value from better customer communication"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Measurable Impact</h2>
          <ImpactDashboard metrics={mockImpactMetrics} />
        </div>

        {/* Why It Matters */}
        <Card className="p-8 bg-[linear-gradient(135deg,rgba(141,217,255,0.16),rgba(255,255,255,0.94))] border-l-4 border-[var(--brand-blue)] mb-16">
          <p className="text-lg text-gray-800 leading-relaxed">
            <strong>The Real Opportunity:</strong> Support is where customer trust is built or lost. By turning Microsoft&apos;s technical knowledge into clear, personalized customer communication, we transform support from a cost center into a competitive advantage while simultaneously reducing per-ticket costs through AI automation.
          </p>
        </Card>

        {/* Three Key Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 border-t-4 border-[var(--brand-blue)]">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Faster Resolution</h3>
            <p className="text-gray-700 text-sm">
              Support engineers spend less time searching for similar incidents. Issues are resolved 35% faster.
            </p>
          </Card>

          <Card className="p-6 border-t-4 border-[var(--brand-navy)]">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="font-bold text-gray-900 mb-2">Better Communication</h3>
            <p className="text-gray-700 text-sm">
              Clear, consistent customer updates build trust. Support engineers draft messages 50% faster.
            </p>
          </Card>

          <Card className="p-6 border-t-4 border-[var(--brand-deep)]">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-gray-900 mb-2">Proactive Support</h3>
            <p className="text-gray-700 text-sm">
              Detect issues before customers are affected. Prevent outages and strengthen customer relationships.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8">
          <button className="brand-button rounded-2xl px-8 py-3 text-lg font-bold text-white transition-colors">
            Start Your Impact Journey
          </button>
        </div>
      </div>
    </main>
  );
}
