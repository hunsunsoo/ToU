import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import ShopperBtn from "../../atoms/shopper/ShopperBtn";
import { ROUTES } from "../../../commons/Routes";

const ShopperHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <ShopperBtn 
        src="/ToU.png" 
        alt="Logo" 
        isLogo={true}
        onClick={() => navigate(ROUTES.SHOPPER_MAIN)}  // 로고 클릭 시 메인으로 이동
      />
      <ShopperBtn
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png"
        alt="Information"
        onClick={() => navigate(ROUTES.SHOPPER_INFO)}  // 정보 클릭 시 info로 이동
      />
    </HeaderContainer>
  );
};

export default ShopperHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  position: sticky;
  top: 0;
`;
