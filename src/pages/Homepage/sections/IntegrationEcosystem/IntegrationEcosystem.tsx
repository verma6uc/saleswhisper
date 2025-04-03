
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  Node, 
  Edge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Tooltip } from 'react-tooltip';
import { IntegrationLogo } from './IntegrationLogo';
import { IntegrationCard } from './IntegrationCard';
import { cn } from '../../../../lib/utils';

// Integration categories and data
const INTEGRATION_CATEGORIES = {
  CRM: 'CRM Systems',
  COMMUNICATION: 'Communication Tools',
  SALES: 'Sales Enablement',
  ANALYTICS: 'Analytics'
};

interface Integration {
  id: string;
  name: string;
  logo: string;
  category: keyof typeof INTEGRATION_CATEGORIES;
  description: string;
  useCase: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  integration: string;
}

const integrations: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: '/logos/salesforce.svg',
    category: 'CRM',
    description: 'Bidirectional sync with Salesforce CRM to enrich contacts and opportunities.',
    useCase: 'Access real-time customer data during calls and update records automatically.'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    logo: '/logos/hubspot.svg',
    category: 'CRM',
    description: 'Complete integration with HubSpot CRM, marketing, and sales tools.',
    useCase: 'Track customer journey insights and seamlessly update deal information.'
  },
  {
    id: 'zoom',
    name: 'Zoom',
    logo: '/logos/zoom.svg',
    category: 'COMMUNICATION',
    description: 'Real-time analysis and coaching during Zoom meetings.',
    useCase: 'Get live suggestions and post-call summaries for Zoom sales meetings.'
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    logo: '/logos/teams.svg',
    category: 'COMMUNICATION',
    description: 'Native integration with Microsoft Teams for seamless collaboration.',
    useCase: 'Access SalesWhisper intelligence directly within your Teams environment.'
  },
  {
    id: 'outreach',
    name: 'Outreach',
    logo: '/logos/outreach.svg',
    category: 'SALES',
    description: 'Connect your Outreach sequences with SalesWhisper intelligence.',
    useCase: 'Enhance sequence effectiveness with AI-powered content suggestions.'
  },
  {
    id: 'gong',
    name: 'Gong',
    logo: '/logos/gong.svg',
    category: 'ANALYTICS',
    description: 'Combine Gong\'s conversation intelligence with SalesWhisper AI.',
    useCase: 'Create a powerful feedback loop between conversation analysis and coaching.'
  },
  {
    id: 'salesloft',
    name: 'Salesloft',
    logo: '/logos/salesloft.svg',
    category: 'SALES',
    description: 'Enhance your Salesloft cadences with AI-powered intelligence.',
    useCase: 'Optimize your sales cadences with data-driven recommendations.'
  },
  {
    id: 'tableau',
    name: 'Tableau',
    logo: '/logos/tableau.svg',
    category: 'ANALYTICS',
    description: 'Visualize SalesWhisper insights with powerful Tableau dashboards.',
    useCase: 'Build custom reports to track effectiveness of AI recommendations.'
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'The Salesforce integration made adoption seamless for our team. Our reps got value from day one.',
    author: 'Sarah Johnson',
    company: 'TechSolutions Inc.',
    integration: 'salesforce'
  },
  {
    id: '2',
    quote: 'Having real-time coaching during Zoom calls has transformed our sales process completely.',
    author: 'Michael Chen',
    company: 'GrowthWorks',
    integration: 'zoom'
  },
  {
    id: '3',
    quote: 'The HubSpot integration provides a 360-degree view of customer interactions that\'s been game-changing.',
    author: 'Jessica Williams',
    company: 'Innovate Partners',
    integration: 'hubspot'
  }
];

