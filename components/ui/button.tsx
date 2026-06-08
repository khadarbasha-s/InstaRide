import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mustard focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-mustard text-brand-cocoa hover:bg-brand-mustard-deep shadow-sm",
        secondary:
          "bg-transparent text-brand-cocoa border border-brand-cocoa/30 hover:bg-brand-cocoa hover:text-brand-cream hover:border-brand-cocoa",
        terracotta:
          "bg-brand-terracotta text-white hover:bg-brand-terracotta-deep shadow-sm",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-sm",
        call:
          "bg-brand-cocoa text-brand-cream hover:bg-brand-cocoa/90 shadow-sm",
        outline:
          "border border-brand-cocoa/20 bg-transparent text-brand-cocoa hover:bg-brand-cream-deep",
        ghost:
          "text-brand-cocoa hover:bg-brand-cream-deep",
        destructive:
          "bg-danger text-white hover:opacity-90 shadow-sm",
      },
      size: {
        default: "h-11 px-6 rounded-full text-sm",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-12 px-7 rounded-full text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
