import * as THREE from "three";
import { convertCoordinateToVector } from "../../../../utils";

interface SingleCoastLineProps {
  coordinates: Array<[number, number]>;
  radius: number;
  material: any;
}

export default function SingleCoastLine({
  coordinates,
  radius,
  material,
}: SingleCoastLineProps) {
  const getBufferGeometry = (
    coordinates: Array<[number, number]>,
    radius: number
  ) => {
    const geometry = new THREE.BufferGeometry();
    const points: THREE.Vector3[] = [];

    coordinates.forEach((item) => {
      const vector3 = convertCoordinateToVector3(item, radius);
      points.push(vector3);
    });

    geometry.setFromPoints(points);

    return geometry;
  };

  const convertCoordinateToVector3 = (
    location: [number, number],
    radius: number
  ) => {
    const vector = convertCoordinateToVector(location, radius);

    return new THREE.Vector3(...vector);
  };

  const _geometry = getBufferGeometry(coordinates, radius);
  const _material = new THREE.LineBasicMaterial({
    color: material.color,
    linewidth: material.linewidth || 1,
  });
  const line = new THREE.Line(_geometry, _material);

  return <primitive object={line} position={[0, 0, 0]} />;
}
