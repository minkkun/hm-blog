import type { NextRouter } from "next/router"

/**
 * Marks the document while a route change is in flight. The chrome only claims
 * its transition names under this attribute: a cover opening a post is a
 * different kind of move, and naming the wordmark and rail there too would
 * pull them out of the snapshot that morph is composed against.
 */
export const ROUTE_TRANSITION_ATTR = "data-route-transition"

/**
 * The one name a cover wears while it is in flight. A single fixed name rather
 * than one per post: only ever one cover is travelling, and a view transition
 * refuses to run at all if two rendered elements claim the same name — which a
 * per-slug scheme would hit the moment two Notion rows share a slug, as two of
 * them currently do.
 */
export const COVER_TRANSITION_NAME = "post-cover"

const canAnimate = () =>
  typeof document !== "undefined" &&
  typeof (document as any).startViewTransition === "function" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Navigates, letting the cover already on screen grow into the one on the post.
 * Returns false when the browser cannot do it or the reader has asked for
 * stillness, in which case the caller should just let the link navigate.
 */
export function navigateWithCover(
  router: NextRouter,
  href: string,
  cover?: HTMLElement | null
) {
  if (!canAnimate()) return false

  // `viewTransitionName` is newer than the DOM typings this project ships.
  if (cover) cover.style.setProperty("view-transition-name", COVER_TRANSITION_NAME)

  const transition = (document as any).startViewTransition(() =>
    // Resolves once React has committed the post, which is what the browser
    // then photographs for the second half of the morph.
    router.push(href)
  )

  // The feed unmounts on a successful navigation, but a cancelled one leaves
  // the card behind still claiming the name, which would block the next
  // transition. Hand it back either way.
  transition.finished.finally(() => {
    if (cover) cover.style.removeProperty("view-transition-name")
  })

  return true
}

/**
 * Navigates between the site's sections with the chrome held still.
 *
 * The wordmark and the rail are the same elements on every route, so they are
 * named and the browser keeps those very pixels rather than fading one copy
 * into an identical one. Everything else rides in the root snapshot and rises
 * a little as it comes in. The column's width differs between the full-bleed
 * routes and the centred ones, which is why it is deliberately NOT named: a
 * named box morphs its geometry, and that would stretch the outgoing page
 * across the width of the incoming one.
 */
export function navigateHoldingChrome(
  router: NextRouter,
  href: Parameters<NextRouter["push"]>[0]
) {
  if (!canAnimate()) return false

  const root = document.documentElement
  root.setAttribute(ROUTE_TRANSITION_ATTR, "true")

  const transition = (document as any).startViewTransition(() =>
    router.push(href)
  )

  // Hand the attribute back however it ends — a cancelled transition would
  // otherwise leave the chrome named and block the next one.
  transition.finished.finally(() => root.removeAttribute(ROUTE_TRANSITION_ATTR))

  return true
}
