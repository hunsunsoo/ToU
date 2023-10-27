import { type Cities } from '.'

/**
 * @key 도시 이름
 * @value [a, b] 스크롤 위치 a ~ b일 때까지 카메라가 해당 도시에 위치.
 */
export const citiesScrollMap: Record<Cities, [number, number]> = {
  Copenhagen: [1000, 2200],
  Iceland: [2700, 3900],
  Seoul: [4500, 5700],
  'New York': [6500, 7000],
}
