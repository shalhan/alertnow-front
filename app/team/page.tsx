"use client"

import { useState } from "react"
import { Check, Crown, Mail, MoreHorizontal, Plus, Shield, Trash, User, UserPlus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for team members
const mockTeamMembers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "1 year ago",
    status: "Active",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "6 months ago",
    status: "Active",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "3 months ago",
    status: "Active",
  },
  {
    id: "user-4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "1 month ago",
    status: "Pending",
  },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)
  const [newInvite, setNewInvite] = useState({
    email: "",
    role: "Viewer",
  })

  const handleInviteMember = () => {
    const newMember = {
      id: `user-${Date.now()}`,
      name: newInvite.email.split("@")[0],
      email: newInvite.email,
      role: newInvite.role,
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "Just now",
      status: "Pending",
    }

    setTeamMembers([...teamMembers, newMember])
    setShowInviteDialog(false)
    setNewInvite({
      email: "",
      role: "Viewer",
    })
  }

  const handleRemoveMember = (id: string) => {
    setMemberToRemove(id)
    setShowRemoveDialog(true)
  }

  const confirmRemoveMember = () => {
    if (memberToRemove) {
      setTeamMembers(teamMembers.filter((member) => member.id !== memberToRemove))
      setMemberToRemove(null)
      setShowRemoveDialog(false)
    }
  }

  const handleChangeRole = (id: string, role: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, role } : member)))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="h-4 w-4" />
      case "Developer":
        return <Shield className="h-4 w-4" />
      case "Viewer":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-500 text-white"
      case "Developer":
        return "bg-blue-500 text-white"
      case "Viewer":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="Team Management"
        description="Invite and manage team members"
        action={{
          label: "Invite Member",
          onClick: () => setShowInviteDialog(true),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {teamMembers.length > 0 ? (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{member.name}</h3>
                          {member.status === "Pending" && (
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getRoleBadgeColor(member.role)}>
                            <span className="flex items-center gap-1">
                              {getRoleIcon(member.role)}
                              {member.role}
                            </span>
                          </Badge>
                          <span className="text-xs text-muted-foreground">Joined {member.joinedAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleChangeRole(member.id, "Admin")}
                            className="flex items-center gap-2"
                          >
                            <Crown className="h-4 w-4" />
                            <span>Make Admin</span>
                            {member.role === "Admin" && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleChangeRole(member.id, "Developer")}
                            className="flex items-center gap-2"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Make Developer</span>
                            {member.role === "Developer" && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleChangeRole(member.id, "Viewer")}
                            className="flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Make Viewer</span>
                            {member.role === "Viewer" && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <UserPlus className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No team members yet</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Invite team members to collaborate on your AlertNow dashboard.
                </p>
                <Button className="mt-4" onClick={() => setShowInviteDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>Learn about the different roles and their permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <Crown className="h-4 w-4 text-purple-500" />
                </div>
                <h3 className="font-medium">Admin</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Admins have full access to all features and settings. They can manage team members, API keys, and all
                alert configurations.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Manage team members</li>
                <li>Create and manage API keys</li>
                <li>Configure alert rules and integrations</li>
                <li>Access all alerts and settings</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
                <h3 className="font-medium">Developer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Developers can view and manage alerts, create API keys, and configure alert rules. They cannot manage
                team members.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Create and manage API keys</li>
                <li>Configure alert rules and integrations</li>
                <li>Access all alerts and settings</li>
                <li>Cannot manage team members</li>
              </ul>
            </div>

            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                  <User className="h-4 w-4 text-gray-500" />
                </div>
                <h3 className="font-medium">Viewer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Viewers can only view alerts and dashboard information. They cannot make changes to any settings.
              </p>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>View alerts and dashboard</li>
                <li>Cannot create or manage API keys</li>
                <li>Cannot configure alert rules or integrations</li>
                <li>Cannot manage team members</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Invite a new member to your AlertNow team.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="colleague@example.com"
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newInvite.role} onValueChange={(value) => setNewInvite({ ...newInvite, role: value })}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {newInvite.role === "Admin"
                  ? "Admins have full access to all features and settings."
                  : newInvite.role === "Developer"
                    ? "Developers can view and manage alerts, but cannot manage team members."
                    : "Viewers can only view alerts and dashboard information."}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember} disabled={!newInvite.email || !newInvite.email.includes("@")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Dialog */}
      <AlertDialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this team member? They will no longer have access to your AlertNow
              dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveMember}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

