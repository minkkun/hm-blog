import { NextApiRequest, NextApiResponse } from "next"
import { createComment, getComments } from "src/libs/notion-comments"

const readField = (value: unknown) =>
  typeof value === "string" ? value.trim() : ""

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { postId } = req.query

    if (typeof postId !== "string" || !postId) {
      return res.status(400).json({ message: "postId is required" })
    }

    try {
      const comments = await getComments(postId)
      // Posts are static, comments are not — never let this response be cached.
      res.setHeader("Cache-Control", "no-store")
      return res.status(200).json({ comments })
    } catch (err) {
      console.error("Failed to load comments", err)
      return res.status(500).json({ message: "Failed to load comments" })
    }
  }

  if (req.method === "POST") {
    const postId = readField(req.body?.postId)
    const name = readField(req.body?.name)
    const body = readField(req.body?.body)

    if (!postId) {
      return res.status(400).json({ message: "postId is required" })
    }
    if (!name) {
      return res.status(400).json({ message: "Please enter a name" })
    }
    if (!body) {
      return res.status(400).json({ message: "Please enter a comment" })
    }

    try {
      const comment = await createComment({ postId, name, body })
      return res.status(201).json({ comment })
    } catch (err) {
      console.error("Failed to create comment", err)
      return res.status(500).json({ message: "Failed to post comment" })
    }
  }

  res.setHeader("Allow", "GET, POST")
  return res.status(405).json({ message: "Method not allowed" })
}
