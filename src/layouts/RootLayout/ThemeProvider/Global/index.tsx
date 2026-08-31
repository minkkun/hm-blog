import { Global as _Global, css, useTheme } from "@emotion/react"

import { ThemeProvider as _ThemeProvider } from "@emotion/react"
import {
  beVietnamPro,
  ebGaramond,
  imFellEnglish,
  instrumentSerif,
  lora,
  martianMono,
  pretendard,
  spaceMono,
  wordmark,
} from "src/assets"

export const Global = () => {
  const theme = useTheme()

  return (
    <_Global
      styles={css`
        :root {
          /* reading text — long-form prose */
          --font-body: ${pretendard.style.fontFamily};
          /* handwriting — the wordmark only */
          --font-wordmark: ${wordmark.style.fontFamily};
          /* tracked-uppercase labels — nav, titles, captions, dates. Backed
             by Space Mono, which supplies only the Vietnamese letters Martian
             Mono does not draw; everything else still comes from Martian. */
          --font-label: ${martianMono.style.fontFamily},
            ${spaceMono.style.fontFamily};
          /* reading serif — blog post titles and body copy */
          --font-prose: ${lora.style.fontFamily};
          /* display serif — the name under a gallery print. Backed by Lora,
             which supplies the Vietnamese letters it does not draw. */
          --font-display: ${instrumentSerif.style.fontFamily},
            ${lora.style.fontFamily};
          /* letterpress serif — standalone pages such as About */
          --font-page: ${imFellEnglish.style.fontFamily};
          /* general-purpose sans with Vietnamese — gallery notes */
          --font-sans: ${beVietnamPro.style.fontFamily};
          /* book serif — comments, tags, categories */
          --font-garamond: ${ebGaramond.style.fontFamily};
        }

        body {
          margin: 0;
          padding: 0;
          color: ${theme.colors.gray12};
          background-color: ${theme.colors.paper};
          font-family: var(--font-body);
          font-weight: ${pretendard.style.fontWeight};
          font-style: ${pretendard.style.fontStyle};
        }

        * {
          color-scheme: ${theme.scheme};
          box-sizing: border-box;
        }

        /* Opening a post: the cover clicked on the feed grows into the one at
           the head of the article while the rest of the page changes under it.
           Slower than the cross-fade, so the eye follows the one thing that
           moves rather than the whole page turning over at once. */
        ::view-transition-group(post-cover) {
          animation-duration: 460ms;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* The two covers are cropped differently — the feed's is tall, the
           post's is wide — and the default letterboxes each inside the box as
           it morphs, which shows as the image sliding within its own frame.
           Filling and cropping instead keeps it reading as one photograph. */
        ::view-transition-old(post-cover),
        ::view-transition-new(post-cover) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation-duration: 460ms;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 300ms;
        }

        @media (prefers-reduced-motion: reduce) {
          ::view-transition-group(*),
          ::view-transition-old(*),
          ::view-transition-new(*) {
            animation: none;
          }
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 0;
          font-weight: inherit;
          font-style: inherit;
        }

        a {
          all: unset;
          cursor: pointer;
        }

        ul {
          padding: 0;
        }

        // init button
        button {
          all: unset;
          cursor: pointer;
        }

        // init input
        input {
          all: unset;
          box-sizing: border-box;
        }

        // init textarea
        textarea {
          border: none;
          background-color: transparent;
          font-family: inherit;
          padding: 0;
          outline: none;
          resize: none;
          color: inherit;
        }

        hr {
          width: 100%;
          border: none;
          margin: 0;
          border-top: 1px solid ${theme.colors.gray6};
        }
      `}
    />
  )
}
