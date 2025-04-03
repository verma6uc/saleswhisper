
import { ConversationSegment, InsightPoint, CoachingSuggestion } from './types';

/**
 * Sample conversation data for the Live GPT Demo
 */
export const sampleConversation: ConversationSegment[] = [
  {
    id: 'seg1',
    speaker: 'salesperson',
    text: 'Hi there! Thanks for taking the time to chat about how SalesWhisper can help your sales team. Could you tell me a bit about your current sales process and what challenges you\'re facing?',
    startTime: 0,
    endTime: 8.5
  },
  {
    id: 'seg2',
    speaker: 'customer',
    text: 'Well, we have a team of about 25 sales reps. Our biggest challenge is that our closing rates have been declining over the past two quarters. We\'re not sure if it\'s our messaging or something else.',
    startTime: 8.5,
    endTime: 19
  },
  {
    id: 'seg3',
    speaker: 'salesperson',
    text: 'I see. Declining close rates can definitely be frustrating. Have you been able to identify any patterns in the calls that aren\'t converting?',
    startTime: 19,
    endTime: 25
  },
  {
    id: 'seg4',
    speaker: 'customer',
    text: 'That\'s the problem - we don\'t have good visibility into what\'s happening in our conversations. Our CRM data tells us about outcomes but not what happened during the calls.',
    startTime: 25,
    endTime: 34
  },
  {
    id: 'seg5',
    speaker: 'salesperson',
    text: 'That\'s a common challenge. Without conversation intelligence, it\'s like trying to coach a team based on just the final score without seeing the game footage.',
    startTime: 34,
    endTime: 41
  },
  {
    id: 'seg6',
    speaker: 'customer',
    text: 'Exactly! And it\'s frustrating because we invest a lot in training, but we can\'t tell if our reps are actually using what they learn.',
    startTime: 41,
    endTime: 48
  },
  {
    id: 'seg7',
    speaker: 'salesperson',
    text: 'I completely understand. This is exactly the problem SalesWhisper solves. Our AI analyzes every conversation in real-time, identifying what techniques are working, where opportunities are being missed, and providing specific coaching insights.',
    startTime: 48,
    endTime: 60
  },
  {
    id: 'seg8',
    speaker: 'customer',
    text: 'That sounds promising, but we\'ve tried conversation analysis tools before. The problem was they required so much setup and training that our team didn\'t adopt them.',
    startTime: 60,
    endTime: 70
  },
  {
    id: 'seg9',
    speaker: 'salesperson',
    text: 'I hear that concern a lot. The difference with SalesWhisper is that it works right out of the box with zero configuration. It integrates directly with your calling system, and the insights are delivered in an easy-to-understand format. Would you like me to show you a quick demo of how it works?',
    startTime: 70,
    endTime: 85
  },
  {
    id: 'seg10',
    speaker: 'customer',
    text: 'Yes, I\'d be interested in seeing that. How quickly could we get this implemented if we decided to move forward?',
    startTime: 85,
    endTime: 91
  }
];

/**
 * Sample insights for the demo conversation
 */
export const sampleInsights: InsightPoint[] = [
  {
    id: 'insight1',
    timePoint: 8.5,
    title: 'Strong Open',
    description: 'Rep starts with an open-ended question to understand customer needs',
    severity: 'positive',
    segmentId: 'seg1'
  },
  {
    id: 'insight2',
    timePoint: 19,
    title: 'Active Listening',
    description: 'Rep acknowledges the customer\'s pain point before asking follow-up',
    severity: 'positive',
    segmentId: 'seg3'
  },
  {
    id: 'insight3',
    timePoint: 34,
    title: 'Analogy Used',
    description: 'Rep uses a relevant analogy to illustrate the customer\'s situation',
    severity: 'positive',
    segmentId: 'seg5'
  },
  {
    id: 'insight4',
    timePoint: 48,
    title: 'Value Proposition',
    description: 'Rep clearly ties product benefits to customer\'s expressed needs',
    severity: 'positive',
    segmentId: 'seg7'
  },
  {
    id: 'insight5',
    timePoint: 60,
    title: 'Objection Raised',
    description: 'Customer expresses concern about implementation/adoption difficulty',
    severity: 'warning',
    segmentId: 'seg8'
  },
  {
    id: 'insight6',
    timePoint: 70,
    title: 'Objection Handled',
    description: 'Rep addresses concern directly with product differentiation',
    severity: 'positive',
    segmentId: 'seg9'
  },
  {
    id: 'insight7',
    timePoint: 85,
    title: 'Buying Signal',
    description: 'Customer asks about implementation timeline - strong buying signal',
    severity: 'critical',
    segmentId: 'seg10'
  }
];

/**
 * Sample coaching suggestions for the demo
 */
export const sampleCoachingSuggestions: CoachingSuggestion[] = [
  {
    id: 'coach1',
    title: 'Quantify the Impact',
    description: 'When discussing declining close rates, ask for specific percentages to better understand the severity.',
    category: 'technique'
  },
  {
    id: 'coach2',
    title: 'ROI Discussion Opportunity',
    description: 'Consider introducing how SalesWhisper has helped similar companies improve close rates by X%.',
    category: 'next-steps'
  },
  {
    id: 'coach3',
    title: 'Objection Response Alternative',
    description: 'Try offering a customer reference who had similar concerns about adoption but overcame them.',
    category: 'objection-handling'
  },
  {
    id: 'coach4',
    title: 'Follow-up on Implementation Question',
    description: 'The prospect\'s question about implementation timeline indicates buying interest. Provide a specific timeline and suggest a implementation planning call.',
    category: 'next-steps'
  }
];
