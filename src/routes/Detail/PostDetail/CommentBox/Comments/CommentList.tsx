import styled from "@emotion/styled"
import React from "react"
import { CONFIG } from "site.config"
import { formatDateTime } from "src/libs/utils"
import { TComments } from "src/types"

type Props = {
  comments: TComments
}

const CommentList: React.FC<Props> = ({ comments }) => {
  if (!comments.length) {
    return <StyledEmpty>No comments yet — be the first one.</StyledEmpty>
  }

  return (
    <StyledWrapper>
      {comments.map((comment) => (
        <li className="comment" key={comment.id}>
          <div className="top">
            <span className="name">{comment.name}</span>
            <time className="date" dateTime={comment.createdTime}>
              {formatDateTime(comment.createdTime, CONFIG.lang)}
            </time>
          </div>
          <p className="body">{comment.body}</p>
        </li>
      ))}
    </StyledWrapper>
  )
}

export default CommentList

const StyledEmpty = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray10};
`

const StyledWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  > .comment {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};

    :last-of-type {
      padding-bottom: 0;
      border-bottom: none;
    }

    > .top {
      display: flex;
      gap: 0.5rem;
      align-items: baseline;
      flex-wrap: wrap;

      .name {
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray12};
      }

      .date {
        font-size: 0.8125rem;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }

    > .body {
      /* Keep the line breaks the commenter typed. */
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.5rem;
      color: ${({ theme }) => theme.colors.gray11};
    }
  }
`
