import type { VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "..";

const titleVariants = cva("text-center uppercase text-foreground", {
  variants: {
    variant: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-md",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

interface TitleProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  asChild?: boolean;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";
    return (
      <Comp
        className={cn(titleVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Title.displayName = "Title";

export { Title, titleVariants };
