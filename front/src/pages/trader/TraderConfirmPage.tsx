import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from "../../components/organisms/trader/TraderCalendarTitle";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";

const TraderConfirmPage = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 검토" />
        <TraderSubtitle subtitle="거래 품목 확인" />
      </StyledHeader>
      <StyledBody>
        <MainPaddingContainer>
          <TraderInfoTitle infoTitle="인수자 정보" />
          {/* <TraderInputTitle inputTitle="업체명" size="Large" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /> */}
          <TraderDropdownTitle inputTitle="관할 구역" />
          <TraderDropdownTitle inputTitle="안수자" />
          <TraderInfoTitle infoTitle="거래 일자 등록" />
          <TraderCalendarTitle />
        </MainPaddingContainer>
      </StyledBody>
      <StyledFooter>
        <TraderBtn
          size="Large"
          color="Blue"
          onClick={() => {
            navigate("/m/create/item");
          }}
        >
          다음
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderConfirmPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`;
const StyledBody = styled.div`
  /* padding-top: 60px; */
  /* position: fixed; */
`;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
