"use client"

import { useState } from "react"
import { AlertTriangle, ArrowUpDown, Check, Filter, MoreHorizontal, Search, X } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mock data for alerts
const mockAlerts = [
  {
    id: "1",
    title: "Database connection failed",
    service: "Payment Service",
    severity: "Critical",
    time: "5 minutes ago",
    status: "Active",
    description: "The database connection has failed due to network issues. This is affecting payment processing.",
  },
  {
    id: "2",
    title: "API response time exceeded threshold",
    service: "API Gateway",
    severity: "Warning",
    time: "15 minutes ago",
    status: "Active",
    description: "API response time has exceeded the 2-second threshold. This may affect user experience.",
  },
  {
    id: "3",
    title: "Memory usage above 90%",
    service: "User Service",
    severity: "Error",
    time: "30 minutes ago",
    status: "Resolved",
    description: "Memory usage on the user service has exceeded 90%. This may cause service degradation.",
  },
  {
    id: "4",
    title: "New user registration spike",
    service: "Auth Service",
    severity: "Info",
    time: "1 hour ago",
    status: "Resolved",
    description:
      "There has been a sudden increase in new user registrations. This is not an issue but worth monitoring.",
  },
  {
    id: "5",
    title: "Failed login attempts exceeded",
    service: "Auth Service",
    severity: "Error",
    time: "2 hours ago",
    status: "Active",
    description: "Multiple failed login attempts detected from the same IP address. Possible security breach.",
  },
  {
    id: "6",
    title: "CPU usage above 80%",
    service: "Recommendation Engine",
    severity: "Warning",
    time: "3 hours ago",
    status: "Active",
    description: "CPU usage on the recommendation engine has exceeded 80%. Performance may be affected.",
  },
  {
    id: "7",
    title: "Payment gateway timeout",
    service: "Payment Service",
    severity: "Critical",
    time: "4 hours ago",
    status: "Resolved",
    description: "The payment gateway is timing out. Users are unable to complete purchases.",
  },
  {
    id: "8",
    title: "Disk space running low",
    service: "Storage Service",
    severity: "Warning",
    time: "5 hours ago",
    status: "Active",
    description: "Disk space is running low on the storage service. Only 15% space remaining.",
  },
  {
    id: "9",
    title: "SSL certificate expiring soon",
    service: "API Gateway",
    severity: "Info",
    time: "6 hours ago",
    status: "Active",
    description: "The SSL certificate will expire in 7 days. Please renew it to avoid service disruption.",
  },
  {
    id: "10",
    title: "Database backup failed",
    service: "Backup Service",
    severity: "Error",
    time: "7 hours ago",
    status: "Active",
    description: "The scheduled database backup has failed. Data integrity may be at risk.",
  },
]

