import styled from "@emotion/styled"
import React, { useState } from "react"
import { useCreateCommentMutation } from "src/hooks/useCommentsQuery"

type Props = {
  postId: string
}

/**
 * Upper-case the first letter of each word, leaving the rest alone so names
 * like "McDonald" or "JJ" survive intact. Mirrors the `text-transform` on the
 * input, so what gets stored matches what was on screen while typing.
 */
const capitalize = (value: string) =>
  value.replace(/(^|\s)(\S)/g, (_, space, letter) => space + letter.toUpperCase())

const CommentForm: React.FC<Props> = ({ postId }) => {
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const { mutate, isLoading, isError, error } = useCreateCommentMutation(postId)

  const canSubmit = !!name.trim() && !!body.trim() && !isLoading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    mutate(
      { name: capitalize(name.trim()), body: body.trim() },
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
        autoCapitalize="words"
        autoComplete="name"
      />
      <textarea
        className="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Leave a comment..."
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

const StyledWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;

  .name,
  .body {
    outline-style: none;
    width: 100%;
    color: ${({ theme }) => theme.colors.gray12};

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  /* Outlined and narrow, so it reads as an identity field rather than as
     more of the message. */
  .name {
    padding: 0.5rem 1rem;
    max-width: 16rem;
    border-radius: 999px;
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    background-color: transparent;
    font-size: 1.0625rem;
    font-weight: 700;
    text-transform: capitalize;

    /* ...but leave the placeholder as written. */
    &::placeholder {
      text-transform: none;
    }

    :focus {
      border-color: ${({ theme }) => theme.colors.gray8};
    }
  }

  /* Filled and full width — the main writing surface. */
  .body {
    padding: 0.625rem 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.gray4};
    resize: vertical;
    line-height: 1.5rem;
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
      padding: 0.375rem 1rem;
      border-radius: 1rem;
      font-weight: 500;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray1};
      background-color: ${({ theme }) => theme.colors.gray12};

      :disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    }
  }
`
