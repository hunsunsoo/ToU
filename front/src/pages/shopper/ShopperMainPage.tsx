import { styled } from "styled-components";

import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";

import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";

const ShopperMainPage = () => {
  return (
    <StyledMainPaddingContainer>
      <ShopperTitle />

      <ContentContainer>
        <ShopperItemListContainer>
          <ShopperItemList />
        </ShopperItemListContainer>
      </ContentContainer>
    </StyledMainPaddingContainer>
  );
};

export default ShopperMainPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 45px);
  width: 100%;
  position: fixed;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const ShopperItemListContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.8); // 배경 색상 (선택사항)
  max-height: 150px; // 원하는 높이 설정
  overflow-y: auto;
  z-index: 1; // 필요하면 z-index를 조절해주세요
`;
