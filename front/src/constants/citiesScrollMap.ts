import { type Cities } from '.'

/**
 * @key 도시 이름
 * @value [a, b] 스크롤 위치 a ~ b일 때까지 카메라가 해당 도시에 위치.
 */
export const citiesScrollMap: Record<Cities, [number, number]> = {
  생산: [0, 300],
  입고: [300, 600],
  가공: [600, 900],
  판매: [900, 1200],
}
