"use client"

import { useState, useEffect } from "react"
import { X, Construction, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DevelopmentNotice() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  // Reset visibility when route changes
  useEffect(() => {
    setIsVisible(true)
    
    // Store minimized state in localStorage
    const storedMinimized = localStorage.getItem("devNoticeMinimized")
    if (storedMinimized) {
      setIsMinimized(storedMinimized === "true")
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const toggleMinimize = () => {
    const newMinimized = !isMinimized
    setIsMinimized(newMinimized)
    localStorage.setItem("devNoticeMinimized", newMinimized.toString())
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isMinimized ? "transform translate-y-[calc(100%-40px)]" : ""
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="relative rounded-lg bg-amber-50 p-4 shadow-lg border border-amber-200">
          <div 
            className="absolute top-0 left-0 right-0 h-8 bg-amber-100 rounded-t-lg cursor-pointer flex items-center justify-center"
            onClick={toggleMinimize}
          >
            <div className="w-10 h-1 bg-amber-300 rounded-full" />
          </div>
          
          <div className="pt-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <Construction className="h-5 w-5 text-amber-600" aria-hidden="true" />
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-amber-700">
                  <strong>Development Preview:</strong> AlertNow is currently under active development. You can explore the features we're building, but functionality is limited. Some buttons and features may not work as expected.
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-amber-600 hover:bg-amber-100"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
