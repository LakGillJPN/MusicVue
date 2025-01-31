interface Details {
  images: { resource_url: string }[]
  artists: { name: string }[]
  title: string
  genres: string[]
  tracklist: { position: string; title: string; duration: string }[]
  videos: { uri: string }[]
}

const playButton = (trackTitle: string, array: Details[]) => {
  const matchedVideo = array?.find((video) =>
    video.title.toLowerCase().includes(trackTitle.toLowerCase()),
  )
  console.log('MATCHEDVIDEO', matchedVideo)

  if (matchedVideo) {
    return "/play-button.png"
  }

  return undefined
}

export default playButton
