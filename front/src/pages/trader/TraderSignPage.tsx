import { styled } from "styled-components";

import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import FormComponent from "../../components/organisms/trader/FormComponent";
import TraderHeader from "../../components/organisms/trader/TraderHeader";

const TraderSignPage = () => {
  return (
    <StyledContainer>
      <StyledTraderHeader>
        <TraderHeader title="거래 명세서 서명" />
      </StyledTraderHeader>
      <StyledMainPaddingContainer>
        <FormComponent />
      </StyledMainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderSignPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  height: calc(100vh - 63px);
`;

const StyledTraderHeader = styled.div`
  position: sticky;
  top: 0;

`;

const StyledContainer = styled.div``;
