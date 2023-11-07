import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import styled from "styled-components";
import TraderSearchBox from "../../components/organisms/trader/TraderSearchBox";
import TraderBillItemList from "../../components/organisms/trader/TraderBillItemList";
import TraderInterCalendarTitle from "../../components/organisms/trader/TraderInterCalendarTitle";

const TraderGetListPage = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 불러오기" />
        <TraderSubtitle subtitle="거래 명세서 불러오기" />
      </StyledHeader>
      <MainPaddingContainer>
        <TraderSearchBox />
        <TraderInterCalendarTitle/>
        <TraderBillItemList />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderGetListPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;
