"use client"

import { useState } from "react"
import {
  User,
  CreditCard,
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Check,
  Download,
  Calendar,
  Shield,
  Bell,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample API keys data
const sampleApiKeys = [
  {
    id: "1",
    name: "Production API Key",
    environment: "production",
    key: "ak_prod_8f7g6h5j4k3l2m1n0p9o8i7u6y5t4r3e2w1q",
    createdAt: "2023-05-15T10:30:00Z",
    lastUsed: "2023-06-20T14:45:00Z",
  },
  {
    id: "2",
    name: "Staging API Key",
    environment: "staging",
    key: "ak_staging_7f6g5h4j3k2l1m0n9o8p7i6u5y4t3r2e1w",
    createdAt: "2023-05-16T11:20:00Z",
    lastUsed: "2023-06-18T09:30:00Z",
  },
  {
    id: "3",
    name: "Development API Key",
    environment: "development",
    key: "ak_dev_6f5g4h3j2k1l0m9n8o7p6i5u4y3t2r1e0w9q",
    createdAt: "2023-05-17T14:10:00Z",
    lastUsed: "2023-06-19T16:25:00Z",
  },
]

// Sample billing history data
const sampleBillingHistory = [
  {
    id: "inv_123456",
    date: "2023-06-01T00:00:00Z",
    amount: 29.99,
    status: "paid",
    description: "AlertNow Pro Plan - June 2023",
  },
  {
    id: "inv_123455",
    date: "2023-05-01T00:00:00Z",
    amount: 29.99,
    status: "paid",
    description: "AlertNow Pro Plan - May 2023",
  },
  {
    id: "inv_123454",
    date: "2023-04-01T00:00:00Z",
    amount: 29.99,
    status: "paid",
    description: "AlertNow Pro Plan - April 2023",
  },
]

// Sample user data
const sampleUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=128&width=128",
  company: "Acme Inc.",
  role: "Software Engineer",
  timezone: "America/New_York",
  notifications: {
    email: true,
    browser: true,
    mobile: false,
  },
}

