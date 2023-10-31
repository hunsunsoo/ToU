import { styled } from "styled-components";

import { MainPaddingContainer } from "./../../commons/style/mobileStyle/MobileLayoutStyle";
import FormComponent from "../../components/organisms/trader/FormComponent";
import TraderHeader from "../../components/organisms/trader/TraderHeader";

const TraderSignPage = () => {
  return (
    <>
      <TraderHeader title="거래 명세서 서명" />
      <StyledMainPaddingContainer>
        <FormComponent />
      </StyledMainPaddingContainer>
    </>
  );
};

export default TraderSignPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  height: calc(100vh - 57px);
`;
