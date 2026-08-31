import type { NextRouter } from "next/router"

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
