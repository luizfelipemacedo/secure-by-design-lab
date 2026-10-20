import * as React from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wide text-cyan-100/80 select-none", className)} {...props} />;
}

export { Label };
