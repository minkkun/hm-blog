import styled from "@emotion/styled"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { CONFIG } from "site.config"
import useScheme from "src/hooks/useScheme"

const year = new Date().getFullYear()
const from = +CONFIG.since

type Props = {}

const SideNav: React.FC<Props> = () => {
  const router = useRouter()
  const [scheme, setScheme] = useScheme()
  const currentTag = router.query.tag || undefined

  // Tag filtering now lives in the flyout beside the "Posts" heading; "All"
  // here just clears whatever tag is applied.
  const allHref = () => {
    const { tag, ...rest } = router.query
    return { query: rest }
  }

  return (
    <StyledWrapper>
      <nav className="nav">
        <Link href={allHref()} data-active={!currentTag} scroll={false}>
          All
        </Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/about">About</Link>
      </nav>

      <div className="scheme">
        <button
          data-active={scheme === "light"}
          onClick={() => setScheme("light")}
        >
          Light
        </button>
        <span>/</span>
        <button
          data-active={scheme === "dark"}
          onClick={() => setScheme("dark")}
        >
          Dark
        </button>
      </div>

      <div className="colophon">
        © {CONFIG.profile.name} {from === year || !from ? year : `${from} - ${year}`}
      </div>
    </StyledWrapper>
  )
}

export default SideNav

const StyledWrapper = styled.aside`
  font-family: var(--font-label);
  font-size: 0.6875rem;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  a,
  button {
    /* The global reset uses \`all: unset\`, which hands <button> its native
       appearance back; flatten it so links and buttons match. */
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    color: ${({ theme }) => theme.colors.gray11};
    transition: color 200ms ease;
    cursor: pointer;

    &[data-active="true"] {
      color: ${({ theme }) => theme.colors.gray12};
    }
    :hover {
      color: ${({ theme }) => theme.colors.gray12};
    }
  }

  > .nav {
    display: flex;
    padding: 0.5rem 1.25rem 0;
    gap: 1.25rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }

    a,
    button {
      flex-shrink: 0;
      text-align: inherit;
    }
  }

  > .scheme,
  > .colophon {
    display: none;
  }

  /* Desktop: a fixed rail pinned to the right edge, separated by a hairline. */
  @media (min-width: 1024px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndexes.header};
    display: flex;
    flex-direction: column;
    width: 12.5rem;
    padding: 1.875rem 1.75rem 2.5rem 1.5rem;
    text-align: right;
    background-color: ${({ theme }) => theme.colors.gray2};
    border-left: 1px solid ${({ theme }) => theme.colors.gray6};

    > .nav {
      flex-direction: column;
      padding: 0;
      gap: 0.5rem;
      overflow: visible;
      line-height: 1.5;
    }

    /* Both blocks claim the leftover space, so the scheme switch settles
       around the vertical middle and the colophon sits at the foot. */
    > .scheme {
      display: block;
      margin-top: auto;

      span {
        margin: 0 0.25rem;
        color: ${({ theme }) => theme.colors.gray8};
      }
    }

    > .colophon {
      display: block;
      margin-top: auto;
      color: ${({ theme }) => theme.colors.gray10};
    }
  }
`
