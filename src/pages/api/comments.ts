import { NextApiRequest, NextApiResponse } from "next"
import { createComment, getComments } from "src/libs/notion-comments"

const readField = (value: unknown) =>
  typeof value === "string" ? value.trim() : ""

/**
 * Notion's own error text (bad token, database not shared with the integration,
 * renamed column) is the only thing that makes a failure diagnosable, but it
 * names internal ids — so pass it through everywhere except production.
 */
const errorBody = (message: string, err: unknown) => {
  const reason = err instanceof Error ? err.message : String(err)
  return process.env.VERCEL_ENV === "production"
    ? { message }
    : { message, reason }
}

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
      return res
        .status(500)
        .json(errorBody("Failed to load comments", err))
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
      return res.status(500).json(errorBody("Failed to post comment", err))
    }
  }

  res.setHeader("Allow", "GET, POST")
  return res.status(405).json({ message: "Method not allowed" })
}
