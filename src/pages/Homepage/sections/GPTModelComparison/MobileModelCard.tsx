
import { ChevronDownIcon, ChevronUpIcon } from './Icons';

interface MobileModelCardProps {
  model: {
    [key: string]: any;
  };
  detailLevel: 'business' | 'technical';
  isExpanded: boolean;
  onToggle: () => void;
}

/**
 * A mobile-optimized card component to display GPT model information
 */
export const MobileModelCard = ({ 
  model, 
  detailLevel, 
  isExpanded, 
  onToggle 
}: MobileModelCardProps) => {
  const getFields = () => {
    if (detailLevel === 'business') {
      return [
        { label: 'Primary Use', key: 'primaryUse' },
        { label: 'Strengths', key: 'strengths' },
        { label: 'Limitations', key: 'limitations' },
        { label: 'Accuracy', key: 'accuracy' },
      ];
    } else {
      return [
        { label: 'Parameters', key: 'parameters' },
        { label: 'Context Window', key: 'context' },
        { label: 'Training Data', key: 'trainingData' },
        { label: 'Fine-tuning', key: 'finetuning' },
        { label: 'Response Time', key: 'responseTime' },
        { label: 'Token Processing', key: 'tokenProcessing' },
      ];
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${model.isSalesWhisper ? 'border-primary/30 bg-primary/5' : 'border-gray-200'}`}>
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <h3 className="font-medium">{model.model}</h3>
          {model.isSalesWhisper && (
            <span className="ml-2 text-xs text-white bg-primary px-2 py-0.5 rounded">
              SALESWHISPER
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-200">
          <dl className="divide-y divide-gray-100">
            {getFields().map((field) => (
              <div key={field.key} className="py-2">
                <dt className="text-xs font-medium text-gray-500">{field.label}</dt>
                <dd className="mt-1 text-sm text-gray-900">{model[field.key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
};
