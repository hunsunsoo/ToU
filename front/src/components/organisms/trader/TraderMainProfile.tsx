import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainPaddingContainer } from "../../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderImg from "../../atoms/trader/TraderImg";
import TraderInfo from "../../atoms/trader/TraderInfo";
import { CurrentConnectionData } from "../../../types/TraderTypes";
import { customAxios } from "../../api/customAxios";

const TraderMainProfile = () => {
  const [traderInfo, setTraderInfo] =
    useState<CurrentConnectionData | null>(null);

  useEffect(() => {
    customAxios.get("/client/worker").then((res) => {
      console.log(res.data.data);
      setTraderInfo(res.data.data);
      console.log(traderInfo)
    });
  }, []);

  return (
    <StyledMainContainer>
      <MainPaddingContainer>
        <StyledDiv>
          <TraderImg logoImage={traderInfo?.company.logoImage} />
          <TraderInfo workerName={traderInfo?.worker.workerName} />
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
