import styled from "@emotion/styled"
import React, { useState } from "react"
import { useCreateCommentMutation } from "src/hooks/useCommentsQuery"

type Props = {
  postId: string
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const { mutate, isLoading, isError, error } = useCreateCommentMutation(postId)

  const canSubmit = !!name.trim() && !!body.trim() && !isLoading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    // Stored exactly as typed — a name is the commenter's to spell.
    mutate(
      { name: name.trim(), body: body.trim() },
      // Keep the name around so writing a second comment doesn't mean
      // typing it again.
      { onSuccess: () => setBody("") }
    )
  }

  return (
    <StyledWrapper onSubmit={handleSubmit}>
      <input
        className="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        maxLength={60}
        // Phone keyboards would otherwise force a capital after every space.
        autoCapitalize="none"
        autoComplete="name"
      />
      <textarea
        className="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="no log-in needed, why don't my dear friend leave a thought?"
        rows={4}
      />
      <div className="bottom">
        {isError && <span className="error">{error?.message}</span>}
        <button type="submit" disabled={!canSubmit}>
          {isLoading ? "Sending..." : "Comment"}
        </button>
      </div>
    </StyledWrapper>
  )
}

export default CommentForm

/**
 * Square corners, one hairline, nothing filled: the fields are drawn rather
 * than built, so the section reads as part of the page instead of a widget
 * sitting on top of it.
 */
const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 2rem;

  .name,
  .body {
    outline-style: none;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.line};
    border-radius: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.gray12};
    transition: border-color 200ms ease;

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray10};
    }

    :focus {
      border-color: ${({ theme }) => theme.colors.gray9};
    }
  }

  /* Narrow, so it reads as an identity field rather than more of the message. */
  .name {
    padding: 0.5rem 0.875rem;
    max-width: 16rem;
    font-size: 1rem;
    font-weight: 600;
  }

  /* The main writing surface. */
  .body {
    padding: 0.75rem 0.875rem;
    resize: vertical;
    line-height: 1.6;
    font-family: inherit;
    font-size: inherit;
  }

  > .bottom {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: flex-end;

    .error {
      margin-right: auto;
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.red10};
    }

    button {
      padding: 0.4375rem 1.25rem;
      border: 1px solid ${({ theme }) => theme.colors.line};
      border-radius: 0;
      background-color: transparent;
      font-size: 0.875rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray12};
      cursor: pointer;
      transition: background-color 200ms ease, border-color 200ms ease,
        color 200ms ease;

      /* Fills only on intent, so at rest the form is all outline. */
      :hover:not(:disabled) {
        border-color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.gray12};
        color: ${({ theme }) => theme.colors.paper};
      }

      :disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }
    }
  }
`
