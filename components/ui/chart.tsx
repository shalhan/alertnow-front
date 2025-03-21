"use client"

import React from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface LineChartProps {
  data: any[]
  categories: string[]
  index: string
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
}

export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  (
    {
      data,
      categories,
      index,
      colors,
      valueFormatter,
      showLegend = true,
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
    },
    ref,
  ) => {
    return (
      <RechartsLineChart data={data} ref={ref}>
        <CartesianGrid strokeDasharray="3 3" stroke={showGridLines ? "#ccc" : "none"} />
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <Tooltip formatter={valueFormatter ? (value) => valueFormatter(value) : undefined} />
        {showLegend && <Legend />}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    )
  },
)
LineChart.displayName = "LineChart"

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export const ChartTooltip = () => {
  return null
}

interface ChartLegendProps {
  categories: string[]
  colors: string[]
}

export const ChartLegend = ({ categories, colors }: ChartLegendProps) => {
  return (
    <div className="flex items-center gap-4">
      {categories.map((category, i) => (
        <div key={category} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
          <span className="text-sm">{category}</span>
        </div>
      ))}
    </div>
  )
}

