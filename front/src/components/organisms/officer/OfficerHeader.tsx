import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OfficerBtn from "../../atoms/officer/OfficerBtn";
import { ROUTES } from "../../../commons/Routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCubes } from "@fortawesome/sharp-light-svg-icons";

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
      <div style={{display: "flex"}}>
        <div style={{display: "flex", alignItems: "center"}} onClick={() => window.location.href = "http://k9b310a.p.ssafy.io/"}>
          <Icon icon={faCubes}  size="xl" style={{color: "#ffffff", cursor: "pointer"}} />
          <StyledOfficerBtn
            src="/HyperledgerExplorer.png"
            alt="Logo"
          />
        </div>
        <Icon icon={faArrowRightFromBracket} size="xl" style={{color: "#ffffff", cursor: "pointer"}} onClick={logout}/>
      </div>
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


const StyledOfficerBtn = styled.img`
  width: 180px;
  height: 20px;
  margin-right: 50px;
  cursor: pointer;
`

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  
`