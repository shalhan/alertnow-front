"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { sendPasswordResetEmail } from "firebase/auth"

export default function ForgotPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState("")

  const validateEmail = () => {
    if (!email) {
      setError("Email is required")
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email)

      setEmailSent(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error: any) {
      console.error("Password reset error:", error)

      if (error.code === "auth/user-not-found") {
        // For security reasons, we don't want to reveal if an email exists or not
        // So we still show success message even if the email doesn't exist
        setEmailSent(true)
        toast({
          title: "Reset link sent",
          description: "If an account exists with this email, you will receive a password reset link.",
        })
      } else {
        setError("Failed to send reset link. Please try again.")
        toast({
          title: "Request failed",
          description: "There was an error sending the reset link. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-md text-white">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <Link href="/landing" className="text-lg font-bold">
              AlertNow
            </Link>
          </div>

          {emailSent ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight mb-4">Check your email</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                instructions to reset your password.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Try again
                </Button>
                <Button asChild variant="link">
                  <Link href="/login">Back to login</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Forgot your password?</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <div className="mt-8">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium">
                      Email address
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={error ? "border-red-500" : ""}
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Send reset link
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button asChild variant="link">
                      <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                      </Link>
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 to-blue-600">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]"></div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.3),transparent)]"></div>
        </div>
      </div>
    </div>
  )
}

