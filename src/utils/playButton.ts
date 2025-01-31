interface Details {
  master_id: number
  year: string | number
  resource_url: string
  title: string
  uri: string
}


const playButton = (trackTitle: string, array: Details[]) => {
  const matchedVideo = array?.find((video) =>
    video.title.toLowerCase().includes(trackTitle.toLowerCase()),
  )
  console.log('MATCHEDVIDEO', matchedVideo)

  if (matchedVideo) {
    return "../../public/play-button.png"
  }

  return null
}

export default playButton
