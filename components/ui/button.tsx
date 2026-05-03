import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * CVA variant map for `Button`.
 *
 * Exported separately so other components (e.g. links styled as buttons) can
 * apply the same visual variants without rendering a `<Button>` element.
 *
 * ### Variants
 * | `variant`     | Use case                                              |
 * |---------------|-------------------------------------------------------|
 * | `default`     | Primary call-to-action                                |
 * | `destructive` | Irreversible or dangerous actions (delete, revoke)    |
 * | `outline`     | Secondary action with visible border                  |
 * | `secondary`   | Lower-emphasis alternative to the primary             |
 * | `ghost`       | Minimal chrome, hover-only background                 |
 * | `link`        | Appears as an inline text link with an underline      |
 *
 * ### Sizes
 * | `size`      | Height  | Notes                                         |
 * |-------------|---------|-----------------------------------------------|
 * | `default`   | 36 px   | Standard button                               |
 * | `xs`        | 24 px   | Compact; shrinks icon to 12 px                |
 * | `sm`        | 32 px   | Slightly reduced                              |
 * | `lg`        | 40 px   | Larger tap target                             |
 * | `icon`      | 36 px   | Square icon-only button                       |
 * | `icon-xs`   | 24 px   | Square icon-only, compact                     |
 * | `icon-sm`   | 32 px   | Square icon-only, small                       |
 * | `icon-lg`   | 40 px   | Square icon-only, large                       |
 */
const buttonVariants = cva(
  // ── Base styles ────────────────────────────────────────────────────────────
  // Layout: inline-flex so the button sizes to its content while keeping
  //         children (text + icon) centred and on one line.
  // SVG:    pointer-events disabled so clicks always target the button itself;
  //         default icon size is 16 px unless the icon already has a size class.
  // Focus:  ring + border change on focus-visible for keyboard accessibility.
  // ARIA:   `aria-invalid` adds a destructive ring/border for form error states.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * A polymorphic button component with built-in variant and size support.
 *
 * Renders a native `<button>` by default. When `asChild` is `true`, the
 * button's props and styles are merged onto its single child element via
 * Radix's `Slot`, allowing any element (e.g. `<Link>`) to be styled as a
 * button without adding an extra DOM node.
 *
 * `data-variant` and `data-size` are forwarded to the DOM element so parent
 * components can target specific button configurations with CSS selectors.
 *
 * @param variant  - Visual style. Defaults to `"default"`.
 * @param size     - Size preset. Defaults to `"default"`.
 * @param asChild  - When `true`, merges props onto the child element instead
 *                   of rendering a `<button>`. The child must be a single
 *                   React element.
 * @param className - Additional classes merged after variant classes.
 *
 * @example
 * // Standard primary button
 * <Button>Save</Button>
 *
 * @example
 * // Destructive action
 * <Button variant="destructive" size="sm">Delete</Button>
 *
 * @example
 * // Next.js Link styled as a button (asChild pattern)
 * <Button asChild>
 *   <Link href="/dashboard">Go to dashboard</Link>
 * </Button>
 */
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
