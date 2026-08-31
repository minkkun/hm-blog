import { Martian_Mono } from 'next/font/google'

// Semi-condensed monospace — used for every tracked-uppercase label:
// nav, post titles, captions, dates, tags.
// `adjustFontFallback` is off deliberately. It injects a metric-adjusted
// Arial into this family's own stack, which would catch the Vietnamese
// letters Martian Mono lacks before Space Mono ever got the chance. Space
// Mono carries its own adjusted fallback at the end of the chain instead.
export const martianMono = Martian_Mono({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
})
