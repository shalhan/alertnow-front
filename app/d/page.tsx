"use client"

import type React from "react"

import { useState } from "react"
import { Bell, CheckCircle, Clock, MoreHorizontal, AlertCircle, Calendar, Search, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Sample data for alerts
const alerts = [
  {
    id: 1,
    message: "The /users endpoint is returning 500 errors. 23% of requests affected.",
    level: "critical",
    timestamp: "2023-06-15T10:30:00Z",
    time: "10 minutes ago",
    status: "active",
    service: "API Gateway",
    endpoint: "/users",
    errorCode: "500",
    affectedUsers: 230,
    requestId: "req_12345abcde",
    stackTrace: "Error: Connection refused at Server.handleRequest (/app/server.js:42:15)",
  },
  {
    id: 2,
    message: "Database connections are timing out in the payment-api service.",
    level: "error",
    timestamp: "2023-06-15T10:15:00Z",
    time: "25 minutes ago",
    status: "active",
    service: "Payment API",
    endpoint: "/api/payments",
    errorCode: "ETIMEDOUT",
    affectedUsers: 45,
    requestId: "req_67890fghij",
    stackTrace: "Error: Database connection timeout at DatabaseClient.connect (/app/db.js:78:22)",
  },
  {
    id: 3,
    message: "Server CPU usage has exceeded 90% for more than 5 minutes.",
    level: "warn",
    timestamp: "2023-06-15T09:45:00Z",
    time: "1 hour ago",
    status: "active",
    service: "Infrastructure",
    server: "prod-app-01",
    metric: "CPU",
    threshold: "90%",
    duration: "5 minutes",
    recommendation: "Consider scaling up or adding more instances",
  },
  {
    id: 4,
    message: "Possible memory leak detected in the authentication service.",
    level: "warn",
    timestamp: "2023-06-15T08:30:00Z",
    time: "2 hours ago",
    status: "resolved",
    service: "Authentication",
    server: "auth-service-02",
    metric: "Memory",
    memoryUsage: "2.3GB",
    normalUsage: "800MB",
    resolvedBy: "Jane Smith",
    resolution: "Deployed hotfix v1.2.5",
  },
  {
    id: 5,
    message: "SSL certificate for api.example.com will expire in 7 days.",
    level: "info",
    timestamp: "2023-06-15T05:15:00Z",
    time: "5 hours ago",
    status: "active",
    service: "Security",
    domain: "api.example.com",
    expiryDate: "2023-06-22",
    certificateAuthority: "Let's Encrypt",
    recommendation: "Renew certificate before expiration",
  },
  {
    id: 6,
    message: "API rate limit exceeded for client ID: client_12345.",
    level: "warn",
    timestamp: "2023-06-15T04:30:00Z",
    time: "6 hours ago",
    status: "resolved",
    service: "API Gateway",
    clientId: "client_12345",
    rateLimit: "100 req/min",
    actualRate: "142 req/min",
    resolvedBy: "System",
    resolution: "Automatic rate limiting applied",
  },
  {
    id: 7,
    message: "Server disk space is below 10% on production-db-1.",
    level: "error",
    timestamp: "2023-06-14T12:45:00Z",
    time: "1 day ago",
    status: "resolved",
    service: "Database",
    server: "production-db-1",
    diskSpace: "9.2%",
    diskSize: "1TB",
    resolvedBy: "John Doe",
    resolution: "Cleaned up old logs and increased disk size",
  },
]

export default function DashboardPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("7days")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  // Filter alerts based on status and search query
  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "active" && alert.status === "active") ||
      (filter === "resolved" && alert.status === "resolved")

    const matchesSearch = alert.message.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Calculate stats
  const totalAlerts = alerts.length
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved").length
  const avgResolutionTime = "1h 23m"

  // Handle resolve alert
  const handleResolve = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    console.log(`Resolving alert ${id}`)
    // In a real app, you would update the alert status in your database
  }

  // Toggle row expansion
  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  // Check if row is expanded
  const isRowExpanded = (id: number) => expandedRows.includes(id)

  // Get log level badge variant
  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <Badge variant="outline" className="border-blue-200 bg-blue-100 text-blue-800">
            info
          </Badge>
        )
      case "warn":
        return (
          <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-800">
            warn
          </Badge>
        )
      case "error":
        return (
          <Badge variant="outline" className="border-red-200 bg-red-100 text-red-800">
            error
          </Badge>
        )
      case "critical":
        return (
          <Badge variant="outline" className="border-purple-200 bg-purple-100 text-purple-800">
            critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your alerts in real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {activeAlerts > 3 ? "Needs attention" : "Within normal range"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Resolved Alerts</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedAlerts}</div>
            <p className="text-xs text-muted-foreground">{resolvedAlerts} issues fixed this period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">-12% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Recent Alerts</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Alerts</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No alerts found</h3>
              <p className="text-muted-foreground max-w-sm">
                {searchQuery
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "Enjoy the silence! No alerts match your current filters."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[120px]">Time</TableHead>
                    <TableHead className="w-[100px]">Level</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <>
                      <TableRow
                        key={alert.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleRowExpansion(alert.id)}
                      >
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRight
                              className={cn("h-4 w-4 transition-transform", isRowExpanded(alert.id) && "rotate-90")}
                            />
                          </Button>
                        </TableCell>
                        <TableCell className="font-medium max-w-md truncate">{alert.message}</TableCell>
                        <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                        <TableCell>{getLogLevelBadge(alert.level)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => handleResolve(alert.id, e)}
                                disabled={alert.status === "resolved"}
                              >
                                {alert.status === "resolved" ? "Already Resolved" : "Resolve"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View Details</DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Assign</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {isRowExpanded(alert.id) && (
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={5} className="p-4">
                            <div className="rounded-md border bg-background p-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Alert Details</h4>
                                  <dl className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1 text-sm">
                                    <dt className="text-muted-foreground">Status:</dt>
                                    <dd>
                                      <Badge
                                        variant={alert.status === "active" ? "outline" : "secondary"}
                                        className={
                                          alert.status === "active"
                                            ? "border-orange-200 bg-orange-100 text-orange-800"
                                            : "border-green-200 bg-green-100 text-green-800"
                                        }
                                      >
                                        {alert.status}
                                      </Badge>
                                    </dd>
                                    <dt className="text-muted-foreground">Service:</dt>
                                    <dd>{alert.service}</dd>
                                    <dt className="text-muted-foreground">Timestamp:</dt>
                                    <dd>{new Date(alert.timestamp).toLocaleString()}</dd>
                                    {alert.endpoint && (
                                      <>
                                        <dt className="text-muted-foreground">Endpoint:</dt>
                                        <dd>
                                          <code className="text-xs bg-muted px-1 py-0.5 rounded">{alert.endpoint}</code>
                                        </dd>
                                      </>
                                    )}
                                    {alert.errorCode && (
                                      <>
                                        <dt className="text-muted-foreground">Error Code:</dt>
                                        <dd>{alert.errorCode}</dd>
                                      </>
                                    )}
                                    {alert.affectedUsers && (
                                      <>
                                        <dt className="text-muted-foreground">Affected Users:</dt>
                                        <dd>{alert.affectedUsers}</dd>
                                      </>
                                    )}
                                    {alert.server && (
                                      <>
                                        <dt className="text-muted-foreground">Server:</dt>
                                        <dd>{alert.server}</dd>
                                      </>
                                    )}
                                  </dl>
                                </div>
                                <div>
                                  {alert.stackTrace && (
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium mb-2">Stack Trace</h4>
                                      <pre className="text-xs bg-muted p-2 rounded overflow-auto max-h-[150px]">
                                        {alert.stackTrace}
                                      </pre>
                                    </div>
                                  )}
                                  {alert.recommendation && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                                      <p className="text-sm">{alert.recommendation}</p>
                                    </div>
                                  )}
                                  {alert.resolution && (
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Resolution</h4>
                                      <p className="text-sm">
                                        {alert.resolution}
                                        {alert.resolvedBy && (
                                          <span className="text-muted-foreground"> by {alert.resolvedBy}</span>
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

