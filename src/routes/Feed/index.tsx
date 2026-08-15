import { useRouter } from "next/router"
import styled from "@emotion/styled"

import PostList from "./PostList"
import SideNav from "./SideNav"

const RAIL_WIDTH = "12.5rem"

type Props = {}

const Feed: React.FC<Props> = () => {
  const router = useRouter()
  const currentTag = `${router.query.tag || ``}` || undefined

  return (
    <StyledWrapper>
      {/* On mobile the rail collapses into a scrolling strip above the grid;
          on desktop it is fixed to the right edge, so DOM order is moot. */}
      <SideNav />
      <div className="content">
        <h1 className="page-title">{currentTag || "Posts"}</h1>
        <PostList q="" />
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  > .content {
    padding: 1.5rem 1.25rem 4rem;

    @media (min-width: 1024px) {
      /* clear the fixed rail on the right and the floating wordmark above */
      padding: 9rem 4rem 8rem 7vw;
      margin-right: ${RAIL_WIDTH};
    }

    > .page-title {
      margin-bottom: 4.5rem;
      font-family: var(--font-label);
      font-size: 0.9375rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray12};

      @media (min-width: 1024px) {
        margin-bottom: 5.5rem;
      }
    }
  }
`
