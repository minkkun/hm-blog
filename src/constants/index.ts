export const DEFAULT_CATEGORY = "📂 All" as string

/**
 * The tag the bare feed is filtered to. It is an organising device rather than
 * a label, so it never renders as a chip on a post — the heading and the
 * flyout name the view instead.
 */
export const FEATURED_TAG = "featured"

/**
 * Reserved `?tag=` value for the unfiltered archive. `/` means Featured, so
 * "every post" needs an address of its own. A real Notion tag named "all"
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

/**
 * Tags that never reach the reader. "featured" is machinery; "morethanlog" is
 * a leftover from the template this blog was forked from that still clings to
 * a row in Notion, so it is swallowed here rather than shown as a category
 * nobody chose.
 */
const IGNORED_TAGS = ["morethanlog"]

export const isHiddenTag = (tag?: string | null) =>
  !!tag && (isFeaturedTag(tag) || IGNORED_TAGS.includes(tag.toLowerCase()))
