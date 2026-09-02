import { Martian_Mono } from 'next/font/google'

// Semi-condensed monospace — the tracked-uppercase labels around the writing:
// nav, dates, captions, tags, the colophon. Not the feed's post titles, which
// are the one place a reader meets a whole Vietnamese sentence in this face;
// those are set in Reddit Mono instead. See ../redditMono.
// `adjustFontFallback` is off deliberately. It injects a metric-adjusted
// Arial into this family's own stack, which would catch the Vietnamese
// letters Martian Mono lacks before Space Mono ever got the chance. Space
// Mono carries its own adjusted fallback at the end of the chain instead.
export const martianMono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})
