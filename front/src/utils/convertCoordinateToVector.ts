import { type Coordinate, type Vector } from '../types/index'

/**
 *
 * @param coordinate [경도, 위도]
 * @param radius 반지름
 * @returns 반지름을 반영해 계산한 좌표값 [x, y, z]
 */
export const convertCoordinateToVector = (
  coordinate: Coordinate,
  radius: number
): Vector => {
  const [longitude, latitude] = coordinate

  const lambda = (longitude * Math.PI) / 180
  const phi = (latitude * Math.PI) / 180

  return [
    radius * Math.cos(phi) * Math.cos(lambda),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(lambda),
  ]
}
