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
      <NotionRenderer recordMap={data.recordMap} />
    </StyledWrapper>
  )
}

export default PageDetail

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 56rem;
  /* react-notion-x sets its body copy from this variable, so overriding it
     here re-faces the rendered page without touching code blocks. */
  --notion-font: var(--font-page);
  font-family: var(--font-page);

  /* A standalone page is one short statement, so it sits on the middle of
     both axes rather than hanging from the top of the window. The height is
     what is left of the viewport once the header and the page padding are
     taken out, so the block centres against what the reader actually sees. */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 12rem);
  text-align: center;

  /* react-notion-x stacks its blocks flush left; centre them to match. */
  .notion-page,
  .notion-page-content,
  .notion-page-content-inner {
    width: 100%;
    align-items: center;
  }
`
