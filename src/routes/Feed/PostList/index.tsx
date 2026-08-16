import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"

type Props = {
  q: string
}

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const data = usePostsQuery()
  const [filteredPosts, setFilteredPosts] = useState(data)

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data
      // keyword
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post && post.category && post.category.includes(currentCategory)
        )
      }
      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [q, currentTag, currentCategory, currentOrder, setFilteredPosts])

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

  /* From laptop up the covers sit narrower than their column, which widens
     the channel between them and lets the page breathe. */
  @media (min-width: 1024px) {
    > a {
      width: 80%;
    }
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
