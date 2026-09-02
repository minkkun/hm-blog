export const DEFAULT_CATEGORY = "📂 All" as string

/**
 * The tag the bare feed is filtered to. It is an organising device rather than
 * a label, so it never renders as a chip on a post — the flyout and the rail
 * name it instead.
 */
export const FEATURED_TAG = "featured"

/**
 * Reserved `?tag=` value for the unfiltered archive. `/` means Featured now,
 * so "every post" needs an address of its own. A real Notion tag named "all"
 * would collide with it.
 */
export const ALL_TAG = "all"

/**
 * Notion's multi-select keeps whatever case the tag was typed in, and the
 * column has been called both things — match either rather than let a stray
 * "d" empty the homepage.
 */
export const isFeaturedTag = (tag?: string | null) =>
  !!tag && ["feature", "featured"].includes(tag.toLowerCase())
