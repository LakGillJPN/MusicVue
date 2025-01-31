const artistName = (title: string) => {
  const index = title.indexOf('-')
  const result = title.slice(0, index)

  const equal = title.indexOf("=")
  if (equal !== -1) {
    return result.slice(0, equal)
  } else {
    return result
  }
}

export default artistName;