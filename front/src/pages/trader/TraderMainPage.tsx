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
    </StyledContainer>
  );
};

export default TraderMainPage;

const StyledContainer = styled.div`
  background-color: #ecf4ff;
  height: 100vh;
`;
