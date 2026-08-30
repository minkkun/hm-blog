import styled from "@emotion/styled"

import SideNav from "../Feed/SideNav"
import GalleryCard from "./GalleryCard"
import useGalleryQuery from "src/hooks/useGalleryQuery"
import {
  RAIL_PADDING_DESKTOP,
  RAIL_PADDING_MOBILE,
  RAIL_WIDTH,
} from "../railLayout"

type Props = {}

const Gallery: React.FC<Props> = () => {
  const items = useGalleryQuery()

  return (
    <StyledWrapper>
      <SideNav />
      <div className="content">
        <h1 className="page-title">Gallery</h1>
        {items.length ? (
          <div className="grid">
            {items.map((item) => (
              <GalleryCard key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <p className="empty">Nothing here yet</p>
        )}
      </div>
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
      margin-bottom: 4.5rem;
      font-family: var(--font-label);
      font-size: 0.9375rem;
      font-weight: 500;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.gray12};

      @media (min-width: 1024px) {
        margin-bottom: 5.5rem;
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
      border-top: 1px solid ${({ theme }) => theme.colors.gray6};
      border-left: 1px solid ${({ theme }) => theme.colors.gray6};

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  }
`
