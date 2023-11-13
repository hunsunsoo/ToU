import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import TraderImg from "../../atoms/trader/TraderImg";
import TraderInfo from "../../atoms/trader/TraderInfo";
import { UserInfoState, CompanyInfoState } from "../../../store/State";
import TraderBranch from "../../molecules/trader/TraderBranch";

const TraderMainProfile = () => {
  const userInfo = useRecoilValue(UserInfoState);
  const companyInfo = useRecoilValue(CompanyInfoState);

  return (
    <StyledMainContainer>
        <StyledDiv>
        <StyledAni1>
          <TraderImg logoImage={companyInfo?.logoImage || undefined} />
          <TraderInfo workerName={userInfo?.workerName || undefined} />
          <TraderBranch
            companyName={userInfo?.companyName || ""}
            branchName={userInfo?.branchName || ""}
          />
          </StyledAni1>
        </StyledDiv>
    </StyledMainContainer>
  );
};

export default TraderMainProfile;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledMainContainer = styled.div`
  padding: 0 1rem;
  height: 100%;
  height: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledAni1 = styled.div`
  animation: ${fadeInRight} 1.2s ease-out both;
`