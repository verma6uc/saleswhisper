
/**
 * Form input data for the ROI calculator
 */
export interface RoiFormData {
  teamSize: number;
  avgDealSize: number;
  currentCloseRate: number;
  salesCycleLength: number;
  leadsPerMonth: number;
}

/**
 * Results of the ROI calculation
 */
export interface CalculatedResults {
  improvedCloseRate: number;
  reducedSalesCycleLength: number;
  additionalDealsPerMonth: number;
  currentMonthlyRevenue: number;
  projectedMonthlyRevenue: number;
  monthlyRevenueIncrease: number;
  annualRevenueIncrease: number;
  roiPercentage: number;
}

/**
 * Types of ROI reports that can be generated
 */
export type ReportType = "conservative" | "average" | "optimistic";
  