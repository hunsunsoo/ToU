import { styled } from "styled-components";

const OfficerDemandDiv = () => {
  return (
    <StyledDemandDiv>
      <StyledP>(주) 싸피도매시장</StyledP>
      <p>대전 광역시 유성구 노은동로 33</p>
      <p>042-820-7398</p>
    </StyledDemandDiv>
  );
};

export default OfficerDemandDiv;

const StyledDemandDiv = styled.div`
  text-align: center;
  border: 1px solid black;
  font-weight: normal;
  color: black;
  font-size: 20px;

  p {
    margin: 12px;
  }
`

const StyledP = styled.p`
  font-weight: bold;
  font-size: 23px;
`