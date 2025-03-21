"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  Book,
  Copy,
  ExternalLink,
  FileJson,
  Hash,
  HelpCircle,
  Info,
  Laptop,
  Layers,
  Search,
  Server,
  Zap,
  Key,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DashboardHeader } from "@/components/dashboard-header"
import { Badge } from "@/components/ui/badge"

export default function DocumentationPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("introduction")

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader title="Documentation" description="Learn how to use AlertHub and integrate with your systems" />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="hidden md:block w-64 border-r overflow-y-auto p-4 bg-background">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2 text-sm">Getting Started</h3>
              <ul className="space-y-1">
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "introduction" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("introduction")}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Introduction
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "quickstart" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("quickstart")}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Quick Start
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "authentication" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("authentication")}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Authentication
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-sm">API Reference</h3>
              <ul className="space-y-1">
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "alerts-api" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("alerts-api")}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Alerts API
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "services-api" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("services-api")}
                  >
                    <Server className="mr-2 h-4 w-4" />
                    Services API
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "rules-api" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("rules-api")}
                  >
                    <Layers className="mr-2 h-4 w-4" />
                    Rules API
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "webhooks" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("webhooks")}
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    Webhooks
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-sm">SDK Documentation</h3>
              <ul className="space-y-1">
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "nodejs-sdk" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("nodejs-sdk")}
                  >
                    <FileJson className="mr-2 h-4 w-4" />
                    Node.js SDK
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "python-sdk" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("python-sdk")}
                  >
                    <FileJson className="mr-2 h-4 w-4" />
                    Python SDK
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "go-sdk" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("go-sdk")}
                  >
                    <FileJson className="mr-2 h-4 w-4" />
                    Go SDK
                  </Button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-sm">Guides</h3>
              <ul className="space-y-1">
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "integrations" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("integrations")}
                  >
                    <Laptop className="mr-2 h-4 w-4" />
                    Integrations
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "best-practices" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("best-practices")}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Best Practices
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-sm h-8 px-2 ${activeSection === "troubleshooting" ? "bg-accent text-accent-foreground" : ""}`}
                    onClick={() => scrollToSection("troubleshooting")}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Troubleshooting
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Introduction Section */}
          <section id="introduction" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Introduction to AlertHub</h2>
            <p className="text-lg text-muted-foreground mb-6">
              AlertHub is a powerful alert management system designed to help you monitor your systems, detect issues,
              and respond quickly to prevent downtime.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Real-time Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get notified instantly when issues arise in your systems through multiple channels including email,
                    Slack, and more.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Smart Rules & Automations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Create powerful rules to automate your alert workflow, route alerts to the right teams, and automate
                    remediation steps.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Comprehensive Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visualize and manage all your alerts in one place with customizable dashboards and powerful
                    filtering capabilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Quick Start Section */}
          <section id="quickstart" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Start</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get started with AlertHub in just a few minutes. Follow these steps to set up your first alert.
            </p>

            <div className="space-y-6">
              <div className="relative pl-8 pb-8 border-l border-border">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Create an API Key</h3>
                <p className="text-muted-foreground mb-4">
                  Generate an API key in the{" "}
                  <Link href="/api-keys" className="text-primary hover:underline">
                    API Keys
                  </Link>{" "}
                  section of your dashboard.
                </p>
                <div className="bg-muted rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">API Key Example</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => handleCopyCode("ak_prod_1234567890abcdef1234567890abcdef", "api-key")}
                    >
                      {copiedCode === "api-key" ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    <code>ak_prod_1234567890abcdef1234567890abcdef</code>
                  </pre>
                </div>
              </div>

              <div className="relative pl-8 pb-8 border-l border-border">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Install the SDK</h3>
                <p className="text-muted-foreground mb-4">Install our SDK for your preferred programming language.</p>
                <Tabs defaultValue="npm" className="w-full">
                  <TabsList>
                    <TabsTrigger value="npm">npm</TabsTrigger>
                    <TabsTrigger value="yarn">yarn</TabsTrigger>
                    <TabsTrigger value="pip">pip</TabsTrigger>
                    <TabsTrigger value="go">go</TabsTrigger>
                  </TabsList>
                  <TabsContent value="npm" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">npm install</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleCopyCode("npm install @alerthub/sdk", "npm-install")}
                      >
                        {copiedCode === "npm-install" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>npm install @alerthub/sdk</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="yarn" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">yarn add</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleCopyCode("yarn add @alerthub/sdk", "yarn-add")}
                      >
                        {copiedCode === "yarn-add" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>yarn add @alerthub/sdk</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="pip" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">pip install</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleCopyCode("pip install alerthub-sdk", "pip-install")}
                      >
                        {copiedCode === "pip-install" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>pip install alerthub-sdk</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="go" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">go get</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleCopyCode("go get github.com/alerthub/sdk-go", "go-get")}
                      >
                        {copiedCode === "go-get" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>go get github.com/alerthub/sdk-go</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="relative pl-8 pb-8 border-l border-border">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Send Your First Alert</h3>
                <p className="text-muted-foreground mb-4">Use our SDK to send your first alert.</p>
                <Tabs defaultValue="nodejs" className="w-full">
                  <TabsList>
                    <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="go">Go</TabsTrigger>
                  </TabsList>
                  <TabsContent value="nodejs" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Node.js Example</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() =>
                          handleCopyCode(
                            `import { AlertHub } from '@alerthub/sdk';

