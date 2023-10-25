import styled from "styled-components";
import { To1, To2, U1, U2 } from "../../../commons/String";

const TraderLandingText = () => {
  return (
    <StyledText>
      <StyledDiv>
        <StyledSpan>{To1}</StyledSpan>
        {To2}
      </StyledDiv>
      <StyledDiv>
        <StyledSpan> {U1}</StyledSpan>
        {U2}
      </StyledDiv>
    </StyledText>
  );
};

export default TraderLandingText;

const StyledSpan = styled.span`
  color: #3479ff;
`;

const StyledDiv = styled.div`
  color: #3caaff;
  margin: 1rem 0 1rem 0;
`;

const StyledText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  
`