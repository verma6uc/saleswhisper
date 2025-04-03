
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import FeatureCard from './components/FeatureCard';
import { FeatureData } from './types';

/**
 * AIFeaturesShowcase component
 * 
 * A dynamic section that highlights SalesWhisper's core GPT-powered features
 * with interactive demonstrations and expandable details.
 */
const AIFeaturesShowcase = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features: FeatureData[] = [
    {
      id: 'real-time-analysis',
      title: 'Real-time Conversation Analysis',
      description: 'Our AI analyzes sales conversations as they happen, providing immediate insights and guidance to help representatives navigate customer interactions effectively.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      ),
      animation: (
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100">
          <motion.div 
            className="absolute top-2 left-2 right-16 h-6 rounded bg-blue-200"
            animate={{ width: ['30%', '70%', '40%', '60%'], x: [0, 10, 5, 0] }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse', 
              duration: 4,
            }}
          />
          <motion.div 
            className="absolute top-10 left-2 right-2 h-6 rounded bg-purple-200"
            animate={{ width: ['50%', '90%', '60%', '80%'] }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse', 
              duration: 3.5,
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-10 left-2 right-2 h-6 rounded bg-green-200"
            animate={{ 
              width: ['40%', '75%', '50%', '85%'],
              x: [0, 5, 10, 0] 
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse', 
              duration: 5,
            }}
          />
          <motion.div 
            className="absolute top-0 right-0 h-full w-2 bg-primary"
            animate={{ 
              height: ['30%', '70%', '50%', '90%'],
              y: [0, 20, 10, 0] 
            }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse', 
              duration: 4,
            }}
          />
        </div>
      ),
      model: 'GPT-4 Turbo',
      compareSlider: {
        beforeImage: '/images/conversation-before.jpg',
        beforeAlt: 'Sales conversation without AI assistance',
        beforeLabel: 'Without AI',
        afterImage: '/images/conversation-after.jpg',
        afterAlt: 'Sales conversation with AI assistance highlighting key insights',
        afterLabel: 'With AI'
      },
      technicalDetails: 'Powered by GPT-4 Turbo with real-time processing capabilities. Our system analyzes speech patterns, identifies key topics, and provides contextual suggestions with less than 500ms latency.',
      integrationInfo: 'Seamlessly integrates with Zoom, Teams, Google Meet, and other major video conferencing platforms, as well as most CRM systems including Salesforce and HubSpot.'
    },
    {
      id: 'sentiment-detection',
      title: 'Sentiment Detection & Coaching',
      description: 'Detect customer emotions and sentiment in real-time and receive personalized coaching prompts to help navigate difficult conversations effectively.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
      animation: (
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100">
          <motion.div 
            className="absolute top-4 left-4 h-8 w-8 rounded-full bg-red-300"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2,
            }}
          />
          <motion.div 
            className="absolute top-4 right-4 h-8 w-8 rounded-full bg-green-300"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2.5,
              delay: 0.5
            }}
          />
          <motion.div 
            className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-yellow-300"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 1.8,
              delay: 0.2
            }}
          />
          <motion.div 
            className="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-blue-300"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2.2,
              delay: 0.8
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400"
            animate={{ 
              scale: [1, 1.2, 0.9, 1.1, 1],
              rotate: [0, 10, -10, 5, 0]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 5,
            }}
          >
            <motion.div className="flex h-full items-center justify-center text-white">AI</motion.div>
          </motion.div>
        </div>
      ),
      model: 'GPT-4 with Emotional Intelligence Module',
      compareSlider: {
        beforeImage: '/images/sentiment-before.jpg',
        beforeAlt: 'Basic customer interaction without sentiment detection',
        beforeLabel: 'Standard Response',
        afterImage: '/images/sentiment-after.jpg',
        afterAlt: 'Enhanced interaction with sentiment detection and coaching',
        afterLabel: 'AI-Guided Response'
      },
      technicalDetails: 'Uses a fine-tuned GPT-4 model with emotional intelligence capabilities. Our system can detect over 20 distinct emotional states and provide contextually appropriate coaching based on customer tone, word choice, and conversational patterns.',
      integrationInfo: 'Works with your existing sales scripts and coaching materials. Can be integrated with most call center software, CRMs, and sales enablement platforms.'
    },
    {
      id: 'automated-insights',
      title: 'Automated Insight Generation',
      description: 'Transform raw conversation data into actionable sales insights and recommendations without manual analysis, saving your team valuable time.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      animation: (
        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="absolute h-full w-full">
            <motion.div 
              className="absolute top-0 left-0 h-8 w-8 rounded-sm bg-blue-200"
              animate={{ 
                x: [0, 40, 80, 120, 160],
                y: [0, 20, 10, 30, 10],
                opacity: [1, 1, 1, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
              }}
            />
            <motion.div 
              className="absolute top-10 left-0 h-5 w-12 rounded-sm bg-purple-200"
              animate={{ 
                x: [0, 60, 120, 170],
                y: [0, 10, 20, 5],
                opacity: [1, 1, 1, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2.5,
                delay: 0.3
              }}
            />
            <motion.div 
              className="absolute top-20 left-0 h-6 w-10 rounded-sm bg-green-200"
              animate={{ 
                x: [0, 50, 100, 150, 180],
                y: [0, 15, 5, 15, 0],
                opacity: [1, 1, 1, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 3.2,
                delay: 0.6
              }}
            />
            
            <motion.div 
              className="absolute top-0 left-0 right-0 flex h-full items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.div 
                className="h-24 w-24 rounded-full bg-secondary bg-opacity-20 p-2"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                }}
              >
                <motion.div 
                  className="flex h-full w-full items-center justify-center rounded-full bg-secondary bg-opacity-40 text-white"
                  animate={{ 
                    scale: [1, 1.05, 0.95, 1]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    delay: 0.5
                  }}
                >
                  <span className="text-sm font-bold">INSIGHTS</span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute right-4 bottom-4 h-12 w-32 rounded bg-white shadow-md"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.div 
                className="mx-2 mt-1 h-2 w-20 rounded-full bg-primary"
                animate={{ 
                  width: ['50%', '80%', '60%', '75%'],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3,
                }}
              />
              <motion.div 
                className="mx-2 mt-2 h-2 w-16 rounded-full bg-secondary"
                animate={{ 
                  width: ['30%', '70%', '50%', '90%'],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  delay: 0.5
                }}
              />
              <motion.div 
                className="mx-2 mt-2 h-2 w-24 rounded-full bg-green-400"
                animate={{ 
                  width: ['60%', '40%', '80%', '50%'],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 3.5,
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        </div>
      ),
      model: 'GPT-4 with Data Analysis Extensions',
      compareSlider: {
        beforeImage: '/images/insights-before.jpg',
        beforeAlt: 'Raw sales data without automated analysis',
        beforeLabel: 'Raw Data',
        afterImage: '/images/insights-after.jpg',
        afterAlt: 'Transformed data with AI-generated insights and recommendations',
        afterLabel: 'AI Insights'
      },
      technicalDetails: 'Leverages advanced GPT-4 models with specialized training in sales methodologies and business analytics. The system automatically identifies patterns, extracts key insights, and generates actionable recommendations based on vast amounts of conversation data.',
      integrationInfo: 'Connects with your existing business intelligence tools, CRM platforms, and data warehouses. Export capabilities to common formats including PDF, Excel, and PowerPoint for seamless reporting.'
    }
  ];

  return (
    <section ref={ref} className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-helvetica text-3xl font-bold leading-tight tracking-tight text-primary md:text-4xl lg:text-5xl">
            AI-Powered Features
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700">
            Discover how our advanced GPT-powered features transform your sales conversations into valuable insights and actionable coaching.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesShowcase;
  