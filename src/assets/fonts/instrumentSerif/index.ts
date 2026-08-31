import { Instrument_Serif } from 'next/font/google'

// Display serif for the gallery captions — high contrast, narrow, and set
// tight, the way a name reads under a print.
//
// It carries no Vietnamese: the upstream font is missing the horn vowels and
// every stacked-tone form (ơ ư ế ộ ữ ằ ...). `adjustFontFallback` is off so
// those characters fall through to Lora rather than to a metric-adjusted
// Arial, which next/font would otherwise slip in ahead of it.
export const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  adjustFontFallback: false,
})
