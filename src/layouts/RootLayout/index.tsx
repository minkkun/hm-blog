import React, { ReactNode, useEffect } from "react"
import { useRouter } from "next/router"
import { ThemeProvider } from "./ThemeProvider"
import useScheme from "src/hooks/useScheme"
import Header from "./Header"
import styled from "@emotion/styled"
import Scripts from "src/layouts/RootLayout/Scripts"
import useGtagEffect from "./useGtagEffect"
import Prism from "prismjs/prism"
import 'prismjs/components/prism-markup-templating.js'
import 'prismjs/components/prism-markup.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-c.js'
import 'prismjs/components/prism-cpp.js'
import 'prismjs/components/prism-csharp.js'
import 'prismjs/components/prism-docker.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-js-templates.js'
import 'prismjs/components/prism-coffeescript.js'
import 'prismjs/components/prism-diff.js'
import 'prismjs/components/prism-git.js'
import 'prismjs/components/prism-go.js'
import 'prismjs/components/prism-kotlin.js'
import 'prismjs/components/prism-graphql.js'
import 'prismjs/components/prism-handlebars.js'
import 'prismjs/components/prism-less.js'
import 'prismjs/components/prism-makefile.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-objectivec.js'
import 'prismjs/components/prism-ocaml.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-reason.js'
import 'prismjs/components/prism-rust.js'
import 'prismjs/components/prism-sass.js'
import 'prismjs/components/prism-scss.js'
import 'prismjs/components/prism-solidity.js'
import 'prismjs/components/prism-sql.js'
import 'prismjs/components/prism-stylus.js'
import 'prismjs/components/prism-swift.js'
import 'prismjs/components/prism-wasm.js'
import 'prismjs/components/prism-yaml.js'
import "prismjs/components/prism-go.js"
import SnowEffect from "src/layouts/RootLayout/SnowEffect";
import SideNav from "./SideNav"
import { RAIL_WIDTH } from "src/routes/railLayout"

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const [scheme] = useScheme()
  const router = useRouter()
  useGtagEffect()
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // The feed and the gallery lay their own content out full-bleed; the rest
  // keep a centred column. The chrome around them — the wordmark at the page
  // edge and the nav rail down the right — is the same everywhere, so a post
  // and the feed no longer look like two different sites.
  const laysOutFullBleed = ["/", "/gallery"].includes(router.pathname)

  return (
    <ThemeProvider scheme={scheme}>
      <Scripts />
      {/* // TODO: replace react query */}
      {/* {metaConfig.type !== "Paper" && <Header />} */}
      {/* Always bare: the rail carries the nav and the scheme switch. */}
      <Header fullWidth bare />
      <SideNav />
      <StyledMain data-full-bleed={laysOutFullBleed}>
        <div className="column">{children}</div>
      </StyledMain>
      {/* The feed and gallery are deliberately still; snow only elsewhere. */}
      {!laysOutFullBleed && <SnowEffect />}
    </ThemeProvider>

  )
}

export default RootLayout

const StyledMain = styled.main`
  position: relative;
  z-index: 1; /* ensure main content (inputs/text) renders above the snow canvas */

  /* The rail is fixed to the right edge from 1024 up, so the page reserves
     its width here. Padding rather than a margin: the column inside then
     centres on what is left over instead of being shoved off the middle. */
  @media (min-width: 1024px) {
    padding-right: ${RAIL_WIDTH};
  }

  > .column {
    margin: 0 auto;
    max-width: 1120px;
    padding: 0 1rem;
  }

  /* The feed and the gallery place their own padding and rail clearance. */
  &[data-full-bleed="true"] {
    padding-right: 0;

    > .column {
      max-width: none;
      padding: 0;
    }
  }
`
