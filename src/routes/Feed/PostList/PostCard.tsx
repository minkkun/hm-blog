import Link from "next/link"
import { useRouter } from "next/router"
import React, { useRef } from "react"
import { TPost } from "../../../types"
import Image from "next/image"
import styled from "@emotion/styled"
import { navigateWithCover } from "src/libs/viewTransition"

type Props = {
  data: TPost
  index?: number
}

/**
 * Covers keep a varied rhythm down the page rather than a rigid grid: each
 * row's images top-align, so differing heights stagger the captions below.
 *
 * The count must stay ODD. Index parity decides which column a cover lands
 * in, so an even-length table hands each column only half its values — at
 * four entries every column alternated between exactly two heights and the
 * page visibly zigzagged. Five is coprime with both the two columns and the
 * seven drift entries, so each column cycles through all five.
 */
const RATIOS = [70, 60, 62, 74, 66]

/**
 * Each cover is nudged off its column so no two rows line up. `x` is a share
 * of the column it may drift right by, `y` how far down it hangs.
 *
 * Deterministic on purpose — a real random number would differ between the
 * server render and the browser's, and React would tear on hydration. Seven
 * entries against five aspect ratios means the pair only repeats every 35
 * cards, which reads as scattered rather than patterned.
 */
const DRIFT = [
  { x: 0, y: 0 },
  { x: 5, y: 2.5 },
  { x: 8, y: 0 },
  { x: 2, y: 4 },
  { x: 6, y: 1.25 },
  { x: 0, y: 3.25 },
  { x: 7, y: 0.75 },
]

const PostCard: React.FC<Props> = ({ data, index = 0 }) => {
  const ratio = RATIOS[index % RATIOS.length]
  const drift = DRIFT[index % DRIFT.length]
  const router = useRouter()
  const coverRef = useRef<HTMLDivElement>(null)
  const href = `/${data.slug}`

  // The cover is named on the element itself rather than through state: the
  // browser photographs the page the instant the transition starts, so the
  // name has to be on the node before that call, not a render later.
  const handleClick = (e: React.MouseEvent) => {
    // Leave modified clicks alone — they open a new tab, with nothing to morph.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    if (navigateWithCover(router, href, coverRef.current)) e.preventDefault()
  }

  return (
    <StyledWrapper
      href={href}
      onClick={handleClick}
      style={
        {
          "--drift-x": `${drift.x}%`,
          "--drift-y": `${drift.y}rem`,
        } as React.CSSProperties
      }
    >
      <div
        className="thumbnail"
        ref={coverRef}
        style={{ paddingBottom: `${ratio}%` }}
      >
        {data.thumbnail ? (
          <Image
            src={data.thumbnail}
            fill
            alt={data.title}
            sizes="(max-width: 768px) 100vw, 40vw"
            css={{ objectFit: "cover" }}
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>
      <div className="title">{data.title}</div>
    </StyledWrapper>
  )
}

export default PostCard

const StyledWrapper = styled(Link)`
  display: block;
  margin-bottom: 3.5rem;

  /* Single column on a phone, so the drift is dropped and the cover fills
     the width; it only makes sense once there are two columns to break up. */
  @media (min-width: 768px) {
    width: 92%;
    margin-bottom: 5rem;
    margin-left: var(--drift-x, 0);
    margin-top: var(--drift-y, 0);
  }

  > .thumbnail {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.gray3};

    img {
      transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    > .placeholder {
      position: absolute;
      inset: 0;
      background-color: ${({ theme }) => theme.colors.gray4};
    }
  }

  > .title {
    margin-top: 1.25rem;
    /* Its own face: see --font-title. */
    font-family: var(--font-title);
    /* Written as the label size it grew from rather than the number it lands
       on, so the relationship survives a change to either. */
    font-size: calc(0.6875rem * 1.15);
    /* Reddit Mono is variable, so this is a real 420 rather than a jump to
       the next static cut. */
    font-weight: 420;
    line-height: 1.6;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray12};
    transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  :hover {
    > .thumbnail img {
      opacity: 0.72;
    }
    > .title {
      opacity: 0.5;
    }
  }
`
