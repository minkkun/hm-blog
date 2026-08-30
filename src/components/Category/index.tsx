import { useRouter } from "next/router"
import React from "react"
import styled from "@emotion/styled"

type Props = {
  children: string
  readOnly?: boolean
}

const Category: React.FC<Props> = ({ readOnly = false, children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    if (readOnly) return
    router.push(`/?category=${value}`)
  }

  return (
    <StyledWrapper
      onClick={() => handleClick(children)}
      css={{ cursor: readOnly ? "default" : "pointer" }}
    >
      {children}
    </StyledWrapper>
  )
}

export default Category

/**
 * Matches the tag beside it: a hairline outline and the page showing through.
 * The old fill came from a hash of the category name, which produced a colour
 * with no relationship to anything else on the page.
 */
const StyledWrapper = styled.div`
  padding: 0.1875rem 0.625rem;
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background-color: transparent;
  font-family: var(--font-garamond);
  font-size: 0.9375rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.gray11};
  transition: border-color 200ms ease, color 200ms ease;

  :hover {
    border-color: ${({ theme }) => theme.colors.gray9};
    color: ${({ theme }) => theme.colors.gray12};
  }
`
