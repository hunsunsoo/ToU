const isCoordinates = (element: any): element is [number, number] => {
  return (
    Array.isArray(element) &&
    element.length === 2 &&
    element.every((el) => typeof el === 'number')
  )
}

export const normalizeCoordinates = (coordinates: Array<[number, number]>) => {
  const normalizedCoordinates: Array<[number, number]> = []

  coordinates.forEach((coordinate) => {
    let isAllNumber = true
    for (let i = 0; i < coordinate.length; i++) {
      const coord: [number, number] | number = coordinate[i]
      if (isCoordinates(coord)) {
        normalizedCoordinates.push(coord)
        isAllNumber = false
      }
    }
    if (isAllNumber && isCoordinates(coordinate)) {
      normalizedCoordinates.push(coordinate)
    }
  })

  return normalizedCoordinates
}
