interface Result {
  id: number
  title: string
  cover_image: string

  release_date: string
  master_id: number
  year: string | number
}

const filterData = (array: Result[]) => {
  const uniq = Array.from(new Map(array.map((item: Result) => [item.master_id, item])).values())

  const filtered = uniq
  .filter((item) => item.master_id !== 0)
  .filter((item) => parseInt(item.year.toString()) > 1800)
  return filtered.sort((a, b) => parseInt(a.year as string) - parseInt(b.year as string))
}

export default filterData
