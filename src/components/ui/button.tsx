import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-neon-cyan hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        outline:
          "border-2 border-border bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/50 hover:-translate-y-0.5",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        // New Crypto/Neon variants
        neon: "relative overflow-hidden bg-gradient-to-r from-primary to-neon-purple text-primary-foreground shadow-neon-cyan hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.6),0_0_60px_hsl(var(--neon-purple)/0.3)] hover:-translate-y-1 hover:scale-[1.02] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-700",
        cyber: "relative overflow-hidden bg-background border-2 border-primary text-primary shadow-glow hover:shadow-neon-cyan hover:bg-primary/10 hover:-translate-y-0.5 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-primary/10 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500",
        glass:
          "glass-crypto text-foreground hover:bg-card/70 hover:border-primary/30 hover:shadow-glow hover:-translate-y-0.5",
        hero: "relative overflow-hidden bg-gradient-to-r from-primary to-neon-purple text-primary-foreground shadow-neon-cyan hover:shadow-[0_0_50px_hsl(var(--neon-cyan)/0.5)] hover:-translate-y-1 hover:scale-[1.02] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-700",
        action:
          "relative overflow-hidden bg-primary text-primary-foreground shadow-glow hover:shadow-neon-cyan hover:-translate-y-0.5 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/15 after:to-transparent after:translate-x-[-100%] hover:after:translate-x-[100%] after:transition-transform after:duration-500",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };