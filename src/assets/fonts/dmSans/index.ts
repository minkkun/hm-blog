import { DM_Sans } from 'next/font/google'

// The comment section — set apart from the article's serif so replies read
// as conversation rather than as more of the post.
export const dmSans = DM_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
