/**
 * Customer Journey Page
 * 
 * This page shows the before/after story of how Customer Compass transforms
 * the customer support experience.
 */

import PageHero from "@/components/PageHero";
import CustomerJourney from "@/components/CustomerJourney";
import Card from "@/components/Card";
import Link from "next/link";
import {
  mockCustomerJourneyBefore,
  mockCustomerJourneyAfter,
} from "@/lib/mockData";

export default function JourneyPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="The Customer Journey"
        subtitle="From frustration to trust"
      />

      {/* Main Content */}
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Problem + Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="p-8 bg-red-50 border-l-4 border-red-600">
            <h3 className="text-lg font-bold text-red-900 mb-3">❌ The Problem Today</h3>
            <p className="text-red-800 text-sm leading-relaxed">
              Customers report issues and get confusing technical jargon, slow updates, and inconsistent communication. They don&apos;t know what&apos;s happening or what to expect. Trust erodes.
            </p>
          </Card>

          <Card className="p-8 bg-green-50 border-l-4 border-green-600">
            <h3 className="text-lg font-bold text-green-900 mb-3">✅ With Customer Compass</h3>
            <p className="text-green-800 text-sm leading-relaxed">
              Issues are analyzed in seconds. Customers receive clear, personalized explanations of what&apos;s happening, what we&apos;re doing, and what to expect. Trust builds.
            </p>
          </Card>
        </div>

        {/* Journey Comparison */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Support Flow</h2>
          <CustomerJourney
            before={mockCustomerJourneyBefore}
            after={mockCustomerJourneyAfter}
          />
        </div>

        {/* The Outcome */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">The Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">⚡ 35%</div>
              <p className="text-gray-700 text-sm">Faster issue diagnosis</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">💬 50%</div>
              <p className="text-gray-700 text-sm">Less time drafting updates</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">🤝 +85%</div>
              <p className="text-gray-700 text-sm">Communication consistency</p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center py-12">
          <Link
            href="/"
            className="brand-button mr-4 inline-flex rounded-2xl px-8 py-4 text-lg font-bold !text-white transition-colors"
          >
            Start Your Journey
          </Link>
          <Link
            href="/impact"
            className="brand-outline-button inline-flex rounded-2xl px-8 py-4 text-lg font-bold transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
