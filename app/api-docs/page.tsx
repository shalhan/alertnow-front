"use client"

import { useState } from "react"
import { Check, Code, Copy, ExternalLink, FileJson } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="API & SDK Documentation"
        description="Learn how to integrate with our alerting system"
        action={{
          label: "API Reference",
          onClick: () => console.log("View API reference"),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn how to send alerts to our system using our API or SDKs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                All API requests require an API key for authentication. You can generate API keys in the
                <Button variant="link" className="px-1 h-auto">
                  API Keys
                </Button>
                section.
              </p>
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">API Key Authentication</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => handleCopyCode("Authorization: Bearer YOUR_API_KEY", "auth")}
                  >
                    {copiedCode === "auth" ? (
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
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sending Alerts</h3>
              <p className="text-sm text-muted-foreground">
                You can send alerts to our system using a simple POST request to our API endpoint.
              </p>

              <Tabs defaultValue="curl">
                <TabsList>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="go">Go</TabsTrigger>
                </TabsList>

                <TabsContent value="curl" className="rounded-md bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">cURL Example</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() =>
                        handleCopyCode(
                          `curl -X POST https://api.AlertNow.example/v1/alerts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Database connection failed",
    "description": "Unable to connect to the primary database",
    "service": "Payment Service",
    "severity": "Critical"
  }'`,
                          "curl",
                        )
                      }
                    >
                      {copiedCode === "curl" ? (
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
                    <code>{`curl -X POST https://api.AlertNow.example/v1/alerts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Database connection failed",
    "description": "Unable to connect to the primary database",
    "service": "Payment Service",
    "severity": "Critical"
  }'`}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="nodejs" className="rounded-md bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Node.js Example</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() =>
                        handleCopyCode(
                          `const sendAlert = async () => {
  try {
    const response = await fetch('https://api.AlertNow.example/v1/alerts', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Database connection failed',
        description: 'Unable to connect to the primary database',
        service: 'Payment Service',
        severity: 'Critical',
      }),
    });
    
    const data = await response.json();
    console.log('Alert sent successfully:', data);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
};

sendAlert();`,
                          "nodejs",
                        )
                      }
                    >
                      {copiedCode === "nodejs" ? (
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
                    <code>{`const sendAlert = async () => {
  try {
    const response = await fetch('https://api.AlertNow.example/v1/alerts', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Database connection failed',
        description: 'Unable to connect to the primary database',
        service: 'Payment Service',
        severity: 'Critical',
      }),
    });
    
    const data = await response.json();
    console.log('Alert sent successfully:', data);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
};

sendAlert();`}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="python" className="rounded-md bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Python Example</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() =>
                        handleCopyCode(
                          `import requests
import json

def send_alert():
    url = "https://api.AlertNow.example/v1/alerts"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    payload = {
        "title": "Database connection failed",
        "description": "Unable to connect to the primary database",
        "service": "Payment Service",
        "severity": "Critical"
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        print("Alert sent successfully:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error sending alert:", e)

send_alert()`,
                          "python",
                        )
                      }
                    >
                      {copiedCode === "python" ? (
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
                    <code>{`import requests
import json

def send_alert():
    url = "https://api.AlertNow.example/v1/alerts"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    payload = {
        "title": "Database connection failed",
        "description": "Unable to connect to the primary database",
        "service": "Payment Service",
        "severity": "Critical"
    }
    
    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        print("Alert sent successfully:", response.json())
    except requests.exceptions.RequestException as e:
        print("Error sending alert:", e)

send_alert()`}</code>
                  </pre>
                </TabsContent>

                <TabsContent value="go" className="rounded-md bg-muted p-4">
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
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Alert struct {
	Title       string \`json:"title"\`
	Description string \`json:"description"\`
	Service     string \`json:"service"\`
	Severity    string \`json:"severity"\`
}

func sendAlert() {
	url := "https://api.AlertNow.example/v1/alerts"
	alert := Alert{
		Title:       "Database connection failed",
		Description: "Unable to connect to the primary database",
		Service:     "Payment Service",
		Severity:    "Critical",
	}
	
	alertJSON, err := json.Marshal(alert)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}
	
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(alertJSON))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	req.Header.Set("Content-Type", "application/json")
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
	
	fmt.Println("Response Status:", resp.Status)
}

func main() {
	sendAlert()
}`,
                          "go",
                        )
                      }
                    >
                      {copiedCode === "go" ? (
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
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Alert struct {
	Title       string \`json:"title"\`
	Description string \`json:"description"\`
	Service     string \`json:"service"\`
	Severity    string \`json:"severity"\`
}

func sendAlert() {
	url := "https://api.AlertNow.example/v1/alerts"
	alert := Alert{
		Title:       "Database connection failed",
		Description: "Unable to connect to the primary database",
		Service:     "Payment Service",
		Severity:    "Critical",
	}
	
	alertJSON, err := json.Marshal(alert)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}
	
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(alertJSON))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return
	}
	
	req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
	req.Header.Set("Content-Type", "application/json")
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return
	}
	defer resp.Body.Close()
	
	fmt.Println("Response Status:", resp.Status)
}

func main() {
	sendAlert()
}`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">API Reference</h3>
              <p className="text-sm text-muted-foreground">Explore our API endpoints and learn how to use them.</p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="alerts">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      Alerts API
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">POST /v1/alerts</h4>
                      <p className="text-sm text-muted-foreground mt-1">Create a new alert in the system.</p>

                      <div className="mt-4">
                        <h5 className="text-xs font-medium text-muted-foreground">Request Body</h5>
                        <pre className="mt-1 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
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

                      <div className="mt-4">
                        <h5 className="text-xs font-medium text-muted-foreground">Response</h5>
                        <pre className="mt-1 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
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
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">GET /v1/alerts</h4>
                      <p className="text-sm text-muted-foreground mt-1">List all alerts with optional filtering.</p>

                      <div className="mt-4">
                        <h5 className="text-xs font-medium text-muted-foreground">Query Parameters</h5>
                        <ul className="mt-1 space-y-1 text-sm">
                          <li>
                            <code>service</code> - Filter by service name
                          </li>
                          <li>
                            <code>severity</code> - Filter by severity
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
                            <code>limit</code> - Maximum number of results
                          </li>
                          <li>
                            <code>offset</code> - Pagination offset
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">GET /v1/alerts/{"{id}"}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Get a specific alert by ID.</p>
                    </div>

                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">PUT /v1/alerts/{"{id}"}/resolve</h4>
                      <p className="text-sm text-muted-foreground mt-1">Mark an alert as resolved.</p>

                      <div className="mt-4">
                        <h5 className="text-xs font-medium text-muted-foreground">Request Body</h5>
                        <pre className="mt-1 overflow-x-auto rounded-md bg-slate-950 p-4 text-sm text-slate-50">
                          <code>{`{
  "resolution": "string",    // Optional: Resolution details
  "resolvedBy": "string"     // Optional: User who resolved the alert
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="services">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      Services API
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">GET /v1/services</h4>
                      <p className="text-sm text-muted-foreground mt-1">List all services registered in the system.</p>
                    </div>

                    <div className="rounded-md bg-muted p-4 mt-4">
                      <h4 className="text-sm font-medium">POST /v1/services</h4>
                      <p className="text-sm text-muted-foreground mt-1">Register a new service.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rules">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      Rules API
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">GET /v1/rules</h4>
                      <p className="text-sm text-muted-foreground mt-1">List all alert rules.</p>
                    </div>

                    <div className="rounded-md bg-muted p-4 mt-4">
                      <h4 className="text-sm font-medium">POST /v1/rules</h4>
                      <p className="text-sm text-muted-foreground mt-1">Create a new alert rule.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">SDKs</h3>
              <p className="text-sm text-muted-foreground">
                We provide official SDKs for popular programming languages to make integration easier.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Node.js SDK</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Official Node.js SDK for AlertNow.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Code className="h-4 w-4" />
                        npm install
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Python SDK</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Official Python SDK for AlertNow.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Code className="h-4 w-4" />
                        pip install
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Go SDK</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Official Go SDK for AlertNow.</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Code className="h-4 w-4" />
                        go get
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

