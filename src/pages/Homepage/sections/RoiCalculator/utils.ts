
import { RoiFormData, CalculatedResults, ReportType } from "./types";

/**
 * Calculates the ROI based on the provided sales metrics and report type.
 * @param data User input sales metrics
 * @param reportType Conservative, average, or optimistic calculation model
 * @returns Calculated ROI results
 */
export const calculateRoi = (data: RoiFormData, reportType: ReportType): CalculatedResults => {
  // Define improvement factors based on the report type
  let closeRateImprovementFactor = 0;
  let salesCycleReductionFactor = 0;
  
  switch(reportType) {
    case "conservative":
      closeRateImprovementFactor = 0.15; // 15% improvement
      salesCycleReductionFactor = 0.12; // 12% reduction
      break;
    case "average":
      closeRateImprovementFactor = 0.25; // 25% improvement
      salesCycleReductionFactor = 0.20; // 20% reduction
      break;
    case "optimistic":
      closeRateImprovementFactor = 0.35; // 35% improvement
      salesCycleReductionFactor = 0.30; // 30% reduction
      break;
    default:
      closeRateImprovementFactor = 0.25;
      salesCycleReductionFactor = 0.20;
  }
  
  // Calculate improved metrics
  const improvedCloseRate = Math.min(data.currentCloseRate * (1 + closeRateImprovementFactor), 100);
  const reducedSalesCycleLength = Math.max(Math.round(data.salesCycleLength * (1 - salesCycleReductionFactor)), 1);
  
  // Calculate current and projected deals per month
  const currentDealsPerMonth = (data.leadsPerMonth * (data.currentCloseRate / 100));
  const projectedDealsPerMonth = (data.leadsPerMonth * (improvedCloseRate / 100));
  const additionalDealsPerMonth = projectedDealsPerMonth - currentDealsPerMonth;
  
  // Calculate current and projected revenue
  const currentMonthlyRevenue = currentDealsPerMonth * data.avgDealSize;
  const projectedMonthlyRevenue = projectedDealsPerMonth * data.avgDealSize;
  const monthlyRevenueIncrease = projectedMonthlyRevenue - currentMonthlyRevenue;
  const annualRevenueIncrease = monthlyRevenueIncrease * 12;
  
  // Calculate ROI
  // Assume SalesWhisper costs $100 per user per month
  const annualCost = data.teamSize * 100 * 12;
  const roiPercentage = (annualRevenueIncrease / annualCost) * 100;
  
  return {
    improvedCloseRate,
    reducedSalesCycleLength,
    additionalDealsPerMonth,
    currentMonthlyRevenue,
    projectedMonthlyRevenue,
    monthlyRevenueIncrease,
    annualRevenueIncrease,
    roiPercentage
  };
};

/**
 * Formats a number as currency.
 * @param value The number to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Formats a number as a percentage.
 * @param value The number to format
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1
  }).format(value / 100);
};
  