// Flow diagram nodes and edges
const getInitialNodes = (): Node[] => [
  {
    id: 'center',
    type: 'input',
    data: { label: 'SalesWhisper AI' },
    position: { x: 250, y: 200 },
    style: {
      width: 180,
      height: 60,
      backgroundColor: '#1A237E',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  },
  {
    id: 'crm',
    data: { label: 'CRM Systems' },
    position: { x: 500, y: 100 },
    style: {
      width: 150,
      height: 50,
      backgroundColor: '#4527A0',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  },
  {
    id: 'communication',
    data: { label: 'Communication' },
    position: { x: 500, y: 200 },
    style: {
      width: 150,
      height: 50,
      backgroundColor: '#4527A0',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  },
  {
    id: 'sales',
    data: { label: 'Sales Tools' },
    position: { x: 500, y: 300 },
    style: {
      width: 150,
      height: 50,
      backgroundColor: '#4527A0',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    sourcePosition: Position.Left,
    targetPosition: Position.Right
  },
  {
    id: 'analytics',
    data: { label: 'Analytics' },
    position: { x: 0, y: 200 },
    style: {
      width: 150,
      height: 50,
      backgroundColor: '#4527A0',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left
  }
];

const getInitialEdges = (): Edge[] => [
  {
    id: 'center-to-crm',
    source: 'center',
    target: 'crm',
    animated: true,
    style: { stroke: '#1A237E', strokeWidth: 2 },
    label: 'Data Sync',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#ECEFF1', color: '#263238', fillOpacity: 0.8 }
  },
  {
    id: 'center-to-communication',
    source: 'center',
    target: 'communication',
    animated: true,
    style: { stroke: '#1A237E', strokeWidth: 2 },
    label: 'Live Insights',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#ECEFF1', color: '#263238', fillOpacity: 0.8 }
  },
  {
    id: 'center-to-sales',
    source: 'center',
    target: 'sales',
    animated: true,
    style: { stroke: '#1A237E', strokeWidth: 2 },
    label: 'Recommendations',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#ECEFF1', color: '#263238', fillOpacity: 0.8 }
  },
  {
    id: 'analytics-to-center',
    source: 'analytics',
    target: 'center',
    animated: true,
    style: { stroke: '#1A237E', strokeWidth: 2 },
    label: 'Insights',
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#ECEFF1', color: '#263238', fillOpacity: 0.8 }
  }
];

const IntegrationEcosystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [nodes, setNodes] = useState<Node[]>(getInitialNodes());
  const [edges, setEdges] = useState<Edge[]>(getInitialEdges());
  const [isCompact, setIsCompact] = useState(false);

  // Handle window resize to determine if we should show compact view
  useEffect(() => {
    const handleResize = () => {
      setIsCompact(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter integrations based on search term and category
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group integrations by category
  const integrationsByCategory = filteredIntegrations.reduce<Record<string, Integration[]>>((acc, integration) => {
    const category = integration.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(integration);
    return acc;
  }, {});

  // Handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Get testimonial by integration ID
  const getTestimonialByIntegration = (integrationId: string) => {
    return testimonials.find(t => t.integration === integrationId);
  };

  const categoryButtons = Object.entries(INTEGRATION_CATEGORIES).map(([key, label]) => (
    <button
      key={key}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-md transition-colors",
        selectedCategory === key
          ? "bg-primary text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      )}
      onClick={() => handleCategoryChange(key)}
    >
      {label}
    </button>
  ));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Seamless Integration Ecosystem
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            SalesWhisper connects effortlessly with your existing tools and platforms, 
            enhancing your workflow without disrupting it.
          </motion.p>
        </div>

        {/* Search and filter */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search integrations"
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2">
            <button
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                selectedCategory === 'all'
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => handleCategoryChange('all')}
            >
              All Integrations
            </button>
            {categoryButtons}
          </div>
        </div>

        {/* Integration Diagram - Only shown on tablet and larger screens */}
        {!isCompact && (
          <motion.div 
            className="bg-white p-4 rounded-xl shadow-md mb-12 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How SalesWhisper Connects to Your Tech Stack</h3>
            <div style={{ height: 400 }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
              >
                <Controls />
                <Background color="#f8f8f8" gap={16} />
                <MiniMap 
                  nodeStrokeColor={(n) => {
                    if (n.style?.backgroundColor) return n.style.backgroundColor as string;
                    return '#eee';
                  }}
                  nodeColor={(n) => {
                    if (n.style?.backgroundColor) return n.style.backgroundColor as string;
                    return '#fff';
                  }}
                />
              </ReactFlow>
            </div>
          </motion.div>
        )}

        {/* Tabbed Interface */}
        <Tabs className="mb-12">
          <TabList className="flex border-b border-gray-200 overflow-x-auto">
            {Object.entries(INTEGRATION_CATEGORIES).map(([key, label]) => (
              <Tab 
                key={key}
                className="px-4 py-2 font-medium text-gray-600 cursor-pointer border-b-2 border-transparent hover:text-primary hover:border-primary focus:outline-none transition-colors whitespace-nowrap"
                selectedClassName="text-primary border-primary"
              >
                {label}
              </Tab>
            ))}
          </TabList>

          {Object.entries(INTEGRATION_CATEGORIES).map(([key, label]) => (
            <TabPanel key={key}>
              <div className="py-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{label} Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations
                    .filter(integration => integration.category === key)
                    .map(integration => (
                      <IntegrationCard 
                        key={integration.id}
                        integration={integration}
                        testimonial={getTestimonialByIntegration(integration.id)}
                      />
                    ))
                  }
                </div>
              </div>
            </TabPanel>
          ))}
        </Tabs>

        {/* Logo Gallery */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Trusted by Teams Using</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
            {integrations.map((integration, index) => (
              <motion.div 
                key={integration.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <IntegrationLogo integration={integration} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-4">Not seeing your tool?</h3>
          <p className="mb-6">We're constantly expanding our integration capabilities. Contact us to discuss your specific needs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/integrations/api-documentation" className="bg-white text-primary font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              View API Documentation
            </a>
            <a href="/contact" className="bg-transparent border border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Request an Integration
            </a>
          </div>
        </motion.div>
      </div>
      
      <Tooltip id="integration-tooltip" />
    </section>
  );
};

export default IntegrationEcosystem;
