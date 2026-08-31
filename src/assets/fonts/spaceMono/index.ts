import { Space_Mono } from 'next/font/google'

// Stands in for the letters Martian Mono cannot draw, and nothing else.
//
// Martian Mono has no Vietnamese: the horn vowels and every stacked-tone form
// (ơ ư Ơ Ư ế ộ ữ ằ ẳ ỗ) are absent from the upstream font, so no subset or
// self-hosted cut can produce them. Naming this family after Martian Mono in
// the stack lets the browser substitute per glyph — every character Martian
// Mono does draw still comes from Martian Mono. Space Mono is the pick
// because it is wide and characterful in the same way, so the swapped letters
// sit at a similar weight rather than thinning out mid-word.
export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
})
