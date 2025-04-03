
import React from 'react';
import { InsightPoint } from '../types';

interface AnalysisPanelProps {
  insights: InsightPoint[];
  activeInsightIds: string[];
  currentTime: number;
  duration: number;
}

/**
 * Analysis panel component that displays insights and timeline
 */
const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  insights,
  activeInsightIds,
  currentTime,
  duration,
}) => {
  // Sort insights by time point
  const sortedInsights = [...insights].sort((a, b) => a.timePoint - b.timePoint);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">GPT Analysis</h3>
        <p className="text-sm text-gray-600">
          Watch as SalesWhisper AI analyzes the conversation in real-time, identifying key moments and providing actionable insights.
        </p>
      </div>

      {/* Timeline visualization */}
      <div className="relative h-14 mb-6 bg-gray-100 rounded-lg p-2">
        <div className="absolute top-0 left-0 h-full bg-indigo-50 rounded-lg" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
        
        {/* Timeline markers for insights */}
        {sortedInsights.map((insight) => {
          const position = (insight.timePoint / duration) * 100;
          const isActive = activeInsightIds.includes(insight.id);
          
          return (
            <div
              key={insight.id}
              className={`absolute top-1 w-3 h-3 rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                isActive ? 'scale-150 shadow-md' : ''
              }`}
              style={{ 
                left: `${position}%`,
                backgroundColor: getSeverityColor(insight.severity),
              }}
              title={insight.title}
            />
          );
        })}
        
        {/* Current time indicator */}
        <div 
          className="absolute top-0 h-full w-0.5 bg-primary" 
          style={{ left: `${(currentTime / duration) * 100}%` }}
        >
          <div className="absolute -top-1 -left-[5px] w-2.5 h-2.5 rounded-full bg-primary border-2 border-white"></div>
        </div>
      </div>

      {/* Insights list */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {sortedInsights.map((insight) => {
            const isActive = activeInsightIds.includes(insight.id);
            
            return (
              <div
                key={insight.id}
                className={`p-3 rounded-lg border-l-4 transition-all duration-300 ${
                  isActive 
                    ? 'bg-white shadow-md border-l-4' 
                    : 'bg-gray-50 opacity-70'
                }`}
                style={{
                  borderLeftColor: getSeverityColor(insight.severity),
                }}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2`} style={{ backgroundColor: getSeverityColor(insight.severity) }}></div>
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span className="ml-auto text-xs text-gray-500">{formatTime(insight.timePoint)}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                
                {isActive && (
                  <div className="flex items-center mt-2 text-xs text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Happening now
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Get color based on insight severity
 */
const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'info':
      return '#2196F3';
    case 'warning':
      return '#FF9800';
    case 'critical':
      return '#F44336';
    case 'positive':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

/**
 * Format seconds to mm:ss
 */
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default AnalysisPanel;
