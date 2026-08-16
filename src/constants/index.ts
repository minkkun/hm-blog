export const DEFAULT_CATEGORY = "📂 All" as string

/**
 * Tags whose subject matter reads better in the prose serif than in the mono
 * the rest of the labels use. Matched case-insensitively.
 */
export const SERIF_TAGS = ["books", "journal"]

export const isSerifTag = (tag?: string | null) =>
  !!tag && SERIF_TAGS.includes(tag.trim().toLowerCase())
