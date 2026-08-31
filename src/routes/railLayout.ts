/**
 * Geometry shared by every page, so the feed, the gallery and a post cannot
 * drift into looking like three different sites.
 */
export const RAIL_WIDTH = "12.5rem"

/** The vertical rhythm a page starts and ends on. */
export const PAGE_TOP_MOBILE = "3.5rem"
export const PAGE_BOTTOM_MOBILE = "4rem"
export const PAGE_TOP_DESKTOP = "9rem"
export const PAGE_BOTTOM_DESKTOP = "8rem"

/** Clears the mobile nav strip, with room for a dropdown under the heading. */
export const RAIL_PADDING_MOBILE = `${PAGE_TOP_MOBILE} 1.25rem ${PAGE_BOTTOM_MOBILE}`

/** Clears the fixed rail on the right and the floating wordmark above. */
export const RAIL_PADDING_DESKTOP = `${PAGE_TOP_DESKTOP} 1.5rem ${PAGE_BOTTOM_DESKTOP} 3vw`
