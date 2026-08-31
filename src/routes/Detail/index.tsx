import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import BackButton from "./BackButton"
import styled from "@emotion/styled"
import usePostQuery from "src/hooks/usePostQuery"
import {
  PAGE_BOTTOM_DESKTOP,
  PAGE_BOTTOM_MOBILE,
  PAGE_TOP_MOBILE,
} from "../railLayout"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  useMermaidEffect()

  if (!data) return null
  return (
    <StyledWrapper data-type={data.type}>
      <div className="back">
        <BackButton />
      </div>
      {data.type[0] === "Page" && <PageDetail />}
      {data.type[0] !== "Page" && <PostDetail />}
    </StyledWrapper>
  )
}

export default Detail

const StyledWrapper = styled.div`
  padding: ${PAGE_TOP_MOBILE} 0 ${PAGE_BOTTOM_MOBILE};

  /* No top padding of its own: the card starts directly under the wordmark
     and supplies the air itself, from the inside. What sits below decides
     where its own first line falls. */
  @media (min-width: 1024px) {
    padding: 0 0 ${PAGE_BOTTOM_DESKTOP};
  }

  /* Aligns with the article below it until the link goes fixed at 1200px. */
  > .back {
    margin: 0 auto;
    max-width: 56rem;
  }
  /** Reference: https://github.com/chriskempson/tomorrow-theme **/
  code[class*="language-mermaid"],
  pre[class*="language-mermaid"] {
    background-color: ${({ theme }) => theme.colors.gray5};
  }
`
