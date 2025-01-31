interface Details {
  master_id: number
  year: string | number
  resource_url: string
}

const filterData = (array: Details[]) => {
  const uniq = Array.from(new Map(array.map((item: Details) => [item.master_id, item])).values())

  const filtered = uniq
  .filter((item) => item.master_id !== 0)
  .filter((item) => parseInt(item.year as string) > 1800)
  return filtered.sort((a, b) => parseInt(a.year as string) - parseInt(b.year as string))
}

export default filterData
