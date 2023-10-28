import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/organisms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from "../../components/organisms/trader/TraderCalendarTitle";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";

const TraderCreatePage = () => {

  const navigate = useNavigate();

  return (
    <>
      <StyledHeader>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 업체 등록" />
      </StyledHeader>
      <StyledBody>
        <MainPaddingContainer>
          <TraderInfoTitle infoTitle="인수자 정보" />
          <TraderInputTitle inputTitle="업체명" size="Large" />
          <TraderDropdownTitle inputTitle="관할 구역" />
          <TraderDropdownTitle inputTitle="안수자" />
          <TraderInfoTitle infoTitle="거래 일자 등록" />
          <TraderCalendarTitle />
        </MainPaddingContainer>
      </StyledBody>
      <StyledFooter>
        <TraderBtn size="Large" color="Blue" onClick={() => {navigate('/m/create/item')}}>
          다음
        </TraderBtn>
      </StyledFooter>
    </>
  );
};

export default TraderCreatePage;

const StyledHeader = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
`;
const StyledBody = styled.div`
  padding-top: 60px;
  /* position: fixed; */
`;

const StyledFooter = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  `;
