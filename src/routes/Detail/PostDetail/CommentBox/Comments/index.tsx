import styled from "@emotion/styled"
import React from "react"
import useCommentsQuery from "src/hooks/useCommentsQuery"
import CommentForm from "./CommentForm"
import CommentList from "./CommentList"

type Props = {
  postId: string
}

const Comments: React.FC<Props> = ({ postId }) => {
  const { data: comments, isLoading, isError, error } = useCommentsQuery(postId)

  return (
    <StyledWrapper>
      <h2 className="title">
        Comments{comments?.length ? ` (${comments.length})` : ""}
      </h2>
      <CommentForm postId={postId} />
      {isLoading && <p className="status">Loading comments...</p>}
      {isError && (
        <p className="status">
          {(error as Error)?.message || "Couldn't load comments."}
        </p>
      )}
      {comments && <CommentList comments={comments} />}
    </StyledWrapper>
  )
}

export default Comments

const StyledWrapper = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};

  /* Covers the heading, the form and every comment: the inputs and buttons
     are reset with \`all: unset\` globally, so they inherit this too. */
  font-family: var(--font-sans);

  > .title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray12};
  }

  > .status {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.gray10};
  }
`
