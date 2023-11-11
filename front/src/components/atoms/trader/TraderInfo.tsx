import React from "react";
import styled from "styled-components";
interface TraderNameProps {
  workerName?: string;
}

const TraderInfo: React.FC<TraderNameProps> = ({ workerName }) => {
  return (
    <StyledMainContainer>
      <StyledDiv>
        <StyledText>
          <StyledSpan>
            <StyledName>{workerName || "어쩌구"}</StyledName> 님
          </StyledSpan>
          , 안녕하세요
        </StyledText>
      </StyledDiv>
    </StyledMainContainer>
  );
};

export default TraderInfo;

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const StyledSpan = styled.span`
  font-size: 2rem;
  font-weight: bold;
`;

const StyledText = styled.span`
  font-size: 1.3rem;
`;
const StyledName = styled.span`
  color: #3c67ff;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
