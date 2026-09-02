import localFont from 'next/font/local'

// The feed's post titles, and only those.
//
// They are the one place a reader meets a whole Vietnamese sentence set in a
// mono, and Martian Mono cannot draw one: the horn vowels and every
// stacked-tone form are absent from the upstream font. Filling the gaps from a
// second mono put a visibly narrower, lighter letter inside the word (Hợp, ăn)
// — passable at caption size, a rendering fault at title size. Reddit Mono
// draws the whole alphabet itself and sits close enough to Martian Mono's
// width and colour that the two read as one voice down the page.
//
// Self-hosted rather than fetched: Reddit Mono postdates the Google Fonts index
// this version of Next ships, so `next/font/google` cannot name it. The file is
// the upstream variable font subset to the ranges this site actually sets —
// latin, latin-ext and Vietnamese — which takes it from 204KB of TTF to 59KB of
// woff2. SIL Open Font License 1.1; see OFL.txt beside this file.
export const redditMono = localFont({
  src: './RedditMono-subset.woff2',
  // Variable, so the titles can sit at 420 — a hair heavier than the labels
  // around them — rather than jumping to a whole static weight.
  weight: '200 900',
  style: 'normal',
  display: 'swap',
})
