const artistName = (title: string) => {
  let index = title.indexOf('-')
  let result = title.slice(0, index)

  let equal = title.indexOf("=")
  console.log("EQUAL INDEX", equal)
  if (equal !== -1) {
    return result.slice(0, equal)
  } else {
    return result
  }
}

export default artistName;