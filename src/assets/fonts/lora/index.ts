import { Lora } from 'next/font/google'

// Reading serif for blog posts — the article title and its body copy.
export const lora = Lora({
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
})
