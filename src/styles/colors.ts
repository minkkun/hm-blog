import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  indigo,
  indigoDark,
} from "@radix-ui/colors"

export type Colors = typeof colors.light & typeof colors.dark

export const colors = {
  light: {
    ...indigo,
    ...gray,
    ...blue,
    ...red,
    ...green,
    // The ground the whole site sits on — Pantone 11-0608 TCX, Coconut Milk.
    // Warmer than the Radix grays, which stay for text and borders.
    paper: "#F1EEE6",
  },
  dark: {
    ...indigoDark,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    paper: grayDark.gray2,
  },
}
