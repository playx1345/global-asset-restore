import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-500",
  {
    variants: {
      variant: {
        default: "shadow-card hover:shadow-card-hover border-border",
        elevated: "shadow-elegant hover:shadow-glow hover:-translate-y-1 border-border",
        glass: "glass border-white/10 shadow-lg",
        gradient:
          "relative overflow-hidden before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-primary/50 before:via-transparent before:to-neon-purple/30 before:opacity-0 before:transition-opacity before:duration-500 before:-z-10 before:pointer-events-none hover:before:opacity-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 border-border",
        interactive:
          "shadow-card hover:shadow-card-hover hover:-translate-y-2 cursor-pointer border-border hover:border-primary/30",
        // New Crypto variants
        crypto:
          "card-crypto hover:shadow-neon-cyan hover:-translate-y-2 cursor-pointer",
        glow:
          "card-glow border-primary/20 hover:border-primary/40",
        neon:
          "relative overflow-hidden bg-card border-primary/20 shadow-card hover:shadow-neon-cyan hover:-translate-y-2 before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-primary before:via-neon-purple before:to-primary before:bg-[length:200%_100%] before:opacity-0 before:transition-opacity before:duration-500 before:-z-10 before:pointer-events-none hover:before:opacity-100 hover:before:animate-border-flow",
        tilt:
          "tilt-3d shadow-card hover:shadow-glow border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-bold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };