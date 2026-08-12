export function formatDate(date: any, local: any) {
  const d = new Date(date)
  const options: any = { year: 'numeric', month: 'short', day: 'numeric' }
  const res = d.toLocaleDateString(local, options)
  return res
}

export function formatDateTime(date: any, local: any) {
  const d = new Date(date)
  const options: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const res = d.toLocaleString(local, options)
  return res
}
