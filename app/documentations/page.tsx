"use client"

import Link from "next/link"
import Image from "next/image"
import { BellRing, Code, Copy, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 mx-auto">
        <aside className="hidden lg:block w-64 border-r shrink-0 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="font-medium text-sm">Getting Started</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#installation" className="text-primary font-medium">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="#setup" className="text-muted-foreground hover:text-primary">
                  Setting Up Alert Rules
                </Link>
              </li>
              <li>
                <Link href="#usage" className="text-muted-foreground hover:text-primary">
                  Usage Examples
                </Link>
              </li>
              <li>
                <Link href="#receiving" className="text-muted-foreground hover:text-primary">
                  Receiving Alerts
                </Link>
              </li>
            </ul>
            <div className="font-medium text-sm pt-4">Integrations</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#discord" className="text-muted-foreground hover:text-primary">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#telegram" className="text-muted-foreground hover:text-primary">
                  Telegram
                </Link>
              </li>
              <li>
                <Link href="#slack" className="text-muted-foreground hover:text-primary">
                  Slack <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Soon
                </span>
                </Link>
              </li>
              <li>
                <Link href="#email" className="text-muted-foreground hover:text-primary">
                  Email <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Soon
                </span>
                </Link>
              </li>
              <li>
                <Link href="#sms" className="text-muted-foreground hover:text-primary">
                  SMS <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Soon
                </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="flex-1 py-6 px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">AlertNow Documentation</h1>
              <p className="text-muted-foreground">
                Learn how to integrate and use AlertNow to receive real-time alerts for your applications.
              </p>
            </div>

            {/* Installation Section */}
            <section id="installation" className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
              <p>
                There are two ways to integrate AlertNow into your application: using our npm package or making direct API calls.
              </p>

              <Tabs defaultValue="npm">
                <TabsList>
                  <TabsTrigger value="npm">npm</TabsTrigger>
                  <TabsTrigger value="yarn">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                  <TabsTrigger value="curl">curl</TabsTrigger>
                </TabsList>
                <TabsContent value="npm" className="space-y-4">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>npm install alertnow</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText("npm install alertnow")
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                  <p>
                    After installation, you'll need to initialize the client with your API key:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="yarn" className="space-y-4">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>yarn add alertnow</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText("yarn add alertnow")
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                  <p>
                    After installation, you'll need to initialize the client with your API key:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="pnpm" className="space-y-4">
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>pnpm add alertnow</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText("pnpm add alertnow")
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                  <p>
                    After installation, you'll need to initialize the client with your API key:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="curl" className="space-y-4">
                  <p>
                    If you prefer to use the API directly, you can make HTTP requests to our endpoints:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`curl -X POST https://api.alertnow.io/v1/alerts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "level": "critical",
    "title": "API Error",
    "message": "The payment service is down",
    "data": {
      "serviceId": "payment-api"
    }
  }'`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`curl -X POST https://api.alertnow.io/v1/alerts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "level": "critical",
    "title": "API Error",
    "message": "The payment service is down",
    "data": {
      "serviceId": "payment-api"
    }
  }'`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Setup Section */}
            <section id="setup" className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Setting up Alert Rules</h2>
              <p className="mb-6">
                Before sending alerts, you need to configure your alert rules in the dashboard. 
                This determines where your alerts will be sent and what conditions trigger them.
              </p>
              
              <Alert>
                <Code className="h-4 w-4" />
                <AlertTitle>Alert Rules Configuration</AlertTitle>
                <AlertDescription>
                  For detailed instructions on setting up alert rules, including integrations with 
                  Discord, Slack, and email notifications, please visit our 
                  <a href="/alert-rules" className="text-primary font-medium ml-1 hover:underline">
                    Alert Rules Documentation
                  </a>.
                </AlertDescription>
              </Alert>
            </section>

            {/* Usage Examples Section */}
            <section id="usage" className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Usage Examples</h2>
              <p>
                Once you've installed AlertNow and set up your alert rules, you can start sending alerts from your application.
                Here are some examples of how to use AlertNow in different scenarios.
              </p>

              <div className="space-y-6">
                <div id="node-api" className="space-y-4">
                  <h3 className="text-xl font-semibold">Node.js Example</h3>
                  <p>
                    Here's how to send an alert using the Node.js client:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');

try {
  // Your application code
  doSomethingRisky();
} catch (error) {
  // Send an alert when an error occurs
  alertNow.send(
    "critical",                // Alert level
    "Runtime Error",           // Alert title
    error.message,             // Alert message
    { 
      userId: 1,               // Additional data
      errorStack: error.stack
    }
  );
}

