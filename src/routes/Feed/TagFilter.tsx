import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { isSerifTag } from "src/constants"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

const TagFilter: React.FC<Props> = () => {
  const router = useRouter()
  const tags = useTagsQuery()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const currentTag = `${router.query.tag || ``}` || undefined

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  // Selecting the active tag clears the filter, same as the rail's "All".
  const tagHref = (value?: string) => {
    const { tag, ...rest } = router.query
    return { query: value ? { ...rest, tag: value } : rest }
  }

  return (
    <StyledWrapper ref={wrapperRef}>
      <h1 className="title">
        {/* Once filtered the heading is the way back to every post. */}
        {currentTag ? (
          <Link href={tagHref(undefined)} scroll={false}>
            Posts
          </Link>
        ) : (
          "Posts"
        )}
      </h1>

      <button
        className="trigger"
        data-open={open}
        data-filtered={!!currentTag}
        aria-expanded={open}
        aria-label="Filter posts by tag"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
          <path d="M0 0 L10 0 L5 6 Z" fill="currentColor" />
        </svg>
      </button>

      {/* Turned right, the arrow reads as the separator: POSTS > SCI-FI */}
      {currentTag && (
        <span className="current" data-serif={isSerifTag(currentTag)}>
          {currentTag}
        </span>
      )}

      {/* Flies out to the right, in the direction the arrow turns to point. */}
      <div className="flyout" data-open={open}>
        {Object.keys(tags).map((tag) => (
          <Link
            key={tag}
            href={tagHref(tag === currentTag ? undefined : tag)}
            data-active={tag === currentTag}
            data-serif={isSerifTag(tag)}
            scroll={false}
            onClick={() => setOpen(false)}
          >
            {tag}
          </Link>
        ))}
      </div>
    </StyledWrapper>
  )
}

export default TagFilter

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  /* Shrink to the heading + arrow so the flyout's \`left: 100%\` sits right
     beside the arrow rather than at the far edge of the content column. */
  width: fit-content;
  margin-bottom: 4.5rem;

  @media (min-width: 1024px) {
    margin-bottom: 5.5rem;
  }

  > .title,
  > .current {
    font-family: var(--font-label);
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray12};
  }

  /* The tag sits a shade back from its parent crumb. */
  > .current {
    color: ${({ theme }) => theme.colors.gray11};

    /* Bookish tags read in the prose serif rather than the label mono. */
    &[data-serif="true"] {
      font-family: var(--font-prose);
      letter-spacing: 0.08em;
    }
  }

  > .trigger {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray11};
    cursor: pointer;

    svg {
      display: block;
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Points down at rest; swings round to aim at the flyout it opens — and
       stays turned while a tag is applied, where it reads as a ">" crumb. */
    :hover svg,
    &[data-open="true"] svg,
    &[data-filtered="true"] svg {
      transform: rotate(-90deg);
    }
    &[data-open="true"],
    &[data-filtered="true"] {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }

  > .flyout {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 220ms ease, transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
      visibility 220ms;

    /* On a phone there is no room to the right, so it drops below instead —
       over the grid, which means it needs its own ground to stay readable. */
    left: 0;
    top: 100%;
    z-index: 5;
    margin-top: 0.75rem;
    padding: 0.75rem 1.5rem 0.75rem 0;
    background-color: ${({ theme }) => theme.colors.paper};
    transform: translateY(-0.5rem);

    @media (min-width: 768px) {
      left: 100%;
      top: 50%;
      margin-top: 0;
      margin-left: 1.25rem;
      padding: 0;
      background: none;
      transform: translate(-0.5rem, -50%);
    }

    &[data-open="true"] {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);

      @media (min-width: 768px) {
        transform: translate(0, -50%);
      }
    }

    a {
      font-family: var(--font-label);
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      line-height: 1.5;
      text-transform: uppercase;
      white-space: nowrap;
      color: ${({ theme }) => theme.colors.gray11};
      transition: color 200ms ease;

      /* Bookish tags read in the prose serif rather than the label mono. */
      &[data-serif="true"] {
        font-family: var(--font-prose);
        font-size: 0.8125rem;
        letter-spacing: 0.08em;
      }

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
      }
      :hover {
        color: ${({ theme }) => theme.colors.gray12};
      }
    }
  }
`
