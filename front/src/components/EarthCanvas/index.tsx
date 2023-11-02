import { useThree } from "@react-three/fiber";
import { useRotateCameraOnScroll } from "../../hooks";
import { Earth } from "./Earth";
import { OrbitControls } from "@react-three/drei";
import { scrollCameraPositionMap } from "../../constants";
import { EARTH_RADIUS } from "./../../constants/radius";

export const EarthCanvas = () => {
  const { camera } = useThree();

  const { setCameraPositions } = useRotateCameraOnScroll(
    { x: 0, y: 0, z: 4 },
    camera
  );

  setCameraPositions(scrollCameraPositionMap);

  return (
    <>
      <Earth radius={EARTH_RADIUS} />
      <OrbitControls
        enableZoom={false}
        enableDamping={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
};
