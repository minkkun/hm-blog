import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

/**
 * Gallery entries come from the same Notion database as posts, marked
 * `type: Gallery`. They are cached under their own key because the feed's
 * cache is filtered to `type: Post` before it is ever seeded.
 */
const useGalleryQuery = () => {
  const { data } = useQuery({
    queryKey: queryKey.gallery(),
    initialData: [] as TPost[],
    enabled: false,
  })

  if (!data) throw new Error("Gallery data is not found")

  return data
}

export default useGalleryQuery
