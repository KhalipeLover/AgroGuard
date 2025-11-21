import * as React from "react";

import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("glass-card dark:glass-card-dark animate-pulse rounded-md shimmer", className)}
      {...props}
    />
  );
}

export { Skeleton };