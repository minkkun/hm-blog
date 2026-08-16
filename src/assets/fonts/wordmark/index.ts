import { Caveat } from 'next/font/google'

/**
 * The wordmark's handwriting — the one warm, human note against the
 * tracked-uppercase mono the rest of the chrome is set in.
 *
 * To try a different hand, swap the import and the call below; every other
 * font here stays put. Options, roughly least to most unruly:
 *   Architects_Daughter — neat drafting-pen print
 *   Caveat              — quick, slanted ballpoint (current)
 *   Indie_Flower        — round, loopy felt-tip
 *   Gloria_Hallelujah   — bouncy, uneven baseline
 *   Permanent_Marker    — thick marker, shouty
 *   Rock_Salt           — scratchy and genuinely messy
 * Note that only Caveat and Kalam carry real weights; the rest are 400 only,
 * so drop the `weight` line if you switch to one of those.
 */
export const wordmark = Caveat({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})
