import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cc-button",
  {
    variants: {
      variant: {
        default: "cc-button--primary",
        glass: "",
        secondary: "",
        outline: "cc-button--quiet",
        ghost: "cc-button--quiet border-transparent",
        link: "cc-link min-h-0 border-transparent bg-transparent p-0",
      },
      size: {
        default: "",
        sm: "min-h-10 px-3 text-xs",
        lg: "min-h-12 px-5 text-sm",
        icon: "min-h-10 w-10 px-0",
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
