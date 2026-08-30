import Image from "next/image"
import styled from "@emotion/styled"
import { TPost } from "src/types"
import { shortDate } from "./shortDate"

type Props = {
  data: TPost
  onOpen: () => void
}

/**
 * A tile on the wall. It carries only what reads at a glance — cover, name,
 * category and date; the note behind it belongs to the dialog this opens.
 */
const GalleryCard: React.FC<Props> = ({ data, onOpen }) => {
  const category = (data.category && data.category[0]) || undefined
  const date = shortDate(data.date?.start_date || data.createdTime)

  return (
    <StyledWrapper type="button" onClick={onOpen} aria-haspopup="dialog">
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
      </div>

      <div className="panel">
        <h2 className="title">{data.title}</h2>
        <div className="meta">
          <span>{category}</span>
          <span>{date}</span>
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
  padding: 0;
  font: inherit;
  text-align: left;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  /* Only the right and bottom edges are drawn here; the grid supplies its own
     top and left, so neighbouring cells share one hairline rather than two. */
  border-right: 1px solid ${({ theme }) => theme.colors.gray6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
  background-color: ${({ theme }) => theme.colors.card};

  > .cover {
    position: relative;
    width: 100%;
    /* Square, as in the reference — the covers are the rhythm of the page. */
    aspect-ratio: 1 / 1;
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

  > .panel {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1.25rem 1.25rem 1rem;

    > .title {
      margin: 0 0 1.5rem;
      font-family: var(--font-prose);
      font-size: 1.3125rem;
      font-weight: 700;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray12};
    }

    > .meta {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      /* Pinned to the foot so the row reads as one line across the grid. */
      margin-top: auto;
      font-family: var(--font-label);
      font-size: 0.625rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray10};
    }
  }

  :hover,
  :focus-visible {
    > .cover img {
      opacity: 0.72;
    }
    > .panel > .title {
      opacity: 0.6;
    }
  }
`
