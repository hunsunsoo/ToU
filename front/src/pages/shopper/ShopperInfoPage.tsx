import { styled } from "styled-components";
import { MainPaddingContainer } from './../../commons/style/mobileStyle/MobileLayoutStyle';
import ShopperInfoCardList from "../../components/organisms/shopper/ShopperInfoCardList";

const ShopperInfoPage = () => {
  return (
    <MainPaddingContainer>
      <StyledTitle>
        <StyledImage src="/ToU.png" alt="Logo" /> 의 유통과정을 알려드릴게요
      </StyledTitle>
      <ShopperInfoCardList />
    </MainPaddingContainer>
  );
};

export default ShopperInfoPage;

const StyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const StyledImage = styled.img`
  width: 2rem;
  height: auto;
`;

// const StyledMainPaddingContainer = styled(MainPaddingContainer)`
//   height: calc(100vh - 57px);
// `