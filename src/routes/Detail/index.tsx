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

  /* A page centres itself on the window, so it cannot carry a bottom padding:
     that height would sit below the centred box and push it up off the middle.
     A post scrolls and still wants the room at its foot. */
  &[data-type="Page"] {
    @media (min-width: 1024px) {
      padding-bottom: 0;
    }
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
