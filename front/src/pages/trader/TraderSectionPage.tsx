import styled from "styled-components";
import TraderHeader from "../../components/organisms/trader/TraderHeader";

const TraderSectionPage = () => {
  return (
    <StyledContainer>
      <TraderHeader title="거래 명세서 내역 조회" />
    </StyledContainer>
  );
};

export default TraderSectionPage;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`