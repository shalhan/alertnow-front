"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleJoinWaitlist = (plan: string) => {
    setSelectedPlan(plan)
    setShowWaitlistModal(true)
  }

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Submitting waitlist request:", { ...formData, plan: selectedPlan })
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      setShowWaitlistModal(false)
      setFormData({
        name: "",
        email: "",
        company: "",
      })
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <AlertTriangle className="h-6 w-6 text-primary" /> */}
            <img src="./logo.png" />
            <span className="text-lg font-bold">AlertNow</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#use-cases" className="text-sm font-medium hover:text-primary">
              Use Cases
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Documentation
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
                Now in Beta
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Simple & Reliable Alerting API 
                </span>{" "}
                for Your Apps 🚀
              </h1>
              <p className="text-xl text-muted-foreground">
                AlertNow helps you detect and respond to issues before they impact your users. Get real-time alerts,
                powerful automations, and comprehensive insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border">
                <img src="/placeholder.svg?height=600&width=800" alt="AlertNow Dashboard" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor your systems and respond to issues quickly and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-blue-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">🔔</div>
                <CardTitle>Real-time Alerts</CardTitle>
                <CardDescription>Get notified instantly when issues arise in your systems.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Configure alerts based on thresholds, patterns, or anomalies. Receive notifications through multiple
                  channels including email, Slack, and more.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-purple-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">⚡</div>
                <CardTitle>Smart Rules & Automations</CardTitle>
                <CardDescription>Create powerful rules to automate your alert workflow.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Define complex conditions and actions to route alerts to the right teams, escalate unresolved issues,
                  and automate remediation steps.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-green-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">📊</div>
                <CardTitle>Comprehensive Dashboard</CardTitle>
                <CardDescription>Visualize and manage all your alerts in one place.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Get a bird's-eye view of your system health with customizable dashboards, detailed alert history, and
                  powerful filtering capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-amber-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">🤝</div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>Work together to resolve issues faster.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Assign alerts to team members, add comments, and track resolution progress. Keep everyone in the loop
                  with shared alert visibility.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-cyan-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">📈</div>
                <CardTitle>Historical Analysis</CardTitle>
                <CardDescription>Learn from past incidents to prevent future ones.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Analyze alert patterns over time, identify recurring issues, and measure your team's response
                  effectiveness with detailed metrics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-r from-transparent to-rose-500/20"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4">🔌</div>
                <CardTitle>Seamless Integrations</CardTitle>
                <CardDescription>Connect with your existing tools and workflows.</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground">
                  Integrate with popular monitoring tools, communication platforms, and ticketing systems. Use our API
                  to build custom integrations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section
        id="who-is-for"
        className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Solo Founders</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how solo founders like you use AlertNow to stay on top of their business without the stress.
            </p>
          </div>

          <Tabs defaultValue="saas" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="saas">SaaS Founders</TabsTrigger>
              <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
              <TabsTrigger value="content">Content Creators</TabsTrigger>
            </TabsList>

            <TabsContent value="saas" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">SaaS Founders</h3>
                  <p className="text-muted-foreground mb-4">
                    As a solo SaaS founder, you're wearing multiple hats. AlertNow helps you monitor your application's
                    health without constant manual checks.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Get notified when your servers experience high load or downtime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Monitor database performance and connection issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Track API errors and slow response times</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Get alerts for unusual user behavior or security issues</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="SaaS Founder Use Case"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ecommerce" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">E-commerce Founders</h3>
                  <p className="text-muted-foreground mb-4">
                    For solo e-commerce entrepreneurs, every minute of downtime means lost sales. AlertNow keeps you
                    informed of critical issues.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Get instant alerts when your store is down or experiencing issues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Monitor payment gateway failures in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Track inventory discrepancies and low stock automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Get notified of unusual order patterns or potential fraud</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="E-commerce Founder Use Case"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="content" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Content Creators</h3>
                  <p className="text-muted-foreground mb-4">
                    For bloggers, YouTubers, and digital creators, your content is your business. AlertNow helps ensure
                    your platforms stay up and running.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Monitor your website uptime and performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Get alerts when comments or engagement metrics spike</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Track monetization platform issues in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Monitor social media API connectivity and performance</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border">
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Content Creator Use Case"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of teams who have improved their incident response with AlertNow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Doe</h4>
                    <p className="text-sm text-muted-foreground">CTO at TechCorp</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "AlertNow has transformed how our team handles incidents. We've reduced our MTTR by 60% and our
                  engineers are much happier with the streamlined workflow."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">MS</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Mike Smith</h4>
                    <p className="text-sm text-muted-foreground">SRE Lead at CloudScale</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The automation capabilities in AlertNow are game-changing. We've set up complex routing rules that
                  ensure the right people get notified at the right time."
                </p>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">AL</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Amy Lee</h4>
                    <p className="text-sm text-muted-foreground">IT Director at FinTech Inc</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The integration with our existing tools was seamless. AlertNow has become the central hub for all our
                  alerts, making it much easier to manage incidents."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="border-2 border-muted relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
              <CardHeader className="relative">
                <CardTitle>Free</CardTitle>
                <CardDescription>For small teams just getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Up to 3 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>100 alerts per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Email notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>7-day alert history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Basic dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">Advanced automations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">Custom integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  onClick={() => handleJoinWaitlist("Free")}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Join Waitlist
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary relative overflow-hidden bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950/30 hover:shadow-xl transition-all duration-300 scale-105 z-10">
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader className="relative">
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing teams with advanced needs</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Up to 10 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Unlimited alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Email, Slack, and webhook notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>30-day alert history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced dashboard with custom views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced automations and rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Standard integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  onClick={() => handleJoinWaitlist("Pro")}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                  Join Waitlist
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 border-muted relative overflow-hidden bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/30 hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
              <CardHeader className="relative">
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large teams with complex requirements</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Unlimited team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Unlimited alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>All notification channels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Unlimited alert history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Custom dashboard and reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Advanced automations and rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>SLA guarantees</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  onClick={() => handleJoinWaitlist("Enterprise")}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your alert management?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join the AlertNow beta and be among the first to experience the future of intelligent alerting.
          </p>
          <Button size="lg" variant="secondary" onClick={() => handleJoinWaitlist("Beta")}>
            Join the Beta Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">AlertNow</span>
              </div>
              <p className="text-muted-foreground">Intelligent alert management for modern teams.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="text-muted-foreground hover:text-primary">
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} AlertNow. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      <Dialog open={showWaitlistModal} onOpenChange={setShowWaitlistModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join the AlertNow Waitlist</DialogTitle>
            <DialogDescription>
              {selectedPlan === "Enterprise"
                ? "Leave your details and our sales team will contact you shortly."
                : "Be among the first to try AlertNow when we launch our beta."}
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Thank you for joining our waitlist!</h3>
              <p className="text-muted-foreground">We'll notify you when AlertNow is ready for you to try.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitWaitlist}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Selected Plan</Label>
                  <div className="p-2 bg-muted rounded-md">{selectedPlan} Plan</div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowWaitlistModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Join Waitlist</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
;<style jsx global>{`
  .bg-grid-slate-100 {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(226 232 240 / 0.8)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  }
  
  .bg-grid-slate-700 {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(51 65 85 / 0.8)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
  }
`}</style>

