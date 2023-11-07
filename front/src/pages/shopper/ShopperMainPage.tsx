import { styled } from "styled-components";
import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import ShopperTitle from "../../components/atoms/shopper/ShopperTitle";
import ShopperItemList from "../../components/organisms/shopper/ShopperItemList";

const ShopperMainPage = () => {
  return (
    <StyledMainPaddingContainer>
      <ShopperTitle />
      <ShopperItemList />
    </StyledMainPaddingContainer>
  );
};

export default ShopperMainPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  width: 100%;
`;
