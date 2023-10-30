export interface VectorXYZ {
  x: number
  y: number
  z: number
}

/**
 * [x, y, z]
 */
export type Vector = [number, number, number]

/**
 * [경도, 위도]
 */
export type Coordinate = [number, number]

export * from './block';
