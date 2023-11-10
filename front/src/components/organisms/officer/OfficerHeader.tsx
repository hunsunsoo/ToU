import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OfficerBtn from "../../atoms/officer/OfficerBtn";
import { ROUTES } from "../../../commons/Routes";

const OfficerHeader: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 토큰 삭제
    localStorage.removeItem("recoil-persist");
    navigate('/');
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <OfficerBtn
        isImg={true}
        src="/ToU_White.png"
        alt="Logo"
        onClick={() => navigate(ROUTES.OFFICER_MAIN)} // 로고 클릭 시 메인으로 이동
      />
      <OfficerBtn
        isImg={true}
        src="/ToU_White.png"
        alt="Logo"
        onClick={logout} // 로고 클릭 시 로그 아웃
      />
    </HeaderContainer>
  );
};

export default OfficerHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 20px;
  background-color: #333a7c;
`;
