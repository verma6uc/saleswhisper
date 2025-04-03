
/**
 * Types for the Pricing Plans section
 */

export interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number | null; // null for custom pricing
  annualPrice: number | null;
  features: string[];
  ctaText: string;
  ctaLink: string;
  recommended: boolean;
}

export interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  billingCycle: 'monthly' | 'annual';
}
  