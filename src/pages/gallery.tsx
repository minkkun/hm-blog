import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"

import { CONFIG } from "site.config"
import { getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { queryKey } from "src/constants/queryKey"
import { queryClient } from "src/libs/react-query"
import { filterPosts } from "src/libs/utils/notion"
import Gallery from "src/routes/Gallery"
import { NextPageWithLayout } from "src/types"

export const getStaticProps: GetStaticProps = async () => {
  // The feed's cache is filtered to posts, so the gallery fetches its own.
  // Entries open in a dialog rather than a page, so a slug is not required.
  const items = filterPosts(await getPosts(), {
    acceptStatus: ["Public"],
    acceptType: ["Gallery"],
    requireSlug: false,
  })
  await queryClient.prefetchQuery(queryKey.gallery(), () => items)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const GalleryPage: NextPageWithLayout = () => {
  const meta = {
    title: `Gallery — ${CONFIG.blog.title}`,
    description: CONFIG.blog.description,
    type: "website",
    url: `${CONFIG.link}/gallery`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Gallery />
    </>
  )
}

export default GalleryPage
