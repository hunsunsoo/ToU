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

const TraderCreatePage = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [isValid, setIsValid] = useState(false); // 모든 입력값이 유효한지에 대한 상태

  const checkValidity = () => {
    if (companyName) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName]);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 업체 등록" />
      </StyledHeader>

      <StyledBody>
        <MainPaddingContainer>
          <TraderInfoTitle infoTitle="인수자 정보" />
          <TraderInputTitle
            inputTitle="업체명"
            size="Large"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TraderDropdownTitle inputTitle="관할 구역" />
          <TraderDropdownTitle inputTitle="인수자" />
          <TraderInfoTitle infoTitle="거래 일자 등록" />
          <TraderCalendarTitle />
        </MainPaddingContainer>
      </StyledBody>

      <StyledFooter>
        <TraderBtn
          size="Large"
          color={isValid ? "Blue" : "Grey"}
          onClick={() => {
            navigate("/m/create/item");
          }}
          disabled={!isValid}
        >
          다음
        </TraderBtn>
      </StyledFooter>
    </StyledContainer>
  );
};

export default TraderCreatePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  width: 100%;
`;
const StyledBody = styled.div``;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
