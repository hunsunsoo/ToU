import { styled } from "styled-components";
import { Canvas } from "@react-three/fiber";
import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
// import ShopperEarth from "../../components/atoms/shopper/ShopperEarth";
import { EarthCanvas } from "./../../components/EarthCanvas/index";
import { OrbitControls } from "@react-three/drei";

import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";

const ShopperMainPage = () => {
  return (
    <StyledMainPaddingContainer>
      <ShopperTitle />

      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 4] }}>
        {/* <ShopperEarth /> */}
        <pointLight position={[0, 0, 3]} />
        <EarthCanvas />
        <OrbitControls />
      </Canvas>
      
      <ShopperItemList />
    </StyledMainPaddingContainer>
  );
};

export default ShopperMainPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  display: flex;
  flex-direction: column; // 세로 정렬
  height: calc(100vh - 45px); // 전체 세로 높이 - header 높이
`;
