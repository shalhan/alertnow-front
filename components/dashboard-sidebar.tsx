"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AlertTriangle, Bell, Home, Key, Link2, Settings, Users, BookOpen } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/auth-provider"
import { Logo } from "./ui/logo"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: Bell,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: Link2,
  },
  {
    title: "Alert Rules",
    href: "/alert-rules",
    icon: AlertTriangle,
  },
  {
    title: "API & SDK Docs",
    href: "/api-docs",
    icon: BookOpen,
  },
  {
    title: "API Keys",
    href: "/api-keys",
    icon: Key,
  },
  {
    title: "Team Management",
    href: "/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2">
          <Logo />
          <span className="text-lg font-bold">AlertNow</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <UserMenu />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.displayName || "User"}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

