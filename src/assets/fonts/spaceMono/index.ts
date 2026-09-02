import { Space_Mono } from 'next/font/google'

// The face every tracked-uppercase label is set in: nav, feed titles, dates,
// tags, gallery captions, the colophon.
//
// It replaced Martian Mono, which draws no Vietnamese at all — the horn vowels
// and every stacked-tone form are absent from the upstream font. Filling those
// gaps from a second mono put a visibly narrower, lighter letter inside the
// word (Hợp, ăn), which reads as a rendering fault rather than as a typeface.
// One face that draws the whole alphabet is worth more here than a wider one
// that drops a letter.
export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
})
