import { type Cities } from '.'

/**
 * @key 도시 이름
 * @value [a, b] 스크롤 위치 a ~ b일 때까지 카메라가 해당 도시에 위치.
 */
export const citiesScrollMap: Record<Cities, [number, number]> = {
  생산: [1000, 2200],
  입고: [2700, 3900],
  가공: [4500, 5700],
  판매: [6500, 7000],
}
