/** Short form to sit opposite the category, as in `4.10`. */
export const shortDate = (value?: string) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return `${d.getMonth() + 1}.${`${d.getDate()}`.padStart(2, "0")}`
}
