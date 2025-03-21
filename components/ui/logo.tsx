"use client"

import React from "react"

const Logo = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className={className}>
        <img src="./logo.png" className="h-8 w-8" />
    </div>
))

export { Logo }