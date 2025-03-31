"use client"

import { useState } from "react"
import { Bell, CheckCircle, Clock, MoreHorizontal, AlertCircle, Calendar, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data for alerts
const alerts = [
  {
    id: 1,
    title: "API Endpoint Failure",
    message: "The /users endpoint is returning 500 errors. 23% of requests affected.",
    level: "error",
    time: "10 minutes ago",
    status: "active",
  },
  {
    id: 2,
    title: "Database Connection Timeout",
    message: "Database connections are timing out in the payment-api service.",
    level: "error",
    time: "25 minutes ago",
    status: "active",
  },
  {
    id: 3,
    title: "High CPU Usage",
    message: "Server CPU usage has exceeded 90% for more than 5 minutes.",
    level: "warning",
    time: "1 hour ago",
    status: "active",
  },
  {
    id: 4,
    title: "Memory Leak Detected",
    message: "Possible memory leak detected in the authentication service.",
    level: "warning",
    time: "2 hours ago",
    status: "resolved",
  },
  {
    id: 5,
    title: "SSL Certificate Expiring",
    message: "SSL certificate for api.example.com will expire in 7 days.",
    level: "info",
    time: "5 hours ago",
    status: "active",
  },
  {
    id: 6,
    title: "Rate Limit Exceeded",
    message: "API rate limit exceeded for client ID: client_12345.",
    level: "warning",
    time: "6 hours ago",
    status: "resolved",
  },
  {
    id: 7,
    title: "Disk Space Low",
    message: "Server disk space is below 10% on production-db-1.",
    level: "error",
    time: "1 day ago",
    status: "resolved",
  },
]

export default function DashboardPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("7days")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter alerts based on status and search query
  const filteredAlerts = alerts.filter((alert) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "active" && alert.status === "active") ||
      (filter === "resolved" && alert.status === "resolved")

    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Calculate stats
  const totalAlerts = alerts.length
  const activeAlerts = alerts.filter((alert) => alert.status === "active").length
  const resolvedAlerts = alerts.filter((alert) => alert.status === "resolved").length
  const avgResolutionTime = "1h 23m"

  // Handle resolve alert
  const handleResolve = (id: number) => {
    console.log(`Resolving alert ${id}`)
    // In a real app, you would update the alert status in your database
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Message</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No alerts found. Enjoy the silence!
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.title}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">{alert.message}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.level === "error" ? "destructive" : alert.level === "warning" ? "default" : "secondary"
                        }
                      >
                        {alert.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{alert.time}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleResolve(alert.id)}
                            disabled={alert.status === "resolved"}
                          >
                            {alert.status === "resolved" ? "Already Resolved" : "Resolve"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

