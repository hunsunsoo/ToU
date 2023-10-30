import { type Camera } from '@react-three/fiber'
import { useScroll } from './useScroll'
import { useEffect } from 'react'
import { type VectorXYZ } from '../types'

/*
  addCameraPosition 또는 setCameraPositions를 호출해,
  특정 스크롤 위치일 때 카메라의 위치를 등록해야 한다.

  사용자의 Y축 스크롤 위치에 따라 등록된 스크롤 타임라인에 맞게 카메라의 위치를 이동한다.
*/

export const useRotateCameraOnScroll = (
  initialVector: VectorXYZ,
  camera: Camera
) => {
  const { y: currentScrollPosition } = useScroll(0)

  let scrollPositions: number[] = [0]
  let scrollToCameraPositionMap: Record<number, VectorXYZ> = {
    0: initialVector,
  }

  const addCameraPosition = (
    scrollPositionY: number,
    targetVector: VectorXYZ
  ) => {
    scrollToCameraPositionMap[scrollPositionY] = targetVector
    scrollPositions.push(scrollPositionY)

    scrollPositions.sort((a, b) => a - b)
  }

  const setCameraPositions = (positions: Record<number, VectorXYZ>) => {
    scrollToCameraPositionMap = {
      0: initialVector,
      ...positions,
    }
    scrollPositions = Object.keys(scrollToCameraPositionMap).map(Number)

    scrollPositions.sort((a, b) => a - b)
  }

  const calculateCameraPosition = (currentScrollPositionY: number) => {
    if (currentScrollPositionY < 0) return scrollToCameraPositionMap[0]

    const currentScrollPositionIdx = scrollPositions.findIndex((scrollPos) => {
      if (scrollPos > currentScrollPositionY) return true
      return false
    })

    if (currentScrollPositionIdx === -1) {
      return scrollToCameraPositionMap[
        scrollPositions[scrollPositions.length - 1]
      ]
    }

    const scrollFrom = scrollPositions[currentScrollPositionIdx - 1]
    const scrollTo = scrollPositions[currentScrollPositionIdx]

    const progressRatio =
      (currentScrollPositionY - scrollFrom) / (scrollTo - scrollFrom)

    const currentCameraPosition: VectorXYZ = {
      x: 0,
      y: 0,
      z: 0,
    }

    ;(Object.keys(currentCameraPosition) as Array<keyof VectorXYZ>).forEach(
      (coord) => {
        const previousPosition = scrollToCameraPositionMap[scrollFrom][coord]
        const nextPosition = scrollToCameraPositionMap[scrollTo][coord]

        const diff = nextPosition - previousPosition

        currentCameraPosition[coord] = previousPosition + diff * progressRatio
      }
    )

    return currentCameraPosition
  }

  useEffect(() => {
    const cameraPosition = calculateCameraPosition(currentScrollPosition)

    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)

    camera.updateMatrixWorld()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScrollPosition])

  return { addCameraPosition, setCameraPositions }
}
