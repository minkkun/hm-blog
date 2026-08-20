import { Be_Vietnam_Pro } from 'next/font/google'

/**
 * The comment section — set apart from the article's serif so replies read
 * as conversation rather than as more of the post.
 *
 * Chosen over DM Sans, which ships only latin and latin-ext: Vietnamese
 * stacks two marks on one vowel (ế = ê + acute) and those precomposed
 * glyphs live in the `vietnamese` subset. Without it the browser silently
 * substitutes a system font for exactly those characters, so letterforms
 * change mid-word and differ from reader to reader. This face is drawn for
 * Vietnamese, so the marks are designed rather than bolted on.
 */
export const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
})
