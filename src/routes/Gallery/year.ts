/** The year alone, for the badge that sits in the corner of a cover. */
export const year = (value?: string) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return `${d.getFullYear()}`
}
