import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * CVA variant map for `Alert`.
 *
 * The base styles implement a two-column grid that adapts automatically to
 * the presence of a leading SVG icon:
 * - **Without icon:** the first column collapses to `0`, so title and
 *   description span the full width (`col-start-2` still works because the
 *   zero-width column exists).
 * - **With icon:** `has-[>svg]` widens the first column to 16 px (`--spacing * 4`)
 *   and adds a horizontal gap, placing the icon in column 1 and all text in
 *   column 2.
 *
 * ### Variants
 * | `variant`     | Use case                                              |
 * |---------------|-------------------------------------------------------|
 * | `default`     | Neutral informational message                         |
 * | `destructive` | Error or critical warning — text and icon turn red    |
 */
const alertVariants = cva(
  // ── Base styles ────────────────────────────────────────────────────────────
  // Layout:  two-column grid; first column is 0 px wide unless an SVG is present,
  //          at which point `has-[>svg]` expands it to 16 px and adds a gap.
  // SVG:     fixed at 16 px; nudged down 2 px (`translate-y-0.5`) to optically
  //          align with the first line of the title text.
  // Spacing: `gap-y-0.5` keeps title and description close without touching.
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A themed banner for communicating feedback, warnings, or errors to the user.
 *
 * Renders a `<div role="alert">` so screen readers announce it immediately
 * when it appears in the DOM. Compose with `AlertTitle` and `AlertDescription`
 * for a consistent layout. An optional leading SVG icon placed as a direct
 * child activates the two-column icon-plus-text grid automatically.
 *
 * @param variant   - Visual style. Defaults to `"default"`.
 * @param className - Additional classes merged onto the root element.
 *
 * @example
 * // Neutral info alert without an icon
 * <Alert>
 *   <AlertTitle>Heads up</AlertTitle>
 *   <AlertDescription>Your session expires in 5 minutes.</AlertDescription>
 * </Alert>
 *
 * @example
 * // Destructive alert with a leading icon
 * <Alert variant="destructive">
 *   <TriangleAlertIcon />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Failed to save changes.</AlertDescription>
 * </Alert>
 */
function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * The heading line of an `Alert`.
 *
 * Always placed in grid column 2 (`col-start-2`) so it aligns with the text
 * column regardless of whether an icon is present. `line-clamp-1` prevents
 * long titles from wrapping and `min-h-4` preserves the row height even when
 * the title is empty.
 */
function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/**
 * The body text of an `Alert`, displayed beneath the title.
 *
 * Like `AlertTitle`, pinned to column 2 via `col-start-2`. Renders its own
 * sub-grid (`grid justify-items-start gap-1`) so multiple `<p>` children stack
 * with consistent spacing. The `[&_p]:leading-relaxed` rule loosens line-height
 * on any paragraph descendants for improved readability.
 *
 * In the `destructive` variant the text is automatically tinted to 90 % of the
 * destructive colour via a parent selector in `alertVariants`.
 */
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
