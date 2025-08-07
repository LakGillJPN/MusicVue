interface Format {
  name: string
  qty: string
  text: string
  descriptions: string[]
}

interface Result {
  id: number
  title: string
  cover_image: string
  type: string
  release_date?: string
  master_id: number
  year: string | number
  role: string
  formats: Format[]
}

const filterData = (array: Result[]): Result[] => {
  console.log('🔍 Starting data filtering...', array)
  console.log('🔍 Original array length:', array.length)

  const excludedDescriptions = ['Compilation', 'Reissue', 'Promo', 'Remastered']

  const releaseAndMain = array.filter((item) => {
    const isMatch = item.type === 'release' && item.master_id > 0
    if (!isMatch) {
      console.log(
        `⛔ Excluded by type/master_id -> ID: ${item.id}, type: ${item.type}, master_id: ${item.master_id}`,
      )
    }
    return isMatch
  })
  console.log("✅ After type === 'master && role === 'Main':", releaseAndMain.length)

  const formatFiltered = releaseAndMain.filter((item) => {
    const allDescriptions = item.formats.flatMap((format) => format.descriptions || [])
    const hasAlbum = allDescriptions.includes('Album')
    const hasExcluded = allDescriptions.some((desc) => excludedDescriptions.includes(desc))

    if (!hasAlbum) {
      console.log(
        `⛔ Excluded by missing 'Album' -> ID: ${item.id}, descriptions:`,
        allDescriptions,
      )
      return false
    }

    if (hasExcluded) {
      console.log(
        `⛔ Excluded by having excluded desc -> ID: ${item.id}, descriptions:`,
        allDescriptions,
      )
      return false
    }

    console.log(`✅ Passed format check -> ID: ${item.id}, descriptions:`, allDescriptions)
    return true
  })
  console.log('✅ After format filtering:', formatFiltered.length)

  const withMasterId = formatFiltered.filter((item) => {
    const valid = item.master_id !== 0
    if (!valid) {
      console.log(`⛔ Excluded by master_id = 0 -> ID: ${item.id}`)
    }
    return valid
  })
  console.log('✅ After master_id check:', withMasterId.length)

  const validYears = withMasterId.filter((item) => {
    if (item.year) {
      const year = parseInt(item.year.toString())
      const valid = year > 1800
      if (!valid) {
        console.log(`⛔ Excluded by invalid year -> ID: ${item.id}, year: ${item.year}`)
      }
      return valid
    }
    return false
  })
  console.log('✅ After year check:', validYears.length)

  // Remove duplicates by master_id
  const uniq = Array.from(new Map(validYears.map((item) => [item.master_id, item])).values())
  console.log('✅ After deduplication by master_id:', uniq.length)

  // Sort ascending by year
  const sorted = uniq.sort((a, b) => parseInt(a.year.toString()) - parseInt(b.year.toString()))
  console.log('✅ Final sorted list length:', sorted.length)

  return sorted
}

export default filterData
