"use client"

import { useState } from "react"
import { Plus, X, AlertCircle, Info, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for existing rules
const existingRules = [
  {
    id: 1,
    name: "Critical API Errors to Slack",
    description: "Route all critical API errors to the #api-alerts Slack channel",
    environment: "production",
    active: true,
    conditions: [
      { field: "service", operator: "contains", value: "api" },
      { field: "level", operator: "equals", value: "critical" },
    ],
    channels: ["slack-api-alerts"],
  },
  {
    id: 2,
    name: "Database Warnings to Email",
    description: "Send database warnings to the DBA team",
    environment: "all",
    active: true,
    conditions: [
      { field: "service", operator: "contains", value: "database" },
      { field: "level", operator: "equals", value: "warn" },
    ],
    channels: ["email-dba-team"],
  },
  {
    id: 3,
    name: "Payment Processing Errors",
    description: "Route payment processing errors to both Slack and Discord",
    environment: "production",
    active: false,
    conditions: [
      { field: "service", operator: "equals", value: "payment-api" },
      { field: "level", operator: "in", value: ["error", "critical"] },
    ],
    channels: ["slack-payments", "discord-alerts"],
  },
]

// Sample data for available channels
const availableChannels = [
  { id: "slack-general", name: "#general", type: "slack", icon: "slack" },
  { id: "slack-api-alerts", name: "#api-alerts", type: "slack", icon: "slack" },
  { id: "slack-payments", name: "#payments", type: "slack", icon: "slack" },
  { id: "discord-alerts", name: "#alerts", type: "discord", icon: "discord" },
  { id: "discord-monitoring", name: "#monitoring", type: "discord", icon: "discord" },
  { id: "discord-dev", name: "#dev", type: "discord", icon: "discord" },
  { id: "telegram-alerts", name: "Alerts", type: "telegram", icon: "telegram" },
  { id: "telegram-monitoring", name: "Monitoring", type: "telegram", icon: "telegram" },
  { id: "email-dev-team", name: "Dev Team", type: "email", icon: "mail" },
  { id: "email-dba-team", name: "DBA Team", type: "email", icon: "mail" },
  { id: "pagerduty-primary", name: "Primary", type: "pagerduty", icon: "bell" },
]

// Channel types
const channelTypes = [
  { id: "slack", name: "Slack", icon: "slack" },
  { id: "discord", name: "Discord", icon: "discord" },
  { id: "telegram", name: "Telegram", icon: "telegram" },
  { id: "email", name: "Email", icon: "mail" },
  { id: "pagerduty", name: "PagerDuty", icon: "bell" },
]

// Sample data for environments
const environments = [
  { id: "all", name: "All Environments" },
  { id: "production", name: "Production" },
  { id: "staging", name: "Staging" },
  { id: "development", name: "Development" },
  { id: "testing", name: "Testing" },
]

// Add sample data for available services after the environments array
const availableServices = [
  { id: "api-gateway", name: "API Gateway" },
  { id: "payment-api", name: "Payment API" },
  { id: "auth-service", name: "Authentication Service" },
  { id: "user-service", name: "User Service" },
  { id: "notification-service", name: "Notification Service" },
  { id: "database", name: "Database" },
  { id: "storage", name: "Storage Service" },
  { id: "search", name: "Search Service" },
  { id: "analytics", name: "Analytics Service" },
]

// Sample data for log levels
const logLevels = [
  { id: "debug", name: "Debug", color: "bg-gray-100 text-gray-800" },
  { id: "info", name: "Info", color: "bg-blue-100 text-blue-800" },
  { id: "warn", name: "Warning", color: "bg-yellow-100 text-yellow-800" },
  { id: "error", name: "Error", color: "bg-red-100 text-red-800" },
  { id: "critical", name: "Critical", color: "bg-purple-100 text-purple-800" },
]

// Sample data for condition fields
const conditionFields = [
  { id: "message", name: "Message" },
  { id: "level", name: "Log Level" },
  { id: "service", name: "Service Name" },
  { id: "environment", name: "Environment" },
  { id: "errorCode", name: "Error Code" },
]

// Sample data for condition operators
const conditionOperators = [
  { id: "equals", name: "Equals" },
  { id: "contains", name: "Contains" },
  { id: "prefix", name: "Starts with" },
  { id: "suffix", name: "Ends with" },
  { id: "in", name: "Is one of" },
  { id: "not", name: "Does not equal" },
]

export default function AlertRulesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null)

  // Form state
  const [ruleName, setRuleName] = useState("")
  const [ruleDescription, setRuleDescription] = useState("")
  const [ruleEnvironment, setRuleEnvironment] = useState("all")
  const [ruleActive, setRuleActive] = useState(true)
  const [ruleConditions, setRuleConditions] = useState([{ id: 1, field: "message", operator: "contains", value: "" }])
  const [selectedLogLevels, setSelectedLogLevels] = useState<string[]>([])
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [selectedChannelTypes, setSelectedChannelTypes] = useState<string[]>([])
  const [activeChannelTab, setActiveChannelTab] = useState<string | null>(null)

  // Handle creating a new rule
  const handleCreateRule = () => {
    setRuleName("")
    setRuleDescription("")
    setRuleEnvironment("all")
    setRuleActive(true)
    setRuleConditions([{ id: 1, field: "message", operator: "contains", value: "" }])
    setSelectedLogLevels([])
    setSelectedChannels([])
    setSelectedChannelTypes([])
    setActiveChannelTab(null)
    setIsEditing(false)
    setEditingRuleId(null)
    setIsDialogOpen(true)
  }

  // Handle editing an existing rule
  const handleEditRule = (ruleId: number) => {
    const rule = existingRules.find((r) => r.id === ruleId)
    if (rule) {
      setRuleName(rule.name)
      setRuleDescription(rule.description || "")
      setRuleEnvironment(rule.environment)
      setRuleActive(rule.active)

      // Set conditions
      const logLevelCondition = rule.conditions.find((c) => c.field === "level")
      if (logLevelCondition && logLevelCondition.operator === "in" && Array.isArray(logLevelCondition.value)) {
        setSelectedLogLevels(logLevelCondition.value)
      } else if (logLevelCondition && logLevelCondition.operator === "equals") {
        setSelectedLogLevels([logLevelCondition.value as string])
      } else {
        setSelectedLogLevels([])
      }

      // Set other conditions
      const otherConditions = rule.conditions
        .filter((c) => c.field !== "level")
        .map((c, index) => ({
          id: index + 1,
          field: c.field,
          operator: c.operator,
          value: c.value as string,
        }))

      setRuleConditions(
        otherConditions.length > 0 ? otherConditions : [{ id: 1, field: "message", operator: "contains", value: "" }],
      )

      // Set channels and channel types
      setSelectedChannels(rule.channels)

      // Determine selected channel types from channels
      const types = new Set<string>()
      rule.channels.forEach((channelId) => {
        const channel = availableChannels.find((c) => c.id === channelId)
        if (channel) {
          types.add(channel.type)
        }
      })
      setSelectedChannelTypes(Array.from(types))
      setActiveChannelTab(types.size > 0 ? Array.from(types)[0] : null)

      setIsEditing(true)
      setEditingRuleId(ruleId)
      setIsDialogOpen(true)
    }
  }

  // Handle saving a rule
  const handleSaveRule = () => {
    // Here you would typically save the rule to your backend
    console.log("Saving rule:", {
      name: ruleName,
      description: ruleDescription,
      environment: ruleEnvironment,
      active: ruleActive,
      conditions: [
        ...ruleConditions,
        selectedLogLevels.length > 0
          ? {
              field: "level",
              operator: selectedLogLevels.length > 1 ? "in" : "equals",
              value: selectedLogLevels.length > 1 ? selectedLogLevels : selectedLogLevels[0],
            }
          : null,
      ].filter(Boolean),
      channels: selectedChannels,
    })

    // Reset form and close dialog
    setIsDialogOpen(false)
  }

  // Handle canceling rule creation/editing
  const handleCancelRule = () => {
    setIsDialogOpen(false)
  }

  // Handle adding a new condition
  const handleAddCondition = () => {
    const newId = Math.max(0, ...ruleConditions.map((c) => c.id)) + 1
    setRuleConditions([...ruleConditions, { id: newId, field: "message", operator: "contains", value: "" }])
  }

  // Handle removing a condition
  const handleRemoveCondition = (id: number) => {
    if (ruleConditions.length > 1) {
      setRuleConditions(ruleConditions.filter((c) => c.id !== id))
    }
  }

  // Handle updating a condition
  const handleUpdateCondition = (id: number, field: string, value: string) => {
    setRuleConditions(
      ruleConditions.map((c) => {
        if (c.id === id) {
          // If changing the field, reset the value and operator
          if (field === "field") {
            return {
              ...c,
              [field]: value,
              value: "",
              operator: value === "level" || value === "service" || value === "environment" ? "equals" : "contains",
            }
          }
          return { ...c, [field]: value }
        }
        return c
      }),
    )
  }

  // Handle log level selection
  const handleLogLevelChange = (level: string) => {
    setSelectedLogLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  // Handle channel type selection
  const handleChannelTypeChange = (type: string) => {
    setSelectedChannelTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))

    // If adding a new type, set it as active
    if (!selectedChannelTypes.includes(type)) {
      setActiveChannelTab(type)
    } else if (activeChannelTab === type) {
      // If removing the active type, set a new active tab if available
      const remainingTypes = selectedChannelTypes.filter((t) => t !== type)
      setActiveChannelTab(remainingTypes.length > 0 ? remainingTypes[0] : null)
    }

    // Remove channels of this type if we're deselecting the type
    if (selectedChannelTypes.includes(type)) {
      setSelectedChannels((prev) =>
        prev.filter((channelId) => {
          const channel = availableChannels.find((c) => c.id === channelId)
          return channel && channel.type !== type
        }),
      )
    }
  }

  // Handle channel selection
  const handleChannelChange = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId) ? prev.filter((c) => c !== channelId) : [...prev, channelId],
    )
  }

  // Get channel icon
  const getChannelIcon = (type: string) => {
    switch (type) {
      case "slack":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
          </svg>
        )
      case "discord":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        )
      case "telegram":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.81-.6 3.15-1.37 5.26-2.27 6.33-2.71 3.02-1.24 3.64-1.45 4.05-1.46.1 0 .32.02.46.19.12.14.15.33.17.47-.03.06-.03.12-.05.31z" />
          </svg>
        )
      case "email":
        return (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        )
      case "pagerduty":
        return (
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <path d="M18.63 13A17.89 17.89 0 0 1 18 8" />
            <path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14" />
            <path d="M18 8a6 6 0 0 0-9.33-5" />
            <path d="m1 1 22 22" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alert Rules</h1>
          <p className="text-muted-foreground">Configure how and when you receive alerts</p>
        </div>
        <Button onClick={handleCreateRule}>
          <Plus className="mr-2 h-4 w-4" /> Create New Rule
        </Button>
      </div>

      {existingRules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No alert rules found</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              Create your first alert rule to start routing alerts to the right channels.
            </p>
            <Button onClick={handleCreateRule}>
              <Plus className="mr-2 h-4 w-4" /> Create New Rule
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Environment</TableHead>
                  <TableHead className="hidden md:table-cell">Channels</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>
                      <Badge
                        variant={rule.active ? "default" : "outline"}
                        className={rule.active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {rule.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{rule.name}</div>
                      {rule.description && (
                        <div className="text-sm text-muted-foreground hidden md:block">{rule.description}</div>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">
                        {environments.find((e) => e.id === rule.environment)?.name || rule.environment}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {rule.channels.map((channelId) => {
                          const channel = availableChannels.find((c) => c.id === channelId)
                          return channel ? (
                            <div
                              key={channelId}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                            >
                              {getChannelIcon(channel.type)}
                              <span className="ml-1">{channel.type}</span>
                            </div>
                          ) : null
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditRule(rule.id)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem>{rule.active ? "Disable" : "Enable"}</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Rule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Alert Rule" : "Create Alert Rule"}</DialogTitle>
            <DialogDescription>Define how alerts should be routed based on their properties.</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-2">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rule-name">
                    Rule Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="rule-name"
                    placeholder="E.g., Critical API Errors to Slack"
                    value={ruleName}
                    onChange={(e) => setRuleName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rule-description">Description (Optional)</Label>
                  <Textarea
                    id="rule-description"
                    placeholder="Describe what this rule does"
                    value={ruleDescription}
                    onChange={(e) => setRuleDescription(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rule-environment">Environment</Label>
                    <Select value={ruleEnvironment} onValueChange={setRuleEnvironment}>
                      <SelectTrigger id="rule-environment">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {environments.map((env) => (
                            <SelectItem key={env.id} value={env.id}>
                              {env.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="rule-active" checked={ruleActive} onCheckedChange={setRuleActive} />
                      <Label htmlFor="rule-active" className="cursor-pointer">
                        {ruleActive ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Conditions</span>
                </div>
              </div>

              {/* Conditions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Match Conditions</h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="match-all" className="text-sm cursor-pointer">
                      Match all conditions
                    </Label>
                    <RadioGroup defaultValue="all" className="flex">
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="all" id="match-all" />
                        <Label htmlFor="match-all" className="text-sm cursor-pointer">
                          All
                        </Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="any" id="match-any" />
                        <Label htmlFor="match-any" className="text-sm cursor-pointer">
                          Any
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Condition Builder */}
                <div className="space-y-3">
                  {ruleConditions.map((condition) => (
                    <div key={condition.id} className="flex items-center gap-2">
                      <Select
                        value={condition.field}
                        onValueChange={(value) => handleUpdateCondition(condition.id, "field", value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditionFields.map((field) => (
                            <SelectItem key={field.id} value={field.id}>
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {condition.field === "level" ? (
                        <Select
                          value={condition.value as string}
                          onValueChange={(value) => handleUpdateCondition(condition.id, "value", value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select log level" />
                          </SelectTrigger>
                          <SelectContent>
                            {logLevels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>
                                <div className="flex items-center">
                                  <div
                                    className={`w-2 h-2 rounded-full mr-2 ${level.color.replace("text-", "bg-")}`}
                                  ></div>
                                  {level.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : condition.field === "service" ? (
                        <Select
                          value={condition.value as string}
                          onValueChange={(value) => handleUpdateCondition(condition.id, "value", value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableServices.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : condition.field === "environment" ? (
                        <Select
                          value={condition.value as string}
                          onValueChange={(value) => handleUpdateCondition(condition.id, "value", value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select environment" />
                          </SelectTrigger>
                          <SelectContent>
                            {environments.map((env) => (
                              <SelectItem key={env.id} value={env.id}>
                                {env.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <>
                          <Select
                            value={condition.operator}
                            onValueChange={(value) => handleUpdateCondition(condition.id, "operator", value)}
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              {conditionOperators.map((op) => (
                                <SelectItem key={op.id} value={op.id}>
                                  {op.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            placeholder="Value"
                            className="flex-1"
                            value={condition.value as string}
                            onChange={(e) => handleUpdateCondition(condition.id, "value", e.target.value)}
                          />
                        </>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCondition(condition.id)}
                        disabled={ruleConditions.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button variant="outline" size="sm" onClick={handleAddCondition}>
                    <Plus className="mr-2 h-4 w-4" /> Add Condition
                  </Button>
                </div>

                {/* Log Levels */}
                <div className="space-y-2">
                  <Label>Log Levels</Label>
                  <div className="flex flex-wrap gap-2">
                    {logLevels.map((level) => (
                      <div
                        key={level.id}
                        className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors cursor-pointer ${
                          selectedLogLevels.includes(level.id) ? level.color : "bg-muted text-muted-foreground"
                        }`}
                        onClick={() => handleLogLevelChange(level.id)}
                      >
                        {level.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select one or more log levels to match. Leave empty to match all levels.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Notification Channels</span>
                </div>
              </div>

              {/* Channel Types */}
              <div className="space-y-4">
                <div>
                  <Label className="text-lg font-medium">Select Channel Types</Label>
                  <div className="grid gap-2 grid-cols-2 md:grid-cols-5 mt-2">
                    {channelTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors ${
                          selectedChannelTypes.includes(type.id) ? "bg-primary/5 border-primary/50" : "hover:bg-muted"
                        }`}
                        onClick={() => handleChannelTypeChange(type.id)}
                      >
                        <Checkbox
                          id={`type-${type.id}`}
                          checked={selectedChannelTypes.includes(type.id)}
                          onCheckedChange={() => handleChannelTypeChange(type.id)}
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          {getChannelIcon(type.id)}
                          <Label htmlFor={`type-${type.id}`} className="cursor-pointer flex-1 text-sm">
                            {type.name}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Channel Selection */}
                {selectedChannelTypes.length > 0 && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Select Channels</Label>

                    <Tabs value={activeChannelTab || ""} onValueChange={setActiveChannelTab}>
                      <TabsList className="mb-4">
                        {selectedChannelTypes.map((type) => (
                          <TabsTrigger key={type} value={type} className="flex items-center gap-1">
                            {getChannelIcon(type)}
                            <span>{channelTypes.find((t) => t.id === type)?.name}</span>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {selectedChannelTypes.map((type) => (
                        <TabsContent key={type} value={type} className="space-y-4">
                          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                            {availableChannels
                              .filter((channel) => channel.type === type)
                              .map((channel) => (
                                <div
                                  key={channel.id}
                                  className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors ${
                                    selectedChannels.includes(channel.id)
                                      ? "bg-primary/5 border-primary/50"
                                      : "hover:bg-muted"
                                  }`}
                                  onClick={() => handleChannelChange(channel.id)}
                                >
                                  <Checkbox
                                    id={`channel-${channel.id}`}
                                    checked={selectedChannels.includes(channel.id)}
                                    onCheckedChange={() => handleChannelChange(channel.id)}
                                  />
                                  <div className="flex items-center space-x-2 flex-1">
                                    {getChannelIcon(channel.type)}
                                    <Label htmlFor={`channel-${channel.id}`} className="cursor-pointer flex-1 text-sm">
                                      {channel.name}
                                    </Label>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}

                {selectedChannels.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Selected Channels:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedChannels.map((channelId) => {
                        const channel = availableChannels.find((c) => c.id === channelId)
                        if (!channel) return null

                        return (
                          <Badge key={channelId} variant="secondary" className="flex items-center gap-1 pl-2 pr-1 py-1">
                            {getChannelIcon(channel.type)}
                            <span>{channel.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 ml-1 hover:bg-muted-foreground/20"
                              onClick={() => handleChannelChange(channelId)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selectedChannelTypes.length === 0 && (
                  <div className="flex items-center p-2 rounded-md bg-muted/50">
                    <Info className="h-4 w-4 text-muted-foreground mr-2" />
                    <p className="text-sm text-muted-foreground">Select at least one channel type to send alerts to.</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleCancelRule}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              {isEditing && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Alert Rule</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this alert rule? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <Button onClick={handleSaveRule} disabled={!ruleName || selectedChannels.length === 0}>
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update Rule" : "Create Rule"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

