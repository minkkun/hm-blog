import localFont from 'next/font/local'

/**
 * The wordmark's handwriting — the one warm, human note against the
 * tracked-uppercase mono the rest of the chrome is set in.
 *
 * Self-hosted rather than pulled from Google Fonts. To change it, drop the new
 * file in this folder and point `src` at it; nothing else needs to move.
 *
 * NOTE: this is the trial cut of Belmonte Ballpoint, licensed for personal use.
 * Check the foundry's terms cover self-hosting on a public site before shipping.
 */
export const wordmark = localFont({
  src: './BelmonteBallpointTrial-Cursive.otf',
  weight: '400',
  style: 'normal',
  display: 'swap',
})
