import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TComment, TComments } from "src/types"

const fetchComments = async (postId: string): Promise<TComments> => {
  const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`)
  if (!res.ok) throw new Error("Failed to load comments")

  const data = await res.json()
  return data.comments
}

const useCommentsQuery = (postId: string) =>
  useQuery<TComments>({
    queryKey: queryKey.comments(postId),
    queryFn: () => fetchComments(postId),
  })

type NewComment = {
  name: string
  body: string
}

export const useCreateCommentMutation = (postId: string) => {
  const queryClient = useQueryClient()

  return useMutation<TComment, Error, NewComment>({
    mutationFn: async (comment) => {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, ...comment }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || "Failed to post comment")

      return data.comment
    },
    // Append locally instead of refetching — Notion can lag a beat before a
    // freshly created page shows up in a database query.
    onSuccess: (comment) => {
      queryClient.setQueryData<TComments>(
        queryKey.comments(postId),
        (prev) => [...(prev ?? []), comment]
      )
    },
  })
}

export default useCommentsQuery
