import type React from "react"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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

export const LineChart: React.FC<LineChartProps> = ({
  data,
  categories,
  index,
  colors,
  valueFormatter,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
}) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  return (
    <RechartsLineChart data={data}>
      {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
      {showXAxis && <XAxis dataKey={index} />}
      {showYAxis && <YAxis />}
      <Tooltip />
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
}

export const ChartContainer: React.FC<{ className?: string; children: React.ReactElement }> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

export const ChartLegend: React.FC<{ categories: string[]; colors: string[] }> = ({ categories, colors }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {categories.map((category, i) => (
        <div key={category} className="flex items-center">
          <div className="w-3 h-3 mr-2" style={{ backgroundColor: colors[i % colors.length] }} />
          <span>{category}</span>
        </div>
      ))}
    </div>
  )
}

export const ChartTooltip: React.FC = () => {
  return <div>ChartTooltip Placeholder</div>
}

