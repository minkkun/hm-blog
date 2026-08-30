import Link from "next/link"
import Image from "next/image"
import styled from "@emotion/styled"
import { TPost } from "src/types"

type Props = {
  data: TPost
}

/** Short form to sit opposite the category, as in `4.10`. */
const shortDate = (value?: string) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return `${d.getMonth() + 1}.${`${d.getDate()}`.padStart(2, "0")}`
}

const GalleryCard: React.FC<Props> = ({ data }) => {
  const category = (data.category && data.category[0]) || undefined
  const date = shortDate(data.date?.start_date || data.createdTime)

  return (
    <StyledWrapper href={`/${data.slug}`}>
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
        {data.summary && <p className="summary">{data.summary}</p>}
        <div className="meta">
          <span>{category}</span>
          <span>{date}</span>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default GalleryCard

const StyledWrapper = styled(Link)`
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
      margin-bottom: 0.625rem;
      font-family: var(--font-prose);
      font-size: 1.3125rem;
      font-weight: 700;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray12};
    }

    > .summary {
      margin: 0 0 1.5rem;
      font-family: var(--font-sans);
      font-size: 0.8125rem;
      line-height: 1.55;
      color: ${({ theme }) => theme.colors.gray11};
      /* Clamped so a long note cannot make one card tower over its row. */
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
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

  :hover {
    > .cover img {
      opacity: 0.72;
    }
    > .panel > .title {
      opacity: 0.6;
    }
  }
`
