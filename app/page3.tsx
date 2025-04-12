"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, PenToolIcon as ArrowRight } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import MockNotification from "@/components/ui/mock-notification"
import { FaDiscord, FaSlack, FaTelegram } from "react-icons/fa"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold">AlertNow</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
              How It Works
            </Link>
            <Link href="#who-is-this-for" className="text-sm font-medium hover:underline underline-offset-4">
              Who Is This For
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Tired of Missing Critical Alerts?
                </h1>
                <p className="text-xl text-muted-foreground md:text-2xl">
                  Get Instant Notifications in Discord, Slack, and More—Directly from Your Code!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="text-lg">
                    <Link href="/signup">
                      Start Now - FREE
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative w-full rounded-xl p-4 flex items-center justify-center">
                <img src="/cover2.png?height=600&width=800" alt="AlertNow Dashboard" className="w-full" />
                <MockNotification 
                  className={"left-26 bottom-0"}
                  name={"Discord"}
                  timeout={200}
                  renderIcon={() => (
                    <FaDiscord  aria-hidden="true" className="size-6 text-blue-800" />
                  )} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Why AlertNow?</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Features That Make The Difference
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    ⚡ 
                  </div>
                  <h3 className="text-xl font-bold">Real-time Alerts</h3>
                  <p className="text-muted-foreground">
                    Get notified instantly when issues arise, before they impact your users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    🧠 
                  </div>
                  <h3 className="text-xl font-bold">Smart Rules & Automations</h3>
                  <p className="text-muted-foreground">
                    Create sophisticated routing rules based on error characteristics and severity.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    📊 
                  </div>
                  <h3 className="text-xl font-bold">Comprehensive Dashboard</h3>
                  <p className="text-muted-foreground">
                    Monitor all your systems in one place with intuitive visualizations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    👥 
                  </div>
                  <h3 className="text-xl font-bold">Team Collaboration</h3>
                  <p className="text-muted-foreground">Assign, comment, and resolve issues together with your team.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    📈 
                  </div>
                  <h3 className="text-xl font-bold">Historical Analysis</h3>
                  <p className="text-muted-foreground">
                    Track patterns over time to identify recurring issues and optimize performance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    🔌 
                  </div>
                  <h3 className="text-xl font-bold">Seamless Integrations</h3>
                  <p className="text-muted-foreground">
                    Connect with your favorite tools including Discord, Slack, Telegram, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The AlertNow Difference</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-destructive/50 bg-destructive/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <h3 className="text-xl font-bold">Without AlertNow</h3>
                  </div>
                  <p className="text-lg">
                    You wake up to 100+ angry customer emails. Your API crashed overnight. No alerts. Revenue lost.
                  </p>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <p>Discover issues after your customers do</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <p>Lose revenue during extended downtime</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <p>Damage to your brand reputation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">✅ With AlertNow</h3>
                  </div>
                  <p className="text-lg">
                    Your phone buzzes at 2 AM—AlertNow detects the issue before users notice. You fix it in minutes.
                    Crisis averted.
                  </p>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <p>✅ Instant notifications when issues arise</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <p>✅ Fix problems before customers notice</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <p>✅ Maintain trust and reliability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple Setup, Powerful Results
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Setup Alert Rules</h3>
                <p className="text-muted-foreground">Define exactly what you want to be alerted for.</p>
                <div className="rounded-lg border-2 border-gray-200 shadow-md p-6 w-full text-left bg-white">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-black">Alert Routing Rules</h3>
                  <div className="space-y-6">
                    {/* Rule #1 */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white bg-black rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">1</span>
                          <span className="font-medium text-black">API Timeout Rule</span>
                        </div>
                        <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          Send to Slack
                        </span>
                      </div>
                      <div className="pl-4 space-y-2 text-sm">
                        <div className="flex items-center p-2 bg-white rounded border border-gray-100">
                          <span className="w-28 text-black font-medium">Error Title</span>
                          <span className="px-2 text-gray-500">contains</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-md font-mono text-xs">"API Timeout"</span>
                        </div>
                        <div className="flex items-center p-2 bg-white rounded border border-gray-100">
                          <span className="w-28 text-black font-medium">Log Level</span>
                          <span className="px-2 text-gray-500">is</span>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md font-medium text-xs">ERROR</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rule #2 */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-white bg-black rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">2</span>
                          <span className="font-medium text-black">Database Error Rule</span>
                        </div>
                        <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Send to Discord
                        </span>
                      </div>
                      <div className="pl-4 space-y-2 text-sm">
                        <div className="flex items-center p-2 bg-white rounded border border-gray-100">
                          <span className="w-28 text-black font-medium">Error Message</span>
                          <span className="px-2 text-gray-500">prefix</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-md font-mono text-xs">"Database"</span>
                        </div>
                        <div className="flex items-center p-2 bg-white rounded border border-gray-100">
                          <span className="w-28 text-black font-medium">Service</span>
                          <span className="px-2 text-gray-500">is</span>
                          <span className="bg-gray-100 px-3 py-1 rounded-md font-mono text-xs">"payment-api"</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Integrate in 5 Minutes</h3>
                <p className="text-muted-foreground">Simple API, no complex setup.</p>
                <div className="rounded-lg bg-muted p-4 w-full">
                  <pre className="text-sm text-left overflow-x-auto">
                    <code>
                      {`import { AlertNow } from 'alertnow';

// Initialize with your API key
const alertnow = new AlertNow('YOUR_API_KEY');

// Set up an alert
alertnow.send('critical', 
  "runtime error!", 
  err.Message(), 
  { userId: 1 }
);`}
                    </code>
                  </pre>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Notified in Discord, Telegram, Slack, etc.</h3>
                <p className="text-muted-foreground">Receive alerts on your preferred platforms.</p>
                <div className="grid grid-cols-4 gap-2 w-full">
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.89 4.21 14.76 4.48 14.67 4.69C13.09 4.46 11.51 4.46 9.95 4.69C9.85 4.48 9.72 4.21 9.61 4C8.1 4.26 6.66 4.71 5.33 5.33C2.94 8.8 2.34 12.2 2.64 15.56C4.37 16.86 6.05 17.69 7.71 18.2C8.03 17.78 8.32 17.34 8.57 16.88C8.06 16.69 7.57 16.46 7.11 16.19C7.22 16.11 7.33 16.03 7.43 15.95C10.05 17.17 12.94 17.17 15.53 15.95C15.64 16.03 15.74 16.11 15.85 16.19C15.39 16.46 14.9 16.69 14.39 16.88C14.64 17.34 14.93 17.78 15.25 18.2C16.91 17.69 18.59 16.86 20.32 15.56C20.68 11.65 19.67 8.28 17.27 5.33H19.27ZM8.02 13.5C7.05 13.5 6.25 12.61 6.25 11.52C6.25 10.44 7.03 9.54 8.02 9.54C9.01 9.54 9.8 10.43 9.79 11.52C9.79 12.61 9.01 13.5 8.02 13.5ZM15.98 13.5C15.01 13.5 14.21 12.61 14.21 11.52C14.21 10.44 14.99 9.54 15.98 9.54C16.97 9.54 17.76 10.43 17.75 11.52C17.75 12.61 16.97 13.5 15.98 13.5Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs">Discord</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4476 14.0069 10.4043 14 10.362C13.9828 10.3208 13.9558 10.2848 13.922 10.257C13.87 10.23 13.8 10.24 13.74 10.25C13.67 10.26 12.14 11.25 9.17 13.22C8.71 13.53 8.3 13.68 7.92 13.68C7.51 13.68 6.72 13.47 6.12 13.29C5.38 13.07 4.8 12.95 4.85 12.54C4.87 12.33 5.17 12.11 5.74 11.89C8.92 10.5 11.08 9.58 12.21 9.14C15.33 7.92 16.07 7.69 16.54 7.69C16.65 7.69 16.89 7.72 17.06 7.86C17.2 7.97 17.23 8.12 17.24 8.23C17.24 8.35 17.25 8.69 17.24 8.78L16.64 8.8Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs">Telegram</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5.25 15.75C7.32107 15.75 9 14.0711 9 12C9 9.92893 7.32107 8.25 5.25 8.25C3.17893 8.25 1.5 9.92893 1.5 12C1.5 14.0711 3.17893 15.75 5.25 15.75Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.75 22.5C20.8211 22.5 22.5 20.8211 22.5 18.75C22.5 16.6789 20.8211 15 18.75 15C16.6789 15 15 16.6789 15 18.75C15 20.8211 16.6789 22.5 18.75 22.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.75 9C20.8211 9 22.5 7.32107 22.5 5.25C22.5 3.17893 20.8211 1.5 18.75 1.5C16.6789 1.5 15 3.17893 15 5.25C15 7.32107 16.6789 9 18.75 9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12H15V18.75"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 5.25H9V12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs">Slack</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-lg">
                    <svg className="h-6 w-6 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M21.75 3.75V20.25H2.25V3.75H21.75ZM12 12.75L21 6.75H3L12 12.75Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is This For Section */}
        <section id="who-is-this-for" className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Who Is This For?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perfect For Your Business</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    👥
                  </div>
                  <h3 className="text-xl font-bold">Solo Founders</h3>
                  <p className="text-muted-foreground">
                    Who can't afford downtime and need to maximize their efficiency.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    ⚡
                  </div>
                  <h3 className="text-xl font-bold">Indie Hackers</h3>
                  <p className="text-muted-foreground">Who want peace of mind while scaling their products.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    🛡️
                  </div>
                  <h3 className="text-xl font-bold">SaaS & API Businesses</h3>
                  <p className="text-muted-foreground">Needing real-time monitoring to maintain service reliability.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="signup" className="py-12 md:py-20 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  🚀 Get Started in Minutes
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed">⚡ 5-Minute Setup. Lifetime Peace of Mind.</p>
                <p className="max-w-[900px] md:text-xl/relaxed">💰 Start for Free – Only Pay When You Scale.</p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2 sm:flex-row">
                  <Button type="button" variant="secondary" size="lg" className="w-full">
                    <Link href="/signup"> Sign Up & Get 100 Free Alerts</Link>
                  </Button>
                </form>
              </div>
              <div className="flex items-center justify-center space-x-4 mt-8">
                {/* <Link href="#" className="flex items-center gap-1 text-primary-foreground hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  <span>View Pricing</span>
                </Link> */}
                <Link href="/documentations" className="flex items-center gap-1 text-primary-foreground hover:underline">
                  <ArrowRight className="h-4 w-4" />
                  <span>Read Documentation</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <p className="text-sm text-muted-foreground">© 2025 AlertNow. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

