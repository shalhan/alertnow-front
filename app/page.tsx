"use client"

import { Button } from "@/components/ui/button"
import { BellRing, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Headline */}
      <div className="flex-1 bg-gradient-to-br from-primary/5 to-primary/10 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-xl mx-auto md:mx-0">
          <div className="flex items-center gap-2 mb-6">
            <BellRing className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AlertNow</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Instant Alerts for Your Applications
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            Get real-time notifications in Discord, Slack, and more—directly from your code. Simple setup, powerful
            results.
          </p>

          {/* Supported Channels */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Supported Channels</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Discord - Currently Supported */}
              <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <svg
                  className="h-10 w-10 text-[#5865F2]"
                  viewBox="0 0 71 55"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
                </svg>
                <span className="mt-2 font-medium">Discord</span>
                <span className="text-xs mt-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Available Now</span>
              </div>

              {/* Slack - Coming Soon */}
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                <svg
                  className="h-10 w-10 text-[#4A154B]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                </svg>
                <span className="mt-2 font-medium text-muted-foreground">Slack</span>
                <span className="text-xs mt-1 bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Telegram - Coming Soon */}
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                <svg
                  className="h-10 w-10 text-[#0088cc]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.16-.04-.23-.02-.1.02-1.62 1.03-4.58 3.03-.43.3-.82.44-1.17.43-.39-.01-1.13-.22-1.68-.4-.68-.23-1.22-.35-1.17-.74.02-.2.3-.4.81-.6 3.15-1.37 5.26-2.27 6.33-2.71 3.02-1.24 3.64-1.45 4.05-1.46.1 0 .32.02.46.19.12.14.15.33.17.47-.03.06-.03.12-.05.31z" />
                </svg>
                <span className="mt-2 font-medium text-muted-foreground">Telegram</span>
                <span className="text-xs mt-1 bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>

              {/* Microsoft Teams - Coming Soon */}
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg border">
                <svg
                  className="h-10 w-10 text-[#6264A7]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.25 4.5H15.5a3.5 3.5 0 1 0-7 0H4.75C3.233 4.5 2 5.733 2 7.25v9.5c0 1.517 1.233 2.75 2.75 2.75h14.5c1.517 0 2.75-1.233 2.75-2.75v-9.5c0-1.517-1.233-2.75-2.75-2.75zM12 2.5a1.5 1.5 0 0 1 1.5 1.5h-3A1.5 1.5 0 0 1 12 2.5zM14.25 15h-4.5a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 0 1.5zm3-4h-7.5a.75.75 0 0 1 0-1.5h7.5a.75.75 0 0 1 0 1.5z" />
                </svg>
                <span className="mt-2 font-medium text-muted-foreground">MS Teams</span>
                <span className="text-xs mt-1 bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Installation */}
      <div className="flex-1 bg-muted/30 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 overflow-y-auto">
        <div className="max-w-xl mx-auto md:mx-0">
          <h2 className="text-3xl font-bold mb-8">Get Started Now!</h2>

          {/* Installation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Installation</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => handleCopy("npm install alertnow", "install")}
              >
                {copiedSection === "install" ? (
                  <>
                    <Check className="mr-1 h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" /> Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-background rounded-lg border p-4 overflow-x-auto">
              <pre className="text-sm font-mono">npm install alertnow</pre>
            </div>
          </div>

          {/* Setup */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Setup</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() =>
                  handleCopy(
                    "const alertnow = new AlertNowBuilder()\n  .setDriver('discord')\n  .setWebhook('https://your-discord-webhook')\n  .build()",
                    "setup",
                  )
                }
              >
                {copiedSection === "setup" ? (
                  <>
                    <Check className="mr-1 h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" /> Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-background rounded-lg border p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <span className="text-blue-600">const</span> alertnow = new AlertNowBuilder()
                <br />
                {"  "}.setDriver(<span className="text-green-600">'discord'</span>)<br />
                {"  "}.setWebhook(<span className="text-green-600">'https://your-discord-webhook'</span>)<br />
                {"  "}.build()
              </pre>
            </div>
          </div>

          {/* Send Alert */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Send Alert</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() =>
                  handleCopy(
                    "try {\n  throw new Error('your error')\n} catch (err) {\n  alertnow.send(\"unknown error\", err.Message(), data)\n}",
                    "send",
                  )
                }
              >
                {copiedSection === "send" ? (
                  <>
                    <Check className="mr-1 h-3 w-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1 h-3 w-3" /> Copy
                  </>
                )}
              </Button>
            </div>
            <div className="bg-background rounded-lg border p-4 overflow-x-auto">
              <pre className="text-sm font-mono">
                <span className="text-purple-600">try</span> {"{"}
                <br />
                {"  "}
                <span className="text-purple-600">throw new</span> <span className="text-blue-600">Error</span>(
                <span className="text-green-600">'your error'</span>)<br />
                {"}"} <span className="text-purple-600">catch</span> (err) {"{"}
                <br />
                {"  "}alertnow.send(<span className="text-green-600">"unknown error"</span>, err.Message(), data)
                <br />
                {"}"}
              </pre>
            </div>
          </div>

          {/* Received Alert */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Received Alert</h3>
            </div>
            <div className="relative">
              {/* Discord Notification */}
              <div className="bg-[#36393f] text-white rounded-lg border border-[#202225] p-4 shadow-lg transform transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                      <BellRing className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="font-bold text-[#7289da]">AlertNow Bot</span>
                      <span className="ml-2 text-xs text-gray-400">Today at {new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold text-red-400">🚨 ALERT: unknown error</span>
                    </div>
                    <div className="bg-[#2f3136] rounded p-2 mb-2 text-sm">
                      <div className="font-semibold mb-1">Error Message:</div>
                      <div className="text-gray-300 font-mono">your error</div>
                    </div>
                    <div className="bg-[#2f3136] rounded p-2 text-sm">
                      <div className="font-semibold mb-1">Additional Data:</div>
                      <div className="text-gray-300 font-mono">
                        {"{"}
                        <br />
                        {"  "}"service": "api-gateway",
                        <br />
                        {"  "}"endpoint": "/users",
                        <br />
                        {"  "}"timestamp": "{new Date().toISOString()}"<br />
                        {"}"}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Sent from production
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discord App Frame */}
              <div className="absolute -top-3 -right-3 bg-[#36393f] text-white rounded-md px-2 py-1 text-xs border border-[#202225] shadow-md">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="#ffffff"
                    />
                  </svg>
                  Discord
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
