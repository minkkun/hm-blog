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
  padding: 3rem 1.5rem;
  /* Kept in proportion to the narrower text column, so the card stays a card
     rather than becoming a wide frame around a thin ribbon of text. */
  max-width: 50rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.card};
  /* Square and unshadowed. Without the shadow the card barely parts from the
     paper it sits on, so a hairline holds its edge instead. */
  border: 1px solid ${({ theme }) => theme.colors.line};

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
       with it rather than needing their own overrides.

       A phone holds the page closer than a desk does, and the measure is a
       third as wide, so the same 18px that reads generously on a monitor
       reads oversized in the hand. It steps up at the tablet break. */
    .notion {
      font-size: 0.9rem;
      line-height: 1.65;

      @media (min-width: 768px) {
        font-size: 1.125rem;
      }

      /* react-notion-x parts paragraphs with 3px of padding and 1px of margin
         a side — 8px of white, which with the half-leading above and below
         makes a band of about 20px between one paragraph and the next. Two
         more pixels each way widens that band by a fifth. */
      .notion-text {
        margin-top: 3px;
        margin-bottom: 3px;
      }
    }
  }
`
