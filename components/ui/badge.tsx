import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * CVA variant map for `Badge`.
 *
 * Exported separately so other components can apply badge styling without
 * rendering a `<Badge>` element (e.g. on a custom tag or link).
 *
 * Hover styles use the `[a&]` parent-type selector so they only activate
 * when the badge is rendered inside (or as) an `<a>` element — static badges
 * receive no hover state.
 *
 * ### Variants
 * | `variant`     | Use case                                           |
 * |---------------|----------------------------------------------------|
 * | `default`     | Primary colour — highest visual prominence         |
 * | `secondary`   | Muted fill — supplementary labels                  |
 * | `destructive` | Red/danger — errors, warnings, critical status     |
 * | `outline`     | Border only, no fill — neutral or inactive labels  |
 * | `ghost`       | No chrome until hovered — blends into surrounding UI |
 * | `link`        | Text-only with hover underline — inline references |
 */
const badgeVariants = cva(
  // ── Base styles ────────────────────────────────────────────────────────────
  // Shape:   pill via `rounded-full`; `border-transparent` reserves space for
  //          the border so layout doesn't shift when a variant adds one.
  // Sizing:  `w-fit` prevents the badge from stretching; `shrink-0` stops it
  //          from collapsing inside flex containers.
  // SVG:     fixed at 12 px; pointer-events disabled so clicks hit the badge.
  // Focus:   ring + border change on focus-visible for keyboard accessibility.
  // ARIA:    `aria-invalid` adds a destructive ring/border for form error states.
  // Misc:    `overflow-hidden` clips any child content that exceeds the pill boundary.
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A compact pill-shaped label used to convey status, category, or metadata.
 *
 * Renders a `<span>` by default. When `asChild` is `true`, props and styles
 * are merged onto the single child element via Radix `Slot`, allowing any
 * element (e.g. `<a>`, `<Link>`) to be styled as a badge without an extra
 * DOM node.
 *
 * Hover styles are gated behind the `[a&]` selector, so they only activate
 * when the badge itself is (or is inside) an anchor element.
 *
 * `data-variant` is forwarded to the DOM element so parent components can
 * target specific variants with CSS attribute selectors.
 *
 * @param variant  - Visual style. Defaults to `"default"`.
 * @param asChild  - When `true`, merges props onto the child element instead
 *                   of rendering a `<span>`. The child must be a single React element.
 * @param className - Additional classes appended after variant classes.
 *
 * @example
 * // Static status badge
 * <Badge variant="secondary">Beta</Badge>
 *
 * @example
 * // Destructive badge for an error count
 * <Badge variant="destructive">3 errors</Badge>
 *
 * @example
 * // Anchor styled as a badge (asChild pattern)
 * <Badge asChild variant="outline">
 *   <a href="/tags/react">React</a>
 * </Badge>
 */
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
