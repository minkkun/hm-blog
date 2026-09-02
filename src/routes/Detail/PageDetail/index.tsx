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
  padding-top: 3rem;

  /* One short statement, so it sits on the middle of the window rather than
     hanging from the top of it. Twice the wordmark's height comes out: once
     for the band it actually occupies above, and once more below to answer
     it, which leaves the centre of what remains on the centre of the window. */
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 9rem);
    padding-top: 0;
  }

  > article {
    margin: 0 auto;
    /* The same measure a post reads at, so the line length does not change
       between the two even though the ground does. */
    max-width: 38rem;
    /* react-notion-x sets its body copy from this variable, so overriding it
       here re-faces the rendered page without touching code blocks. */
    --notion-font: var(--font-page);
    font-family: var(--font-page);
    /* Flush to both edges. IM Fell English is narrow and the measure is short,
       so hyphenation is on to keep justification from opening rivers. */
    text-align: justify;
    -webkit-hyphens: auto;
    hyphens: auto;

    /* Steps down on a phone for the same reason a post does: held close, on
       a third of the measure, 18px reads oversized. */
    .notion {
      font-size: 0.9rem;
      line-height: 1.65;

      @media (min-width: 768px) {
        font-size: 1.125rem;
      }
    }
  }
`
