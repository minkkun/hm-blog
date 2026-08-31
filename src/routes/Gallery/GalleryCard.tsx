import Image from "next/image"
import styled from "@emotion/styled"
import { TPost } from "src/types"
import { year } from "./year"

type Props = {
  data: TPost
  onOpen: () => void
}

/**
 * A tile on the wall, built as a mounted print: a mat of paper, then the
 * framed piece itself — cover, name, and the one-line summary under it. The
 * long note behind the entry belongs to the dialog this opens.
 */
const GalleryCard: React.FC<Props> = ({ data, onOpen }) => {
  const stamp = year(data.date?.start_date || data.createdTime)

  return (
    <StyledWrapper type="button" onClick={onOpen} aria-haspopup="dialog">
      <div className="frame">
        <div className="cover">
          {data.thumbnail ? (
            <Image
              src={data.thumbnail}
              fill
              alt={data.title}
              sizes="(max-width: 768px) 100vw, 33vw"
              css={{ objectFit: "cover" }}
            />
          ) : (
            <div className="placeholder" />
          )}
          {/* Sits in the corner of the image rather than down in the caption,
              so the date never competes with the summary for the line. */}
          {stamp && <span className="stamp">{stamp}</span>}
        </div>

        <div className="panel">
          <h2 className="title">{data.title}</h2>
          {data.summary && <p className="summary">{data.summary}</p>}
        </div>
      </div>
    </StyledWrapper>
  )
}

export default GalleryCard

const StyledWrapper = styled.button`
  /* The global reset hands <button> its native appearance back; flatten it. */
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  font: inherit;
  text-align: left;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  /* The mat the print is mounted on. Generous, and deeper at the foot, the
     way a frame shop weights one. */
  padding: 1.75rem 1.75rem 2.25rem;
  /* Only the right and bottom edges are drawn here; the grid supplies its own
     top and left, so neighbouring cells share one hairline rather than two. */
  border-right: 1px solid ${({ theme }) => theme.colors.line};
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background-color: ${({ theme }) => theme.colors.paper};

  @media (min-width: 768px) {
    padding: 2.25rem 2.25rem 2.75rem;
  }

  > .frame {
    display: flex;
    /* Deliberately not stretched to the row. A tile whose neighbour carries a
       two-line name would otherwise grow a band of empty caption to match it;
       here the frame stays the height of the print and the mat takes up the
       slack, which is what a frame shop does anyway. */
    flex: none;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.colors.line};

    > .cover {
      position: relative;
      width: 100%;
      /* Portrait, as in the reference — a print rather than a thumbnail. */
      aspect-ratio: 4 / 5;
      overflow: hidden;
      background-color: ${({ theme }) => theme.colors.gray3};

      > .placeholder {
        position: absolute;
        inset: 0;
        background-color: ${({ theme }) => theme.colors.gray4};
      }

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

    > .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.4375rem;
      padding: 1.125rem 1.125rem 1.25rem;
      overflow: hidden;

      /* The charge. It sweeps in from the left edge on hover; the text rides
         above it, so only the ground moves. */
      ::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: ${({ theme }) =>
          theme.scheme === "light"
            ? /* Reads as white against the warm paper, without the cold snap
                 of #fff that the rest of the palette avoids. */
              "#FFFDF8"
            : theme.colors.gray5};
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 480ms cubic-bezier(0.22, 0.61, 0.36, 1);
      }

      > * {
        position: relative;
      }

      > .title {
        margin: 0;
        font-family: var(--font-display);
        font-size: 1.75rem;
        font-weight: 400;
        line-height: 1.1;
        color: ${({ theme }) => theme.colors.gray12};
      }

      > .summary {
        margin: 0;
        font-family: var(--font-label);
        /* Martian Mono sets close to one em per character, so this stays
           small enough for a short pairing to run whole in one column. */
        font-size: 0.625rem;
        letter-spacing: 0.02em;
        line-height: 1.5;
        color: ${({ theme }) => theme.colors.gray11};
        /* One line only. The rest of the note waits in the dialog. */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  :hover,
  :focus-visible {
    > .frame > .panel::before {
      transform: scaleX(1);
    }
  }

  /* The sweep is decoration; those who ask for stillness get the end state. */
  @media (prefers-reduced-motion: reduce) {
    > .frame > .panel::before {
      transition: none;
    }
  }
`
