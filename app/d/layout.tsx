"use client"
import { useState, type ReactNode } from "react"
import Link from "next/link"
import { BarChart3, Bell, Home, Key, Settings, Users, LogOut, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation'
import { signOut } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname()
    const router = useRouter()

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async () => {
        setIsLoading(true)
        try {
          await signOut(auth)
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          })
          router.push("/login")
        } catch (error) {
          console.error("Sign out error:", error)
          toast({
            title: "Sign out failed",
            description: "There was an error signing out. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r bg-background md:flex md:flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/d" className="flex items-center gap-2 font-semibold">
            <img src="../../logo.png" className="h-8 w-8" />
            <span>AlertNow</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Main</h2>
            <div className="space-y-1">
              <Link
                href="/d/dashboard"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname == "/d" || pathname == "/d/dashboard" ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/d/alert-rules"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname == "/d/alert-rules" ? 'bg-accent text-accent-foreground' : ' text-muted-foreground'}`}
              >
                <BarChart3 className="h-4 w-4" />
                Alert Rules
              </Link>
              <Link
                href="/d/api-keys"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname == "/d/api-keys" ? 'bg-accent text-accent-foreground' : ' text-muted-foreground'}`}
              >
                <Key className="h-4 w-4" />
                API Keys
              </Link>
              <Link
                href="/d/team"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname == "/d/team" ? 'bg-accent text-accent-foreground' : ' text-muted-foreground'}`}
              >
                <Users className="h-4 w-4" />
                Team Management
              </Link>
              <Link
                href="/d/settings"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${pathname == "/d/settings" ? 'bg-accent text-accent-foreground' : ' text-muted-foreground'}`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </nav>
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-1 flex-col text-left">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link href="/d/profile" className="flex w-full items-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/d/settings" className="flex w-full items-center">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} disabled={isLoading} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />  <span>{isLoading ? "Signing out..." : "Sign out"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <div className="fixed inset-x-0 top-0 z-20 flex h-14 items-center border-b bg-background px-4 md:hidden">
        <Button variant="outline" size="icon" className="mr-2">
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
        <Link href="/d" className="flex items-center gap-2 font-semibold">
          <Bell className="h-5 w-5 text-primary" />
          <span>AlertNow</span>
        </Link>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        <div className="container py-6 md:py-8">{children}</div>
      </main>
    </div>
  )
}

