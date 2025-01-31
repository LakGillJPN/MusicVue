interface Details {
  master_id: number
  year: string | number
  resource_url: string
  title: string
  uri: string
}


const getVideoUrl = (trackTitle: string, array: Details[]) => {
  const matchedVideo = array.find((video) =>
    video.title.toLowerCase().includes(trackTitle.toLowerCase()),
  )
  console.log('MATCHEDVIDEO', matchedVideo)

  if (matchedVideo) {
    return matchedVideo.uri.replace('/watch?v=', '/embed/')
  }

  return ''
}

export default getVideoUrl
