import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive flex min-h-24 w-full rounded border bg-black/20 px-3 py-2 font-mono text-sm shadow-xs outline-none focus-visible:ring-[3px]", className)}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Textarea };