// Initialize the SDK with your API key
const alertHub = new AlertHub({
  apiKey: 'ak_prod_1234567890abcdef1234567890abcdef'
});

// Send an alert
async function sendAlert() {
  try {
    const response = await alertHub.alerts.create({
      title: 'Database connection failed',
      description: 'Unable to connect to the primary database',
      service: 'Payment Service',
      severity: 'Critical'
    });
    
    console.log('Alert sent successfully:', response);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

sendAlert();`,
                            "nodejs-example",
                          )
                        }
                      >
                        {copiedCode === "nodejs-example" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`import { AlertHub } from '@alerthub/sdk';

// Initialize the SDK with your API key
const alertHub = new AlertHub({
  apiKey: 'ak_prod_1234567890abcdef1234567890abcdef'
});

// Send an alert
async function sendAlert() {
  try {
    const response = await alertHub.alerts.create({
      title: 'Database connection failed',
      description: 'Unable to connect to the primary database',
      service: 'Payment Service',
      severity: 'Critical'
    });
    
    console.log('Alert sent successfully:', response);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

sendAlert();`}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Python Example</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() =>
                          handleCopyCode(
                            `import alerthub

# Initialize the SDK with your API key
client = alerthub.Client(api_key='ak_prod_1234567890abcdef1234567890abcdef')

# Send an alert
def send_alert():
    try:
        response = client.alerts.create(
            title='Database connection failed',
            description='Unable to connect to the primary database',
            service='Payment Service',
            severity='Critical'
        )
        
        print('Alert sent successfully:', response)
    except Exception as e:
        print('Error sending alert:', e)

send_alert()`,
                            "python-example",
                          )
                        }
                      >
                        {copiedCode === "python-example" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`import alerthub

# Initialize the SDK with your API key
client = alerthub.Client(api_key='ak_prod_1234567890abcdef1234567890abcdef')

# Send an alert
def send_alert():
    try:
        response = client.alerts.create(
            title='Database connection failed',
            description='Unable to connect to the primary database',
            service='Payment Service',
            severity='Critical'
        )
        
        print('Alert sent successfully:', response)
    except Exception as e:
        print('Error sending alert:', e)

send_alert()`}</code>
                    </pre>
                  </TabsContent>
                  <TabsContent value="go" className="bg-muted rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">Go Example</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() =>
                          handleCopyCode(
                            `package main

import (
	"fmt"
	"github.com/alerthub/sdk-go"
)

func main() {
	// Initialize the SDK with your API key
	client := alerthub.NewClient("ak_prod_1234567890abcdef1234567890abcdef")

	// Create alert parameters
	params := &alerthub.AlertParams{
		Title:       "Database connection failed",
		Description: "Unable to connect to the primary database",
		Service:     "Payment Service",
		Severity:    "Critical",
	}

	// Send an alert
	alert, err := client.Alerts.Create(params)
	if err != nil {
		fmt.Println("Error sending alert:", err)
		return
	}

	fmt.Println("Alert sent successfully:", alert.ID)
}`,
                            "go-example",
                          )
                        }
                      >
                        {copiedCode === "go-example" ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`package main

import (
	"fmt"
	"github.com/alerthub/sdk-go"
)

func main() {
	// Initialize the SDK with your API key
	client := alerthub.NewClient("ak_prod_1234567890abcdef1234567890abcdef")

	// Create alert parameters
	params := &alerthub.AlertParams{
		Title:       "Database connection failed",
		Description: "Unable to connect to the primary database",
		Service:     "Payment Service",
		Severity:    "Critical",
	}

	// Send an alert
	alert, err := client.Alerts.Create(params)
	if err != nil {
		fmt.Println("Error sending alert:", err)
		return
	}

	fmt.Println("Alert sent successfully:", alert.ID)
}`}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Authentication Section */}
          <section id="authentication" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Authentication</h2>
            <p className="text-lg text-muted-foreground mb-6">
              All API requests to AlertHub require authentication using an API key. You can generate API keys in the API
              Keys section of your dashboard.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">API Key Authentication</h3>
                <p className="text-muted-foreground mb-4">
                  Include your API key in the Authorization header of your HTTP requests.
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">HTTP Header</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() =>
                      handleCopyCode("Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef", "auth-header")
                    }
                  >
                    {copiedCode === "auth-header" ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef</code>
                </pre>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">API Key Security</h3>
                <p className="text-muted-foreground mb-4">
                  Keep your API keys secure and never expose them in client-side code.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Store API keys in environment variables or secure vaults</li>
                  <li>Never commit API keys to version control</li>
                  <li>Rotate API keys regularly</li>
                  <li>Use different API keys for different environments (development, staging, production)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Alerts API Section */}
          <section id="alerts-api" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl font-bold">Alerts API</h2>
              <Badge variant="outline" className="text-sm">
                v1
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              The Alerts API allows you to create, retrieve, update, and delete alerts in your AlertHub account.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="create-alert">
                <AccordionTrigger className="text-lg font-medium">Create an Alert</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">POST</Badge>
                    <code className="text-sm">/v1/alerts</code>
                  </div>
                  <p className="text-muted-foreground">Create a new alert in the system.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Request Body</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`{
  "title": "string",         // Required: Alert title
  "description": "string",   // Optional: Detailed description
  "service": "string",       // Required: Service name
  "severity": "string",      // Required: Info, Warning, Error, Critical
  "tags": ["string"],        // Optional: Array of tags
  "metadata": {              // Optional: Additional metadata
    "key": "value"
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Response</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`{
  "id": "string",            // Alert ID
  "title": "string",         // Alert title
  "description": "string",   // Alert description
  "service": "string",       // Service name
  "severity": "string",      // Alert severity
  "status": "string",        // Active or Resolved
  "createdAt": "string",     // ISO timestamp
  "tags": ["string"],        // Array of tags
  "metadata": {              // Additional metadata
    "key": "value"
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <Tabs defaultValue="curl" className="w-full">
                      <TabsList>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                        <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                      </TabsList>
                      <TabsContent value="curl" className="bg-muted rounded-md p-4">
                        <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                          <code>{`curl -X POST https://api.alerthub.example/v1/alerts \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Database connection failed",
    "description": "Unable to connect to the primary database",
    "service": "Payment Service",
    "severity": "Critical"
  }'`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="nodejs" className="bg-muted rounded-md p-4">
                        <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                          <code>{`import { AlertHub } from '@alerthub/sdk';

const alertHub = new AlertHub({
  apiKey: 'ak_prod_1234567890abcdef1234567890abcdef'
});

async function createAlert() {
  try {
    const alert = await alertHub.alerts.create({
      title: 'Database connection failed',
      description: 'Unable to connect to the primary database',
      service: 'Payment Service',
      severity: 'Critical'
    });
    
    console.log('Alert created:', alert);
  } catch (error) {
    console.error('Error creating alert:', error);
  }
}`}</code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="python" className="bg-muted rounded-md p-4">
                        <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                          <code>{`import alerthub

client = alerthub.Client(api_key='ak_prod_1234567890abcdef1234567890abcdef')

def create_alert():
    try:
        alert = client.alerts.create(
            title='Database connection failed',
            description='Unable to connect to the primary database',
            service='Payment Service',
            severity='Critical'
        )
        
        print('Alert created:', alert)
    except Exception as e:
        print('Error creating alert:', e)

create_alert()`}</code>
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="list-alerts">
                <AccordionTrigger className="text-lg font-medium">List Alerts</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">GET</Badge>
                    <code className="text-sm">/v1/alerts</code>
                  </div>
                  <p className="text-muted-foreground">Retrieve a list of alerts with optional filtering.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Query Parameters</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>
                        <code>service</code> - Filter by service name
                      </li>
                      <li>
                        <code>severity</code> - Filter by severity (Info, Warning, Error, Critical)
                      </li>
                      <li>
                        <code>status</code> - Filter by status (Active, Resolved)
                      </li>
                      <li>
                        <code>from</code> - Start date (ISO format)
                      </li>
                      <li>
                        <code>to</code> - End date (ISO format)
                      </li>
                      <li>
                        <code>limit</code> - Maximum number of results (default: 20, max: 100)
                      </li>
                      <li>
                        <code>offset</code> - Pagination offset
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X GET "https://api.alerthub.example/v1/alerts?service=Payment%20Service&severity=Critical&status=Active" \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef"`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="get-alert">
                <AccordionTrigger className="text-lg font-medium">Get an Alert</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">GET</Badge>
                    <code className="text-sm">/v1/alerts/{"{id}"}</code>
                  </div>
                  <p className="text-muted-foreground">Retrieve a specific alert by ID.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X GET https://api.alerthub.example/v1/alerts/alert_123456 \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef"`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="resolve-alert">
                <AccordionTrigger className="text-lg font-medium">Resolve an Alert</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-500 text-white">PUT</Badge>
                    <code className="text-sm">/v1/alerts/{"{id}"}/resolve</code>
                  </div>
                  <p className="text-muted-foreground">Mark an alert as resolved.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Request Body</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`{
  "resolution": "string",    // Optional: Resolution details
  "resolvedBy": "string"     // Optional: User who resolved the alert
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X PUT https://api.alerthub.example/v1/alerts/alert_123456/resolve \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resolution": "Restarted the database server",
    "resolvedBy": "john.doe@example.com"
  }'`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Services API Section */}
          <section id="services-api" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl font-bold">Services API</h2>
              <Badge variant="outline" className="text-sm">
                v1
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              The Services API allows you to manage the services that generate alerts in your AlertHub account.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="list-services">
                <AccordionTrigger className="text-lg font-medium">List Services</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">GET</Badge>
                    <code className="text-sm">/v1/services</code>
                  </div>
                  <p className="text-muted-foreground">Retrieve a list of all services registered in your account.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X GET https://api.alerthub.example/v1/services \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef"`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="create-service">
                <AccordionTrigger className="text-lg font-medium">Create a Service</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">POST</Badge>
                    <code className="text-sm">/v1/services</code>
                  </div>
                  <p className="text-muted-foreground">Register a new service in your account.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Request Body</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`{
  "name": "string",          // Required: Service name
  "description": "string",   // Optional: Service description
  "tags": ["string"],        // Optional: Array of tags
  "metadata": {              // Optional: Additional metadata
    "key": "value"
  }
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X POST https://api.alerthub.example/v1/services \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Payment Service",
    "description": "Handles all payment processing",
    "tags": ["payment", "critical"]
  }'`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Rules API Section */}
          <section id="rules-api" className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl font-bold">Rules API</h2>
              <Badge variant="outline" className="text-sm">
                v1
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              The Rules API allows you to manage alert rules and automations in your AlertHub account.
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="list-rules">
                <AccordionTrigger className="text-lg font-medium">List Rules</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500 text-white">GET</Badge>
                    <code className="text-sm">/v1/rules</code>
                  </div>
                  <p className="text-muted-foreground">Retrieve a list of all alert rules in your account.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X GET https://api.alerthub.example/v1/rules \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef"`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="create-rule">
                <AccordionTrigger className="text-lg font-medium">Create a Rule</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white">POST</Badge>
                    <code className="text-sm">/v1/rules</code>
                  </div>
                  <p className="text-muted-foreground">Create a new alert rule in your account.</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Request Body</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`{
  "name": "string",          // Required: Rule name
  "description": "string",   // Optional: Rule description
  "type": "string",          // Required: Rule type (keyword, severity, service, escalation)
  "condition": {             // Required: Rule condition
    // For keyword type
    "keyword": "string",
    "caseSensitive": boolean,
    
    // For severity type
    "minSeverity": "string",
    
    // For service type
    "service": "string",
    
    // For escalation type
    "timeUnresolved": number,
    "minSeverity": "string"
  },
  "actions": ["string"],     // Required: Array of actions (slack, email, discord, webhook)
  "severity": "string",      // Required: Rule severity
  "enabled": boolean         // Optional: Whether the rule is enabled (default: true)
}`}</code>
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Example Request</h4>
                    <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                      <code>{`curl -X POST https://api.alerthub.example/v1/rules \\
  -H "Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Database Down Alert",
    "description": "Notify when database connection fails",
    "type": "keyword",
    "condition": {
      "keyword": "Database Down",
      "caseSensitive": false
    },
    "actions": ["slack", "email"],
    "severity": "Critical",
    "enabled": true
  }'`}</code>
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Webhooks Section */}
          <section id="webhooks" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Webhooks</h2>
            <p className="text-lg text-muted-foreground mb-6">
              AlertHub can send webhook notifications to your servers when alerts are created, updated, or resolved.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Webhook Format</h3>
                <p className="text-muted-foreground mb-4">
                  Webhooks are sent as HTTP POST requests with a JSON payload.
                </p>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`{
  "event": "alert.created",  // Event type
  "data": {
    "id": "string",          // Alert ID
    "title": "string",       // Alert title
    "description": "string", // Alert description
    "service": "string",     // Service name
    "severity": "string",    // Alert severity
    "status": "string",      // Alert status
    "createdAt": "string",   // ISO timestamp
    "updatedAt": "string"    // ISO timestamp
  }
}`}</code>
                </pre>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Event Types</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    <code>alert.created</code> - Triggered when a new alert is created
                  </li>
                  <li>
                    <code>alert.updated</code> - Triggered when an alert is updated
                  </li>
                  <li>
                    <code>alert.resolved</code> - Triggered when an alert is resolved
                  </li>
                  <li>
                    <code>rule.triggered</code> - Triggered when an alert rule is triggered
                  </li>
                </ul>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Webhook Security</h3>
                <p className="text-muted-foreground mb-4">
                  Webhook requests include a signature header that you can use to verify the authenticity of the
                  request.
                </p>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`X-AlertHub-Signature: sha256=5257a869e7bdf3ecf7f367749d25e504f03fc389e82f705b1331f3ed960b0373`}</code>
                </pre>
                <p className="text-sm text-muted-foreground mt-2">
                  The signature is a HMAC SHA-256 hash of the request body using your webhook secret as the key.
                </p>
              </div>
            </div>
          </section>

          {/* SDK Documentation Sections */}
          <section id="nodejs-sdk" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Node.js SDK</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The AlertHub Node.js SDK provides a simple and intuitive way to interact with the AlertHub API.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Installation</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`npm install @alerthub/sdk
# or
yarn add @alerthub/sdk`}</code>
                </pre>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Usage</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`import { AlertHub } from '@alerthub/sdk';

// Initialize the SDK with your API key
const alertHub = new AlertHub({
  apiKey: 'ak_prod_1234567890abcdef1234567890abcdef'
});

// Send an alert
async function sendAlert() {
  try {
    const response = await alertHub.alerts.create({
      title: 'Database connection failed',
      description: 'Unable to connect to the primary database',
      service: 'Payment Service',
      severity: 'Critical'
    });
    
    console.log('Alert sent successfully:', response);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

sendAlert();`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section id="python-sdk" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Python SDK</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The AlertHub Python SDK provides a simple and intuitive way to interact with the AlertHub API.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Installation</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`pip install alerthub-sdk`}</code>
                </pre>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Usage</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`import alerthub

# Initialize the SDK with your API key
client = alerthub.Client(api_key='ak_prod_1234567890abcdef1234567890abcdef')

# Send an alert
def send_alert():
    try:
        response = client.alerts.create(
            title='Database connection failed',
            description='Unable to connect to the primary database',
            service='Payment Service',
            severity='Critical'
        )
        
        print('Alert sent successfully:', response)
    except Exception as e:
        print('Error sending alert:', e)

send_alert()`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section id="go-sdk" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Go SDK</h2>
            <p className="text-lg text-muted-foreground mb-6">
              The AlertHub Go SDK provides a simple and intuitive way to interact with the AlertHub API.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Installation</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`go get github.com/alerthub/sdk-go`}</code>
                </pre>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Usage</h3>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                  <code>{`package main

import (
	"fmt"
	"github.com/alerthub/sdk-go"
)

func main() {
	// Initialize the SDK with your API key
	client := alerthub.NewClient("ak_prod_1234567890abcdef1234567890abcdef")

	// Create alert parameters
	params := &alerthub.AlertParams{
		Title:       "Database connection failed",
		Description: "Unable to connect to the primary database",
		Service:     "Payment Service",
		Severity:    "Critical",
	}

	// Send an alert
	alert, err := client.Alerts.Create(params)
	if err != nil {
		fmt.Println("Error sending alert:", err)
		return
	}

	fmt.Println("Alert sent successfully:", alert.ID)
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Integrations Section */}
          <section id="integrations" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Integrations</h2>
            <p className="text-lg text-muted-foreground mb-6">
              AlertHub integrates with a variety of third-party services to help you manage your alerts more
              effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Slack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receive alert notifications directly in your Slack channels.
                  </p>
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/integrations">
                      <ExternalLink className="h-4 w-4" />
                      Configure Slack
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Discord</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send alert notifications to your Discord servers.
                  </p>
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/integrations">
                      <ExternalLink className="h-4 w-4" />
                      Configure Discord
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Receive alert notifications via email.</p>
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <Link href="/integrations">
                      <ExternalLink className="h-4 w-4" />
                      Configure Email
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices Section */}
          <section id="best-practices" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these best practices to get the most out of AlertHub.
            </p>

            <div className="space-y-6">
              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Alert Naming</h3>
                <p className="text-muted-foreground mb-2">
                  Use clear and descriptive names for your alerts to make them easier to understand and triage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-md p-3 bg-green-50 dark:bg-green-950/30">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Good Example</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Database connection failed - Primary MySQL server"
                    </p>
                  </div>
                  <div className="border rounded-md p-3 bg-red-50 dark:bg-red-950/30">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Bad Example</h4>
                    <p className="text-sm text-muted-foreground mt-1">"Error occurred"</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Alert Severity</h3>
                <p className="text-muted-foreground mb-2">
                  Use appropriate severity levels for your alerts to ensure that critical issues get the attention they
                  deserve.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mt-4">
                  <li>
                    <strong>Critical</strong> - Service is down or severely impacted, requires immediate attention
                  </li>
                  <li>
                    <strong>Error</strong> - Significant issue that needs attention soon but service is still
                    operational
                  </li>
                  <li>
                    <strong>Warning</strong> - Potential issue that should be monitored but doesn't require immediate
                    action
                  </li>
                  <li>
                    <strong>Info</strong> - Informational alert, no action required
                  </li>
                </ul>
              </div>

              <div className="bg-muted rounded-md p-4">
                <h3 className="text-xl font-semibold mb-2">Alert Grouping</h3>
                <p className="text-muted-foreground mb-2">
                  Use tags and metadata to group related alerts together, making it easier to identify patterns and root
                  causes.
                </p>
                <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50 mt-4">
                  <code>{`// Good example with tags and metadata
{
  "title": "Database connection failed",
  "description": "Unable to connect to the primary database",
  "service": "Payment Service",
  "severity": "Critical",
  "tags": ["database", "mysql", "connectivity"],
  "metadata": {
    "host": "db-primary-01",
    "region": "us-west-2",
    "retries": 5
  }
}`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section id="troubleshooting" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Troubleshooting</h2>
            <p className="text-lg text-muted-foreground mb-6">Common issues and their solutions.</p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="auth-issues">
                <AccordionTrigger className="text-lg font-medium">Authentication Issues</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <h3 className="text-md font-semibold">Invalid API Key</h3>
                  <p className="text-muted-foreground">
                    If you're receiving a 401 Unauthorized error, check that you're using a valid API key and that it's
                    being sent correctly in the Authorization header.
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    <code>{`// Correct format
Authorization: Bearer ak_prod_1234567890abcdef1234567890abcdef

// Common mistakes
Authorization: ak_prod_1234567890abcdef1234567890abcdef
Authorization: Bearer: ak_prod_1234567890abcdef1234567890abcdef`}</code>
                  </pre>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rate-limits">
                <AccordionTrigger className="text-lg font-medium">Rate Limits</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-muted-foreground">
                    AlertHub API has rate limits to prevent abuse. If you're receiving a 429 Too Many Requests error,
                    you've exceeded the rate limit.
                  </p>
                  <h3 className="text-md font-semibold">Rate Limit Headers</h3>
                  <p className="text-muted-foreground">
                    The API returns the following headers to help you manage rate limits:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>
                      <code>X-RateLimit-Limit</code> - The maximum number of requests allowed in a time window
                    </li>
                    <li>
                      <code>X-RateLimit-Remaining</code> - The number of requests remaining in the current time window
                    </li>
                    <li>
                      <code>X-RateLimit-Reset</code> - The time at which the current rate limit window resets (Unix
                      timestamp)
                    </li>
                  </ul>
                  <h3 className="text-md font-semibold mt-4">Best Practices</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Implement exponential backoff for retries</li>
                    <li>Batch alerts when possible instead of sending them individually</li>
                    <li>Monitor rate limit headers and adjust your request rate accordingly</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="webhook-issues">
                <AccordionTrigger className="text-lg font-medium">Webhook Issues</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <h3 className="text-md font-semibold">Webhook Not Receiving Events</h3>
                  <p className="text-muted-foreground">
                    If your webhook endpoint is not receiving events, check the following:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Ensure your webhook URL is publicly accessible</li>
                    <li>Check that your server is responding with a 2xx status code</li>
                    <li>Verify that your webhook is correctly configured in the AlertHub dashboard</li>
                    <li>Check your server logs for any errors processing the webhook payload</li>
                  </ul>
                  <h3 className="text-md font-semibold mt-4">Webhook Signature Verification</h3>
                  <p className="text-muted-foreground">
                    If you're having issues verifying webhook signatures, ensure you're using the correct webhook secret
                    and following the signature verification process correctly.
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                    <code>{`// Node.js example of verifying webhook signature
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(\`sha256=\${digest}\`),
    Buffer.from(signature)
  );
}`}</code>
                  </pre>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  )
}

