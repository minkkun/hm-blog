import { TPosts, TPostStatus, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
  /**
   * Rows without a slug are dropped by default, since most routes address a
   * post by one. Gallery entries open in a dialog instead of a page, so they
   * are allowed through without one.
   */
  requireSlug?: boolean
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  const {
    acceptStatus = ["Public"],
    acceptType = ["Post"],
    requireSlug = true,
  } = options
  const filteredPosts = posts
    // filter data
    .filter((post) => {
      const postDate = new Date(post?.date?.start_date || post.createdTime)
      if (!post.title || postDate > tomorrow) return false
      if (requireSlug && !post.slug) return false
      return true
    })
    /**
     * Status and type are read defensively: a Notion row with the column left
     * empty arrives as undefined, and indexing it threw during prerender,
     * failing the whole build over one unfinished row. A row that cannot say
     * what it is simply matches nothing.
     */
    .filter((post) => {
      const postStatus = post.status?.[0]
      return !!postStatus && acceptStatus.includes(postStatus)
    })
    .filter((post) => {
      const postType = post.type?.[0]
      return !!postType && acceptType.includes(postType)
    })
  return filteredPosts
}
