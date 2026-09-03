import Link from "next/link"
import { useRouter } from "next/router"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import { navigateHoldingChrome } from "src/libs/viewTransition"

const Logo = () => {
  const router = useRouter()

  // The wordmark goes to the same place the rail's Blog does, so it moves the
  // same way — it would read as a fault if one animated and the other cut.
  const handleClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (navigateHoldingChrome(router, "/")) e.preventDefault()
  }

  return (
    <StyledWrapper
      href="/"
      aria-label={CONFIG.blog.title}
      data-chrome="wordmark"
      onClick={handleClick}
    >
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
