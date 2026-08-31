import { css, Theme } from "@emotion/react"

/**
 * The panel a piece of writing sits on, shared by posts and standalone pages
 * so About is built from the same parts as everything else rather than
 * floating loose on the paper.
 */
export const detailCard = (theme: Theme) => css`
  padding: 3rem 1.5rem;
  /* Kept in proportion to the narrower text column, so the card stays a card
     rather than becoming a wide frame around a thin ribbon of text. */
  max-width: 50rem;
  margin: 0 auto;
  background-color: ${theme.colors.card};
  /* Square and unshadowed. Without the shadow the card barely parts from the
     paper it sits on, so a hairline holds its edge instead. */
  border: 1px solid ${theme.colors.line};
`
