import styled from "@emotion/styled"

import PostList from "./PostList"
import SideNav from "./SideNav"
import TagFilter from "./TagFilter"

const RAIL_WIDTH = "12.5rem"

type Props = {}

const Feed: React.FC<Props> = () => {
  return (
    <StyledWrapper>
      {/* On mobile the rail collapses into a scrolling strip above the grid;
          on desktop it is fixed to the right edge, so DOM order is moot. */}
      <SideNav />
      <div className="content">
        <TagFilter />
        <PostList q="" />
      </div>
    </StyledWrapper>
  )
}

export default Feed

const StyledWrapper = styled.div`
  > .content {
    /* Clears the nav strip above it, with room for the tag list to drop
       open underneath the heading without crowding it. */
    padding: 3.5rem 1.25rem 4rem;

    @media (min-width: 1024px) {
      /* clear the fixed rail on the right and the floating wordmark above.
         The side margins stay tight so the covers, not the whitespace, are
         what the page is mostly made of. */
      padding: 9rem 2rem 8rem 4vw;
      margin-right: ${RAIL_WIDTH};
    }
  }
`
