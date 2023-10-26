import { styled } from "styled-components";

import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import ShopperEarth from "../../components/atoms/shopper/ShopperEarth";
import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";

const ShopperMainPage = () => {
  return (
    <StyledMainPaddingContainer>
      <ShopperTitle />
      <ShopperEarth />
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
