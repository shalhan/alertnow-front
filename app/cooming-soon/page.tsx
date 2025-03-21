"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Bell, Calendar, Check, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Logo } from "@/components/ui/logo"

export default function ComingSoonPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date to 30 days from now
  useEffect(() => {
    const launchDate = new Date("2025-04-21T03:24:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)

    setIsSubscribed(true)
    toast({
      title: "Subscription successful!",
      description: "We'll notify you when we launch.",
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50/50 to-sky-50 dark:from-indigo-950/30 dark:via-purple-950/20 dark:to-sky-950/30 flex flex-col">
      {/* Header */}
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-bold">AlertNow</span>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-white">
                <Clock className="h-10 w-10" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're working on something awesome! Our new advanced alert analytics feature is almost ready.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/50">
              <CardContent className="p-6 text-center">
                <span className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {countdown.days}
                </span>
                <p className="text-sm text-muted-foreground mt-1">Days</p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/50">
              <CardContent className="p-6 text-center">
                <span className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {countdown.hours}
                </span>
                <p className="text-sm text-muted-foreground mt-1">Hours</p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/50">
              <CardContent className="p-6 text-center">
                <span className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {countdown.minutes}
                </span>
                <p className="text-sm text-muted-foreground mt-1">Minutes</p>
              </CardContent>
            </Card>
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-indigo-100 dark:border-indigo-900/50">
              <CardContent className="p-6 text-center">
                <span className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {countdown.seconds}
                </span>
                <p className="text-sm text-muted-foreground mt-1">Seconds</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AlertNow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

