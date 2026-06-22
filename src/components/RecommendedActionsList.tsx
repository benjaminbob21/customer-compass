/**
 * RecommendedActionsList component - Display a list of recommended actions
 */

interface RecommendedActionsListProps {
  actions: string[];
}

export default function RecommendedActionsList({ actions }: RecommendedActionsListProps) {
  return (
    <div className="space-y-3">
      {actions.map((action, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
              {index + 1}
            </div>
          </div>
          <div>
            <p className="text-gray-800">{action}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
