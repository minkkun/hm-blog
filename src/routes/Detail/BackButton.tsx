import styled from "@emotion/styled"
import Link from "next/link"
import React from "react"

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
     article, the link moves into it and stays put while the post scrolls. */
  @media (min-width: 1200px) {
    position: fixed;
    top: 5rem;
    left: calc(50% - 33rem);
    margin-bottom: 0;
  }
`
