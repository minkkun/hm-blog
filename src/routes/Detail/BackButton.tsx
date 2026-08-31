import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { CENTRE_ON_WINDOW } from "../railLayout"

type Props = {}

const BackButton: React.FC<Props> = () => {
  return (
    <StyledWrapper href="/">
      <span className="arrow" aria-hidden="true">
        ←
      </span>
      Back
    </StyledWrapper>
  )
}

export default BackButton

const StyledWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-label);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray11};
  transition: color 200ms ease;

  > .arrow {
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  :hover {
    color: ${({ theme }) => theme.colors.gray12};
    > .arrow {
      transform: translateX(-0.25rem);
    }
  }

  /* Once the viewport is wide enough to have a left margin free of the
     article, the link moves into it and stays put while the post scrolls.
     It measures from the middle of what the rail leaves rather than from the
     middle of the window — otherwise it drifts in towards the card as the
     window narrows and ends up sitting on its edge. */
  /* Waits for the width at which the article centres on the window, so it can
     measure from the same middle the article does. Any earlier and it has to
     chase a column that is still leaning away from the rail — which put it
     off the left edge of the window entirely between 1200 and 1256. */
  @media (min-width: ${CENTRE_ON_WINDOW}) {
    position: fixed;
    /* Halfway down, so it answers the scheme switch sitting at the same
       height in the rail opposite — one mark on each margin. */
    top: 50%;
    transform: translateY(-50%);
    left: calc(50% - 33rem);
    margin-bottom: 0;
  }
`
