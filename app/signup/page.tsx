"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { AlertTriangle, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { auth, googleProvider, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { Logo } from "@/components/ui/logo"
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type Plan = 'free' | 'solo' | 'pro' | 'enterprise'

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  })
  const searchParams = useSearchParams()

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", password: "", general: "" }

    if (!formData.name) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({ name: "", email: "", password: "", general: "" })

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      })

      toast({
        title: "Account created",
        description: "Welcome to AlertNow! Your account has been created successfully.",
      })

      const plan = searchParams.get("plan")
      await saveWaitingList({ id: userCredential.user.uid, name: formData.name, plan: plan as Plan })

      // Router will automatically redirect to dashboard via AuthProvider
    } catch (error: any) {
      console.error("Signup error:", error)

      // Handle specific Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        setErrors({
          ...errors,
          email: "Email is already in use",
        })
      } else if (error.code === "auth/weak-password") {
        setErrors({
          ...errors,
          password: "Password is too weak",
        })
      } else {
        setErrors({
          ...errors,
          general: "Failed to create account. Please try again.",
        })
      }

      toast({
        title: "Signup failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveWaitingList = async (user: {id: string, name: string | null, plan?: Plan }) => {
    try {
      await addDoc(collection(db, "waitingList"), {
        id: user.id,
        name: user.name,
        plan: user.plan,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error("Waiting list error:", error)
    }
  }

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true)
    setErrors({ name: "", email: "", password: "", general: "" })

    try {
      // Sign up with Google
      await signInWithPopup(auth, googleProvider)

      toast({
        title: "Google signup successful",
        description: "Welcome to AlertNow! Your account has been created successfully.",
      })

      // Router will automatically redirect to dashboard via AuthProvider
    } catch (error: any) {
      console.error("Google signup error:", error)

      if (error.code === "auth/popup-closed-by-user") {
        // User closed the popup, no need to show an error
      } else {
        setErrors({
          ...errors,
          general: "Failed to sign up with Google. Please try again.",
        })

        toast({
          title: "Google signup failed",
          description: "Please try again or use email signup.",
          variant: "destructive",
        })
      }
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Left side - Signup form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-2 mb-8">
            <Logo />
            <Link href="/" className="text-lg font-bold">
              AlertNow
            </Link>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-md">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium">
                    Full name
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                </div>

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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Password must be at least 8 characters
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <Label htmlFor="terms" className="ml-2 block text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create account
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-slate-50 px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button onClick={handleGoogleSignup} disabled={isGoogleLoading} variant="outline" className="w-full">
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  )}
                  Sign up with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 to-blue-600">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]"></div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(120,119,198,0.3),transparent)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md text-center text-white">
              <div className="mb-6 flex justify-center">
                <Logo className="rounded-full bg-slate-100 p-4 backdrop-blur-sm"/>
              </div>
              <h2 className="text-3xl font-bold mb-4">Join AlertNow today</h2>
              <p className="text-lg text-white/80 mb-6">
                Get started with intelligent alerts and powerful automations for your systems
              </p>
              <Button
                variant="outline"
                className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
                asChild
              >
                <Link href="/">
                  Explore features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

