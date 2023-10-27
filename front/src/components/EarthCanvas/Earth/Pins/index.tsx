import { cityCoordinates } from "../../../../constants";
import { convertCoordinateToVector } from "../../../../utils";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { useLoader } from "@react-three/fiber";

export default function Pins({ radius }: { radius: number }) {
  const pin = useLoader(OBJLoader, "./starPin.obj");
  pin.traverse((obj: any) => {
    if (obj.isMesh) {
      obj.material.color.set(0x000000);
    }
  });

  return (
    <group>
      {Object.values(cityCoordinates).map((coordinate, index) => {
        return (
          <primitive
            position={convertCoordinateToVector(
              coordinate as [number, number],
              radius
            )}
            scale={0.08}
            object={pin.clone()}
            key={index}
          />
        );
      })}
    </group>
  );
}
