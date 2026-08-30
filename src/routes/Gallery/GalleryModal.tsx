import Image from "next/image"
import styled from "@emotion/styled"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { TPost } from "src/types"
import { year } from "./year"

type Props = {
  data: TPost
  onClose: () => void
}

/** Long enough to read as a movement, short enough not to sit between clicks. */
const EXIT_MS = 200

const GalleryModal: React.FC<Props> = ({ data, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const exitTimer = useRef<ReturnType<typeof setTimeout>>()
  // Drives the transition in both directions: false on mount and again once a
  // dismissal starts, so the panel can play out before the parent unmounts it.
  const [shown, setShown] = useState(false)
  const category = (data.category && data.category[0]) || undefined
  const stamp = year(data.date?.start_date || data.createdTime)
  // The dialog is where the long note lives. A row with no `description` yet
  // shows none: falling back to `summary` only printed the line directly above
  // it twice, which read as a rendering fault rather than as a short entry.
  const body =
    data.description && data.description !== data.summary
      ? data.description
      : undefined

  const requestClose = useCallback(() => {
    if (exitTimer.current) return
    setShown(false)
    exitTimer.current = setTimeout(onClose, EXIT_MS)
  }, [onClose])

  useEffect(() => {
    // Hand focus to the dialog, and give it back to whatever opened it.
    const opener = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    // A frame at the closed state first, so the browser has something to
    // transition from rather than painting the panel already open.
    const raf = requestAnimationFrame(() => setShown(true))

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose()
    }
    document.addEventListener("keydown", handleKeyDown)

    // The wall behind must not scroll while the dialog is up.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      cancelAnimationFrame(raf)
      if (exitTimer.current) clearTimeout(exitTimer.current)
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [requestClose])

  return (
    <StyledOverlay
      className={shown ? "shown" : undefined}
      onMouseDown={(e) => {
        // Only a press that both starts and ends on the backdrop dismisses,
        // so a drag that began inside the panel does not close it.
        if (e.target === e.currentTarget) requestClose()
      }}
    >
      <div
        className="panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-dialog-title"
        tabIndex={-1}
      >
        <button className="close" type="button" onClick={requestClose}>
          Close
        </button>

        {data.thumbnail && (
          <div className="cover">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              sizes="22rem"
              css={{ objectFit: "cover" }}
            />
            {stamp && <span className="stamp">{stamp}</span>}
          </div>
        )}

        <div className="body">
          <h2 className="title" id="gallery-dialog-title">
            {data.title}
          </h2>
          {data.summary && <p className="summary">{data.summary}</p>}
          {body && <p className="note">{body}</p>}
          {category && <div className="meta">{category}</div>}
        </div>
      </div>
    </StyledOverlay>
  )
}

export default GalleryModal

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndexes.dialog};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(23, 23, 23, 0.32);

  opacity: 0;
  transition: opacity ${EXIT_MS}ms ease;

  > .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* The note runs under a hundred words, so the panel stays a card rather
       than growing into a page. */
    max-width: 22rem;
    max-height: 100%;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.line};
    outline: none;

    /* Rises the last few pixels into place as the backdrop fades up. */
    opacity: 0;
    transform: translateY(0.75rem) scale(0.98);
    transition: opacity 260ms cubic-bezier(0.22, 0.61, 0.36, 1),
      transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1);

    > .close {
      -webkit-appearance: none;
      appearance: none;
      border: 0;
      background: none;
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      z-index: 1;
      padding: 0.375rem 0.5rem;
      font-family: var(--font-label);
      font-size: 0.5625rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray12};
      background-color: ${({ theme }) => theme.colors.card};
      cursor: pointer;

      :hover {
        opacity: 0.6;
      }
    }

    > .cover {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 5;
      /* Portrait like the tile, but capped: on a laptop the full 4/5 print
         plus the note pushed the panel past the viewport and made a short
         entry scroll. The cover gives up the height, not the words. */
      max-height: 42vh;
      flex: none;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.gray3};

      > .stamp {
        position: absolute;
        right: 0;
        bottom: 0;
        padding: 0.375rem 0.625rem 0.3125rem;
        font-family: var(--font-label);
        font-size: 0.6875rem;
        letter-spacing: 0.06em;
        line-height: 1;
        color: ${({ theme }) => theme.colors.gray12};
        background-color: ${({ theme }) => theme.colors.card};
      }
    }

    > .body {
      padding: 1.5rem 1.5rem 1.25rem;

      > .title {
        margin: 0 0 0.375rem;
        font-family: var(--font-prose);
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.15;
        color: ${({ theme }) => theme.colors.gray12};
      }

      /* The same line the tile carried, so opening the dialog feels like the
         card unfolding rather than a different object. */
      > .summary {
        margin: 0 0 1.25rem;
        font-family: var(--font-label);
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        line-height: 1.4;
        color: ${({ theme }) => theme.colors.gray11};
      }

      /* The note is the reason the dialog exists, so it runs in full here
         rather than clamped the way a tile would need. */
      > .note {
        margin: 0 0 1.5rem;
        font-family: var(--font-sans);
        font-size: 0.875rem;
        line-height: 1.65;
        color: ${({ theme }) => theme.colors.gray11};
        white-space: pre-line;
      }

      > .meta {
        font-family: var(--font-label);
        font-size: 0.625rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }

  &.shown {
    opacity: 1;

    > .panel {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    > .panel {
      transition: none;
    }
  }
`
