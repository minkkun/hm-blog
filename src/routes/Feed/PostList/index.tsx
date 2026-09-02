import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React, { useMemo } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { ALL_TAG, DEFAULT_CATEGORY, isFeaturedTag } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  // Derived rather than held in state: an effect that writes the filtered list
  // renders the unfiltered one first, and now that the bare feed is a shelf of
  // a few posts that flash would be the whole archive.
  const filteredPosts = useMemo(() => {
    // keyword
    let posts = data.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : ""
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(q.toLowerCase())
    })

    // tag — no tag is not "everything": the bare feed is the Featured
    // shelf, and ALL_TAG is the explicit way to ask for the whole archive.
    if (!currentTag) {
      posts = posts.filter((post) => post?.tags?.some(isFeaturedTag))
    } else if (currentTag !== ALL_TAG) {
      posts = posts.filter((post) => post?.tags?.includes(currentTag))
    }

    // category
    if (currentCategory !== DEFAULT_CATEGORY) {
      posts = posts.filter((post) => post?.category?.includes(currentCategory))
    }
    // order — copy first, reverse() would otherwise mutate in place
    if (currentOrder !== "desc") {
      posts = [...posts].reverse()
    }

    return posts
  }, [data, q, currentTag, currentCategory, currentOrder])

  return (
    <StyledGrid>
      {!filteredPosts.length && <p className="empty">Nothing here yet</p>}
      {filteredPosts.map((post, index) => (
        <PostCard key={post.id} data={post} index={index} />
      ))}
    </StyledGrid>
  )
}

export default PostList

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  /* top-align each row so the staggered cover heights read as intentional */
  align-items: start;
  /* The columns sit close because each cover drifts inside its own, which is
     what opens the channel between them — and varies it row to row. */
  column-gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  > .empty {
    grid-column: 1 / -1;
    font-family: var(--font-label);
    font-size: 0.6875rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.gray10};
  }
`
