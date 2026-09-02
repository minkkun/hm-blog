import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { ALL_TAG, isHiddenTag } from "src/constants"
import { useTagsQuery } from "src/hooks/useTagsQuery"

type Props = {}

/** The one mark this nav is built from: a rest-state ▾ that turns into a ›. */
const Caret: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
    <path d="M0 0 L10 0 L5 6 Z" fill="currentColor" />
  </svg>
)

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

  // Names the pathname explicitly: a query-only href keeps whatever page you
  // are on, which would strand these on the gallery instead of the feed.
  const tagHref = (value?: string) => {
    const { tag, ...rest } = router.query
    return { pathname: "/", query: value ? { ...rest, tag: value } : rest }
  }

  // Only the ordinary tags fan out from All. Featured is a view of its own a
  // line below, and the ignored ones never surface anywhere.
  const tagList = Object.keys(tags).filter((tag) => !isHiddenTag(tag))

  // The crumb after the heading names whatever is narrowing the shelf; on the
  // bare feed nothing is, so the arrow stays at rest.
  const crumb = currentTag === ALL_TAG ? "All" : currentTag

  return (
    <StyledWrapper ref={wrapperRef}>
      <h1 className="title">
        {/* Off the default view the heading is the way back to it. */}
        {currentTag ? (
          <Link href={tagHref(undefined)} scroll={false}>
            Featured
          </Link>
        ) : (
          "Featured"
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
        <Caret />
      </button>

      {/* Turned right, the arrow reads as the separator: FEATURED > SCI-FI */}
      {crumb && <span className="current">{crumb}</span>}

      {/* Flies out to the right, in the direction the arrow turns to point. */}
      <div className="flyout" data-open={open}>
        {/* Two views only. The tags belong to All — they are the ways of
            cutting the whole archive — so they hang off it rather than
            crowding the choice between the two shelves. */}
        <div className="row">
          <Link
            href={tagHref(ALL_TAG)}
            data-active={currentTag === ALL_TAG}
            scroll={false}
            onClick={() => setOpen(false)}
          >
            All
          </Link>

          {tagList.length > 0 && (
            <div className="tags">
              <Caret />
              {tagList.map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && <span className="pipe">|</span>}
                  <Link
                    href={tagHref(tag)}
                    data-active={tag === currentTag}
                    scroll={false}
                    onClick={() => setOpen(false)}
                  >
                    {tag}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <Link
          href={tagHref(undefined)}
          data-active={!currentTag}
          scroll={false}
          onClick={() => setOpen(false)}
        >
          Featured
        </Link>
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

  /* The tag sits a shade back from its parent crumb, but keeps the heading's
     mono: it continues that line rather than starting a new voice. */
  > .current {
    color: ${({ theme }) => theme.colors.gray11};
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

      &[data-active="true"] {
        color: ${({ theme }) => theme.colors.gray12};
      }
      :hover {
        color: ${({ theme }) => theme.colors.gray12};
      }
    }

    /* All and the tags it carries share one line. */
    > .row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem 0.75rem;

      @media (min-width: 768px) {
        flex-wrap: nowrap;
      }
    }

    .tags {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      /* The lead-in mark, turned to point along the line it opens. */
      > svg {
        display: block;
        flex-shrink: 0;
        color: ${({ theme }) => theme.colors.gray9};
        transform: rotate(-90deg);
      }

      > .pipe {
        font-family: var(--font-label);
        font-size: 0.6875rem;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray8};
      }
    }

    /* Where there is a pointer the tags stay tucked behind All and snap out
       along the line when it is hovered. A touch screen has no hover to wait
       on, so there they simply sit open, wrapping under All if need be. */
    @media (hover: hover) {
      .tags {
        visibility: hidden;
        opacity: 0;
        transform: translateX(-0.375rem);
        transition: opacity 180ms ease,
          transform 180ms cubic-bezier(0.4, 0, 0.2, 1), visibility 180ms;
      }

      > .row:hover .tags,
      > .row:focus-within .tags {
        visibility: visible;
        opacity: 1;
        transform: none;
      }
    }
  }
`
