import { TComment } from "src/types"

/**
 * Comments live in a separate Notion database, written through Notion's
 * *official* API (`api.notion.com/v1`) with an integration token.
 *
 * This is deliberately not the `notion-client` used for posts: that one scrapes
 * the unofficial `/api/v3` endpoints and is read-only, so it can't create pages.
 * Talking to the official REST API directly keeps this dependency-free.
 */
const NOTION_API_URL = "https://api.notion.com/v1"

/**
 * Pinned on purpose. Later API versions move database queries to
 * `/data_sources/{id}/query`; this version keeps `/databases/{id}/query` stable.
 */
const NOTION_VERSION = "2022-06-28"

// Property names in the comments database. Change these here if you rename the
// columns in Notion.
const NAME_PROP = "Name"
const MESSAGE_PROP = "Message"
const POST_ID_PROP = "PostId"

// Notion rejects any single rich text item longer than this.
const TEXT_CHUNK_SIZE = 2000

// Safety net so a misbehaving cursor can't spin forever.
const MAX_PAGES = 20

type NotionRichText = {
  plain_text: string
}

type NotionPage = {
  id: string
  created_time: string
  properties: Record<
    string,
    {
      title?: NotionRichText[]
      rich_text?: NotionRichText[]
    }
  >
}

type NotionQueryResponse = {
  results: NotionPage[]
  has_more: boolean
  next_cursor: string | null
}

const getConfig = () => {
  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_COMMENTS_DATABASE_ID

  if (!token || !databaseId) {
    throw new Error(
      "Comments are not configured. Set NOTION_TOKEN and NOTION_COMMENTS_DATABASE_ID."
    )
  }

  return { token, databaseId }
}

const notionFetch = async <T>(
  path: string,
  body: Record<string, unknown>,
  token: string
): Promise<T> => {
  const res = await fetch(`${NOTION_API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Notion API responded ${res.status}: ${detail}`)
  }

  return res.json()
}

const readText = (items?: NotionRichText[]) =>
  (items ?? []).map((item) => item.plain_text).join("")

/** Split into chunks Notion will accept, so long comments aren't rejected. */
const toRichText = (value: string) =>
  (value.match(new RegExp(`[\\s\\S]{1,${TEXT_CHUNK_SIZE}}`, "g")) ?? []).map(
    (content) => ({ text: { content } })
  )

const toComment = (page: NotionPage): TComment => ({
  id: page.id,
  name: readText(page.properties[NAME_PROP]?.title),
  body: readText(page.properties[MESSAGE_PROP]?.rich_text),
  // Notion stamps this server-side, so it can't be forged by the client.
  createdTime: page.created_time,
})

export const getComments = async (postId: string): Promise<TComment[]> => {
  const { token, databaseId } = getConfig()
  const comments: TComment[] = []
  let cursor: string | undefined

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await notionFetch<NotionQueryResponse>(
      `/databases/${databaseId}/query`,
      {
        filter: {
          property: POST_ID_PROP,
          rich_text: { equals: postId },
        },
        sorts: [{ timestamp: "created_time", direction: "ascending" }],
        page_size: 100,
        start_cursor: cursor,
      },
      token
    )

    comments.push(...data.results.map(toComment))

    if (!data.has_more || !data.next_cursor) break
    cursor = data.next_cursor
  }

  return comments
}

type CreateCommentParams = {
  postId: string
  name: string
  body: string
}

export const createComment = async ({
  postId,
  name,
  body,
}: CreateCommentParams): Promise<TComment> => {
  const { token, databaseId } = getConfig()

  const page = await notionFetch<NotionPage>(
    "/pages",
    {
      parent: { database_id: databaseId },
      properties: {
        [NAME_PROP]: { title: toRichText(name) },
        [MESSAGE_PROP]: { rich_text: toRichText(body) },
        [POST_ID_PROP]: { rich_text: toRichText(postId) },
      },
    },
    token
  )

  return toComment(page)
}
