import { idToUuid } from "notion-utils"
import { ExtendedRecordMap, ID } from "notion-types"

export default function getAllPageIds(
  response: ExtendedRecordMap,
  viewId?: string
) {
  if (!response.collection_query) {
    console.error("response:", Object.keys(response))
    throw new Error("response.collection_query is undefined")
  }

  const collectionQuery = response.collection_query
  const views = Object.values(collectionQuery)[0]

  let pageIds: ID[] = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds
  } else {
    const pageSet = new Set<ID>()
    // * type not exist
    Object.values(views).forEach((view: any) => {
      view?.collection_group_results?.blockIds?.forEach((id: ID) =>
        pageSet.add(id)
      )
    })
    pageIds = [...pageSet]
  }
  return pageIds
}
