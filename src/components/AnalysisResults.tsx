"use client";

/**
 * AnalysisResults component
 * 
 * This component displays the backend's analysis results.
 * It receives data as props and renders three sections:
 * 1. Similar Incidents
 * 2. Recommended Actions
 * 3. Customer Communication Draft
 * 
 * React concept: Props = Data the parent passes to this component
 */

import type { AnalyzeResponse } from "@/lib/types";

// The props are exactly the backend's /api/analyze response.
type AnalysisResultsProps = AnalyzeResponse;

export default function AnalysisResults({
  similarIncidents,
  recommendedActions,
  customerMessage,
}: AnalysisResultsProps) {
  return (
    <div className="space-y-8">
      {/* Similar Incidents Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Incidents</h2>
        <div className="space-y-3">
          {similarIncidents.length > 0 ? (
            similarIncidents.map((incident) => (
              <div
                key={incident.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{incident.resolution}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No similar incidents found.</p>
          )}
        </div>
      </div>

      {/* Recommended Actions Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
        {recommendedActions.length > 0 ? (
          <ul className="space-y-2">
            {recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{action}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recommended actions available.</p>
        )}
      </div>

      {/* Customer Communication Draft Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Communication Draft</h2>
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {customerMessage || "No message generated yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
