"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter, usePathname } from "next/navigation"

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      // Handle redirects based on auth state
      if (user) {
        // If user is logged in and trying to access auth pages, redirect to dashboard
        if (pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password") {
          router.push("/cooming-soon")
        }
      } else {
        // If user is not logged in and trying to access protected pages, redirect to login
        // Add your protected routes here
        const protectedRoutes = [
          "/dashboard",
          "/alerts",
          "/integrations",
          "/alert-rules",
          "/api-docs",
          "/api-keys",
          "/team",
          "/settings",
        ]
        if (protectedRoutes.includes(pathname)) {
          router.push("/login")
        }
      }
    })

    return () => unsubscribe()
  }, [pathname, router])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

