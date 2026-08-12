export const queryKey = {
  scheme: () => ["scheme"],
  posts: () => ["posts"],
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
  comments: (postId: string) => ["comments", postId],
}
