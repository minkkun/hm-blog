import { IM_Fell_English } from 'next/font/google'

// Standalone pages (About) get the older, hand-set letterpress face.
export const imFellEnglish = IM_Fell_English({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
