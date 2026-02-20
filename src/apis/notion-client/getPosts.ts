import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

export const getPosts = async (): Promise<TPosts> => {
  try {
    // support both databaseId (preferred) and pageId (legacy)
    const notionCfg: any = CONFIG.notionConfig
    let targetId = (notionCfg.databaseId || notionCfg.pageId) as string
      const api = new NotionAPI()

      const response = await api.getPage(targetId)
      targetId = idToUuid(targetId)
    
      const collection = Object.values(response.collection || {})[0]?.value
      const block = response.block || {}
      const schema = collection?.schema

      const rawMetadata = block[targetId]?.value

    // If not a collection view, return empty safely
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      console.warn("Not a collection view page")
      return []
    }

    if (!schema) {
      console.warn("No schema found in Notion response")
      return []
    }

    const pageIds = getAllPageIds(response)
    const data: any[] = []

    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]

      try {
        const properties = await getPageProperties(id, block, schema)

        // Skip invalid/broken posts
        if (!properties) continue

        const createdTimeRaw = block[id]?.value?.created_time
        const createdTime = createdTimeRaw
          ? new Date(createdTimeRaw).toString()
          : new Date().toString()

        properties.createdTime = createdTime
        properties.fullWidth =
          block[id]?.value?.format?.page_full_width ?? false

        data.push(properties)
      } catch (err) {
        console.warn(`Skipping broken post: ${id}`, err)
        continue
      }
    }

    // Safe sort
    data.sort((a: any, b: any) => {
      const dateA = new Date(a?.date?.start_date || a?.createdTime || 0).getTime()
      const dateB = new Date(b?.date?.start_date || b?.createdTime || 0).getTime()
      return dateB - dateA
    })

    return data as TPosts
  } catch (error) {
    console.error("Error fetching Notion posts:", error)
    return []
  }
}