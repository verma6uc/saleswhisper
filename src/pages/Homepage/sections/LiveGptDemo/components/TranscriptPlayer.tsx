
import React, { useEffect, useRef } from 'react';
import { ConversationSegment } from '../types';

interface TranscriptPlayerProps {
  conversation: ConversationSegment[];
  currentTime: number;
  activeSegmentId: string | null;
  isPlaying: boolean;
  onSegmentClick: (segmentId: string, time: number) => void;
}

/**
 * Component that displays the conversation transcript with highlighting for the current segment
 */
const TranscriptPlayer: React.FC<TranscriptPlayerProps> = ({
  conversation,
  currentTime,
  activeSegmentId,
  isPlaying,
  onSegmentClick,
}) => {
  const activeRef = useRef<HTMLDivElement>(null);

  // Scroll to active segment when it changes
  useEffect(() => {
    if (activeRef.current && activeSegmentId) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeSegmentId]);

  return (
    <div className="h-full overflow-y-auto px-2 py-4 bg-gray-50 rounded-lg">
      <div className="space-y-4">
        {conversation.map((segment) => {
          const isActive = segment.id === activeSegmentId;
          const isPast = segment.endTime < currentTime;
          
          return (
            <div
              key={segment.id}
              ref={isActive ? activeRef : null}
              className={`p-3 rounded-lg transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-indigo-50 border-l-4 border-primary shadow-sm'
                  : isPast
                  ? 'bg-white border-l-4 border-gray-300'
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={() => onSegmentClick(segment.id, segment.startTime)}
            >
              <div className="flex items-start mb-2">
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    segment.speaker === 'salesperson'
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-white'
                  }`}
                >
                  {segment.speaker === 'salesperson' ? 'Sales Rep' : 'Customer'}
                </div>
                <div className="ml-auto text-xs text-gray-500">
                  {formatTime(segment.startTime)}
                </div>
              </div>
              <p
                className={`text-sm md:text-base ${
                  isActive ? 'text-gray-900 font-medium' : 'text-gray-700'
                }`}
              >
                {segment.text}
              </p>
              {isActive && isPlaying && (
                <div className="flex space-x-1 mt-2 items-center">
                  <span className="text-xs text-primary font-medium">
                    Playing
                  </span>
                  <span className="flex space-x-[2px]">
                    {[...Array(3)].map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"
                        style={{
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Format seconds to mm:ss
 */
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default TranscriptPlayer;
