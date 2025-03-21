"use client"

import { useState } from "react"
import { Check, Link2, Mail, MessageSquare, Plus, Trash, Webhook } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock data for integrations
const mockIntegrations = [
  {
    id: "slack-1",
    type: "slack",
    name: "Engineering Team",
    webhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    enabled: true,
    createdAt: "2 weeks ago",
  },
  {
    id: "discord-1",
    type: "discord",
    name: "Alerts Channel",
    webhook: "https://discord.com/api/webhooks/000000000000000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    enabled: true,
    createdAt: "1 week ago",
  },
  {
    id: "email-1",
    type: "email",
    name: "On-Call Team",
    recipients: ["oncall@example.com", "alerts@example.com"],
    enabled: true,
    createdAt: "3 days ago",
  },
  {
    id: "webhook-1",
    type: "webhook",
    name: "Custom API",
    url: "https://api.example.com/alerts",
    enabled: false,
    createdAt: "1 day ago",
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(mockIntegrations)
  const [activeTab, setActiveTab] = useState("slack")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newIntegration, setNewIntegration] = useState({
    name: "",
    webhook: "",
    recipients: "",
    url: "",
  })

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration,
      ),
    )
  }

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((integration) => integration.id !== id))
  }

  const handleAddIntegration = () => {
    const id = `${activeTab}-${Date.now()}`
    const newItem = {
      id,
      type: activeTab,
      name: newIntegration.name,
      enabled: true,
      createdAt: "Just now",
    } as any

    if (activeTab === "slack" || activeTab === "discord") {
      newItem.webhook = newIntegration.webhook
    } else if (activeTab === "email") {
      newItem.recipients = newIntegration.recipients.split(",").map((email) => email.trim())
    } else if (activeTab === "webhook") {
      newItem.url = newIntegration.url
    }

    setIntegrations([...integrations, newItem])
    setNewIntegration({
      name: "",
      webhook: "",
      recipients: "",
      url: "",
    })
    setShowAddDialog(false)
  }

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "slack":
        return <MessageSquare className="h-5 w-5" />
      case "discord":
        return <MessageSquare className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "webhook":
        return <Webhook className="h-5 w-5" />
      default:
        return <Link2 className="h-5 w-5" />
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Integrations"
        description="Connect alert channels to your monitoring system"
        action={{
          label: "Add Integration",
          onClick: () => setShowAddDialog(true),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {integrations.length > 0 ? (
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {getIntegrationIcon(integration.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{integration.name}</h3>
                          <Badge variant={integration.enabled ? "default" : "outline"}>
                            {integration.enabled ? "Active" : "Disabled"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {integration.type === "slack" || integration.type === "discord"
                            ? `Webhook: ${integration.webhook.substring(0, 30)}...`
                            : integration.type === "email"
                              ? `Recipients: ${integration.recipients.join(", ")}`
                              : `URL: ${integration.url}`}
                        </p>
                        <p className="text-xs text-muted-foreground">Added {integration.createdAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => handleToggleIntegration(integration.id)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteIntegration(integration.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Link2 className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No integrations yet</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Add your first integration to start receiving alerts.
                </p>
                <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Integration
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Integration Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Integration</DialogTitle>
            <DialogDescription>Connect a new alert channel to your monitoring system.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="slack">Slack</TabsTrigger>
              <TabsTrigger value="discord">Discord</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="webhook">Webhook</TabsTrigger>
            </TabsList>

            <TabsContent value="slack" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="slack-name">Integration Name</Label>
                <Input
                  id="slack-name"
                  placeholder="Engineering Team"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slack-webhook">Webhook URL</Label>
                <Input
                  id="slack-webhook"
                  placeholder="https://hooks.slack.com/services/..."
                  value={newIntegration.webhook}
                  onChange={(e) => setNewIntegration({ ...newIntegration, webhook: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  You can find this URL in your Slack workspace settings under Integrations.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="discord" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discord-name">Integration Name</Label>
                <Input
                  id="discord-name"
                  placeholder="Alerts Channel"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discord-webhook">Webhook URL</Label>
                <Input
                  id="discord-webhook"
                  placeholder="https://discord.com/api/webhooks/..."
                  value={newIntegration.webhook}
                  onChange={(e) => setNewIntegration({ ...newIntegration, webhook: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  You can create a webhook in your Discord server settings under Integrations.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email-name">Integration Name</Label>
                <Input
                  id="email-name"
                  placeholder="On-Call Team"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-recipients">Recipients</Label>
                <Input
                  id="email-recipients"
                  placeholder="email1@example.com, email2@example.com"
                  value={newIntegration.recipients}
                  onChange={(e) => setNewIntegration({ ...newIntegration, recipients: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">Separate multiple email addresses with commas.</p>
              </div>
            </TabsContent>

            <TabsContent value="webhook" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-name">Integration Name</Label>
                <Input
                  id="webhook-name"
                  placeholder="Custom API"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="https://api.example.com/alerts"
                  value={newIntegration.url}
                  onChange={(e) => setNewIntegration({ ...newIntegration, url: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  We will send a POST request with the alert data to this URL.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddIntegration}
              disabled={
                !newIntegration.name ||
                ((activeTab === "slack" || activeTab === "discord") && !newIntegration.webhook) ||
                (activeTab === "email" && !newIntegration.recipients) ||
                (activeTab === "webhook" && !newIntegration.url)
              }
            >
              <Check className="mr-2 h-4 w-4" />
              Add Integration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

