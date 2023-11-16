import styled from "styled-components";

type TraderMainCountProps = {
  count1: number;
  count2: number;
  count3: number;
};

const TraderMainCount = ({ count1, count2, count3 }: TraderMainCountProps) => {
  
  return (
    <StyledContainer>
      <StyledItem>
        서명 필요 <StyledCount>{count1} 건</StyledCount>
      </StyledItem>
      <StyledDivider />
      <StyledItem>
        서명 대기중 <StyledCount>{count2} 건</StyledCount>
      </StyledItem>
      <StyledDivider />
      <StyledItem>
        거절 문서 <StyledCount>{count3} 건</StyledCount>
      </StyledItem>
    </StyledContainer>
  );
};

export default TraderMainCount;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-image: linear-gradient(70deg, #6d8bf5 11.08%, #5fa8ff 86.68%);
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
