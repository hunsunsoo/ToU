/*
 * city name: [longitude, latitude]
 */
export const cityCoordinates = {
  생산: [137.6502778, 55.6202778],
  입고: [-19.020835, 64.963051],
  가공: [-73.990494, 40.7569545],
  판매: [-73.990494, 41.7569545],
} as const;

export type Cities = keyof typeof cityCoordinates;


export const isCoordinatesSimilar = (
  coord1: [number, number],
  coord2: [number, number],
  threshold = 3
) => {
  return (
    Math.abs(coord1[0] - coord2[0]) <= threshold &&
    Math.abs(coord1[1] - coord2[1]) <= threshold
  );
};
