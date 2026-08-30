import styled from "@emotion/styled"
import Link from "next/link"
import React, { useState } from "react"
import { CONFIG } from "site.config"

import SideNav from "../Feed/SideNav"
import GalleryCard from "./GalleryCard"
import GalleryModal from "./GalleryModal"
import useGalleryQuery from "src/hooks/useGalleryQuery"
import {
  RAIL_PADDING_DESKTOP,
  RAIL_PADDING_MOBILE,
  RAIL_WIDTH,
} from "../railLayout"

type Props = {}

const Gallery: React.FC<Props> = () => {
  const items = useGalleryQuery()
  // Held by id rather than by object, so the open entry survives a refetch.
  const [openId, setOpenId] = useState<string | null>(null)
  const open = items.find((item) => item.id === openId)
  const note = (CONFIG as any).gallery as
    | { note?: string; linkText?: string; href?: string }
    | undefined

  return (
    <StyledWrapper>
      <SideNav />
      <div className="content">
        <h1 className="page-title">Gallery</h1>
        {/* The line exists to carry the link, so it waits for a destination
            rather than shipping a dangling "here" that goes nowhere. */}
        {note?.note && note?.href && (
          <p className="note">
            {note.note} <Link href={note.href}>{note.linkText || "here"}</Link>
          </p>
        )}
        {items.length ? (
          <div className="grid">
            {items.map((item) => (
              <GalleryCard
                key={item.id}
                data={item}
                onOpen={() => setOpenId(item.id)}
              />
            ))}
          </div>
        ) : (
          <p className="empty">Nothing here yet</p>
        )}
      </div>

      {open && <GalleryModal data={open} onClose={() => setOpenId(null)} />}
    </StyledWrapper>
  )
}

export default Gallery

const StyledWrapper = styled.div`
  > .content {
    padding: ${RAIL_PADDING_MOBILE};

    @media (min-width: 1024px) {
      padding: ${RAIL_PADDING_DESKTOP};
      margin-right: ${RAIL_WIDTH};
    }

    > .page-title {
      margin-bottom: 1rem;
      font-family: var(--font-label);
      font-size: 0.9375rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray12};

      @media (min-width: 1024px) {
        margin-bottom: 1.25rem;
      }
    }

    > .note {
      margin: 0 0 4rem;
      max-width: 34rem;
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors.gray11};

      @media (min-width: 1024px) {
        margin-bottom: 5rem;
      }

      a {
        color: ${({ theme }) => theme.colors.gray12};
        text-decoration: underline;
        text-underline-offset: 0.2em;
        text-decoration-thickness: 1px;
        transition: opacity 200ms ease;

        :hover {
          opacity: 0.6;
        }
      }
    }

    > .empty {
      font-family: var(--font-label);
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray10};
    }

    /* The grid draws only its top and left; each cell draws its right and
       bottom, so every rule between cells is a single hairline. */
    > .grid {
      display: grid;
      grid-template-columns: 1fr;
      border-top: 1px solid ${({ theme }) => theme.colors.line};
      border-left: 1px solid ${({ theme }) => theme.colors.line};

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }
`
