import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderMainPageBtn from "../../components/organisms/trader/TraderMainPageBtn";
import TraderMainProfile from "../../components/organisms/trader/TraderMainProfile";
import TraderMainCount from "../../components/organisms/trader/TraderMainCount";

const TraderMainPage = () => {
  return (
    <StyledContainer>
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
