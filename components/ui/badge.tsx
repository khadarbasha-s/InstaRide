import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-tight",
  {
    variants: {
      variant: {
        default: "bg-brand-mustard text-brand-cocoa",
        success: "bg-success text-white",
        danger: "bg-danger text-white",
        outline: "border border-brand-cocoa/20 text-brand-cocoa",
        muted: "bg-brand-cream-deep text-brand-cocoa",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
