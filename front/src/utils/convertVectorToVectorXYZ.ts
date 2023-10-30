import { type Vector, type VectorXYZ } from '../types/index'

/**
 *
 * @param vector [x, y, z] 형태의 좌표값
 * @returns vector 객체. { x: x좌표, y: y좌표, z: z좌표 }
 */
export const convertVectorToVectorXYZ = (vector: Vector): VectorXYZ => {
  const [x, y, z] = vector

  return {
    x,
    y,
    z,
  }
}
