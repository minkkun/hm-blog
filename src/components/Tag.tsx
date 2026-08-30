import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper onClick={() => handleClick(children)}>
      {children}
    </StyledWrapper>
  )
}

export default Tag

/** Drawn, not filled: a hairline outline and the page showing through. */
const StyledWrapper = styled.div`
  padding: 0.1875rem 0.625rem;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: transparent;
  font-family: var(--font-garamond);
  font-size: 0.9375rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.gray11};
  cursor: pointer;
  transition: border-color 200ms ease, color 200ms ease;

  :hover {
    border-color: ${({ theme }) => theme.colors.gray9};
    color: ${({ theme }) => theme.colors.gray12};
  }
`
