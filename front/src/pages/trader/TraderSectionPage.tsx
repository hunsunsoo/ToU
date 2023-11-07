import styled from "styled-components";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import TraderDropdownTitle from "../../components/organisms/trader/TraderDropdownTitle";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderSectionFilter from "../../components/molecules/trader/TraderSectionFilter";
import TraderSectionTable from "../../components/organisms/trader/TraderSectionTable";

const TraderSectionPage = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 내역 조회" />
      </StyledHeader>

      <MainPaddingContainer>
        {/* <TraderDropdownTitle inputTitle="관할 구역" /> */}
        <TraderSectionFilter />
        <TraderSectionTable />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderSectionPage;

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
