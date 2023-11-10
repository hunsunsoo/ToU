
import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderMainPageBtn from "../../components/organisms/trader/TraderMainPageBtn";
import TraderMainProfile from "../../components/organisms/trader/TraderMainProfile";


const TraderMainPage = () => {
  return (
    <StyledContainer>
      <TraderMainProfile />
      <MainPaddingContainer>
        <TraderMainPageBtn />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderMainPage;

const StyledContainer = styled.div`
  background-color: #ECF4FF;
`