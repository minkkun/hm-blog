import Image from "next/image"
import styled from "@emotion/styled"
import React, { useEffect, useRef } from "react"
import { TPost } from "src/types"
import { shortDate } from "./shortDate"

type Props = {
  data: TPost
  onClose: () => void
}

const GalleryModal: React.FC<Props> = ({ data, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const category = (data.category && data.category[0]) || undefined
  const date = shortDate(data.date?.start_date || data.createdTime)

  useEffect(() => {
    // Hand focus to the dialog, and give it back to whatever opened it.
    const opener = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)

    // The wall behind must not scroll while the dialog is up.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      opener?.focus?.()
    }
  }, [onClose])

  return (
    <StyledOverlay
      onMouseDown={(e) => {
        // Only a press that both starts and ends on the backdrop dismisses,
        // so a drag that began inside the panel does not close it.
        if (e.target === e.currentTarget) onClose()
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
        <button className="close" type="button" onClick={onClose}>
          Close
        </button>

        {data.thumbnail && (
          <div className="cover">
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              sizes="26rem"
              css={{ objectFit: "cover" }}
            />
          </div>
        )}

        <div className="body">
          <h2 className="title" id="gallery-dialog-title">
            {data.title}
          </h2>
          {data.summary && <p className="note">{data.summary}</p>}
          {(category || date) && (
            <div className="meta">
              <span>{category}</span>
              <span>{date}</span>
            </div>
          )}
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

  > .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 24rem;
    max-height: 100%;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.colors.card};
    border: 1px solid ${({ theme }) => theme.colors.gray6};
    outline: none;

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
      aspect-ratio: 1 / 1;
      flex: none;
      background-color: ${({ theme }) => theme.colors.gray3};
    }

    > .body {
      padding: 1.5rem 1.5rem 1.25rem;

      > .title {
        margin: 0 0 0.75rem;
        font-family: var(--font-prose);
        font-size: 1.375rem;
        font-weight: 700;
        line-height: 1.2;
        color: ${({ theme }) => theme.colors.gray12};
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
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
        font-family: var(--font-label);
        font-size: 0.625rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.gray10};
      }
    }
  }
`
