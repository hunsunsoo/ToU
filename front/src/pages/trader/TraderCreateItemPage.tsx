import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/organisms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from '../../components/organisms/trader/TraderCalendarTitle';
import TraderRoleDropdown from "../../components/atoms/trader/TraderRoleDropdown";
import TraderUnitDropdown from "../../components/atoms/trader/TraderUnitDropdown";
import TraderUnitInputBox from "../../components/molecules/trader/TraderUnitInputBox";
import TraderUnitInputTitle from "../../components/organisms/trader/TraderUnitInputTitle";
import TraderBtn from "../../components/atoms/trader/TraderBtn";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";

const TraderCreateItemPage = () => {

  const navigate = useNavigate();

  return (
    <>
      <StyledHeader>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 품목 등록" />
      </StyledHeader>
      <StyledBody>
      <MainPaddingContainer>
        <TraderInfoTitle infoTitle="품목 정보"/>
        <TraderDropdownTitle inputTitle="품목" />
        <TraderUnitInputTitle inputTitle="수량"/>
        <TraderInputTitle inputTitle="단가" size="Large" />
        <TraderInputTitle inputTitle="금액" size="Large" />
        <TraderInputTitle inputTitle="비고" size="X-Large" />
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

export default TraderCreateItemPage;


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