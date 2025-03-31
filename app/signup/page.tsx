"use client"

import Link from "next/link"
import { BellRing, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { auth, googleProvider, db } from "@/lib/firebase"
import { Logo } from "@/components/ui/logo"

type Plan = 'free' | 'solo' | 'pro' | 'enterprise'

export default function SignUpPage() {
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
  const plan = searchParams.get("plan")

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

      await saveWaitingList({ id: auth.currentUser?.uid || "", name: auth.currentUser?.displayName || "", plan: plan as Plan })
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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Logo />
            <Link href="/" className="text-xl font-bold">
              AlertNow
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>Enter your information to get started with AlertNow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
                <Input id="name" placeholder="John" autoComplete="given-name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={errors.name ? "border-red-500" : ""} />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <Input id="email" type="email" placeholder="name@example.com" autoComplete="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={errors.email ? "border-red-500" : ""} />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Input id="password" type="password" placeholder="" autoComplete="new-password"  required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}/>
                <p className="text-xs text-muted-foreground mt-1">Password must be at least 8 characters long</p>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Confirm Password
                </label>
                <Input id="confirm-password" type="password" placeholder="" autoComplete="new-password" required />
              </div>
              {/* <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" className="mt-1" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div> */}
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create account
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <div>
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
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t py-4">
        <div className="container flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">
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
          </div>
        </div>
      </footer>
    </div>
  )
}

