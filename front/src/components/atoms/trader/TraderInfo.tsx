import React from "react";
import styled from "styled-components";

const TraderInfo = () => {
  return (
    <StyledMainContainer>
      <StyledDiv>
        <StyledSpan>어서오세요</StyledSpan>
        <StyledText>어쩌구 님</StyledText>
      </StyledDiv>
      <StyledDiv>
        <StyledSpan>서명필요</StyledSpan>
        <StyledSpan>서명 대기중</StyledSpan>
        <StyledSpan>거절된 문서</StyledSpan>
      </StyledDiv>
      <StyledDiv>
        <StyledSpan>$$건</StyledSpan>
        <StyledSpan>$$건</StyledSpan>
        <StyledSpan>$$건</StyledSpan>
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
  font-size: 1.3rem;
`;

const StyledText = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
