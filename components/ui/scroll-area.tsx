"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * A scrollable container that hides the native browser scrollbar and replaces
 * it with a styled overlay scrollbar via Radix UI's ScrollArea primitive.
 *
 * Renders three Radix sub-components internally:
 * - `Viewport`  — the clipped, scrollable content window.
 * - `ScrollBar` — the custom vertical (and optionally horizontal) track + thumb.
 * - `Corner`    — fills the dead zone when both scrollbars are visible.
 *
 * @param className - Additional classes merged onto the root `position: relative` wrapper.
 * @param children  - Content to render inside the scrollable viewport.
 *
 * @example
 * <ScrollArea className="h-64">
 *   <LongList />
 * </ScrollArea>
 */
function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      // `relative` establishes the stacking context the overlay scrollbar is positioned within.
      className={cn("relative", className)}
      {...props}
    >
      {/* Viewport: clips overflow and sizes itself to fill the root container.
          `rounded-[inherit]` keeps the viewport corners in sync with any
          border-radius set on the root. Focus styles are applied when the
          viewport itself receives keyboard focus. */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {/* Custom scrollbar track + thumb (vertical by default). */}
      <ScrollBar />
      {/* Corner: the small square that appears at the intersection of a
          vertical and horizontal scrollbar. Radix renders it automatically
          when both orientations are present. */}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/**
 * The styled scrollbar track and draggable thumb used inside `ScrollArea`.
 *
 * Supports both `"vertical"` (default, right-hand rail) and `"horizontal"`
 * (bottom rail) orientations. Layout differences between the two are handled
 * via conditional Tailwind classes:
 * - Vertical   → fixed width (`w-2.5`), full height, left border as gutter.
 * - Horizontal → fixed height (`h-2.5`), flex-col layout, top border as gutter.
 *
 * The transparent border on each orientation creates a small invisible gutter
 * between the thumb and the viewport edge without affecting the visible size.
 *
 * @param orientation - `"vertical"` (default) or `"horizontal"`.
 * @param className   - Additional classes merged onto the scrollbar track element.
 */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        // Base: disable touch-driven scrollbar interaction (Radix handles it),
        // add 1 px padding so the thumb doesn't touch the track edge, and
        // suppress text selection while dragging.
        "flex touch-none p-px transition-colors select-none",
        // Vertical rail: narrow fixed width, spans full height of the viewport.
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        // Horizontal rail: short fixed height, flex-col so the thumb fills the width.
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
       {/* Thumb: the draggable indicator. `flex-1` lets Radix size it proportionally
          to the visible scroll ratio; `rounded-full` gives it a pill shape. */}
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
