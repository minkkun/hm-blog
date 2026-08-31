import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"
import { PAGE_TOP_DESKTOP, RAIL_WIDTH } from "../railLayout"

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
  @media (min-width: 1200px) {
    position: fixed;
    top: ${PAGE_TOP_DESKTOP};
    left: calc((100% - ${RAIL_WIDTH}) / 2 - 33rem);
    margin-bottom: 0;
  }
`
