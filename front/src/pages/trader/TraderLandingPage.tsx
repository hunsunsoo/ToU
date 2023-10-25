import styled from "styled-components";
import TraderLandingText from "../../components/atoms/trader/TraderLandingText";

const TraderLandingPage = () => {
  return (
    <StyledContainer>
      <TraderLandingText />
      <StyledImages>
        <StyledImage src="/ToU.png" alt="Logo" />
        <StyledImage src="/ToU2.png" alt="Logo" />
      </StyledImages>
    </StyledContainer>
  );
};

export default TraderLandingPage;

const StyledContainer = styled.div`
  background-color: #eff7ff;
  height: 100vh;
`;

const StyledImage = styled.img`
  width: 10rem;
  height: auto;
`;

const StyledImages = styled.div`
  display: flex;
  flex-direction: column;
`;
