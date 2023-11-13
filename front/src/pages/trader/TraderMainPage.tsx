import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderMainPageBtn from "../../components/organisms/trader/TraderMainPageBtn";
import TraderMainProfile from "../../components/organisms/trader/TraderMainProfile";
import TraderMainCount from "../../components/organisms/trader/TraderMainCount";
import { useNavigate } from "react-router-dom";
import {MdLogout} from "react-icons/md";

const TraderMainPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 토큰 삭제
    localStorage.removeItem("recoil-persist");
    navigate('/m/login');
    window.location.reload();
  };

  return (
    <StyledContainer>
        <StyledLogout>
           <MdLogout size="1.5rem" color="#0a3145" onClick={logout}/>
          </StyledLogout>
      <TraderMainProfile />
      <MainPaddingContainer>
        <TraderMainCount />
        <TraderMainPageBtn />
      </MainPaddingContainer>
      <StyledFooter>Contact : 어쩌구 저쩌구</StyledFooter>
    </StyledContainer>
  );
};

export default TraderMainPage;

const StyledContainer = styled.div`
  background-color: #ecf4ff;
  height: 100vh;
`;
const StyledFooter = styled.div`
  text-align: center;
  color: #ccc;
`;

const StyledLogout = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end; 
`