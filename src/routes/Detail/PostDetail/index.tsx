import React from "react"
import PostHeader from "./PostHeader"
import Footer from "./PostFooter"
import CommentBox from "./CommentBox"
import Category from "src/components/Category"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const PostDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null

  const category = (data.category && data.category?.[0]) || undefined

  return (
    <StyledWrapper>
      <article>
        {category && (
          <div css={{ marginBottom: "0.5rem" }}>
            <Category readOnly={data.status?.[0] === "PublicOnDetail"}>
              {category}
            </Category>
          </div>
        )}
        {data.type[0] === "Post" && <PostHeader data={data} />}
        <div>
          <NotionRenderer recordMap={data.recordMap} />
        </div>
        {data.type[0] === "Post" && (
          <>
            <Footer />
            <CommentBox data={data} />
          </>
        )}
      </article>
    </StyledWrapper>
  )
}

export default PostDetail

const StyledWrapper = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  border-radius: 1.5rem;
  /* Kept in proportion to the narrower text column, so the card stays a card
     rather than becoming a wide frame around a thin ribbon of text. */
  max-width: 50rem;
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  > article {
    margin: 0 auto;
    /* Holds the line to ~65 characters at the size below. Much past 75 and
       the eye starts losing its place on the sweep back to the left margin. */
    max-width: 38rem;
    /* react-notion-x sets its body copy from this variable, so overriding it
       here re-faces the article without touching code blocks. */
    --notion-font: var(--font-prose);

    /* Notion's own 16px/1.5 is a UI default, not a reading one. Everything
       react-notion-x sizes is relative to this, so headings and code scale
       with it rather than needing their own overrides. */
    .notion {
      font-size: 1.125rem;
      line-height: 1.65;
    }
  }
`
