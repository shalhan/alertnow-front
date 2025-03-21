"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Edit, Plus, Server, Trash, Type } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for alert rules
const mockRules = [
  {
    id: "rule-1",
    name: "Database Down Alert",
    description: "Notify when database connection fails",
    type: "keyword",
    condition: {
      keyword: "Database Down",
      caseSensitive: false,
      minSeverity: "Warning",
      service: "",
      timeUnresolved: 30,
    },
    actions: ["slack", "email"],
    severity: "Critical",
    enabled: true,
    createdAt: "2 weeks ago",
  },
  {
    id: "rule-2",
    name: "High API Latency",
    description: "Alert when API response time exceeds threshold",
    type: "severity",
    condition: {
      minSeverity: "Warning",
    },
    actions: ["slack"],
    severity: "Warning",
    enabled: true,
    createdAt: "1 week ago",
  },
  {
    id: "rule-3",
    name: "Payment Service Alerts",
    description: "Route all payment service alerts to finance team",
    type: "service",
    condition: {
      service: "Payment Service",
    },
    actions: ["email"],
    severity: "Error",
    enabled: true,
    createdAt: "5 days ago",
  },
  {
    id: "rule-4",
    name: "Escalation Rule",
    description: "Escalate unresolved critical alerts after 30 minutes",
    type: "escalation",
    condition: {
      timeUnresolved: 30,
      minSeverity: "Critical",
    },
    actions: ["slack", "email"],
    severity: "Critical",
    enabled: false,
    createdAt: "2 days ago",
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

export default function AlertRulesPage() {
  const [rules, setRules] = useState(mockRules)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingRule, setEditingRule] = useState<any>(null)
  const [ruleType, setRuleType] = useState("keyword")
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    type: "keyword",
    condition: {
      keyword: "",
      caseSensitive: false,
      minSeverity: "Warning",
      service: "",
      timeUnresolved: 30,
    },
    actions: [] as string[],
    severity: "Warning",
    enabled: true,
  })

  const handleToggleRule = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  const handleEditRule = (rule: any) => {
    setEditingRule(rule)
    setRuleType(rule.type)
    setNewRule({
      name: rule.name,
      description: rule.description,
      type: rule.type,
      condition: { ...rule.condition },
      actions: [...rule.actions],
      severity: rule.severity,
      enabled: rule.enabled,
    })
    setShowAddDialog(true)
  }

  const handleAddRule = () => {
    if (editingRule) {
      setRules(
        rules.map((rule) =>
          rule.id === editingRule.id
            ? {
                ...rule,
                name: newRule.name,
                description: newRule.description,
                type: newRule.type,
                condition: { ...newRule.condition },
                actions: [...newRule.actions],
                severity: newRule.severity,
                enabled: newRule.enabled,
              }
            : rule,
        ),
      )
    } else {
      const id = `rule-${Date.now()}`
      setRules([
        ...rules,
        {
          id,
          name: newRule.name,
          description: newRule.description,
          type: newRule.type,
          condition: { ...newRule.condition },
          actions: [...newRule.actions],
          severity: newRule.severity,
          enabled: newRule.enabled,
          createdAt: "Just now",
        },
      ])
    }

    setShowAddDialog(false)
    setEditingRule(null)
    setNewRule({
      name: "",
      description: "",
      type: "keyword",
      condition: {
        keyword: "",
        caseSensitive: false,
        minSeverity: "Warning",
        service: "",
        timeUnresolved: 30,
      },
      actions: [],
      severity: "Warning",
      enabled: true,
    })
  }

  const handleActionToggle = (action: string) => {
    if (newRule.actions.includes(action)) {
      setNewRule({
        ...newRule,
        actions: newRule.actions.filter((a) => a !== action),
      })
    } else {
      setNewRule({
        ...newRule,
        actions: [...newRule.actions, action],
      })
    }
  }

  const getRuleIcon = (type: string) => {
    switch (type) {
      case "keyword":
        return <Type className="h-5 w-5" />
      case "severity":
        return <AlertTriangle className="h-5 w-5" />
      case "service":
        return <Server className="h-5 w-5" />
      case "escalation":
        return <Clock className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Alert Rules & Automations"
        description="Configure how alerts are processed and routed"
        action={{
          label: "Add Rule",
          onClick: () => {
            setEditingRule(null)
            setRuleType("keyword")
            setNewRule({
              name: "",
              description: "",
              type: "keyword",
              condition: {
                keyword: "",
                caseSensitive: false,
                minSeverity: "Warning",
                service: "",
                timeUnresolved: 30,
              },
              actions: [],
              severity: "Warning",
              enabled: true,
            })
            setShowAddDialog(true)
          },
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {rules.length > 0 ? (
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex flex-col rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          {getRuleIcon(rule.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{rule.name}</h3>
                            <Badge className={getSeverityColor(rule.severity)}>{rule.severity}</Badge>
                            {!rule.enabled && <Badge variant="outline">Disabled</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={rule.enabled} onCheckedChange={() => handleToggleRule(rule.id)} />
                        <Button variant="ghost" size="icon" onClick={() => handleEditRule(rule)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteRule(rule.id)}>
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-md bg-muted p-3">
                        <h4 className="text-sm font-medium mb-2">Condition</h4>
                        {rule.type === "keyword" && (
                          <p className="text-sm">
                            <span className="font-medium">If alert contains:</span> "{rule.condition.keyword}"
                            {rule.condition.caseSensitive && " (case sensitive)"}
                          </p>
                        )}
                        {rule.type === "severity" && (
                          <p className="text-sm">
                            <span className="font-medium">If severity is at least:</span> {rule.condition.minSeverity}
                          </p>
                        )}
                        {rule.type === "service" && (
                          <p className="text-sm">
                            <span className="font-medium">If service is:</span> {rule.condition.service}
                          </p>
                        )}
                        {rule.type === "escalation" && (
                          <p className="text-sm">
                            <span className="font-medium">If unresolved for:</span> {rule.condition.timeUnresolved}{" "}
                            minutes and severity is at least {rule.condition.minSeverity}
                          </p>
                        )}
                      </div>

                      <div className="rounded-md bg-muted p-3">
                        <h4 className="text-sm font-medium mb-2">Actions</h4>
                        <div className="flex flex-wrap gap-2">
                          {rule.actions.map((action) => (
                            <Badge key={action} variant="secondary">
                              {action === "slack" && "Send to Slack"}
                              {action === "email" && "Send Email"}
                              {action === "discord" && "Send to Discord"}
                              {action === "webhook" && "Trigger Webhook"}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">Created {rule.createdAt}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No rules yet</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Add your first rule to start automating alert processing.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setEditingRule(null)
                    setShowAddDialog(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Rule
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Rule Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingRule ? "Edit Rule" : "Add Rule"}</DialogTitle>
            <DialogDescription>
              {editingRule
                ? "Modify how this rule processes and routes alerts."
                : "Create a new rule to automate alert processing."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                placeholder="Database Down Alert"
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-description">Description</Label>
              <Input
                id="rule-description"
                placeholder="Notify when database connection fails"
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Rule Type</Label>
              <Tabs
                value={ruleType}
                onValueChange={(value) => {
                  setRuleType(value)
                  setNewRule({ ...newRule, type: value })
                }}
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="keyword">Keyword</TabsTrigger>
                  <TabsTrigger value="severity">Severity</TabsTrigger>
                  <TabsTrigger value="service">Service</TabsTrigger>
                  <TabsTrigger value="escalation">Escalation</TabsTrigger>
                </TabsList>

                <TabsContent value="keyword" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="keyword">If alert contains</Label>
                    <Input
                      id="keyword"
                      placeholder="Database Down"
                      value={newRule.condition.keyword || ""}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, keyword: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="case-sensitive"
                      checked={newRule.condition.caseSensitive || false}
                      onCheckedChange={(checked) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, caseSensitive: checked },
                        })
                      }
                    />
                    <Label htmlFor="case-sensitive">Case sensitive</Label>
                  </div>
                </TabsContent>

                <TabsContent value="severity" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-severity">If severity is at least</Label>
                    <Select
                      value={newRule.condition.minSeverity || "Warning"}
                      onValueChange={(value) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, minSeverity: value },
                        })
                      }
                    >
                      <SelectTrigger id="min-severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Info">Info</SelectItem>
                        <SelectItem value="Warning">Warning</SelectItem>
                        <SelectItem value="Error">Error</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="service" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">If service is</Label>
                    <Select
                      value={newRule.condition.service || ""}
                      onValueChange={(value) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, service: value },
                        })
                      }
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services
                          .filter((s) => s !== "All Services")
                          .map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="escalation" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="time-unresolved">If unresolved for (minutes)</Label>
                    <Input
                      id="time-unresolved"
                      type="number"
                      min="1"
                      placeholder="30"
                      value={newRule.condition.timeUnresolved || 30}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, timeUnresolved: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="escalation-severity">And severity is at least</Label>
                    <Select
                      value={newRule.condition.minSeverity || "Warning"}
                      onValueChange={(value) =>
                        setNewRule({
                          ...newRule,
                          condition: { ...newRule.condition, minSeverity: value },
                        })
                      }
                    >
                      <SelectTrigger id="escalation-severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Info">Info</SelectItem>
                        <SelectItem value="Warning">Warning</SelectItem>
                        <SelectItem value="Error">Error</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="action-slack"
                    checked={newRule.actions.includes("slack")}
                    onCheckedChange={() => handleActionToggle("slack")}
                  />
                  <Label htmlFor="action-slack">Send to Slack</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="action-email"
                    checked={newRule.actions.includes("email")}
                    onCheckedChange={() => handleActionToggle("email")}
                  />
                  <Label htmlFor="action-email">Send Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="action-discord"
                    checked={newRule.actions.includes("discord")}
                    onCheckedChange={() => handleActionToggle("discord")}
                  />
                  <Label htmlFor="action-discord">Send to Discord</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="action-webhook"
                    checked={newRule.actions.includes("webhook")}
                    onCheckedChange={() => handleActionToggle("webhook")}
                  />
                  <Label htmlFor="action-webhook">Trigger Webhook</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-severity">Alert Severity</Label>
              <Select value={newRule.severity} onValueChange={(value) => setNewRule({ ...newRule, severity: value })}>
                <SelectTrigger id="rule-severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Info">Info</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                  <SelectItem value="Error">Error</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="rule-enabled"
                checked={newRule.enabled}
                onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
              />
              <Label htmlFor="rule-enabled">Enable rule</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddRule}
              disabled={
                !newRule.name ||
                newRule.actions.length === 0 ||
                (ruleType === "keyword" && !newRule.condition.keyword) ||
                (ruleType === "service" && !newRule.condition.service)
              }
            >
              {editingRule ? "Save Changes" : "Add Rule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

