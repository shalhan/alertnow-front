"use client"

import { useState } from "react"
import { Mail, Save, User } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("notifications")

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    emailDigest: true,
    emailDigestFrequency: "daily",
    slackAlerts: true,
    slackDigest: false,
    browserNotifications: true,
  })

  const [profileSettings, setProfileSettings] = useState({
    name: "Admin User",
    email: "admin@example.com",
    company: "Acme Inc",
    timezone: "America/New_York",
    language: "en",
  })

  const [billingSettings, setBillingSettings] = useState({
    plan: "Pro",
    billingCycle: "monthly",
    paymentMethod: "Visa ending in 4242",
  })

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleSaveProfile = () => {
    toast({
      title: "Profile settings saved",
      description: "Your profile information has been updated.",
    })
  }

  const handleSaveBilling = () => {
    toast({
      title: "Billing settings saved",
      description: "Your billing preferences have been updated.",
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader title="Settings" description="Manage your account and preferences" />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure how you receive email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Alert Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive an email when a new alert is triggered</p>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={notificationSettings.emailAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a summary of alerts and activity</p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={notificationSettings.emailDigest}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailDigest: checked,
                      })
                    }
                  />
                </div>

                {notificationSettings.emailDigest && (
                  <div className="space-y-2 pl-6 border-l-2 border-muted">
                    <Label htmlFor="digest-frequency">Digest Frequency</Label>
                    <Select
                      value={notificationSettings.emailDigestFrequency}
                      onValueChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailDigestFrequency: value,
                        })
                      }
                    >
                      <SelectTrigger id="digest-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>Slack Notifications</CardTitle>
                <CardDescription>Configure how you receive Slack notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slack-alerts">Alert Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a Slack message when a new alert is triggered
                    </p>
                  </div>
                  <Switch
                    id="slack-alerts"
                    checked={notificationSettings.slackAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        slackAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slack-digest">Daily Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive a summary of alerts and activity on Slack</p>
                  </div>
                  <Switch
                    id="slack-digest"
                    checked={notificationSettings.slackDigest}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        slackDigest: checked,
                      })
                    }
                  />
                </div>
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>Browser Notifications</CardTitle>
                <CardDescription>Configure browser notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browser-notifications">Alert Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications when a new alert is triggered
                    </p>
                  </div>
                  <Switch
                    id="browser-notifications"
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        browserNotifications: checked,
                      })
                    }
                  />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={profileSettings.name}
                      onChange={(e) =>
                        setProfileSettings({
                          ...profileSettings,
                          name: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) =>
                        setProfileSettings({
                          ...profileSettings,
                          email: e.target.value,
                        })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={profileSettings.company}
                    onChange={(e) =>
                      setProfileSettings({
                        ...profileSettings,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>

              <Separator />

              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={profileSettings.timezone}
                    onValueChange={(value) =>
                      setProfileSettings({
                        ...profileSettings,
                        timezone: value,
                      })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={profileSettings.language}
                    onValueChange={(value) =>
                      setProfileSettings({
                        ...profileSettings,
                        language: value,
                      })
                    }
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        $49/month, billed {billingSettings.billingCycle === "monthly" ? "monthly" : "annually"}
                      </p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Features</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Unlimited alerts</li>
                      <li>Up to 10 team members</li>
                      <li>30-day alert history</li>
                      <li>Custom integrations</li>
                      <li>Priority support</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billing-cycle">Billing Cycle</Label>
                  <Select
                    value={billingSettings.billingCycle}
                    onValueChange={(value) =>
                      setBillingSettings({
                        ...billingSettings,
                        billingCycle: value,
                      })
                    }
                  >
                    <SelectTrigger id="billing-cycle">
                      <SelectValue placeholder="Select billing cycle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annually">Annually (Save 20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Input id="payment-method" value={billingSettings.paymentMethod} disabled />
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveBilling}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

