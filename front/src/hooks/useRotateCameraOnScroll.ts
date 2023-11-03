import { useEffect } from "react";
import { useScroll } from "./useScroll";
import { type Camera } from "@react-three/fiber";
import { type VectorXYZ } from "../types";
import { cityCoordinates, Cities, isCoordinatesSimilar } from "../constants";
import { citiesScrollMap } from "../constants";
import { EARTH_RADIUS } from "../constants";
import { convertVectorToVectorXYZ, convertCoordinateToVector } from "../utils";

/*
  addCameraPosition 또는 setCameraPositions를 호출해,
  특정 스크롤 위치일 때 카메라의 위치를 등록해야 한다.

  사용자의 Y축 스크롤 위치에 따라 등록된 스크롤 타임라인에 맞게 카메라의 위치를 이동한다.
*/

const cameraDistanceFromEarth = EARTH_RADIUS * 4;

const scrollCameraPositionMap: Record<number, VectorXYZ> = {};

const getCameraPositionForCoordinate = (
  coordinate: [number, number],
  radius: number
) => {
  return convertVectorToVectorXYZ(
    convertCoordinateToVector(coordinate, radius)
  );
};

const makeScrollCameraPositionMap = () => {
  Object.keys(citiesScrollMap).forEach((city) => {
    const cityKey = city as Cities;
    const [start, end] = citiesScrollMap[cityKey];
    const cameraPosition = getCameraPositionForCoordinate(
      cityCoordinates[cityKey] as [number, number],
      cameraDistanceFromEarth
    );
    scrollCameraPositionMap[start] = cameraPosition;
    scrollCameraPositionMap[end] = cameraPosition;
  });
};

makeScrollCameraPositionMap();

export const useRotateCameraOnScroll = (
  initialVector: VectorXYZ,
  camera: Camera
) => {
  const { y: currentScrollPosition } = useScroll(0);

  let scrollPositions: number[] = [0];
  let scrollToCameraPositionMap: Record<number, VectorXYZ> = {
    0: initialVector,
  };

  const addCameraPosition = (
    scrollPositionY: number,
    targetVector: VectorXYZ
  ) => {
    scrollToCameraPositionMap[scrollPositionY] = targetVector;
    scrollPositions.push(scrollPositionY);

    scrollPositions.sort((a, b) => a - b);
  };

  const setCameraPositions = (positions: Record<number, VectorXYZ>) => {
    scrollToCameraPositionMap = {
      0: initialVector,
      ...positions,
    };
    scrollPositions = Object.keys(scrollToCameraPositionMap).map(Number);

    scrollPositions.sort((a, b) => a - b);
  };

  const calculateCameraPosition = (currentScrollPositionY: number) => {
    if (currentScrollPositionY < 0) return scrollToCameraPositionMap[0];

    const currentScrollPositionIdx = scrollPositions.findIndex((scrollPos) => {
      if (scrollPos > currentScrollPositionY) return true;
      return false;
    });

    if (currentScrollPositionIdx === -1) {
      return scrollToCameraPositionMap[
        scrollPositions[scrollPositions.length - 1]
      ];
    }

    const scrollFrom = scrollPositions[currentScrollPositionIdx - 1];
    const scrollTo = scrollPositions[currentScrollPositionIdx];

    const progressRatio =
      (currentScrollPositionY - scrollFrom) / (scrollTo - scrollFrom);

    const currentCameraPosition: VectorXYZ = {
      x: 0,
      y: 0,
      z: 0,
    };

    (Object.keys(currentCameraPosition) as Array<keyof VectorXYZ>).forEach(
      (coord) => {
        const previousPosition = scrollToCameraPositionMap[scrollFrom][coord];
        const nextPosition = scrollToCameraPositionMap[scrollTo][coord];

        const diff = nextPosition - previousPosition;

        currentCameraPosition[coord] = previousPosition + diff * progressRatio;
      }
    );

    return currentCameraPosition;
  };

  useEffect(() => {
    const cameraPosition = calculateCameraPosition(currentScrollPosition);

    const currentCoordinate = Object.entries(cityCoordinates).find(
      ([_, coord]) =>
        isCoordinatesSimilar(coord as [number, number], [
          cameraPosition.x,
          cameraPosition.y,
        ]) // coord 타입 단언 추가
    );

    if (currentCoordinate) {
      // 카메라의 zoom 값을 점진적으로 증가시킴
      camera.zoom += 0.1; // 여기서 0.1은 매 프레임마다 zoom이 증가하는 값입니다. 원하는대로 조절할 수 있습니다.
      if (camera.zoom > 2) camera.zoom = 2; // zoom의 최대값 설정
    } else {
      // 카메라의 zoom 값을 점진적으로 감소시킴
      camera.zoom -= 0.1;
      if (camera.zoom < 1) camera.zoom = 1; // zoom의 최소값 설정
    }

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScrollPosition]);

  return { addCameraPosition, setCameraPositions };
};
