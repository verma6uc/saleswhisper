
import React, { useState, useEffect, useCallback } from 'react';
import { sampleConversation, sampleInsights, sampleCoachingSuggestions } from './demoData';
import { DemoState, CoachingSuggestion as CoachingType } from './types';
import TranscriptPlayer from './components/TranscriptPlayer';
import AudioPlayer from './components/AudioPlayer';
import AnalysisPanel from './components/AnalysisPanel';
import CoachingSuggestion from './components/CoachingSuggestion';
import TryDemoModal from './components/TryDemoModal';

/**
 * LiveGptDemo section component for the Homepage
 */
const LiveGptDemo: React.FC = () => {
  const [state, setState] = useState<DemoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 91, // Length of our sample conversation
    activeSegmentId: null,
    activeInsightIds: [],
    showSuggestion: false,
    currentSuggestion: null,
    viewMode: window.innerWidth >= 1024 ? 'split' : 'transcript'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update active segment based on current time
  const updateActiveSegment = useCallback(() => {
    const activeSegment = sampleConversation.find(
      segment => state.currentTime >= segment.startTime && state.currentTime <= segment.endTime
    );
    
    const activeSegmentId = activeSegment ? activeSegment.id : null;
    
    // Find active insights
    const activeInsights = sampleInsights.filter(
      insight => Math.abs(insight.timePoint - state.currentTime) < 5
    );
    
    const activeInsightIds = activeInsights.map(insight => insight.id);
    
    setState(prev => ({
      ...prev,
      activeSegmentId,
      activeInsightIds
    }));
    
    // Show coaching suggestion at specific times
    if (state.currentTime > 60 && state.currentTime < 65 && !state.showSuggestion) {
      setState(prev => ({
        ...prev,
        showSuggestion: true,
        currentSuggestion: sampleCoachingSuggestions[2] // Objection handling suggestion
      }));
    } else if (state.currentTime > 85 && state.currentTime < 90 && !state.showSuggestion) {
      setState(prev => ({
        ...prev,
        showSuggestion: true,
        currentSuggestion: sampleCoachingSuggestions[3] // Follow-up suggestion
      }));
    }
  }, [state.currentTime, state.showSuggestion]);

  // Play simulation effect
  useEffect(() => {
    let timerId: number | undefined;
    
    if (state.isPlaying) {
      timerId = window.setInterval(() => {
        setState(prev => {
          const newTime = prev.currentTime + 0.1;
          if (newTime >= prev.duration) {
            clearInterval(timerId);
            return { ...prev, currentTime: prev.duration, isPlaying: false };
          }
          return { ...prev, currentTime: newTime };
        });
      }, 100);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [state.isPlaying, state.duration]);

  // Update active segment when time changes
  useEffect(() => {
    updateActiveSegment();
  }, [state.currentTime, updateActiveSegment]);

  // Update view mode based on screen size
  useEffect(() => {
    const handleResize = () => {
      setState(prev => ({
        ...prev,
        viewMode: window.innerWidth >= 1024 ? 'split' : 'transcript'
      }));
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle play/pause/restart
  const handlePlay = () => setState(prev => ({ ...prev, isPlaying: true }));
  const handlePause = () => setState(prev => ({ ...prev, isPlaying: false }));
  const handleRestart = () => {
    setState(prev => ({ 
      ...prev, 
      currentTime: 0, 
      isPlaying: true,
      showSuggestion: false,
      currentSuggestion: null 
    }));
  };
  
  // Handle seek
  const handleSeek = (time: number) => {
    setState(prev => ({ 
      ...prev, 
      currentTime: time,
      showSuggestion: false,
      currentSuggestion: null
    }));
  };
  
  // Handle segment click
  const handleSegmentClick = (segmentId: string, time: number) => {
    setState(prev => ({ 
      ...prev, 
      currentTime: time,
      activeSegmentId: segmentId,
      isPlaying: true,
      showSuggestion: false,
      currentSuggestion: null
    }));
  };
  
  // Close coaching suggestion
  const handleCloseSuggestion = () => {
    setState(prev => ({
      ...prev,
      showSuggestion: false,
      currentSuggestion: null
    }));
  };
  
  // Toggle view mode on mobile/tablet
  const toggleViewMode = () => {
    setState(prev => ({
      ...prev,
      viewMode: prev.viewMode === 'transcript' ? 'analysis' : 'transcript'
    }));
  };

  return (
    <section className="py-16 bg-white" id="live-gpt-demo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience SalesWhisper in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch as our AI analyzes a real sales conversation in real-time, identifying key moments and providing actionable coaching insights.
          </p>
        </div>

        <div className="mb-6 lg:hidden">
          <div className="flex justify-center">
            <button 
              onClick={toggleViewMode}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {state.viewMode === 'transcript' ? 'View Analysis' : 'View Transcript'}
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="lg:flex">
            {/* Left side - Transcript */}
            <div className={`lg:w-1/2 lg:border-r border-gray-200 ${
              state.viewMode === 'analysis' ? 'hidden lg:block' : ''
            }`}>
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Sales Conversation</h3>
              </div>
              <div className="h-[500px]">
                <TranscriptPlayer
                  conversation={sampleConversation}
                  currentTime={state.currentTime}
                  activeSegmentId={state.activeSegmentId}
                  isPlaying={state.isPlaying}
                  onSegmentClick={handleSegmentClick}
                />
              </div>
            </div>
            
            {/* Right side - Analysis */}
            <div className={`lg:w-1/2 ${
              state.viewMode === 'transcript' ? 'hidden lg:block' : ''
            }`}>
              <div className="p-4 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">AI Analysis</h3>
              </div>
              <div className="h-[500px] p-4">
                <AnalysisPanel
                  insights={sampleInsights}
                  activeInsightIds={state.activeInsightIds}
                  currentTime={state.currentTime}
                  duration={state.duration}
                />
              </div>
            </div>
          </div>
          
          {/* Audio controls */}
          <div className="p-4 border-t border-gray-200">
            <AudioPlayer
              currentTime={state.currentTime}
              duration={state.duration}
              isPlaying={state.isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
              onRestart={handleRestart}
              onSeek={handleSeek}
            />
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-primary hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
          >
            Try with your own data
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Show coaching suggestion */}
        {state.showSuggestion && state.currentSuggestion && (
          <CoachingSuggestion
            suggestion={state.currentSuggestion}
            onClose={handleCloseSuggestion}
          />
        )}
        
        {/* Try with your data modal */}
        <TryDemoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default LiveGptDemo;
