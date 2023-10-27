import { type VectorXYZ } from '../types'
import { convertVectorToVectorXYZ, convertCoordinateToVector } from '../utils'
import { type Cities, cityCoordinates } from './cityCoordinates'
import { citiesScrollMap } from './citiesScrollMap'
import { EARTH_RADIUS } from './radius'

const cameraDistanceFromEarth = EARTH_RADIUS * 4

/**
 * @description key: 스크롤 y값, value: 해당 스크롤 위치에서 카메라의 위치
 */
const scrollCameraPositionMap: Record<number, VectorXYZ> = {}

const getCameraPositionForCoordinate = (
  coordinate: [number, number],
  radius: number
) => {
  return convertVectorToVectorXYZ(convertCoordinateToVector(coordinate, radius))
}

const makeScrollCameraPositionMap = () => {
  Object.keys(citiesScrollMap).forEach((city) => {
    const cityKey = city as Cities
    const [start, end] = citiesScrollMap[cityKey]
    const cameraPosition = getCameraPositionForCoordinate(
      cityCoordinates[cityKey] as [number, number],
      cameraDistanceFromEarth
    )
    scrollCameraPositionMap[start] = cameraPosition
    scrollCameraPositionMap[end] = cameraPosition
  })
}

makeScrollCameraPositionMap()

export { scrollCameraPositionMap }
