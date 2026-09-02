import localFont from 'next/font/local'

// The face every tracked-uppercase label is set in: nav, feed titles, dates,
// tags, gallery captions, the colophon.
//
// It replaced Martian Mono, which draws no Vietnamese at all — the horn vowels
// and every stacked-tone form are absent from the upstream font. Filling those
// gaps from a second mono put a visibly narrower, lighter letter inside the
// word (Hợp, ăn), which read as a rendering fault rather than as a typeface.
// Reddit Mono draws the whole alphabet itself and sits closest to Martian
// Mono's width and colour, so a tracked line of labels keeps the weight it had.
//
// Self-hosted rather than fetched: Reddit Mono postdates the Google Fonts index
// this version of Next ships, so `next/font/google` cannot name it. The file is
// the upstream variable font subset to the ranges this site actually sets —
// latin, latin-ext and Vietnamese — which takes it from 200KB of TTF to 59KB of
// woff2. It is SIL Open Font License 1.1; see OFL.txt beside this file.
export const redditMono = localFont({
  src: './RedditMono-subset.woff2',
  // One variable file covers every weight the site asks for: 400 for labels,
  // 500 for the headings that want a little more, 700 in the comment form.
  weight: '200 900',
  style: 'normal',
  display: 'swap',
})
