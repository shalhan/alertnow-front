"use client"

import type React from "react"

import { useState } from "react"
import {
  Bell,
  CheckCircle,
  Clock,
  MoreHorizontal,
  AlertCircle,
  Calendar,
  Search,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Sample data for alerts - expanded to have more items
const allAlerts = [
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
    data: {
      request: {
        method: "GET",
        path: "/users",
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "content-type": "application/json",
          authorization: "Bearer [redacted]",
        },
        query: { limit: 50, offset: 0 },
      },
      response: {
        status: 500,
        body: { error: "Internal Server Error", message: "Database connection failed" },
        headers: { "content-type": "application/json" },
      },
      context: {
        userId: "user_123456",
        environment: "production",
        region: "us-east-1",
      },
    },
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
    data: {
      database: {
        host: "db-cluster-payments.internal",
        port: 5432,
        name: "payments_prod",
        connectionPool: { max: 20, used: 20, waiting: 15 },
      },
      error: {
        code: "ETIMEDOUT",
        message: "Connection timed out after 5000ms",
        attempts: 3,
      },
      metrics: {
        avgResponseTime: "1250ms",
        p95ResponseTime: "4800ms",
        errorRate: "23%",
      },
    },
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
    data: {
      server: {
        name: "prod-app-01",
        ip: "10.0.4.23",
        zone: "us-east-1a",
        instance: "c5.2xlarge",
      },
      metrics: {
        cpu: { current: "94%", avg1h: "87%", avg24h: "62%" },
        memory: { current: "76%", avg1h: "72%", avg24h: "68%" },
        disk: { current: "54%", avg1h: "53%", avg24h: "51%" },
      },
      processes: [
        { name: "node", pid: 1234, cpu: "45%", memory: "1.2GB" },
        { name: "nginx", pid: 2345, cpu: "22%", memory: "300MB" },
        { name: "postgres", pid: 3456, cpu: "18%", memory: "2.5GB" },
      ],
    },
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
    data: {
      memory: {
        current: "2.3GB",
        baseline: "800MB",
        growth: "150MB/hour",
      },
      heap: {
        total: "2.5GB",
        used: "2.3GB",
        limit: "3GB",
      },
      objects: [
        { type: "UserSession", count: 28456, size: "850MB" },
        { type: "TokenCache", count: 15234, size: "450MB" },
        { type: "RequestContext", count: 9872, size: "320MB" },
      ],
    },
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
    data: {
      certificate: {
        domain: "api.example.com",
        issuer: "Let's Encrypt Authority X3",
        validFrom: "2023-03-22T00:00:00Z",
        validTo: "2023-06-22T23:59:59Z",
        daysRemaining: 7,
      },
      alternatives: ["*.example.com", "example.com", "api.example.com"],
      autoRenewal: {
        enabled: true,
        nextAttempt: "2023-06-16T00:00:00Z",
      },
    },
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
    data: {
      client: {
        id: "client_12345",
        name: "Mobile App - iOS",
        tier: "premium",
        rateLimit: "100 req/min",
      },
      usage: {
        current: "142 req/min",
        peak: "156 req/min",
        average: "78 req/min",
      },
      endpoints: [
        { path: "/api/products", requests: 68, percentage: "48%" },
        { path: "/api/cart", requests: 42, percentage: "30%" },
        { path: "/api/checkout", requests: 32, percentage: "22%" },
      ],
    },
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
    data: {
      disk: {
        total: "1TB",
        used: "910GB",
        available: "90GB",
        percentAvailable: "9.2%",
      },
      volumes: [
        { mount: "/", size: "100GB", used: "65GB", available: "35GB" },
        { mount: "/var", size: "200GB", used: "185GB", available: "15GB" },
        { mount: "/data", size: "700GB", used: "660GB", available: "40GB" },
      ],
      largestDirectories: [
        { path: "/data/logs", size: "350GB" },
        { path: "/data/backups", size: "200GB" },
        { path: "/var/lib/postgresql", size: "180GB" },
      ],
    },
  },
  {
    id: 8,
    message: "New user registration spike detected - possible bot activity.",
    level: "warn",
    timestamp: "2023-06-14T10:15:00Z",
    time: "1 day ago",
    status: "active",
    service: "User Management",
    metric: "Registration Rate",
    normalRate: "5/minute",
    currentRate: "35/minute",
    recommendation: "Check registration patterns and implement CAPTCHA",
    data: {
      registrations: {
        current: "35/minute",
        normal: "5/minute",
        increase: "600%",
        total: 245,
      },
      patterns: {
        ipAddresses: {
          unique: 12,
          mostCommon: "203.0.113.42 (78 registrations)",
        },
        emails: {
          domains: {
            "gmail.com": 112,
            "yahoo.com": 56,
            "hotmail.com": 48,
            others: 29,
          },
          patterns: "Sequential usernames detected",
        },
        timing: {
          averageInterval: "1.7 seconds",
          minimumInterval: "0.8 seconds",
        },
      },
    },
  },
  {
    id: 9,
    message: "Payment gateway integration test failed on staging environment.",
    level: "info",
    timestamp: "2023-06-14T08:30:00Z",
    time: "1 day ago",
    status: "resolved",
    service: "CI/CD Pipeline",
    environment: "staging",
    testName: "payment-gateway-integration",
    resolvedBy: "Alex Johnson",
    resolution: "Updated API credentials for staging environment",
    data: {
      test: {
        name: "payment-gateway-integration",
        duration: "45.2s",
        status: "failed",
        retries: 2,
      },
      error: {
        message: "Authentication failed with payment provider",
        location: "test/integration/payment.test.js:42",
        response: {
          status: 401,
          body: {
            error: "invalid_client",
            error_description: "Client authentication failed",
          },
        },
      },
      environment: {
        name: "staging",
        branch: "release/v2.5.0",
        commit: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      },
    },
  },
  {
    id: 10,
    message: "CDN cache purge failed for assets on product pages.",
    level: "error",
    timestamp: "2023-06-13T22:45:00Z",
    time: "2 days ago",
    status: "resolved",
    service: "Content Delivery",
    affectedUrls: "/products/*, /categories/*",
    errorCode: "AUTH_FAILURE",
    resolvedBy: "Maria Garcia",
    resolution: "Rotated CDN API keys and updated configuration",
    data: {
      cdn: {
        provider: "CloudFront",
        distribution: "E1ABCDEFGHIJKL",
        region: "global",
      },
      purge: {
        patterns: ["/products/*", "/categories/*", "/assets/product-images/*"],
        estimatedUrls: 15000,
        status: "failed",
      },
      error: {
        code: "AUTH_FAILURE",
        message: "The AWS access key ID you provided does not exist in our records.",
        requestId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
      },
    },
  },
  {
    id: 11,
    message: "Unusual traffic pattern detected from IP range 203.0.113.0/24.",
    level: "warn",
    timestamp: "2023-06-13T18:20:00Z",
    time: "2 days ago",
    status: "active",
    service: "Security",
    sourceIPs: "203.0.113.0/24",
    requestPattern: "Repeated login attempts",
    recommendation: "Review traffic and consider IP blocking if malicious",
    data: {
      traffic: {
        sourceRange: "203.0.113.0/24",
        country: "Unknown",
        asn: "AS12345 - Example Network",
        requestCount: 1872,
        timespan: "30 minutes",
      },
      patterns: {
        endpoints: {
          "/api/auth/login": 1245,
          "/api/auth/reset-password": 627,
        },
        usernames: {
          unique: 5,
          attempts: {
            admin: 423,
            administrator: 389,
            root: 356,
            user: 312,
            test: 392,
          },
        },
        successRate: "0.2%",
      },
      recommendation: "Consider implementing rate limiting or temporary IP ban",
    },
  },
  {
    id: 12,
    message: "Scheduled database backup completed successfully.",
    level: "info",
    timestamp: "2023-06-13T04:00:00Z",
    time: "2 days ago",
    status: "resolved",
    service: "Database",
    backupSize: "42GB",
    duration: "18 minutes",
    storageLocation: "s3://backups/db/2023-06-13/",
    data: {
      backup: {
        id: "bkp_20230613_0400",
        type: "full",
        size: "42GB",
        compressed: "15GB",
        startTime: "2023-06-13T04:00:00Z",
        endTime: "2023-06-13T04:18:23Z",
        duration: "18m 23s",
      },
      storage: {
        provider: "AWS S3",
        bucket: "backups",
        path: "db/2023-06-13/",
        retention: "30 days",
      },
      database: {
        name: "main-production",
        type: "PostgreSQL",
        version: "14.5",
        tables: 142,
        totalRows: "156M",
      },
    },
  },
  {
    id: 13,
    message: "Third-party API integration (payment-processor) experiencing high latency.",
    level: "warn",
    timestamp: "2023-06-12T15:30:00Z",
    time: "3 days ago",
    status: "resolved",
    service: "Integrations",
    vendor: "PaymentProcessor Inc.",
    normalLatency: "200ms",
    currentLatency: "1200ms",
    resolvedBy: "Vendor",
    resolution: "Vendor resolved capacity issues on their end",
    data: {
      integration: {
        name: "PaymentProcessor API",
        endpoint: "https://api.paymentprocessor.com/v2/",
        version: "2.0",
        status: "degraded",
      },
      performance: {
        current: {
          latency: "1200ms",
          timeout: "3%",
          error: "2%",
        },
        normal: {
          latency: "200ms",
          timeout: "0.1%",
          error: "0.5%",
        },
      },
      impact: {
        services: ["checkout", "subscription-renewal", "refunds"],
        estimatedUsers: 350,
        revenue: "Medium risk",
      },
      vendor: {
        status: "https://status.paymentprocessor.com",
        incident: "INC-12345",
        communication: "Investigating capacity issues in US-East region",
      },
    },
  },
  {
    id: 14,
    message: "Critical security vulnerability CVE-2023-1234 patched.",
    level: "critical",
    timestamp: "2023-06-12T09:15:00Z",
    time: "3 days ago",
    status: "resolved",
    service: "Security",
    cveId: "CVE-2023-1234",
    severity: "9.8/10",
    affectedPackages: "openssl 1.1.1k",
    patchedVersion: "openssl 1.1.1l",
    resolvedBy: "Security Team",
    resolution: "Emergency patch deployed to all servers",
    data: {
      vulnerability: {
        id: "CVE-2023-1234",
        title: "Buffer Overflow in OpenSSL TLS Handshake",
        description:
          "A buffer overflow vulnerability in OpenSSL's TLS handshake code could allow remote attackers to execute arbitrary code or cause a denial of service.",
        published: "2023-06-10T00:00:00Z",
        cvss: {
          score: 9.8,
          vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        },
      },
      affected: {
        package: "openssl",
        versions: ["1.1.1k", "1.1.1j", "1.1.1i"],
        patchedVersion: "1.1.1l",
        servers: 24,
      },
      remediation: {
        patch: "Applied security update to all affected servers",
        startTime: "2023-06-12T08:30:00Z",
        completionTime: "2023-06-12T09:15:00Z",
        verificationTests: "All passed",
      },
    },
  },
  {
    id: 15,
    message: "Redis cache server restarted due to high memory usage.",
    level: "error",
    timestamp: "2023-06-11T23:45:00Z",
    time: "4 days ago",
    status: "resolved",
    service: "Caching",
    server: "cache-01",
    memoryUsage: "95%",
    diskSize: "1TB",
    resolvedBy: "System",
    resolution: "Automatic restart triggered by monitoring system",
    data: {
      server: {
        name: "cache-01",
        type: "Redis",
        version: "6.2.6",
        role: "master",
      },
      memory: {
        total: "32GB",
        used: "30.4GB",
        usedPercentage: "95%",
        maxmemory: "30GB",
        policy: "allkeys-lru",
      },
      keys: {
        total: 12456789,
        expires: 10234567,
        avgTtl: "3600s",
      },
      clients: {
        connected: 245,
        blocked: 0,
        maxClients: 10000,
      },
      restart: {
        trigger: "OOM killer",
        time: "2023-06-11T23:45:00Z",
        downtime: "42s",
      },
    },
  },
]

