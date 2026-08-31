import React from "react"
import styled from "@emotion/styled"
import NotionRenderer from "../components/NotionRenderer"
import usePostQuery from "src/hooks/usePostQuery"
import { detailCard } from "../detailCard"

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

const StyledWrapper = styled.div`
  /* Same panel a post sits on: a standalone page is a different kind of
     writing, not a different kind of object. It keeps its own face, and
     nothing else. */
  ${({ theme }) => detailCard(theme)}

  > article {
    margin: 0 auto;
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
