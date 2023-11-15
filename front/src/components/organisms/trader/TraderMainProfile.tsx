import styled from "styled-components";
import { useRecoilValue } from "recoil";
// import TraderImg from "../../atoms/trader/TraderImg";
import TraderInfo from "../../atoms/trader/TraderInfo";
import { UserInfoState, CompanyInfoState } from "../../../store/State";
import TraderBranch from "../../molecules/trader/TraderBranch";

const TraderMainProfile = () => {
  const userInfo = useRecoilValue(UserInfoState);
  // const companyInfo = useRecoilValue(CompanyInfoState);

  return (
    <StyledMainContainer>
        <StyledDiv>
          {/* <TraderImg logoImage={companyInfo?.logoImage || undefined} /> */}
          <TraderInfo workerName={userInfo?.workerName || undefined} />
          <TraderBranch
            companyName={userInfo?.companyName || ""}
            branchName={userInfo?.branchName || ""}
          />
        </StyledDiv>
    </StyledMainContainer>
  );
};

export default TraderMainProfile;



const StyledMainContainer = styled.div`
  padding: 0 1rem;
  height: 100%;
  height: 17vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

