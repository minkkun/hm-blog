import styled from "@emotion/styled"

import PostList from "./PostList"
import SideNav from "./SideNav"
import TagFilter from "./TagFilter"
import {
  RAIL_PADDING_DESKTOP,
  RAIL_PADDING_MOBILE,
  RAIL_WIDTH,
} from "../railLayout"

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
    padding: ${RAIL_PADDING_MOBILE};

    @media (min-width: 1024px) {
      padding: ${RAIL_PADDING_DESKTOP};
      margin-right: ${RAIL_WIDTH};
    }
  }
`
