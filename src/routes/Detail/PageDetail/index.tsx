import React from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"

type Props = {}

const PageDetail: React.FC<Props> = () => {
  const data = usePostQuery()

  if (!data) return null
  return (
    <StyledWrapper>
      <article>
        <NotionRenderer recordMap={data.recordMap} />
      </article>
    </StyledWrapper>
  )
}

export default PageDetail

/**
 * No card. A post is an object you can pick up off the paper, so it gets one;
 * a standalone page is just the paper written on, and a frame around one short
 * statement only makes it look like a smaller post.
 */
const StyledWrapper = styled.div`
  max-width: 50rem;
  margin: 0 auto;

  > article {
    margin: 0 auto;
    /* The same measure a post reads at, so the line length does not change
       between the two even though the ground does. */
    max-width: 38rem;
    /* react-notion-x sets its body copy from this variable, so overriding it
       here re-faces the rendered page without touching code blocks. */
    --notion-font: var(--font-page);
    font-family: var(--font-page);

    .notion {
      font-size: 1.125rem;
      line-height: 1.65;
    }
  }
`
