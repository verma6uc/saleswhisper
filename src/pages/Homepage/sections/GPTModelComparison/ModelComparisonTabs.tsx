
import { cn } from '../../../../lib/utils';

interface ModelComparisonTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

/**
 * Tabs component for switching between different GPT model comparison views
 */
export const ModelComparisonTabs = ({ activeTab, setActiveTab }: ModelComparisonTabsProps) => {
  const tabs = [
    { id: 'comparison', label: 'Models Comparison' },
    { id: 'output', label: 'Output Examples' },
    { id: 'timeline', label: 'GPT Evolution' },
  ];

  return (
    <div className="border-b border-gray-200 px-4 md:px-6">
      <nav className="-mb-px flex space-x-4 md:space-x-8 overflow-x-auto scrollbar-hide" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm md:text-base transition-colors",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
