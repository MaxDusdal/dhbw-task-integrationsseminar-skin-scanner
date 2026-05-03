import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The outermost card container.
 *
 * Renders a rounded, shadowed surface with a vertical flex layout and
 * consistent gap between its sub-components. All card parts are composed
 * inside this wrapper.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Subtitle</CardDescription>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter>…</CardFooter>
 * </Card>
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Header region of a card, containing the title, description, and optional action.
 *
 * Uses a CSS container query context (`@container/card-header`) and a two-row
 * auto grid so that:
 * - Without a `CardAction`: title and description span the full width.
 * - With a `CardAction`: a second column is added automatically via the
 *   `has-data-[slot=card-action]` selector, and the action is pinned to the
 *   top-right of that column.
 *
 * The `[.border-b]:pb-6` variant adds bottom padding when a `border-b` class
 * is present on this element, creating space above a dividing line.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Establishes a named container query scope for child components.
        // Two implicit rows (title + description) sized to their content.
        // When a CardAction is present, a second column is injected automatically.
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Primary heading of the card.
 *
 * Rendered as a `<div>` to stay out of the document outline — wrap with a
 * semantic heading tag (`<h2>`, etc.) when document structure matters.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Secondary descriptive text displayed beneath the card title.
 *
 * Intentionally uses a muted colour and smaller font size to create visual
 * hierarchy without competing with the title.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Optional interactive element (e.g. a button or badge) pinned to the
 * top-right of the card header.
 *
 * When present, `CardHeader` detects this slot via the
 * `has-data-[slot=card-action]` selector and adds a second column to its grid,
 * causing the action to span both header rows (`row-span-2`) while the title
 * and description remain in the first column.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Main body region of the card.
 *
 * Provides only horizontal padding to match the header and footer, leaving
 * vertical spacing and layout entirely to the caller.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Footer region of the card, typically used for actions or summary metadata.
 *
 * Items are laid out in a horizontal flex row with baseline-aligned content.
 * The `[.border-t]:pt-6` variant adds top padding when a `border-t` class is
 * present, creating breathing room below a dividing line.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
