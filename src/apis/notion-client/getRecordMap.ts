import { createNotionAPI } from "src/libs/notion-api"

export const getRecordMap = async (pageId: string) => {
  const api = createNotionAPI({ apiBaseUrl: "https://snowy-mandible-754.notion.site/api/v3" })
  const recordMap = await api.getPage(pageId)
  return recordMap
}
