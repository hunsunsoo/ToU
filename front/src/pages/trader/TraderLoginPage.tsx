import styled from "styled-components";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";

const TraderLoginPage = () => {
  return (
    <StyledMainPaddingContainer>
      사업자 로그인 페이지
    </StyledMainPaddingContainer>
  );
};

export default TraderLoginPage;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #eff7ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
