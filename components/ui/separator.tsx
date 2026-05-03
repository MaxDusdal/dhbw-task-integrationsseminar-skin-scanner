"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * A thin visual divider rendered as either a horizontal rule or a vertical bar.
 *
 * Wraps Radix UI's `Separator.Root` and pre-applies Tailwind sizing utilities
 * so the correct dimension (height vs. width) is applied automatically based
 * on the chosen orientation.
 *
 * @param orientation - `"horizontal"` (default) renders a full-width 1 px line;
 *                      `"vertical"` renders a full-height 1 px bar.
 * @param decorative  - When `true` (default) the element is hidden from the
 *                      accessibility tree (`role="none"`). Set to `false` to
 *                      expose it as `role="separator"` to assistive technology.
 * @param className   - Additional Tailwind classes merged onto the root element.
 *
 * @example
 * // Horizontal divider between two sections
 * <Separator />
 *
 * @example
 * // Vertical divider inside a flex row
 * <Separator orientation="vertical" className="mx-2 h-4" />
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // Base: use the theme border colour and prevent the element from
        // shrinking inside flex/grid containers.
        // Orientation variants: Radix sets data-[orientation] on the element,
        // which Tailwind uses to apply the correct axis dimensions:
        //   horizontal → 1 px tall, full width
        //   vertical   → full height, 1 px wide
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
