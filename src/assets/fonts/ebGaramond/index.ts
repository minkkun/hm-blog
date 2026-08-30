import { EB_Garamond } from 'next/font/google'

/**
 * The comment section. A book serif rather than the sans the rest of the
 * chrome uses, so replies read as writing rather than as interface.
 *
 * EB Garamond over Cormorant Garamond: both carry the vietnamese subset, but
 * Cormorant is a display cut and goes wispy at the size a comment field is
 * set in. This one keeps its weight down there.
 */
export const ebGaramond = EB_Garamond({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
})
