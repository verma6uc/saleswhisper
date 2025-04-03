
import React from 'react';

interface AudioPlayerProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  onSeek: (time: number) => void;
}

/**
 * Audio controls component for the demo
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentTime,
  duration,
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  onSeek,
}) => {
  // Handle slider change
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  // Format time display
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-3 flex flex-col space-y-2">
      <div className="flex items-center space-x-3">
        <button
          aria-label={isPlaying ? 'Pause' : 'Play'}
          onClick={isPlaying ? onPause : onPlay}
          className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-indigo-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        <button
          aria-label="Restart"
          onClick={onRestart}
          className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <div className="flex-1 ml-2">
          <div className="relative pt-1">
            <input
              type="range"
              className="w-full h-2 appearance-none rounded-lg cursor-pointer bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              style={{
                background: `linear-gradient(to right, #1A237E ${(currentTime / duration) * 100}%, #E0E0E0 ${(currentTime / duration) * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      {/* Audio waveform visualization */}
      <div className="h-8 w-full">
        <div className="h-full w-full flex items-center justify-between">
          {Array.from({ length: 40 }).map((_, i) => {
            // Create a dynamic waveform-like visualization
            const height = Math.sin(i * 0.3) * 0.5 + 0.5;
            const heightPercentage = (height * 100).toFixed(0);
            const isCurrent = (i / 40) < (currentTime / duration);
            
            return (
              <div 
                key={i} 
                className={`w-1 rounded-full ${isCurrent ? 'bg-primary' : 'bg-gray-200'}`}
                style={{ height: `${Math.max(10, heightPercentage)}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
