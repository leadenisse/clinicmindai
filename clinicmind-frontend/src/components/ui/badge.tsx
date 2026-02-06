import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-0 bg-primary-100 text-primary-700",
        primary: "border-0 bg-primary-100 text-primary-700",
        secondary: "border-0 bg-navy-100 text-navy-700",
        success: "border-0 bg-green-100 text-green-700",
        warning: "border-0 bg-amber-100 text-amber-700",
        error: "border-0 bg-red-100 text-red-700",
        destructive: "border-0 bg-red-100 text-red-700",
        info: "border-0 bg-primary-100 text-primary-700",
        gray: "border-0 bg-gray-100 text-gray-700",
        navy: "border-0 bg-navy-100 text-navy-700",
        outline: "border border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
