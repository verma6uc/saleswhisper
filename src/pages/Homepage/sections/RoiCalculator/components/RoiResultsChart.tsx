
import { useMemo } from "react";
import { BarStack } from "@visx/shape";
import { Group } from "@visx/group";
import { Grid } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { LegendOrdinal } from "@visx/legend";
import { localPoint } from "@visx/event";
import { useTooltip, Tooltip, TooltipWithBounds } from "@visx/tooltip";
import { formatCurrency, formatPercentage } from "../utils";

interface RoiResultsChartProps {
  currentCloseRate: number;
  improvedCloseRate: number;
  currentSalesCycle: number;
  improvedSalesCycle: number;
  currentRevenue: number;
  projectedRevenue: number;
  width?: number;
  height?: number;
}

type TooltipData = {
  key: string;
  value: number;
  color: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  label: string;
};

/**
 * A chart component to visualize ROI results showing the comparison 
 * between current and projected metrics.
 */
export const RoiResultsChart = ({
  currentCloseRate,
  improvedCloseRate,
  currentSalesCycle,
  improvedSalesCycle,
  currentRevenue,
  projectedRevenue,
  width = 500,
  height = 250,
}: RoiResultsChartProps) => {
  // Tooltip setup
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  // Data for the chart
  const data = useMemo(() => {
    return [
      {
        metric: "Close Rate",
        current: currentCloseRate,
        improved: improvedCloseRate,
      },
      {
        metric: "Sales Cycle",
        current: currentSalesCycle,
        improved: improvedSalesCycle,
      },
      {
        metric: "Monthly Revenue",
        current: currentRevenue,
        improved: projectedRevenue,
      },
    ];
  }, [
    currentCloseRate,
    improvedCloseRate,
    currentSalesCycle,
    improvedSalesCycle,
    currentRevenue,
    projectedRevenue,
  ]);

  // Define accessors
  const getMetric = (d: typeof data[number]) => d.metric;
  const keys = ["current", "improved"];

  // Define scales
  const metricScale = useMemo(
    () =>
      scaleBand<string>({
        domain: data.map(getMetric),
        padding: 0.3,
      }),
    [data]
  );

  const valueScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [
          0,
          Math.max(
            improvedCloseRate * 1.1,
            currentSalesCycle * 1.1,
            projectedRevenue * 1.1
          ),
        ],
        nice: true,
      }),
    [improvedCloseRate, currentSalesCycle, projectedRevenue]
  );

  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: keys,
        range: ["#4527A0", "#1A237E"],
      }),
    [keys]
  );

  // Calculate dimensions
  const xMax = width;
  const yMax = height - 80; // Leave room for legend and axes

  // Update scale ranges
  metricScale.rangeRound([0, xMax]);
  valueScale.range([yMax, 0]);

  const handleTooltip = (
    event: React.TouchEvent<SVGGElement> | React.MouseEvent<SVGGElement>,
    key: string,
    value: number,
    color: string,
    index: number
  ) => {
    const point = localPoint(event) || { x: 0, y: 0 };
    const metric = data[index].metric;
    let formattedValue: string;
    
    if (metric === "Close Rate") {
      formattedValue = formatPercentage(value);
    } else if (metric === "Sales Cycle") {
      formattedValue = `${value} days`;
    } else {
      formattedValue = formatCurrency(value);
    }

    const tooltipLabel = key === "current" ? "Current" : "With SalesWhisper";
    
    showTooltip({
      tooltipData: {
        key,
        value,
        color,
        index,
        height: 0,
        width: 0,
        x: point.x,
        y: point.y,
        label: `${tooltipLabel}: ${formattedValue}`,
      },
      tooltipTop: point.y,
      tooltipLeft: point.x,
    });
  };

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Group top={20} left={60}>
          <Grid
            xScale={metricScale}
            yScale={valueScale}
            width={xMax - 60}
            height={yMax}
            strokeDasharray="3,3"
            strokeOpacity={0.3}
            pointerEvents="none"
          />
          <BarStack
            data={data}
            keys={keys}
            x={getMetric}
            xScale={metricScale}
            yScale={valueScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`bar-stack-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    height={bar.height}
                    width={bar.width}
                    fill={bar.color}
                    rx={4}
                    onMouseLeave={hideTooltip}
                    onMouseMove={(event) =>
                      handleTooltip(
                        event,
                        bar.key,
                        bar.value,
                        bar.color,
                        barStack.index
                      )
                    }
                    onTouchMove={(event) =>
                      handleTooltip(
                        event,
                        bar.key,
                        bar.value,
                        bar.color,
                        barStack.index
                      )
                    }
                  />
                ))
              )
            }
          </BarStack>
          <AxisLeft
            scale={valueScale}
            hideTicks
            hideAxisLine
            tickLabelProps={{
              fill: "#666",
              fontSize: 10,
              textAnchor: "end",
              dy: "0.33em",
            }}
            numTicks={5}
          />
          <AxisBottom
            top={yMax}
            scale={metricScale}
            stroke="#e5e5e5"
            tickStroke="#e5e5e5"
            tickLabelProps={{
              fill: "#666",
              fontSize: 10,
              textAnchor: "middle",
              dy: "0.33em",
            }}
          />
        </Group>
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LegendOrdinal
          scale={colorScale}
          direction="row"
          labelMargin="0 15px 0 0"
          style={{
            fontSize: "10px",
            display: "flex",
            alignItems: "center",
          }}
          shape="rect"
          fill={({ datum }) => colorScale(datum)}
          shapeWidth={15}
          shapeHeight={15}
          labelFormat={(label) => (label === "current" ? "Current" : "With SalesWhisper")}
        />
      </div>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            backgroundColor: "white",
            color: "#333",
            border: "1px solid #ddd",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            padding: "8px 12px",
            fontSize: "12px",
            borderRadius: "4px",
          }}
        >
          {tooltipData.label}
        </TooltipWithBounds>
      )}
    </div>
  );
};
  