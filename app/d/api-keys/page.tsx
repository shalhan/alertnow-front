import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiKeysPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">Manage your API keys for integration</p>
        </div>
        <Button>Generate New Key</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This page is under development. Check back later for API key management.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The API Keys page will allow you to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>Generate new API keys for your applications</li>
            <li>Revoke existing keys</li>
            <li>Set permissions and scopes for each key</li>
            <li>Monitor API usage and rate limits</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

