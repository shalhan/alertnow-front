"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, AlertCircle, MessageSquare, Loader2, Check, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"

// Sample data for existing channels
const sampleChannels = [
  {
    id: "discord-alerts",
    name: "Discord Alerts",
    type: "discord",
    config: {
      webhookUrl: "https://discord.com/api/webhooks/123456789/abcdefghijklmnopqrstuvwxyz",
    },
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "slack-general",
    name: "Slack General",
    type: "slack",
    config: {
      webhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    },
    createdAt: "2023-06-14T08:45:00Z",
  },
  {
    id: "telegram-monitoring",
    name: "Telegram Monitoring",
    type: "telegram",
    config: {
      chatId: "-1001234567890",
      token: "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    createdAt: "2023-06-13T14:20:00Z",
  },
]

// Sample Telegram chat data
const sampleTelegramChats = [
  { id: "-1001234567890", title: "AlertNow Monitoring", type: "supergroup" },
  { id: "-987654321", title: "Dev Team", type: "group" },
  { id: "123456789", title: "John Doe", type: "private" },
]

export default function ChannelsPage() {
  const [channels, setChannels] = useState(sampleChannels)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)

  // Form state
  const [channelType, setChannelType] = useState<"discord" | "telegram" | "slack">("discord")
  const [channelName, setChannelName] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [telegramToken, setTelegramToken] = useState("")
  const [selectedChatId, setSelectedChatId] = useState("")

  // Telegram API state
  const [isFetchingChats, setIsFetchingChats] = useState(false)
  const [telegramChats, setTelegramChats] = useState<typeof sampleTelegramChats>([])
  const [telegramError, setTelegramError] = useState<string | null>(null)

  // Copy state
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Reset form
  const resetForm = () => {
    setChannelType("discord")
    setChannelName("")
    setWebhookUrl("")
    setTelegramToken("")
    setSelectedChatId("")
    setTelegramChats([])
    setTelegramError(null)
    setIsEditMode(false)
    setSelectedChannelId(null)
  }

  // Handle opening add dialog
  const handleAddChannel = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  // Handle editing a channel
  const handleEditChannel = (channelId: string) => {
    const channel = channels.find((c) => c.id === channelId)
    if (channel) {
      setChannelType(channel.type as "discord" | "telegram" | "slack")
      setChannelName(channel.name)

      if (channel.type === "discord" || channel.type === "slack") {
        setWebhookUrl(channel.config.webhookUrl!)
      } else if (channel.type === "telegram") {
        setTelegramToken(channel.config.token!)
        setSelectedChatId(channel.config.chatId!)
      }

      setIsEditMode(true)
      setSelectedChannelId(channelId)
      setIsAddDialogOpen(true)
    }
  }

  // Handle deleting a channel
  const handleDeleteChannel = (channelId: string) => {
    setSelectedChannelId(channelId)
    setIsDeleteDialogOpen(true)
  }

  // Confirm delete channel
  const confirmDeleteChannel = () => {
    if (selectedChannelId) {
      setChannels(channels.filter((c) => c.id !== selectedChannelId))
      setIsDeleteDialogOpen(false)
      setSelectedChannelId(null)

      toast({
        title: "Channel deleted",
        description: "The channel has been successfully deleted.",
      })
    }
  }

  // Handle saving a channel
  const handleSaveChannel = () => {
    // Validate form
    if (!channelName.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a channel name.",
        variant: "destructive",
      })
      return
    }

    if (channelType === "discord" || channelType === "slack") {
      if (!webhookUrl.trim()) {
        toast({
          title: "Validation error",
          description: `Please enter a valid ${channelType === "discord" ? "Discord" : "Slack"} webhook URL.`,
          variant: "destructive",
        })
        return
      }
    } else if (channelType === "telegram") {
      if (!telegramToken.trim()) {
        toast({
          title: "Validation error",
          description: "Please enter a Telegram bot token.",
          variant: "destructive",
        })
        return
      }

      if (!selectedChatId) {
        toast({
          title: "Validation error",
          description: "Please select a Telegram chat.",
          variant: "destructive",
        })
        return
      }
    }

    // Create new channel object
    const newChannel = {
      id: isEditMode && selectedChannelId ? selectedChannelId : `${channelType}-${Date.now()}`,
      name: channelName,
      type: channelType,
      config: channelType === "telegram" ? { chatId: selectedChatId, token: telegramToken } : { webhookUrl },
      createdAt: isEditMode
        ? channels.find((c) => c.id === selectedChannelId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
    }

    // Update channels list
    if (isEditMode && selectedChannelId) {
      setChannels(channels.map((c) => (c.id === selectedChannelId ? newChannel : c) as any))
      toast({
        title: "Channel updated",
        description: "The channel has been successfully updated.",
      })
    } else {
      setChannels([...channels, newChannel as any])
      toast({
        title: "Channel created",
        description: "The new channel has been successfully created.",
      })
    }

    // Close dialog and reset form
    setIsAddDialogOpen(false)
    resetForm()
  }

  // Fetch Telegram chats
  const fetchTelegramChats = () => {
    if (!telegramToken.trim()) {
      setTelegramError("Please enter a valid Telegram bot token")
      return
    }

    setIsFetchingChats(true)
    setTelegramError(null)

    // In a real app, you would make an API call to the Telegram API
    // For this demo, we'll simulate the API call with a timeout
    setTimeout(() => {
      // Simulate API response
      if (telegramToken.includes("error")) {
        setTelegramError("Invalid token or bot not found")
        setTelegramChats([])
      } else {
        setTelegramChats(sampleTelegramChats)
      }
      setIsFetchingChats(false)
    }, 1500)
  }

  // Handle copying to clipboard
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)

    setTimeout(() => {
      setCopiedField(null)
    }, 2000)
  }

  // Get channel type badge
  const getChannelTypeBadge = (type: string) => {
    switch (type) {
      case "discord":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Discord</Badge>
      case "slack":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Slack</Badge>
      case "telegram":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Telegram</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  // Get channel icon
  const getChannelIcon = (type: string) => {
    switch (type) {
      case "discord":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
        )
      case "slack":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
          </svg>
        )
      case "telegram":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.81-.6 3.15-1.37 5.26-2.27 6.33-2.71 3.02-1.24 3.64-1.45 4.05-1.46.1 0 .32.02.46.19.12.14.15.33.17.47-.03.06-.03.12-.05.31z" />
          </svg>
        )
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
          <p className="text-muted-foreground">Manage notification channels for your alerts</p>
        </div>
        <Button onClick={handleAddChannel}>
          <Plus className="mr-2 h-4 w-4" /> Add Channel
        </Button>
      </div>

      {channels.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No channels found</h3>
            <p className="text-muted-foreground max-w-sm mb-4">
              Add your first notification channel to start receiving alerts.
            </p>
            <Button onClick={handleAddChannel}>
              <Plus className="mr-2 h-4 w-4" /> Add Channel
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="hidden md:table-cell">Details</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {channels.map((channel) => (
                  <TableRow key={channel.id}>
                    <TableCell className="font-medium">{channel.name}</TableCell>
                    <TableCell>{getChannelTypeBadge(channel.type)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(channel.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {channel.type === "telegram" ? (
                        <span>Chat ID: {channel.config.chatId}</span>
                      ) : (
                        <span className="flex items-center">
                          Webhook URL:
                          <span className="truncate max-w-[200px] mx-1">
                            {channel.config.webhookUrl!.substring(0, 25)}...
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleCopy(channel.config.webhookUrl!, `webhook-${channel.id}`)}
                          >
                            {copiedField === `webhook-${channel.id}` ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </span>
                      )}
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
                          <DropdownMenuItem onClick={() => handleEditChannel(channel.id)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteChannel(channel.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
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

      {/* Add/Edit Channel Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Channel" : "Add Channel"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update your notification channel settings."
                : "Configure a new notification channel to receive alerts."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="channel-name">Channel Name</Label>
              <Input
                id="channel-name"
                placeholder="E.g., Team Discord Alerts"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>

            {!isEditMode && (
              <div className="space-y-2">
                <Label>Channel Type</Label>
                <Tabs
                  defaultValue={channelType}
                  value={channelType}
                  onValueChange={(value) => setChannelType(value as "discord" | "telegram" | "slack")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="discord" className="flex items-center gap-1">
                      {getChannelIcon("discord")}
                      <span>Discord</span>
                    </TabsTrigger>
                    <TabsTrigger value="telegram" className="flex items-center gap-1">
                      {getChannelIcon("telegram")}
                      <span>Telegram</span>
                    </TabsTrigger>
                    <TabsTrigger value="slack" className="flex items-center gap-1">
                      {getChannelIcon("slack")}
                      <span>Slack</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Discord Configuration */}
            {channelType === "discord" && (
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Discord Webhook URL</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="webhook-url"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    type="url"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  <a
                    href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Learn how to create a Discord webhook
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </p>
              </div>
            )}

            {/* Slack Configuration */}
            {channelType === "slack" && (
              <div className="space-y-2">
                <Label htmlFor="slack-webhook-url">Slack Webhook URL</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="slack-webhook-url"
                    placeholder="https://hooks.slack.com/services/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    type="url"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  <a
                    href="https://api.slack.com/messaging/webhooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center"
                  >
                    Learn how to create a Slack webhook
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </p>
              </div>
            )}

            {/* Telegram Configuration */}
            {channelType === "telegram" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="telegram-token"
                      placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                      value={telegramToken}
                      onChange={(e) => setTelegramToken(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={fetchTelegramChats}
                      disabled={isFetchingChats || !telegramToken.trim()}
                    >
                      {isFetchingChats ? <Loader2 className="h-4 w-4 animate-spin" /> : "Fetch"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <a
                      href="https://core.telegram.org/bots#how-do-i-create-a-bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Learn how to create a Telegram bot
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </p>
                </div>

                {telegramError && <div className="text-sm text-destructive">{telegramError}</div>}

                {telegramChats.length > 0 && (
                  <div className="space-y-2">
                    <Label>Select Chat</Label>
                    <RadioGroup value={selectedChatId} onValueChange={setSelectedChatId}>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {telegramChats.map((chat) => (
                          <div key={chat.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={chat.id} id={`chat-${chat.id}`} />
                            <Label htmlFor={`chat-${chat.id}`} className="cursor-pointer">
                              {chat.title}
                              <span className="ml-2 text-xs text-muted-foreground">
                                {chat.type === "private" ? "Private" : chat.type === "group" ? "Group" : "Channel"}
                              </span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {isFetchingChats && (
                  <div className="space-y-2">
                    <Label>Loading Chats...</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-[180px]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChannel}>{isEditMode ? "Update Channel" : "Add Channel"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Channel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this channel? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteChannel}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

