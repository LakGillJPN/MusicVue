const albumName = (title: string) => {
  // Step 1, remove hyphen
  let index = title.indexOf('-')
  let result = title.slice(index + 1)

  // Step 2, remove equal sign
  let equal = result.indexOf('=')

  // Step 3, loop to remove all equals
  // while(equal !== -1) {
  //  result = result.slice(0, equal) 
  // }

  if (equal !== -1 && result.length <= 30) {
    return result.slice(0, equal)
  } else if (result.length > 25) {
    return result.slice(0, 25) + '...'
  } else {
    return result
  }
}

export default albumName
