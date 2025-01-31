interface Details {
  images: { resource_url: string }[]
  artists: { name: string }[]
  title: string
  genres: string[]
  tracklist: { position: string; title: string; duration: string }[]
  videos: { uri: string }[]
}

const filterDetails = (array: Details) => {
  const filtered = array.tracklist.filter((item) => item.position !== '')
  const newObj = { ...array, filteredTracks: filtered }
  return newObj
}

export default filterDetails