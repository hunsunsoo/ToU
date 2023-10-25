import styled from "styled-components";
import TraderLandingText from "../../components/atoms/trader/TraderLandingText";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";

const TraderLandingPage = () => {
  return (
    <StyledMainPaddingContainer>
      <TraderLandingText />
      <StyledImages>
        <StyledImage src="/ToU.png" alt="Logo" />
        <StyledImage src="/ToU2.png" alt="Logo" />
      </StyledImages>
    </StyledMainPaddingContainer>
  );
};

export default TraderLandingPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #eff7ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 13rem;
  height: auto;
  margin: 0 0 3rem 0;
`;

const StyledImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

