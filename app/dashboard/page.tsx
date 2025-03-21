"use client"

import { useState } from "react"
import { AlertTriangle, Bell, CheckCircle, Clock, Filter, Search } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartLegend, ChartTooltip, LineChart } from "@/components/ui/chart"

// Mock data for the dashboard
const alertTrendData = [
  {
    name: "Mon",
    Critical: 4,
    Error: 7,
    Warning: 12,
    Info: 18,
  },
  {
    name: "Tue",
    Critical: 3,
    Error: 8,
    Warning: 10,
    Info: 15,
  },
  {
    name: "Wed",
    Critical: 5,
    Error: 10,
    Warning: 14,
    Info: 20,
  },
  {
    name: "Thu",
    Critical: 2,
    Error: 6,
    Warning: 9,
    Info: 14,
  },
  {
    name: "Fri",
    Critical: 3,
    Error: 5,
    Warning: 8,
    Info: 12,
  },
  {
    name: "Sat",
    Critical: 1,
    Error: 3,
    Warning: 5,
    Info: 8,
  },
  {
    name: "Sun",
    Critical: 2,
    Error: 4,
    Warning: 7,
    Info: 10,
  },
]

const recentAlerts = [
  {
    id: "1",
    title: "Database connection failed",
    service: "Payment Service",
    severity: "Critical",
    time: "5 minutes ago",
    status: "Active",
  },
  {
    id: "2",
    title: "API response time exceeded threshold",
    service: "API Gateway",
    severity: "Warning",
    time: "15 minutes ago",
    status: "Active",
  },
  {
    id: "3",
    title: "Memory usage above 90%",
    service: "User Service",
    severity: "Error",
    time: "30 minutes ago",
    status: "Resolved",
  },
  {
    id: "4",
    title: "New user registration spike",
    service: "Auth Service",
    severity: "Info",
    time: "1 hour ago",
    status: "Resolved",
  },
  {
    id: "5",
    title: "Failed login attempts exceeded",
    service: "Auth Service",
    severity: "Error",
    time: "2 hours ago",
    status: "Active",
  },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredAlerts = recentAlerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity
    const matchesStatus = selectedStatus === "all" || alert.status === selectedStatus

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500 text-white"
      case "Error":
        return "bg-orange-500 text-white"
      case "Warning":
        return "bg-yellow-500 text-black"
      case "Info":
        return "bg-blue-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Dashboard"
        description="Overview of your system alerts"
        action={{
          label: "Create Alert",
          onClick: () => console.log("Create alert clicked"),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Alerts"
            value={42}
            icon={Bell}
            description="Last 24 hours"
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard
            title="Active Alerts"
            value={18}
            icon={AlertTriangle}
            description="Requiring attention"
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="Resolved Alerts"
            value={24}
            icon={CheckCircle}
            description="Last 24 hours"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Avg. Resolution Time"
            value="45m"
            icon={Clock}
            description="Last 24 hours"
            trend={{ value: 10, isPositive: true }}
          />
        </div>

        {/* Alert Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="7days">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7days">7 days</TabsTrigger>
                  <TabsTrigger value="30days">30 days</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="24h" className="space-y-4">
                <ChartContainer className="h-[300px]">
                  <LineChart
                    data={alertTrendData}
                    categories={["Critical", "Error", "Warning", "Info"]}
                    index="name"
                    colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                    valueFormatter={(value) => `${value} alerts`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
                <ChartLegend
                  categories={["Critical", "Error", "Warning", "Info"]}
                  colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                />
              </TabsContent>

              <TabsContent value="7days" className="space-y-4">
                <ChartContainer className="h-[300px]">
                  <LineChart
                    data={alertTrendData}
                    categories={["Critical", "Error", "Warning", "Info"]}
                    index="name"
                    colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                    valueFormatter={(value) => `${value} alerts`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
                <ChartLegend
                  categories={["Critical", "Error", "Warning", "Info"]}
                  colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                />
              </TabsContent>

              <TabsContent value="30days" className="space-y-4">
                <ChartContainer className="h-[300px]">
                  <LineChart
                    data={alertTrendData}
                    categories={["Critical", "Error", "Warning", "Info"]}
                    index="name"
                    colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                    valueFormatter={(value) => `${value} alerts`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
                <ChartLegend
                  categories={["Critical", "Error", "Warning", "Info"]}
                  colors={["#ef4444", "#f97316", "#eab308", "#3b82f6"]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Alerts</CardTitle>
            <Button variant="outline" size="sm" onClick={() => console.log("View all alerts")}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Error">Error</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                    <SelectItem value="Info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Alert</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Severity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <tr key={alert.id} className="border-b">
                          <td className="px-4 py-3 text-sm">{alert.title}</td>
                          <td className="px-4 py-3 text-sm">{alert.service}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{alert.time}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className={getStatusColor(alert.status)}>
                              {alert.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                          No alerts found matching your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

