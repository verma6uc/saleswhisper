
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import PricingCard from './components/PricingCard';
import PricingToggle from './components/PricingToggle';
import { PricingPlan } from './types';

/**
 * PricingPlans Component
 * 
 * A section that displays pricing options for SalesWhisper with toggle between monthly and annual billing.
 * Highlights the differences in GPT model access between different tiers.
 */
const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const pricingPlans: PricingPlan[] = [
    {
      name: 'Starter',
      description: 'Essential tools for small sales teams and individuals',
      monthlyPrice: 29,
      annualPrice: 24,
      features: [
        'Access to GPT-3.5',
        'Sales email templates',
        'Basic lead scoring',
        'Email tracking',
        '1 user included',
      ],
      ctaText: 'Start Free Trial',
      ctaLink: '/signup',
      recommended: false
    },
    {
      name: 'Professional',
      description: 'Advanced capabilities for growing sales teams',
      monthlyPrice: 79,
      annualPrice: 65,
      features: [
        'Access to GPT-4',
        'Advanced personalization',
        'Custom email sequences',
        'CRM integration',
        'Sales call analysis',
        'Up to 5 users',
      ],
      ctaText: 'Get Started',
      ctaLink: '/signup',
      recommended: true
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      monthlyPrice: null, // Custom pricing
      annualPrice: null,
      features: [
        'Access to GPT-4 Turbo',
        'Full API access',
        'Custom AI model training',
        'Advanced analytics dashboard',
        'Dedicated account manager',
        'Unlimited users',
      ],
      ctaText: 'Contact Sales',
      ctaLink: '/contact',
      recommended: false
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  const toggleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  const handleToggle = (value: boolean) => {
    setBillingCycle(value ? 'annual' : 'monthly');
  };

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <motion.div 
        className="container mx-auto px-4" 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={headingVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4 font-helvetica">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto">
            Choose the plan that fits your needs. Unlock powerful AI-driven sales capabilities with access to different GPT models.
          </p>
        </motion.div>

        <motion.div variants={toggleVariants} className="flex justify-center mb-12">
          <PricingToggle 
            onToggle={handleToggle} 
            labels={['Monthly Billing', 'Annual Billing']} 
            discount="Save up to 20%"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.name}
              plan={plan}
              index={index}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 font-roboto mb-4">
            Need a custom solution? <a href="/contact" className="text-primary font-medium hover:underline">Get in touch with our sales team</a>.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              "bg-primary/10 text-primary"
            )}>
              30-day money-back guarantee
            </span>
            <span className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              "bg-primary/10 text-primary"
            )}>
              No credit card required for trial
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PricingPlans;
  