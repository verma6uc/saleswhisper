
/**
 * Type definitions for the Live GPT Demo section
 */

export interface ConversationSegment {
  id: string;
  speaker: 'salesperson' | 'customer';
  text: string;
  /** Start time in seconds */
  startTime: number;
  /** End time in seconds */
  endTime: number;
}

export interface InsightPoint {
  id: string;
  /** Time in the conversation when this insight occurs */
  timePoint: number;
  /** Brief title for the insight */
  title: string;
  /** Description of the insight */
  description: string;
  /** Severity or importance of the insight */
  severity: 'info' | 'warning' | 'critical' | 'positive';
  /** ID of the conversation segment this insight relates to */
  segmentId: string;
}

export interface CoachingSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'technique' | 'phrasing' | 'next-steps' | 'objection-handling';
}

export interface DemoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  activeSegmentId: string | null;
  activeInsightIds: string[];
  showSuggestion: boolean;
  currentSuggestion: CoachingSuggestion | null;
  viewMode: 'transcript' | 'analysis' | 'split';
}
