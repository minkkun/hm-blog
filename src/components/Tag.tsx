import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React from "react"
import { isSerifTag } from "src/constants"

type Props = {
  children: string
}

const Tag: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const handleClick = (value: string) => {
    router.push(`/?tag=${value}`)
  }
  return (
    <StyledWrapper
      data-serif={isSerifTag(children)}
      onClick={() => handleClick(children)}
    >
      {children}
    </StyledWrapper>
  )
}

export default Tag

const StyledWrapper = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 50px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray10};
  background-color: ${({ theme }) => theme.colors.gray5};
  cursor: pointer;

  /* Bookish tags are set in the reading serif rather than the label mono. */
  &[data-serif="true"] {
    font-family: var(--font-prose);
    font-size: 0.8125rem;
  }
`
