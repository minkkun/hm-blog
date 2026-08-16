import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"

const Logo = () => {
  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      {CONFIG.blog.title}
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  font-family: var(--font-wordmark);
  /* Handwriting runs small for its point size, so it is set larger than the
     grotesque it replaced and given its natural, untracked spacing. The face
     ships one weight — asking for bold would only get a smeared synthetic one. */
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  color: ${({ theme }) => theme.colors.gray12};
`