const services = [
  "All Services",
  "Payment Service",
  "API Gateway",
  "User Service",
  "Auth Service",
  "Recommendation Engine",
  "Storage Service",
  "Backup Service",
]

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities")
  const [selectedService, setSelectedService] = useState("All Services")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [currentAlert, setCurrentAlert] = useState<any>(null)
  const [showBulkActionDialog, setShowBulkActionDialog] = useState(false)
  const [bulkActionNote, setBulkActionNote] = useState("")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredAlerts = mockAlerts
    .filter((alert) => {
      const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSeverity = selectedSeverity === "All Severities" || alert.severity === selectedSeverity
      const matchesService = selectedService === "All Services" || alert.service === selectedService
      const matchesStatus = selectedStatus === "All Status" || alert.status === selectedStatus

      return matchesSearch && matchesSeverity && matchesService && matchesStatus
    })
    .sort((a, b) => {
      if (!sortField) return 0

      let valueA, valueB

      switch (sortField) {
        case "title":
          valueA = a.title
          valueB = b.title
          break
        case "service":
          valueA = a.service
          valueB = b.service
          break
        case "severity":
          valueA = a.severity
          valueB = b.severity
          break
        case "time":
          // For simplicity, we're just comparing the strings
          valueA = a.time
          valueB = b.time
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        default:
          return 0
      }

      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1
      }
      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1
      }
      return 0
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlerts(filteredAlerts.map((alert) => alert.id))
    } else {
      setSelectedAlerts([])
    }
  }

  const handleSelectAlert = (alertId: string, checked: boolean) => {
    if (checked) {
      setSelectedAlerts([...selectedAlerts, alertId])
    } else {
      setSelectedAlerts(selectedAlerts.filter((id) => id !== alertId))
    }
  }

  const handleViewDetails = (alert: any) => {
    setCurrentAlert(alert)
    setShowDetailDialog(true)
  }

  const handleBulkResolve = () => {
    setShowBulkActionDialog(true)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Alerts"
        description="View and manage all system alerts"
        action={{
          label: "Create Alert",
          onClick: () => console.log("Create alert clicked"),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Severities">All Severities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Error">Error</SelectItem>
                    <SelectItem value="Warning">Warning</SelectItem>
                    <SelectItem value="Info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[150px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedAlerts.length > 0 && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-md">
                <span className="text-sm font-medium">{selectedAlerts.length} alerts selected</span>
                <Button variant="outline" size="sm" onClick={handleBulkResolve} className="ml-auto">
                  <Check className="mr-2 h-4 w-4" />
                  Resolve Selected
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedAlerts([])}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Selection
                </Button>
              </div>
            )}

            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left">
                        <Checkbox
                          checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all alerts"
                        />
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center">
                          Alert
                          {sortField === "title" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                        onClick={() => handleSort("service")}
                      >
                        <div className="flex items-center">
                          Service
                          {sortField === "service" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                        onClick={() => handleSort("severity")}
                      >
                        <div className="flex items-center">
                          Severity
                          {sortField === "severity" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                        onClick={() => handleSort("time")}
                      >
                        <div className="flex items-center">
                          Time
                          {sortField === "time" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </th>
                      <th
                        className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center">
                          Status
                          {sortField === "status" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.length > 0 ? (
                      filteredAlerts.map((alert) => (
                        <tr key={alert.id} className="border-b">
                          <td className="px-4 py-3">
                            <Checkbox
                              checked={selectedAlerts.includes(alert.id)}
                              onCheckedChange={(checked) => handleSelectAlert(alert.id, !!checked)}
                              aria-label={`Select alert ${alert.title}`}
                            />
                          </td>
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
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDetails(alert)}>
                                View
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => console.log("Resolve alert", alert.id)}>
                                    Resolve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => console.log("Snooze alert", alert.id)}>
                                    Snooze
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => console.log("Assign alert", alert.id)}>
                                    Assign
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
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

      {/* Alert Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle
                className={`h-5 w-5 ${currentAlert?.severity === "Critical" ? "text-red-500" : currentAlert?.severity === "Error" ? "text-orange-500" : currentAlert?.severity === "Warning" ? "text-yellow-500" : "text-blue-500"}`}
              />
              {currentAlert?.title}
            </DialogTitle>
            <DialogDescription>Alert details and actions</DialogDescription>
          </DialogHeader>

          {currentAlert && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Service</Label>
                  <p className="text-sm font-medium">{currentAlert.service}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Severity</Label>
                  <p className="text-sm font-medium">
                    <Badge className={getSeverityColor(currentAlert.severity)}>{currentAlert.severity}</Badge>
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Time</Label>
                  <p className="text-sm font-medium">{currentAlert.time}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <p className="text-sm font-medium">
                    <Badge variant="outline" className={getStatusColor(currentAlert.status)}>
                      {currentAlert.status}
                    </Badge>
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <p className="text-sm mt-1">{currentAlert.description}</p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
              Close
            </Button>
            {currentAlert?.status === "Active" && (
              <Button onClick={() => console.log("Resolve alert", currentAlert?.id)}>
                <Check className="mr-2 h-4 w-4" />
                Resolve Alert
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Action Dialog */}
      <Dialog open={showBulkActionDialog} onOpenChange={setShowBulkActionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Resolve Selected Alerts</DialogTitle>
            <DialogDescription>
              You are about to resolve {selectedAlerts.length} alerts. Add an optional note about the resolution.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="resolution-note">Resolution Note (Optional)</Label>
              <Textarea
                id="resolution-note"
                placeholder="Enter details about how these alerts were resolved..."
                value={bulkActionNote}
                onChange={(e) => setBulkActionNote(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBulkActionDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                console.log("Resolving alerts", selectedAlerts, "with note:", bulkActionNote)
                setShowBulkActionDialog(false)
                setSelectedAlerts([])
                setBulkActionNote("")
              }}
            >
              Resolve Alerts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

