
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CountUp from "react-countup";
import { jsPDF } from "jspdf";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RoiResultsChart } from "./components/RoiResultsChart";
import { calculateRoi, formatCurrency, formatPercentage } from "./utils";
import { RoiFormData, CalculatedResults, ReportType } from "./types";

/**
 * ROI Calculator component for the homepage
 * 
 * This component allows users to calculate the potential ROI
 * from implementing SalesWhisper based on their sales metrics.
 */
const RoiCalculator = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState<ReportType>("average");
  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);

  // Form validation schema
  const schema = yup.object({
    teamSize: yup.number().required("Required").positive("Must be positive").integer("Must be a whole number"),
    avgDealSize: yup.number().required("Required").positive("Must be positive"),
    currentCloseRate: yup.number().required("Required").positive("Must be positive").max(100, "Cannot exceed 100%"),
    salesCycleLength: yup.number().required("Required").positive("Must be positive").integer("Must be a whole number"),
    leadsPerMonth: yup.number().required("Required").positive("Must be positive").integer("Must be a whole number"),
  }).required();

  const { control, handleSubmit, watch, formState: { errors, isValid } } = useForm<RoiFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      teamSize: 10,
      avgDealSize: 5000,
      currentCloseRate: 20,
      salesCycleLength: 30,
      leadsPerMonth: 100,
    },
    mode: "onChange"
  });

  // Watch form values for real-time calculation
  const formValues = watch();

  useEffect(() => {
    if (isValid) {
      const debounceCalc = setTimeout(() => {
        setIsCalculating(true);
        const calculatedResults = calculateRoi(formValues, reportType);
        setResults(calculatedResults);
        setIsCalculating(false);
      }, 500);

      return () => clearTimeout(debounceCalc);
    }
  }, [formValues, isValid, reportType]);

  const onSubmit = (data: RoiFormData) => {
    setIsCalculating(true);
    // Simulate calculation delay
    setTimeout(() => {
      const calculatedResults = calculateRoi(data, reportType);
      setResults(calculatedResults);
      setIsCalculating(false);
      
      // Scroll to results on mobile
      if (window.innerWidth < 768) {
        const resultsElement = document.getElementById("roi-results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 800);
  };

  const handleReportTypeChange = (value: ReportType) => {
    setReportType(value);
  };

  const handleGenerateReport = () => {
    if (!results) return;
    
    if (showEmailInput) {
      // Validate email and send report
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Report sent!",
        description: `Your ROI report has been sent to ${emailInput}`,
      });
      setShowEmailInput(false);
      setEmailInput("");
    } else {
      setShowEmailInput(true);
    }
  };

  const handleDownloadPdf = () => {
    if (!results) return;
    
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(26, 35, 126); // Primary color
    doc.text("SalesWhisper ROI Report", 20, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Based on your sales metrics", 20, 30);
    
    // Input parameters
    doc.setFontSize(14);
    doc.setTextColor(26, 35, 126);
    doc.text("Your Inputs:", 20, 45);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Sales Team Size: ${formValues.teamSize} people`, 20, 55);
    doc.text(`Average Deal Size: ${formatCurrency(formValues.avgDealSize)}`, 20, 62);
    doc.text(`Current Close Rate: ${formatPercentage(formValues.currentCloseRate)}`, 20, 69);
    doc.text(`Sales Cycle Length: ${formValues.salesCycleLength} days`, 20, 76);
    doc.text(`Leads Per Month: ${formValues.leadsPerMonth}`, 20, 83);
    
    // Results
    doc.setFontSize(14);
    doc.setTextColor(26, 35, 126);
    doc.text("Projected Results with SalesWhisper:", 20, 100);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total Annual Revenue Increase: ${formatCurrency(results.annualRevenueIncrease)}`, 20, 110);
    doc.text(`Improved Close Rate: ${formatPercentage(results.improvedCloseRate)}`, 20, 117);
    doc.text(`Reduced Sales Cycle: ${results.reducedSalesCycleLength} days`, 20, 124);
    doc.text(`ROI Percentage: ${formatPercentage(results.roiPercentage)}`, 20, 131);
    doc.text(`Additional Deals Per Month: ${results.additionalDealsPerMonth.toFixed(1)}`, 20, 138);
    
    // Save the PDF
    doc.save("SalesWhisper-ROI-Report.pdf");
    
    toast({
      title: "Report downloaded",
      description: "Your ROI report has been downloaded successfully.",
    });
  };

  return (
    <section id="roi-calculator" className="w-full py-16 bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1A237E] mb-3 font-helvetica">
            Calculate Your ROI with SalesWhisper
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-roboto">
            Discover how much SalesWhisper can increase your revenue, improve close rates, and shorten your sales cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Form */}
          <div className="p-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1A237E] font-helvetica">Your Sales Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <form id="roi-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Team Size */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="teamSize" className="text-sm font-medium font-roboto">
                        Sales Team Size
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The number of sales representatives on your team</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Controller
                      name="teamSize"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Input
                            id="teamSize"
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                            className={cn(errors.teamSize && "border-red-500")}
                            aria-describedby="teamSize-error"
                          />
                          <div className="mt-1">
                            <Controller
                              name="teamSize"
                              control={control}
                              render={({ field }) => (
                                <Slider
                                  min={1}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {errors.teamSize && (
                            <p id="teamSize-error" className="text-sm text-red-500">{errors.teamSize.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Average Deal Size */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="avgDealSize" className="text-sm font-medium font-roboto">
                        Average Deal Size ($)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The average revenue generated from a single closed deal</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Controller
                      name="avgDealSize"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                            <Input
                              id="avgDealSize"
                              type="number"
                              min="1"
                              className={cn("pl-7", errors.avgDealSize && "border-red-500")}
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || "")}
                              aria-describedby="avgDealSize-error"
                            />
                          </div>
                          <div className="mt-1">
                            <Controller
                              name="avgDealSize"
                              control={control}
                              render={({ field }) => (
                                <Slider
                                  min={1000}
                                  max={100000}
                                  step={1000}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {errors.avgDealSize && (
                            <p id="avgDealSize-error" className="text-sm text-red-500">{errors.avgDealSize.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Current Close Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="currentCloseRate" className="text-sm font-medium font-roboto">
                        Current Close Rate (%)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The percentage of leads that convert to closed deals</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Controller
                      name="currentCloseRate"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="currentCloseRate"
                              type="number"
                              min="1"
                              max="100"
                              className={cn("pr-7", errors.currentCloseRate && "border-red-500")}
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || "")}
                              aria-describedby="currentCloseRate-error"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                          </div>
                          <div className="mt-1">
                            <Controller
                              name="currentCloseRate"
                              control={control}
                              render={({ field }) => (
                                <Slider
                                  min={1}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {errors.currentCloseRate && (
                            <p id="currentCloseRate-error" className="text-sm text-red-500">{errors.currentCloseRate.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Sales Cycle Length */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="salesCycleLength" className="text-sm font-medium font-roboto">
                        Sales Cycle Length (days)
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The average number of days from lead to closed deal</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Controller
                      name="salesCycleLength"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <div className="relative">
                            <Input
                              id="salesCycleLength"
                              type="number"
                              min="1"
                              className={cn("pr-12", errors.salesCycleLength && "border-red-500")}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                              aria-describedby="salesCycleLength-error"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-500">days</span>
                          </div>
                          <div className="mt-1">
                            <Controller
                              name="salesCycleLength"
                              control={control}
                              render={({ field }) => (
                                <Slider
                                  min={1}
                                  max={180}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {errors.salesCycleLength && (
                            <p id="salesCycleLength-error" className="text-sm text-red-500">{errors.salesCycleLength.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Leads Per Month */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="leadsPerMonth" className="text-sm font-medium font-roboto">
                        Leads Per Month
                      </Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4" />
                              <path d="M12 8h.01" />
                            </svg>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The average number of new leads your team processes each month</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Controller
                      name="leadsPerMonth"
                      control={control}
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Input
                            id="leadsPerMonth"
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || "")}
                            className={cn(errors.leadsPerMonth && "border-red-500")}
                            aria-describedby="leadsPerMonth-error"
                          />
                          <div className="mt-1">
                            <Controller
                              name="leadsPerMonth"
                              control={control}
                              render={({ field }) => (
                                <Slider
                                  min={10}
                                  max={1000}
                                  step={10}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          {errors.leadsPerMonth && (
                            <p id="leadsPerMonth-error" className="text-sm text-red-500">{errors.leadsPerMonth.message}</p>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-[#1A237E] hover:bg-[#3949AB] text-white font-bold py-2"
                      disabled={isCalculating || !isValid}
                    >
                      {isCalculating ? "Calculating..." : "Calculate ROI"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Display */}
          <div id="roi-results" className="p-1">
            <Card className="border border-gray-200 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1A237E] font-helvetica">Your Potential ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="average" onValueChange={(value) => handleReportTypeChange(value as ReportType)} className="mb-6">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="conservative">Conservative</TabsTrigger>
                    <TabsTrigger value="average">Average</TabsTrigger>
                    <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
                  </TabsList>
                </Tabs>

                {!results ? (
                  <div className="flex flex-col items-center justify-center space-y-4 py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p className="text-lg text-gray-700 font-roboto">Enter your sales metrics and click "Calculate ROI" to see potential results.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#ECEFF1] p-6 rounded-lg text-center">
                        <h3 className="text-lg text-gray-700 mb-2 font-roboto">Annual Revenue Increase</h3>
                        <div className="text-3xl font-bold text-[#1A237E] font-helvetica">
                          <CountUp
                            start={0}
                            end={results.annualRevenueIncrease}
                            duration={1.5}
                            separator=","
                            decimals={0}
                            decimal="."
                            prefix="$"
                          />
                        </div>
                      </div>
                      <div className="bg-[#ECEFF1] p-6 rounded-lg text-center">
                        <h3 className="text-lg text-gray-700 mb-2 font-roboto">ROI Percentage</h3>
                        <div className="text-3xl font-bold text-[#1A237E] font-helvetica">
                          <CountUp
                            start={0}
                            end={results.roiPercentage}
                            duration={1.5}
                            suffix="%"
                            decimals={0}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="h-[250px] w-full">
                      <RoiResultsChart 
                        currentCloseRate={formValues.currentCloseRate}
                        improvedCloseRate={results.improvedCloseRate}
                        currentSalesCycle={formValues.salesCycleLength}
                        improvedSalesCycle={results.reducedSalesCycleLength}
                        currentRevenue={results.currentMonthlyRevenue}
                        projectedRevenue={results.projectedMonthlyRevenue}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1 font-roboto">Close Rate</h4>
                        <div className="flex items-end space-x-2">
                          <span className="text-2xl font-bold text-[#1A237E] font-helvetica">
                            {formatPercentage(results.improvedCloseRate)}
                          </span>
                          <span className="text-sm text-green-600 mb-0.5">
                            +{formatPercentage(results.improvedCloseRate - formValues.currentCloseRate)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1 font-roboto">Sales Cycle</h4>
                        <div className="flex items-end space-x-2">
                          <span className="text-2xl font-bold text-[#1A237E] font-helvetica">
                            {results.reducedSalesCycleLength} days
                          </span>
                          <span className="text-sm text-green-600 mb-0.5">
                            -{formValues.salesCycleLength - results.reducedSalesCycleLength} days
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border border-gray-200 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-1 font-roboto">Additional Deals</h4>
                        <div className="flex items-end space-x-2">
                          <span className="text-2xl font-bold text-[#1A237E] font-helvetica">
                            {results.additionalDealsPerMonth.toFixed(1)}/mo
                          </span>
                          <span className="text-sm text-green-600 mb-0.5">
                            +{(results.additionalDealsPerMonth * 12).toFixed(0)}/yr
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#ECEFF1] p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-3 font-roboto">Where You'll See Improvement</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-gray-700 font-roboto">Improved lead qualification with AI-assisted prospecting</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-gray-700 font-roboto">Better objection handling with real-time AI suggestions</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-gray-700 font-roboto">More efficient follow-ups using AI-generated personalized communication</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A237E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span className="text-gray-700 font-roboto">Reduced time spent on admin tasks through automation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {results && (
                  <>
                    {showEmailInput ? (
                      <div className="w-full space-y-3">
                        <Label htmlFor="email" className="font-medium font-roboto">
                          Enter your email to receive the full report
                        </Label>
                        <div className="flex space-x-2">
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleGenerateReport} className="bg-[#1A237E] hover:bg-[#3949AB]">
                            Send Report
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row w-full space-y-3 sm:space-y-0 sm:space-x-3">
                        <Button onClick={handleGenerateReport} className="w-full sm:w-auto bg-[#1A237E] hover:bg-[#3949AB]">
                          Get Detailed Report by Email
                        </Button>
                        <Button onClick={handleDownloadPdf} variant="outline" className="w-full sm:w-auto border-[#1A237E] text-[#1A237E] hover:bg-[#ECEFF1]">
                          Download PDF Report
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
  