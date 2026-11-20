import * as React from "react";
import { cn } from "cn";

/**
 * Inventra's admin layout primitives.
 * Both use semantic spacing tokens from app/design-tokens.css.
 * The real <main> is already rendered by SidebarInset.
 */
export function PageShell({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-page"
      className={cn(
        "flex min-w-0 flex-col gap-app-section px-app-page py-app-page-y",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="app-page-header"
      className={cn(
        "flex min-w-0 flex-wrap items-start justify-between gap-app-grid",
        className,
      )}
      {...props}
    />
  );
}
