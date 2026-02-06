import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-white shadow hover:bg-primary-600 focus-visible:ring-primary-500",
        primary:
          "bg-primary-500 text-white shadow hover:bg-primary-600 focus-visible:ring-primary-500",
        destructive:
          "bg-red-500 text-white shadow hover:bg-red-600 focus-visible:ring-red-500",
        danger:
          "bg-red-500 text-white shadow hover:bg-red-600 focus-visible:ring-red-500",
        outline:
          "border border-gray-300 bg-background text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-gray-500",
        secondary:
          "border-2 border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50 focus-visible:ring-primary-500",
        ghost:
          "text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500",
        link: "text-primary-600 underline-offset-4 hover:text-primary-700 hover:underline focus-visible:ring-primary-500",
      },
      size: {
        default: "h-10 px-4 text-sm",
        sm: "h-8 rounded-lg px-3 text-sm",
        md: "h-10 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
