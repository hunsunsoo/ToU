import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSubtitle from "../../components/organisms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderInputTitle from "../../components/organisms/trader/TraderInputTitle";
import TraderInfoTitle from "../../components/organisms/trader/TraderInfoTitle";
import TraderCalendarTitle from '../../components/organisms/trader/TraderCalendarTitle';
import TraderRoleDropdown from "../../components/organisms/trader/TraderRoleDropdown";
import TraderUnitDropdown from "../../components/atoms/trader/TraderUnitDropdown";
import TraderUnitInputBox from "../../components/molecules/trader/TraderUnitInputBox";
import TraderUnitInputTitle from "../../components/organisms/trader/TraderUnitInputTitle";

const TraderCreatePage = () => {

  return (
    <>
      <header>
        <TraderHeader title="거래 명세서 생성" />
        <TraderSubtitle subtitle="거래 업체 등록" />
      </header>
      
      <MainPaddingContainer>
        <TraderInfoTitle infoTitle="인수자 정보"/>
        <TraderInputTitle inputTitle="수량" size="Small" />
        <TraderInputTitle inputTitle="단가" size="Large" />
        <TraderInputTitle inputTitle="금액" size="Large" />
        <TraderInputTitle inputTitle="비고" size="X-Large" />
        <TraderCalendarTitle/>
        <TraderRoleDropdown/>
        <TraderUnitDropdown/>
        <TraderUnitInputBox/>
        <TraderUnitInputTitle inputTitle="수량"/>
     </MainPaddingContainer>
    </>
  );
};

export default TraderCreatePage;
