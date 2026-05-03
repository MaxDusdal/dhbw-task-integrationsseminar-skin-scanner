"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Root accordion container.
 *
 * A thin wrapper around Radix UI's `Accordion.Root` that stamps a `data-slot`
 * attribute for external CSS targeting. All Radix props (`type`, `value`,
 * `defaultValue`, `onValueChange`, etc.) are forwarded as-is.
 *
 * @example
 * // Single-open accordion
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">…</AccordionItem>
 * </Accordion>
 *
 * @example
 * // Multiple-open accordion
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">…</AccordionItem>
 *   <AccordionItem value="item-2">…</AccordionItem>
 * </Accordion>
 */
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

/**
 * A single collapsible section within an `Accordion`.
 *
 * Renders a bottom border to visually separate items. The border is suppressed
 * on the last item via `last:border-b-0` to avoid a double-border with any
 * surrounding container.
 *
 * @param value - Unique identifier for this item, used by the root to track
 *                open/closed state.
 */
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

/**
 * The clickable header row that toggles an `AccordionItem` open or closed.
 *
 * Wraps Radix's `Accordion.Header` + `Accordion.Trigger` pair. The chevron
 * icon rotates 180° when the item is open via the
 * `[&[data-state=open]>svg]:rotate-180` selector, driven by the `data-state`
 * attribute Radix sets on the trigger element.
 *
 * @param children - Label content displayed to the left of the chevron.
 */
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * The collapsible content panel of an `AccordionItem`.
 *
 * Radix sets `data-state="open"` or `data-state="closed"` on the content
 * element, which drives the slide-down / slide-up CSS animations defined in
 * Tailwind config (`animate-accordion-down` / `animate-accordion-up`).
 * `overflow-hidden` is required for the height animation to clip correctly.
 *
 * An inner `<div>` holds the actual padding so that the padding itself is not
 * animated — only the outer wrapper's height changes.
 *
 * @param children  - Content to display when the item is open.
 * @param className - Classes applied to the inner padding wrapper, not the
 *                    animated outer element.
 */
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
