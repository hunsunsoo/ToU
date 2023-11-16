import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { MainPaddingContainer } from './../../commons/style/mobileStyle/MobileLayoutStyle';
import ShopperInfoCardList from "../../components/organisms/shopper/ShopperInfoCardList";
import { useNavigate } from 'react-router-dom';
import ShopperBtn from "../../components/atoms/shopper/ShopperBtn";

const ShopperInfoPage = () => {
  const navigate = useNavigate();
  const { productSeq } = useParams<{ productSeq: string }>();

  return (
    <>
      <HeaderContainer>
        <ShopperBtn 
          src="/ToU.png" 
          alt="Logo" 
          isLogo={true}
          onClick={() => navigate(-1)}  // 로고 클릭 시 메인으로 이동
        />
        <ShopperBtn
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png"
          alt="Information"
          onClick={() => navigate(-1)}
        />
      </HeaderContainer>
      <StyledMainPaddingContainer>
        <StyledTitle>
          <StyledImage src="/ToU.png" alt="Logo" /> 의 유통과정을 알려드릴게요
        </StyledTitle>
        <ShopperInfoCardList />
      </StyledMainPaddingContainer>
    </>
  );
};

export default ShopperInfoPage;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: sticky;
  top: 0;
`;

const StyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
`;

const StyledImage = styled.img`
  width: 2rem;
  height: auto;
`;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  height: calc(100vh - 56px);
`