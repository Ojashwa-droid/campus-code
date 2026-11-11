import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-sans text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Linear / Fern sleek white primary button
        default:
          "bg-white text-black font-semibold shadow-[0_0_20px_-3px_rgba(255,255,255,0.4)] hover:bg-white/90 hover:shadow-[0_0_25px_0_rgba(255,255,255,0.6)]",
        // Glassmorphic dark button with 1px border and inner shadow
        glass:
          "bg-zinc-900/80 text-zinc-200 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-zinc-800 hover:text-white hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_15px_-3px_rgba(255,255,255,0.15)] backdrop-blur-md",
        secondary:
          "bg-zinc-900 text-zinc-300 border border-white/5 hover:bg-zinc-800 hover:text-white",
        outline:
          "border border-white/10 bg-transparent text-zinc-300 hover:bg-white/[0.04] hover:text-white hover:border-white/20",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/[0.04]",
        link:
          "text-zinc-300 underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-sm",
        icon: "h-9 w-9",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
