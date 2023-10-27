/*
 * city name: [longitude, latitude]
 */
export const cityCoordinates = {
  생산: [137.6502778, 55.6202778],
  입고: [-19.020835, 64.963051],
  가공: [-73.990494, 40.7569545],
  판매: [10.9779692, 37.566535],
} as const

export type Cities = keyof typeof cityCoordinates
