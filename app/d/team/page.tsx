import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Invite and manage team members</p>
        </div>
        <Button>Invite Member</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This page is under development. Check back later for team management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>The Team Management page will allow you to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Invite new team members</li>
            <li>Assign roles and permissions</li>
            <li>Manage access to different projects</li>
            <li>View team activity and audit logs</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

