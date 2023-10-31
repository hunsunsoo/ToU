import React from "react";
import styled from "styled-components";
import { MainPaddingContainer } from "../../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderImg from "../../atoms/trader/TraderImg";
import TraderInfo from "../../atoms/trader/TraderInfo";

const TraderMainProfile = () => {
  return (
    <StyledMainContainer>
      <MainPaddingContainer>
        <StyledDiv>
          <TraderImg />
          <TraderInfo />
        </StyledDiv>
      </MainPaddingContainer>
    </StyledMainContainer>
  );
};

export default TraderMainProfile;

const StyledMainContainer = styled.div`
  background-image: linear-gradient(38deg, #297fff 3.34%, #98fff9 90.74%);
  height: 100%;
  color: #fff;
  height: 40vh;
  border-radius: 0px 0px 50px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
