const filterData = (array: any[]) => {
  const uniq = Array.from(new Map(array.map((item) => [item.master_id, item])).values())

  
  return uniq.sort((a,b) => parseInt(a.year) - parseInt(b.year))
  //return uniq
  //return array.filter(item => parseInt(item.year) > 2020)
}

export default filterData
