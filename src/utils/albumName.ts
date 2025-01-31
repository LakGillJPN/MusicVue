const albumName = (title: string) => {
  const index = title.indexOf('-')
  const result = title.slice(index + 1)
  const equal = result.indexOf('=')

  if (equal !== -1 && result.length <= 30) {
    return result.slice(0, equal)
  } else if (result.length > 25) {
    return result.slice(0, 25) + '...'
  } else {
    return result
  }
}

export default albumName
