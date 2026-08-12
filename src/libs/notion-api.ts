import { NotionAPI } from "notion-client"

/**
 * Notion's unofficial `/api/v3` endpoints sit behind Cloudflare bot protection,
 * which rejects notion-client's default HTTP-library user-agent with a 403 HTML
 * challenge page. At build time that surfaces as `Failed to collect page data`.
 * Sending a browser user-agent passes the check.
 *
 * Always construct the client through this helper so every request — page
 * chunks, collection queries, record values and signed file URLs — carries it.
 */
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

type NotionAPIOptions = ConstructorParameters<typeof NotionAPI>[0]

export const createNotionAPI = (options: NotionAPIOptions = {}) =>
  new NotionAPI({
    ...options,
    ofetchOptions: {
      ...options?.ofetchOptions,
      headers: {
        "user-agent": USER_AGENT,
        ...options?.ofetchOptions?.headers,
      },
    },
  })
