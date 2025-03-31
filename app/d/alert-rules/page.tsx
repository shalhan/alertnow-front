import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlertRulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alert Rules</h1>
          <p className="text-muted-foreground">Configure how and when you receive alerts</p>
        </div>
        <Button>Create New Rule</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This page is under development. Check back later for alert rule configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The Alert Rules page will allow you to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Create custom alert rules based on error characteristics</li>
            <li>Route alerts to different channels (Slack, Discord, Email, etc.)</li>
            <li>Set up alert thresholds and conditions</li>
            <li>Configure notification schedules</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

