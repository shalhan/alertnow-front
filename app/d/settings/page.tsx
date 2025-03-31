import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and notification preferences</p>
        </div>
        <Button variant="outline">Save Changes</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This page is under development. Check back later for settings configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The Settings page will allow you to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Update your account information</li>
            <li>Configure notification preferences</li>
            <li>Manage integrations with other services</li>
            <li>Set up billing and subscription details</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

