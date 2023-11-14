import React from 'react';
import styled from 'styled-components';

const TraderMainCount = () => {
  return (
    <StyledContainer>
      <StyledItem>서명 필요 <StyledCount>3건</StyledCount></StyledItem>
      <StyledDivider />
      <StyledItem>서명 대기중 <StyledCount>5건</StyledCount></StyledItem>
      <StyledDivider />
      <StyledItem>거절 문서 <StyledCount>1건</StyledCount></StyledItem>
    </StyledContainer>
  );
};

export default TraderMainCount;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(70deg, #6D8BF5 11.08%, #5FA8FF 86.68%);
  color: #fff;
  height: 5rem;
  border-radius: 16px;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCount = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledDivider = styled.div`
  height: 3rem;
  width: 1px;
  background-color: #fff;
  opacity: 0.5;
`;