export default function DashboardPage() {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("7days")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [isLoading, setIsLoading] = useState(false)

  // Filter alerts based on status and search query
  const filteredAlerts = allAlerts.filter((alert) => {
    const matchesStatus =
      filter === "all" ||
      (filter === "active" && alert.status === "active") ||
      (filter === "resolved" && alert.status === "resolved")

    const matchesSearch = alert.message.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  // Get paginated alerts
  const paginatedAlerts = filteredAlerts.slice(0, itemsPerPage)

  // Check if there are more alerts to load
  const hasMoreAlerts = itemsPerPage < filteredAlerts.length

  // Calculate stats
  const totalAlerts = allAlerts.length
  const activeAlerts = allAlerts.filter((alert) => alert.status === "active").length
  const resolvedAlerts = allAlerts.filter((alert) => alert.status === "resolved").length
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

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setItemsPerPage((prev) => prev + 5)
      setIsLoading(false)
    }, 800)
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
            <div className="space-y-4">
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
                    {paginatedAlerts.map((alert) => (
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
                                            <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                              {alert.endpoint}
                                            </code>
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
                                      <div className="mb-4">
                                        <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                                        <p className="text-sm">{alert.recommendation}</p>
                                      </div>
                                    )}
                                    {alert.resolution && (
                                      <div className="mb-4">
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

                                {/* Custom Data Section */}
                                {alert.data && (
                                  <div className="mt-4 pt-4 border-t">
                                    <h4 className="text-sm font-medium mb-2">Custom Data</h4>
                                    <div className="bg-muted rounded-md p-3 overflow-auto max-h-[300px]">
                                      <pre className="text-xs whitespace-pre-wrap">
                                        {JSON.stringify(alert.data, null, 2)}
                                      </pre>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Load More Button */}
              {hasMoreAlerts && (
                <div className="flex justify-center pt-2">
                  <Button variant="outline" onClick={handleLoadMore} disabled={isLoading} className="w-full max-w-xs">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Load More ({filteredAlerts.length - itemsPerPage} remaining)</>
                    )}
                  </Button>
                </div>
              )}

              {/* Showing count */}
              <div className="text-center text-sm text-muted-foreground">
                Showing {paginatedAlerts.length} of {filteredAlerts.length} alerts
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