export default function SettingsPage() {
  // State for user profile
  const [user, setUser] = useState(sampleUser)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // State for API keys
  const [apiKeys, setApiKeys] = useState(sampleApiKeys)
  const [visibleKeyIds, setVisibleKeyIds] = useState<string[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyEnvironment, setNewKeyEnvironment] = useState("production")
  const [isGenerateKeyDialogOpen, setIsGenerateKeyDialogOpen] = useState(false)

  // State for billing
  const [billingHistory] = useState(sampleBillingHistory)
  const [currentPlan] = useState("pro")
  const [paymentMethod] = useState({
    type: "card",
    last4: "4242",
    expiry: "04/25",
    brand: "visa",
  })

  // State for copied items
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Toggle API key visibility
  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeyIds((prev) => (prev.includes(keyId) ? prev.filter((id) => id !== keyId) : [...prev, keyId]))
  }

  // Copy API key to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)

    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  // Generate new API key
  const generateApiKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      })
      return
    }

    // Generate a random API key (in a real app, this would be done on the server)
    const randomKey = `ak_${newKeyEnvironment}_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

    // Create new API key object
    const newKey = {
      id: `${Date.now()}`,
      name: newKeyName,
      environment: newKeyEnvironment,
      key: randomKey,
      createdAt: new Date().toISOString(),
      lastUsed: null,
    }

    // Add to API keys list
    setApiKeys([...apiKeys, newKey as any])

    // Reset form and close dialog
    setNewKeyName("")
    setNewKeyEnvironment("production")
    setIsGenerateKeyDialogOpen(false)

    // Show success toast
    toast({
      title: "API key generated",
      description: "Your new API key has been generated successfully.",
    })

    // Automatically show the new key
    setVisibleKeyIds((prev) => [...prev, newKey.id])
  }

  // Revoke API key
  const revokeApiKey = (keyId: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== keyId))

    toast({
      title: "API key revoked",
      description: "The API key has been revoked successfully.",
    })
  }

  // Update user profile
  const updateProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Change password
  const changePassword = () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Validation error",
        description: "Please enter both password fields.",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation do not match.",
        variant: "destructive",
      })
      return
    }

    // Reset password fields
    setNewPassword("")
    setConfirmPassword("")

    toast({
      title: "Password changed",
      description: "Your password has been changed successfully.",
    })
  }

  // Get environment badge
  const getEnvironmentBadge = (environment: string) => {
    switch (environment) {
      case "production":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Production</Badge>
      case "staging":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Staging</Badge>
      case "development":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Development</Badge>
      default:
        return <Badge>{environment}</Badge>
    }
  }

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account information and profile settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={user.company}
                        onChange={(e) => setUser({ ...user, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={user.timezone} onValueChange={(value) => setUser({ ...user, timezone: value })}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                        <SelectItem value="Australia/Sydney">Australian Eastern Time (AET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications for important alerts.</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={user.notifications.email}
                      onCheckedChange={(checked) =>
                        setUser({
                          ...user,
                          notifications: { ...user.notifications, email: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser notifications when you're online.</p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={user.notifications.browser}
                      onCheckedChange={(checked) =>
                        setUser({
                          ...user,
                          notifications: { ...user.notifications, browser: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your mobile device.</p>
                    </div>
                    <Switch
                      id="mobile-notifications"
                      checked={user.notifications.mobile}
                      onCheckedChange={(checked) =>
                        setUser({
                          ...user,
                          notifications: { ...user.notifications, mobile: checked },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={updateProfile}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Password must be at least 8 characters and include a number and a special character.
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield className="mr-1 h-4 w-4" />
                Last password change: 3 months ago
              </div>
              <Button onClick={changePassword}>Change Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data.
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all your
                          data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
                          <Input id="confirm-delete" placeholder="DELETE" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">
                          <LogOut className="mr-2 h-4 w-4" /> Delete Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for accessing the AlertNow API.</CardDescription>
              </div>
              <Button onClick={() => setIsGenerateKeyDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Key className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No API keys</h3>
                  <p className="text-muted-foreground max-w-sm mb-4">
                    You haven't generated any API keys yet. Generate a key to start using the AlertNow API.
                  </p>
                  <Button onClick={() => setIsGenerateKeyDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Generate New Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Environment</TableHead>
                          <TableHead>API Key</TableHead>
                          <TableHead className="hidden md:table-cell">Created</TableHead>
                          <TableHead className="hidden md:table-cell">Last Used</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiKeys.map((apiKey) => (
                          <TableRow key={apiKey.id}>
                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                            <TableCell>{getEnvironmentBadge(apiKey.environment)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                  {visibleKeyIds.includes(apiKey.id)
                                    ? apiKey.key
                                    : "•".repeat(Math.min(24, apiKey.key.length))}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                >
                                  {visibleKeyIds.includes(apiKey.id) ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                >
                                  {copiedId === apiKey.id ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(apiKey.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Revoke API Key</DialogTitle>
                                    <DialogDescription>
                                      Are you sure you want to revoke this API key? This action cannot be undone.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <div className="space-y-2">
                                      <div className="font-medium">{apiKey.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        Environment: {apiKey.environment}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button variant="destructive" onClick={() => revokeApiKey(apiKey.id)}>
                                      Revoke API Key
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-start space-x-4">
                      <div className="mt-0.5">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">API Key Security</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your API keys carry many privileges, so be sure to keep them secure. Do not share your API
                          keys in publicly accessible areas such as GitHub, client-side code, or in your frontend
                          application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to use the AlertNow API to integrate with your applications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-2">Quick Start</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Here's a simple example of how to send an alert using the AlertNow API:
                </p>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code className="text-sm">
                    {`curl -X POST https://api.alertnow.com/v1/alerts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "API Error",
    "message": "The /users endpoint is returning 500 errors",
    "level": "error",
    "source": "api-gateway",
    "channels": ["slack-alerts"]
  }'`}
                  </code>
                </pre>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="w-full max-w-xs">
                  View Full API Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium">
                      {currentPlan === "pro" ? "Pro Plan" : currentPlan === "team" ? "Team Plan" : "Free Plan"}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {currentPlan === "pro"
                        ? "For individuals and small teams"
                        : currentPlan === "team"
                          ? "For growing teams with advanced needs"
                          : "Limited features for personal use"}
                    </p>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      {currentPlan === "pro" ? "$29.99" : currentPlan === "team" ? "$79.99" : "$0"}
                    </span>
                    <span className="text-muted-foreground ml-1">{currentPlan !== "free" ? "/month" : ""}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="flex flex-col items-center rounded-md border p-4">
                    <h4 className="font-medium">Alerts</h4>
                    <div className="mt-2 text-3xl font-bold">5,000</div>
                    <p className="text-sm text-muted-foreground mt-1">per month</p>
                    <div className="mt-2 text-sm">
                      <span className="text-green-600 font-medium">2,345 used</span> (47%)
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "47%" }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center rounded-md border p-4">
                    <h4 className="font-medium">Team Members</h4>
                    <div className="mt-2 text-3xl font-bold">10</div>
                    <p className="text-sm text-muted-foreground mt-1">seats</p>
                    <div className="mt-2 text-sm">
                      <span className="text-green-600 font-medium">5 used</span> (50%)
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full mt-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center rounded-md border p-4">
                    <h4 className="font-medium">Retention</h4>
                    <div className="mt-2 text-3xl font-bold">30</div>
                    <p className="text-sm text-muted-foreground mt-1">days</p>
                    <div className="mt-2 text-sm text-muted-foreground">Data stored for 30 days</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                  <Button variant="outline">View Plan Details</Button>
                  <Button>Upgrade Plan</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-muted p-2">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {paymentMethod.brand.charAt(0).toUpperCase() + paymentMethod.brand.slice(1)} ending in{" "}
                          {paymentMethod.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" /> Download All
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>{getPaymentStatusBadge(invoice.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="mr-2 h-4 w-4" /> Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-0.5">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Next Billing Date</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your next billing date is <strong>July 1, 2023</strong>. You will be charged{" "}
                      <strong>${currentPlan === "pro" ? "29.99" : currentPlan === "team" ? "79.99" : "0"}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Generate API Key Dialog */}
      <Dialog open={isGenerateKeyDialogOpen} onOpenChange={setIsGenerateKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>Create a new API key for accessing the AlertNow API.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="E.g., Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give your API key a descriptive name to identify its purpose.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="key-environment">Environment</Label>
              <Select value={newKeyEnvironment} onValueChange={setNewKeyEnvironment}>
                <SelectTrigger id="key-environment">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select the environment where this API key will be used.</p>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsGenerateKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={generateApiKey}>
              <Key className="mr-2 h-4 w-4" /> Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