// You can also send alerts proactively
function checkDatabaseConnection() {
  const isConnected = pingDatabase();
  
  if (!isConnected) {
    alertNow.send(
      "warning",
      "Database Connection Issue",
      "Unable to connect to the database",
      { 
        databaseId: "main-db",
        lastPingTime: new Date().toISOString()
      }
    );
  }
}`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertNow = new AlertNow('your-api-key');

try {
  // Your application code
  doSomethingRisky();
} catch (error) {
  // Send an alert when an error occurs
  alertNow.send(
    "critical",                // Alert level
    "Runtime Error",           // Alert title
    error.message,             // Alert message
    { 
      userId: 1,               // Additional data
      errorStack: error.stack
    }
  );
}

// You can also send alerts proactively
function checkDatabaseConnection() {
  const isConnected = pingDatabase();
  
  if (!isConnected) {
    alertNow.send(
      "warning",
      "Database Connection Issue",
      "Unable to connect to the database",
      { 
        databaseId: "main-db",
        lastPingTime: new Date().toISOString()
      }
    );
  }
}`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </div>

                <div id="rest-api" className="space-y-4">
                  <h3 className="text-xl font-semibold">REST API Example</h3>
                  <p>
                    If you're using the REST API directly, here's how to structure your request:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`// Request Body
{
  "level": "critical",
  "title": "Runtime Error!",
  "message": "Nil pointer at line 35",
  "data": {
    "userId": 1,
    "serviceId": "auth-service",
    "environment": "production"
  }
}`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`// Request Body
{
  "level": "critical",
  "title": "Runtime Error!",
  "message": "Nil pointer at line 35",
  "data": {
    "userId": 1,
    "serviceId": "auth-service",
    "environment": "production"
  }
}`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                  <p>
                    Send this JSON payload to the AlertNow API endpoint:
                  </p>
                  <div className="relative">
                    <pre className="p-4 rounded-lg bg-muted overflow-x-auto">
                      <code>{`curl -X POST https://api.alertnow.io/v1/alerts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "level": "critical",
    "title": "Runtime Error!",
    "message": "Nil pointer at line 35",
    "data": {
      "userId": 1,
      "serviceId": "auth-service",
      "environment": "production"
    }
  }'`}</code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2"
                      onClick={() => {
                        navigator.clipboard.writeText(`curl -X POST https://api.alertnow.io/v1/alerts \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your-api-key" \\
  -d '{
    "level": "critical",
    "title": "Runtime Error!",
    "message": "Nil pointer at line 35",
    "data": {
      "userId": 1,
      "serviceId": "auth-service",
      "environment": "production"
    }
  }'`)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy code</span>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Receiving Alerts Section */}
            <section id="receiving" className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Receiving Alerts</h2>
              <p>
                AlertNow supports multiple notification channels to ensure you never miss an important alert.
                Here's how alerts appear in different channels:
              </p>

              <div id="discord" className="space-y-4">
                <h3 className="text-xl font-semibold">Discord Integration</h3>
                <p>
                  When an alert is triggered, it will appear in your configured Discord channel:
                </p>
                <div className="rounded-lg border overflow-hidden">
                  <Image 
                    src="/discordexample2.png?height=200&width=600" 
                    alt="Discord Alert Example" 
                    width={600} 
                    height={200}
                    className="w-full object-cover"
                  />
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      Example of an AlertNow notification in Discord
                    </p>
                  </div>
                </div>
                <p>
                  Discord notifications include:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Alert level (color-coded)</li>
                  <li>Alert title and message</li>
                  <li>Timestamp</li>
                  <li>Additional data in an expandable section</li>
                  <li>Quick action buttons</li>
                </ul>
              </div>

              <Alert>
                <AlertTitle>Setting up integrations</AlertTitle>
                <AlertDescription>
                  To receive alerts in Discord, Slack, or other channels, you need to configure the integration in your AlertNow dashboard.
                  <Link href="/documentation/integrations" className="text-primary hover:underline block mt-2">
                    View integration setup guide
                  </Link>
                </AlertDescription>
              </Alert>
            </section>

            {/* Additional Resources */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Additional Resources</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/documentation/api-reference" className="block p-6 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-semibold">API Reference</h3>
                  <p className="text-muted-foreground mt-2">
                    Complete documentation of all API endpoints and parameters.
                  </p>
                </Link>
                <Link href="/documentation/best-practices" className="block p-6 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-semibold">Best Practices</h3>
                  <p className="text-muted-foreground mt-2">
                    Learn how to effectively use AlertNow in your workflow.
                  </p>
                </Link>
                <Link href="/documentation/integrations" className="block p-6 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-semibold">Integrations</h3>
                  <p className="text-muted-foreground mt-2">
                    Connect AlertNow with your favorite tools and services.
                  </p>
                </Link>
                <Link href="/documentation/faq" className="block p-6 rounded-lg border hover:border-primary hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-semibold">FAQ</h3>
                  <p className="text-muted-foreground mt-2">
                    Answers to commonly asked questions about AlertNow.
                  </p>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
