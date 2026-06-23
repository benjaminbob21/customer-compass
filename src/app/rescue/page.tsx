/**
 * Proactive Customer Rescue Page
 * 
 * This page showcases the future vision: detecting risk signals before customers
 * experience issues and proactively reaching out with preventive guidance.
 */

import PageHero from "@/components/PageHero";
import ProactiveRescueCard from "@/components/ProactiveRescueCard";
import Card from "@/components/Card";
import { mockProactiveRescueScenario } from "@/lib/mockData";
import Link from "next/link";

export default function RescuePage() {
  const scenario = mockProactiveRescueScenario;
  const outreachSubject = `Proactive Support Guidance for ${scenario.customer}`;
  const outreachMailtoHref = `mailto:?subject=${encodeURIComponent(outreachSubject)}&body=${encodeURIComponent(
    scenario.recommendedOutreach,
  )}`;

  return (
    <main className="flex-1">
      <PageHero
        title="Proactive Customer Rescue"
        subtitle="Detect risk signals before customers experience impact"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Vision Statement */}
        <Card className="p-8 mb-12 bg-[linear-gradient(135deg,rgba(141,217,255,0.18),rgba(255,255,255,0.92))] border-l-4 border-[var(--brand-blue)]">
          <p className="text-gray-800 text-lg leading-relaxed mb-0">
            Before customers experience outages, Customer Compass detects early warning signals by analyzing patterns from thousands of historical incidents. We predict issues and send proactive guidance—preventing customer impact and transforming Microsoft support into a competitive advantage.
          </p>
        </Card>

        {/* Proactive Rescue Scenario */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-Time Example: Risk Detected</h2>
          <ProactiveRescueCard
            customer={scenario.customer}
            signals={scenario.detectedSignals}
            prediction={scenario.prediction}
            confidence={scenario.confidence}
          />
        </div>

        {/* Recommended Outreach */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recommended Outreach Message</h2>
          <Card className="p-8 bg-[linear-gradient(135deg,rgba(239,249,255,0.92),rgba(255,255,255,0.94))] border-l-4 border-[var(--brand-deep)]">
            <pre className="whitespace-pre-wrap text-gray-800 font-sans">
              {scenario.recommendedOutreach}
            </pre>
            <div className="mt-6">
              <a
                href={outreachMailtoHref}
                className="brand-button inline-flex rounded-2xl px-6 py-3 font-bold text-white transition-colors"
              >
                Send Outreach Email
              </a>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Proactive Rescue Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analyze</h3>
              <p className="text-gray-600">
                Customer Compass continuously analyzes telemetry from thousands of deployments
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Predict</h3>
              <p className="text-gray-600">
                AI identifies patterns that match known issues before they impact production
              </p>
            </Card>

            <Card className="p-6">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reach Out</h3>
              <p className="text-gray-600">
                Send personalized, actionable guidance before customers experience problems
              </p>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Business Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-[var(--brand-blue)]">
              <h3 className="font-bold text-gray-900 mb-3">✅ Customer Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Prevent issues before they impact users</li>
                <li>• Receive proactive guidance from experts</li>
                <li>• Higher uptime and reliability</li>
                <li>• Better trust in Microsoft support</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-[var(--brand-deep)]">
              <h3 className="font-bold text-gray-900 mb-3">💼 Microsoft Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Reduce support ticket volume</li>
                <li>• Improve customer satisfaction scores</li>
                <li>• Strengthen customer relationships</li>
                <li>• Scale support team efficiency</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12">
          <Link
            href="/future-vision"
            className="brand-button inline-flex rounded-2xl px-8 py-4 text-lg font-bold text-white transition-colors"
          >
            View Proactive Rescue Roadmap
          </Link>
        </div>
      </div>
    </main>
  );
}
