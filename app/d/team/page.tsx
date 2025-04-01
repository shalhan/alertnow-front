"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, Shield, User, UserCog, UserX, Mail, Check, AlertCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

// Sample data for team members
const sampleMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    joinDate: "2023-01-15T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "member",
    joinDate: "2023-02-20T14:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "viewer",
    joinDate: "2023-03-10T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "member",
    joinDate: "2023-04-05T16:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "member",
    joinDate: "2023-05-12T11:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
]

// Role definitions
const roles = [
  {
    id: "admin",
    name: "Admin",
    description: "Full access to all settings and features",
    icon: <Shield className="h-4 w-4 text-primary" />,
  },
  {
    id: "member",
    name: "Member",
    description: "Can manage alerts and channels, but cannot modify team settings",
    icon: <UserCog className="h-4 w-4 text-primary" />,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to alerts and dashboards",
    icon: <User className="h-4 w-4 text-primary" />,
  },
]

export default function TeamPage() {
  const [members, setMembers] = useState(sampleMembers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Form state
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [newRole, setNewRole] = useState("")

  // Get selected member
  const selectedMember = selectedMemberId ? members.find((m) => m.id === selectedMemberId) : null

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle opening role dialog
  const handleOpenRoleDialog = (memberId: string) => {
    setSelectedMemberId(memberId)
    const member = members.find((m) => m.id === memberId)
    if (member) {
      setNewRole(member.role)
      setIsRoleDialogOpen(true)
    }
  }

  // Handle opening revoke dialog
  const handleOpenRevokeDialog = (memberId: string) => {
    setSelectedMemberId(memberId)
    setIsRevokeDialogOpen(true)
  }

  // Handle sending invitation
  const handleSendInvitation = () => {
    // Validate email
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Check if email already exists
    if (members.some((m) => m.email.toLowerCase() === inviteEmail.toLowerCase())) {
      toast({
        title: "Email already exists",
        description: "This email is already associated with a team member.",
        variant: "destructive",
      })
      return
    }

    // Create new member
    const newMember = {
      id: `new-${Date.now()}`,
      name: inviteEmail.split("@")[0], // Use part of email as temporary name
      email: inviteEmail,
      role: inviteRole,
      joinDate: new Date().toISOString(),
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
    }

    // Add to members list
    setMembers([...members, newMember])

    // Close dialog and reset form
    setIsAddDialogOpen(false)
    setInviteEmail("")
    setInviteRole("member")

    // Show success toast
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${inviteEmail}.`,
    })
  }

  // Handle updating role
  const handleUpdateRole = () => {
    if (selectedMemberId && newRole) {
      // Update member role
      setMembers(members.map((member) => (member.id === selectedMemberId ? { ...member, role: newRole } : member)))

      // Close dialog
      setIsRoleDialogOpen(false)

      // Show success toast
      toast({
        title: "Role updated",
        description: `The team member's role has been updated to ${roles.find((r) => r.id === newRole)?.name}.`,
      })
    }
  }

  // Handle revoking access
  const handleRevokeAccess = () => {
    if (selectedMemberId) {
      // Remove member
      setMembers(members.filter((member) => member.id !== selectedMemberId))

      // Close dialog
      setIsRevokeDialogOpen(false)

      // Show success toast
      toast({
        title: "Access revoked",
        description: "The team member has been removed from your team.",
      })
    }
  }

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>
      case "member":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Member</Badge>
      case "viewer":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Viewer</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Invite and manage team members</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Invite Member
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No team members</h3>
              <p className="text-muted-foreground max-w-sm mb-4">
                You haven't added any team members yet. Invite your colleagues to collaborate.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Invite Member
              </Button>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <AlertCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No results found</h3>
              <p className="text-muted-foreground max-w-sm mb-4">
                No team members match your search criteria. Try a different search term.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground md:hidden">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{member.email}</TableCell>
                    <TableCell>{getRoleBadge(member.role)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{getStatusBadge(member.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenRoleDialog(member.id)}>
                            <UserCog className="mr-2 h-4 w-4" /> Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (member.status === "pending") {
                                // Resend invitation
                                toast({
                                  title: "Invitation resent",
                                  description: `A new invitation has been sent to ${member.email}.`,
                                })
                              } else {
                                // Send password reset
                                toast({
                                  title: "Password reset sent",
                                  description: `A password reset link has been sent to ${member.email}.`,
                                })
                              }
                            }}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            {member.status === "pending" ? "Resend Invitation" : "Reset Password"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleOpenRevokeDialog(member.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <UserX className="mr-2 h-4 w-4" /> Revoke Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Invite Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Send an invitation email to add a new team member.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup value={inviteRole} onValueChange={setInviteRole}>
                {roles.map((role) => (
                  <div key={role.id} className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value={role.id} id={`role-${role.id}`} className="mt-1" />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={`role-${role.id}`} className="flex items-center cursor-pointer">
                        {role.icon}
                        <span className="ml-2 font-medium">{role.name}</span>
                      </Label>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvitation}>
              <Mail className="mr-2 h-4 w-4" /> Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Role</DialogTitle>
            <DialogDescription>Update the role and permissions for {selectedMember?.name}.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <RadioGroup value={newRole} onValueChange={setNewRole}>
              {roles.map((role) => (
                <div key={role.id} className="flex items-start space-x-2 rounded-md border p-3">
                  <RadioGroupItem value={role.id} id={`new-role-${role.id}`} className="mt-1" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor={`new-role-${role.id}`} className="flex items-center cursor-pointer">
                      {role.icon}
                      <span className="ml-2 font-medium">{role.name}</span>
                    </Label>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole}>
              <Check className="mr-2 h-4 w-4" /> Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revoke Access Dialog */}
      <Dialog open={isRevokeDialogOpen} onOpenChange={setIsRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Access</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedMember?.name} from your team? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setIsRevokeDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRevokeAccess}>
              <UserX className="mr-2 h-4 w-4" /> Revoke Access
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

