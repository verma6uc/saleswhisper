
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { ComparisonTable } from './ComparisonTable';
import { TimelineChart } from './TimelineChart';
import { cn } from '../../../../lib/utils';
import { ModelComparisonTabs } from './ModelComparisonTabs';

/**
 * Data for GPT model radar chart comparison
 */
const modelPerformanceData = [
  { metric: 'Accuracy', 'GPT-4': 95, 'GPT-3.5': 85, 'Fine-tuned': 98 },
  { metric: 'Response Time', 'GPT-4': 75, 'GPT-3.5': 90, 'Fine-tuned': 88 },
  { metric: 'Sales Context', 'GPT-4': 88, 'GPT-3.5': 75, 'Fine-tuned': 98 },
  { metric: 'Objection Handling', 'GPT-4': 92, 'GPT-3.5': 78, 'Fine-tuned': 96 },
  { metric: 'Tonality Analysis', 'GPT-4': 94, 'GPT-3.5': 82, 'Fine-tuned': 97 },
];

/**
 * Sample outputs from different models for comparison
 */
const modelOutputComparisons = {
  input: "The prospect mentioned they already use a competitor's product and find it sufficient.",
  models: [
    {
      name: 'GPT-3.5',
      output: "The customer is using a competitor's product and seems satisfied with it. You might want to highlight your product's unique features.",
      analysis: 'Basic identification of the situation with general advice.'
    },
    {
      name: 'GPT-4',
      output: "The prospect has indicated comfort with the current solution, suggesting status quo bias. Consider focusing on unique differentiated features of SalesWhisper, particularly around insight depth and reporting that competitors lack.",
      analysis: 'More nuanced understanding with reference to status quo bias and specific strategy recommendation.'
    },
    {
      name: 'Fine-tuned Model',
      output: "The prospect is showing competitive entrenchment (satisfaction with current solution). Based on analysis of 1,000+ similar scenarios, the most effective approach is acknowledging their satisfaction first, then asking a specific question about a pain point our analysis shows their current solution likely fails to address: 'Many [Competitor] users tell us they struggle with getting actionable coaching insights. How are you currently handling that?'",
      analysis: 'Highly specialized response with sales psychology context, statistical backing, and a tailored question strategy.'
    }
  ]
};

/**
 * GPTModelComparison Section Component.
 * This section educates users on the different GPT models used in SalesWhisper,
 * comparing their capabilities, strengths, and use cases.
 */
export const GPTModelComparison = () => {
  const [detailLevel, setDetailLevel] = useState<'business' | 'technical'>('business');
  const [activeTab, setActiveTab] = useState<'comparison' | 'output' | 'timeline'>('comparison');
  
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  
  const renderContent = () => {
    switch (activeTab) {
      case 'comparison':
        return (
          <div className="space-y-8">
            <ComparisonTable detailLevel={detailLevel} />
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">Model Strengths Comparison</h3>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={modelPerformanceData}>
                    <PolarGrid stroke="#ECEFF1" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#263238', fontSize: isMobile ? 10 : 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#263238' }} />
                    <Radar name="GPT-4" dataKey="GPT-4" stroke="#1A237E" fill="#1A237E" fillOpacity={0.5} />
                    <Radar name="GPT-3.5" dataKey="GPT-3.5" stroke="#4527A0" fill="#4527A0" fillOpacity={0.4} />
                    <Radar name="Fine-tuned" dataKey="Fine-tuned" stroke="#7E57C2" fill="#7E57C2" fillOpacity={0.5} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      case 'output':
        return (
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4">Model Output Comparison</h3>
            <div className="border border-gray-200 bg-gray-50 p-3 md:p-4 rounded-lg mb-6">
              <h4 className="text-sm uppercase font-medium text-gray-500 mb-2">Input Scenario</h4>
              <p className="font-medium">{modelOutputComparisons.input}</p>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {modelOutputComparisons.models.map((model, index) => (
                <div 
                  key={index} 
                  className={clsx(
                    "border rounded-lg p-4 transition-all",
                    model.name === 'Fine-tuned Model' 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200"
                  )}
                >
                  <h4 className={clsx(
                    "font-bold text-lg mb-3",
                    model.name === 'Fine-tuned Model' ? "text-primary" : "text-secondary"
                  )}>
                    {model.name}
                    {model.name === 'Fine-tuned Model' && (
                      <span className="ml-2 text-xs font-normal text-white bg-primary px-2 py-1 rounded">
                        SALESWHISPER MODEL
                      </span>
                    )}
                  </h4>
                  <div className="mb-3 p-3 bg-white rounded border border-gray-100">
                    <p className="text-gray-800">{model.output}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-gray-600 mb-1">Analysis</h5>
                    <p className="text-sm text-gray-700">{model.analysis}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'timeline':
        return <TimelineChart />;
        
      default:
        return null;
    }
  };
  
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Powered by Advanced GPT Technology
          </h2>
          <p className="text-base md:text-lg text-gray-700">
            SalesWhisper leverages multiple specialized GPT models to deliver industry-leading conversation analysis.
            Each model is carefully selected and optimized for specific tasks in the sales intelligence workflow.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                GPT Model Architecture
              </h3>
              
              <div className="flex items-center space-x-2 self-end md:self-auto">
                <span className="text-sm font-medium text-gray-700 mr-2">Detail Level:</span>
                <button
                  type="button"
                  onClick={() => setDetailLevel('business')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md",
                    detailLevel === 'business'
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  Business
                </button>
                <button
                  type="button"
                  onClick={() => setDetailLevel('technical')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md",
                    detailLevel === 'technical'
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                  data-tooltip-id="technical-tooltip"
                  data-tooltip-content="View advanced technical specifications"
                >
                  Technical
                </button>
                <Tooltip id="technical-tooltip" place="bottom" />
              </div>
            </div>
            
            <ModelComparisonTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="p-4 md:p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
        
        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p className="text-sm text-gray-600">
            SalesWhisper continuously evaluates and integrates GPT model improvements, ensuring you always benefit from the latest advancements in AI language technology for sales intelligence.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GPTModelComparison;
