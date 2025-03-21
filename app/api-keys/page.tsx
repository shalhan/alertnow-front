"use client"

import { useState } from "react"
import { Check, Copy, Eye, EyeOff, Key, Plus, RefreshCw, Trash } from "lucide-react"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for API keys
const mockApiKeys = [
  {
    id: "key-1",
    name: "Production API Key",
    key: "ak_prod_1234567890abcdef1234567890abcdef",
    createdAt: "2 weeks ago",
    lastUsed: "5 minutes ago",
  },
  {
    id: "key-2",
    name: "Development API Key",
    key: "ak_dev_1234567890abcdef1234567890abcdef",
    createdAt: "1 month ago",
    lastUsed: "2 days ago",
  },
  {
    id: "key-3",
    name: "Testing API Key",
    key: "ak_test_1234567890abcdef1234567890abcdef",
    createdAt: "3 months ago",
    lastUsed: "Never",
  },
]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)
  const [newKeyName, setNewKeyName] = useState("")
  const [newGeneratedKey, setNewGeneratedKey] = useState("")
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleAddKey = () => {
    const newKey = `ak_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 30)}`
    setNewGeneratedKey(newKey)

    const newApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: newKey,
      createdAt: "Just now",
      lastUsed: "Never",
    }

    setApiKeys([...apiKeys, newApiKey])
    setShowAddDialog(false)
    setShowNewKeyDialog(true)
    setNewKeyName("")
  }

  const handleDeleteKey = (id: string) => {
    setKeyToDelete(id)
    setShowDeleteDialog(true)
  }

  const confirmDeleteKey = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter((key) => key.id !== keyToDelete))
      setKeyToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  const toggleKeyVisibility = (id: string) => {
    if (visibleKeys.includes(id)) {
      setVisibleKeys(visibleKeys.filter((keyId) => keyId !== id))
    } else {
      setVisibleKeys([...visibleKeys, id])
    }
  }

  const handleCopyKey = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <DashboardHeader
        title="API Keys"
        description="Manage API keys for accessing the AlertNow API"
        action={{
          label: "Generate API Key",
          onClick: () => setShowAddDialog(true),
        }}
      />

      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        <Card>
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {apiKeys.length > 0 ? (
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{apiKey.name}</h3>
                        <Badge variant="outline">API Key</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1 font-mono text-sm">
                          {visibleKeys.includes(apiKey.id) ? apiKey.key : "•".repeat(40)}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(apiKey.id)}>
                          {visibleKeys.includes(apiKey.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">{visibleKeys.includes(apiKey.id) ? "Hide" : "Show"}</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key, apiKey.id)}>
                          {copiedKey === apiKey.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span className="sr-only">Copy</span>
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created {apiKey.createdAt}</span>
                        <span>Last used {apiKey.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => console.log("Regenerate key", apiKey.id)}
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Regenerate</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => handleDeleteKey(apiKey.id)}
                      >
                        <Trash className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Revoke</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Key className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No API keys yet</h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Generate your first API key to start using the AlertNow API.
                </p>
                <Button className="mt-4" onClick={() => setShowAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate API Key
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Key Security</CardTitle>
            <CardDescription>Best practices for keeping your API keys secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Keep your API keys private</h3>
              <p className="text-sm text-muted-foreground">
                Never share your API keys in publicly accessible areas such as GitHub, client-side code, or forums.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Use environment variables</h3>
              <p className="text-sm text-muted-foreground">
                Store your API keys in environment variables instead of hardcoding them in your application.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Rotate your keys regularly</h3>
              <p className="text-sm text-muted-foreground">
                Regenerate your API keys periodically to minimize the impact of a compromised key.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Revoke unused keys</h3>
              <p className="text-sm text-muted-foreground">
                If you no longer need an API key, revoke it immediately to prevent unauthorized access.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add API Key Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>Create a new API key for accessing the AlertNow API.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="key-name">API Key Name</Label>
              <Input
                id="key-name"
                placeholder="Production API Key"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give your API key a descriptive name to identify its purpose.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddKey} disabled={!newKeyName}>
              Generate Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New API Key Dialog */}
      <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
            <DialogDescription>
              Your new API key has been generated. Make sure to copy it now as you won't be able to see it again.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-key">API Key</Label>
              <div className="flex items-center gap-2">
                <Input id="new-key" value={newGeneratedKey} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={() => handleCopyKey(newGeneratedKey, "new-key")}>
                  {copiedKey === "new-key" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This is the only time you'll see this API key. Please copy it and store it securely.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowNewKeyDialog(false)}>I've Copied My Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete API Key Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this API key? This action cannot be undone and any applications using this
              key will no longer be able to access the API.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteKey}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Revoke Key
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

