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
import { Logo } from "@/components/ui/logo"

const plans = [
  {
    name: "Free",
    description: "For personal projects and testing",
    price: "$0",
    features: [
      "1 project",
      "1 environment",
      "10 alerts/month",
      "7-day event history",
      "Discord notifications",
      "Basic analytics"
    ],
    missingFeatures: [
      "Telegram & Email notifications",
      "Webhooks",
      "Custom alert rules",
      "Advanced analytics",
      "Priority support"
    ],
    isMostPopular: false
  },
  {
    name: "Solo",
    description: "For indie devs and growing projects",
    price: "$9",
    features: [
      "3 projects",
      "2 environments (Prod + Staging)",
      "5,000 alerts/month",
      "30-day event history",
      "Slack, Discord, Telegram & Email notifications",
      "Webhooks",
      "Basic analytics"
    ],
    missingFeatures: [
      "Advanced analytics",
      "Custom alert rules",
      "Priority support"
    ],
    isMostPopular: true
  },
  {
    name: "Pro",
    description: "For teams & production apps",
    price: "$29",
    features: [
      "10 projects",
      "3 environments (Prod, Staging, Dev)",
      "20,000 alerts/month",
      "90-day event history",
      "Slack, Discord, Telegram, Email & Webhooks",
      "Advanced analytics",
      "Custom alert rules",
      "Priority support"
    ],
    missingFeatures: [],
    isMostPopular: false

  }
]


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
    if (plan != "") {
      window.location.href = "/signup?plan=" +  plan.toLowerCase()
    }

    window.location.href = "/signup"
    // setSelectedPlan(plan)
    // setShowWaitlistModal(true)
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
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
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:text-slate-300">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-sky-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-sky-950/30 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] -z-10"></div>
        <div className="absolute top-0 -left-40 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-violet-500 to-indigo-300 opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="absolute top-60 -right-40 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blue-600 to-cyan-400 opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <Badge className="mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 px-3 py-1 text-sm">
                Beta Soon
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Effortless Alerts, Seamless Monitoring
                </span>{" "}
                Integrate in Minutes!
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Simple API for real-time alerts. Send notifications to email, Slack, or webhooks instantly. Easy setup, reliable, and built for developers!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                   onClick={() => document.getElementById("pricing")!.scrollIntoView({ behavior: "smooth" })}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:text-slate-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {/* <Button size="lg" variant="outline" className="border-indigo-200 dark:border-indigo-800">
                  Watch Demo
                </Button> */}
              </div>
            </div>
            <div className="flex-1">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-indigo-100 dark:border-indigo-900/50">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/90 dark:from-indigo-950/50 dark:to-slate-900/90 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img src="/hiw2.png?height=600&width=800" alt="AlertNow Dashboard" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              How it Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get started with AlertNow in three simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-36">

            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold z-10">
                1
              </div>
              {/* Connecting line */}
              <div className="absolute left-[7px] top-12 bottom-0 w-[2px] h-[calc(100%+4rem)] bg-gradient-to-b from-blue-600 to-indigo-600/20 z-0"></div>

              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Set Up Your Monitors</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Configure monitors for your key metrics and services with our intuitive dashboard. Define
                      thresholds, conditions, and patterns to watch for, and customize how you want to be notified when
                      issues arise.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                    <img
                      src="/hiw4.png?height=300&width=800"
                      alt="Configure AlertNow Monitors"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold z-10">
                2
              </div>
              {/* Connecting line */}
              <div className="absolute left-[7px] top-12 bottom-0 w-[2px] h-[calc(100%+4rem)] bg-gradient-to-b from-blue-600 to-indigo-600/20 z-0"></div>

              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-900/50">
                    <img
                      src="/hiw1.png"
                      alt="Integrate AlertNow SDK"
                      className="w-full h-auto object-cover h-full"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Call Our Library</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Integrate our lightweight SDK into your application with just a few lines of code. Our library
                      works with all major programming languages and frameworks, making it easy to add alert
                      capabilities to your existing systems.
                    </p>
                    <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-4 font-mono text-sm overflow-x-auto">
                      <code className="text-indigo-600 dark:text-indigo-400">
                        alertNow.send("critical", "Database connection failed");
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-4 top-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold z-10">
                3
              </div>

              <div className="pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Receive Smart Alerts</h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Get notified via <strong>email, Slack, Discord, SMS, or other channels</strong> when issues arise, and resolve them quickly.
                      Our intelligent alert system reduces noise by grouping related alerts and suggesting potential
                      solutions.
                    </p>
                  </div>
                  <div className="rounded-lg overflow-hidden p-6">
                    <img
                      src="/hiw3.png"
                      alt="Receive AlertNow Notifications"
                      className="w-full h-auto h-full rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Everything you need to monitor your systems and respond to issues quickly and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-indigo-500 to-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  🔔
                </div>
                <CardTitle className="text-xl">Real-time Alerts</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Get notified instantly when issues arise in your systems.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Configure alerts based on thresholds, patterns, or anomalies. Receive notifications through multiple
                  channels including email, Slack, and more.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-violet-50/30 dark:from-slate-900 dark:to-violet-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-violet-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-violet-500 to-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  ⚡
                </div>
                <CardTitle className="text-xl">Smart Rules & Automations</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Create powerful rules to automate your alert workflow.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Define complex conditions and actions to route alerts to the right teams, escalate unresolved issues,
                  and automate remediation steps.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-teal-50/30 dark:from-slate-900 dark:to-teal-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-teal-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-teal-500 to-emerald-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <CardTitle className="text-xl">Comprehensive Dashboard</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Visualize and manage all your alerts in one place.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Get a bird's-eye view of your system health with customizable dashboards, detailed alert history, and
                  powerful filtering capabilities.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-amber-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-amber-500 to-orange-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  🤝
                </div>
                <CardTitle className="text-xl">Team Collaboration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Work together to resolve issues faster.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Assign alerts to team members, add comments, and track resolution progress. Keep everyone in the loop
                  with shared alert visibility.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-cyan-50/30 dark:from-slate-900 dark:to-cyan-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-cyan-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  📈
                </div>
                <CardTitle className="text-xl">Historical Analysis</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Learn from past incidents to prevent future ones.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Analyze alert patterns over time, identify recurring issues, and measure your team's response
                  effectiveness with detailed metrics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative bg-gradient-to-br from-white to-rose-50/30 dark:from-slate-900 dark:to-rose-950/30">
              <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-rose-500/20 to-transparent"></div>
              <CardHeader className="relative z-10">
                <div className="text-4xl mb-4 bg-gradient-to-br from-rose-500 to-pink-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                  🔌
                </div>
                <CardTitle className="text-xl">Seamless Integrations</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Connect with your existing tools and workflows.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 dark:text-slate-400">
                  Integrate with popular monitoring tools, communication platforms, and ticketing systems. Use our API
                  to build custom integrations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white dark:bg-slate-900">

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50/50 to-slate-50 dark:from-indigo-950/30 dark:via-violet-950/20 dark:to-slate-950/30 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-white dark:from-slate-900 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              Perfect for Solo Founders
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              See how solo founders like you use AlertNow to stay on top of their business without the stress.
            </p>
          </div>

          <Tabs defaultValue="saas" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-indigo-100/50 dark:bg-indigo-950/50 p-1">
              <TabsTrigger value="saas" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                SaaS Founders
              </TabsTrigger>
              <TabsTrigger
                value="ecommerce"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 text-ellipsis"
              >
                DevOps
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800"
              >
                Freelancer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saas" className="mt-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">SaaS Founders & Indie Hackers</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    You're running a lean operation—every second counts. Get real-time alerts on app failures, server downtimes, and API errors before users notice. No complex setup, just instant notifications when things break.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        ⚡ Get real-time alerts before your users notice issues
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        ⏳ No complex setup—just plug and play
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        📉 Avoid revenue loss from unexpected downtime
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                    <img
                      src="/img1.jpg?height=400&width=600"
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
                  <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Developers & DevOps Engineers</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Monitor logs, system health, and uptime effortlessly. Our lightweight alerting system ensures you're always in control, without the hassle of enterprise-level complexity. Set up in minutes, stay informed forever
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        🛠️ Monitor logs, system health, and uptime effortlessly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        🚀 Lightweight & fast—set up in minutes, not hours
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        🔔 Get alerts via Slack, email, or webhooks instantly
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                    <img
                      src="/img2.jpg?height=400&width=600"
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
                  <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Consultants & Agencies</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Managing multiple client projects? Keep track of every site, API, and system in one dashboard. Provide proactive alerts to clients and ensure smooth operations—without constantly checking dashboards.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        🔄 Track multiple client projects in one place
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        ✅ Ensure smooth operations with proactive alerting
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300">
                        📊 Impress clients with real-time monitoring and insights
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="rounded-lg overflow-hidden shadow-lg border border-indigo-100 dark:border-indigo-900/50">
                    <img
                      src="/img3.jpg?height=400&width=600"
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


      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-950 dark:to-indigo-950/30 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent inline-block">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`${plan.isMostPopular ? 'scale-110' : ''} border border-slate-200 dark:border-slate-800 relative overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300`}>
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                { plan.isMostPopular ? 
                <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  MOST POPULAR
                </div> : ''}
                <CardHeader>
                  <CardTitle className="text-slate-900 dark:text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                    {plan.missingFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <X className="h-5 w-5 text-slate-400 mt-0.5" />
                        <span className="text-slate-400 dark:text-slate-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleJoinWaitlist(plan.name)}
                    className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 dark:text-slate-300"
                  >
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}

          {/* Solo Plan */}
          {/* <Card className="border border-indigo-200 dark:border-indigo-800 relative overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300 scale-105 z-10">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500"></div>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">Solo</CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">
                  For growing teams with advanced needs
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">$9</span>
                  <span className="text-slate-500 dark:text-slate-400">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Up to 10 team members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Unlimited alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Email, Slack, and webhook notifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">30-day alert history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Advanced dashboard with custom views</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Advanced automations and rules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300">Standard integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleJoinWaitlist("Pro")}
                  className="w-full bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
                >
                  Join Waitlist
                </Button>
              </CardFooter>
          </Card> */}

          {/* Pro Plan */}
          {/* <Card className="border border-slate-200 dark:border-slate-800 relative overflow-hidden bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Start Up</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                For small teams just getting started
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">$19</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">Up to 3 team members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">100 alerts per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">Email notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">7-day alert history</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-indigo-500 mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">Basic dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-slate-400 mt-0.5" />
                  <span className="text-slate-400 dark:text-slate-500">Advanced automations</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-5 w-5 text-slate-400 mt-0.5" />
                  <span className="text-slate-400 dark:text-slate-500">Custom integrations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleJoinWaitlist("Free")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              >
                Join Waitlist
              </Button>
            </CardFooter>
          </Card> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-slate-950 dark:to-indigo-950/30">
        <div className="absolute inset-0-z-10"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] -z-10"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-500/20 to-blue-600/20 animate-gradient-slow -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>

        {/* Glowing orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl -z-10"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">
              Ready to transform your alert management?
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Join the AlertNow beta and be among the first to experience the future of intelligent alerting.
            </p>
            <Button
              size="lg"
              onClick={() => handleJoinWaitlist("")}
              className="bg-white text-indigo-600 hover:bg-white/90 hover:text-indigo-700 font-medium text-lg px-8 shadow-lg"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo />
                <span className="text-lg font-bold text-slate-900 dark:text-white">AlertNow</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">Intelligent alert management for modern teams.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#use-cases"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Use Cases
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Legal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} AlertNow. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400">
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
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 dark:text-slate-300"
                >
                  Join Waitlist
                </Button>
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

