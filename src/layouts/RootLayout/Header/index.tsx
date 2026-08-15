import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"

type Props = {
  fullWidth: boolean
  /** On the feed the right-hand rail carries the nav, so the bar shows only the wordmark. */
  bare?: boolean
}

const Header: React.FC<Props> = ({ fullWidth, bare = false }) => {
  return (
    <StyledWrapper data-full-width={fullWidth}>
      <div data-full-width={fullWidth} className="container">
        <Logo />
        {!bare && (
          <div className="nav">
            <ThemeToggle />
            <NavBar />
          </div>
        )}
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.gray2};

  /* On the feed the wordmark simply sits at the top of the page and scrolls
     away with it — a sticky opaque bar would paint over the fixed nav rail. */
  &[data-full-width="true"] {
    position: static;
    background-color: transparent;
  }

  .container {
    display: flex;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 3.25rem;
    margin: 0 auto;

    &[data-full-width="true"] {
      max-width: none;
      margin: 0;

      @media (min-width: 768px) {
        padding-left: 1.75rem;
        padding-right: 1.75rem;
        height: 4.5rem;
      }
    }

    .nav {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
`
