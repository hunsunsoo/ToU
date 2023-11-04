import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { MainPaddingContainer } from "../../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderImg from "../../atoms/trader/TraderImg";
import TraderInfo from "../../atoms/trader/TraderInfo";
import { UserInfoState, CompanyInfoState } from "../../../store/State";
import TraderBranch from "../../molecules/trader/TraderBranch";

const TraderMainProfile = () => {
  const userInfo = useRecoilValue(UserInfoState);
  const companyInfo = useRecoilValue(CompanyInfoState);

  return (
    <StyledMainContainer>
      <MainPaddingContainer>
        <StyledDiv>
          <TraderImg logoImage={companyInfo?.logoImage || undefined} />
          <TraderInfo workerName={userInfo?.workerName || undefined} />
          <TraderBranch />
        </StyledDiv>
      </MainPaddingContainer>
    </StyledMainContainer>
  );
};

export default TraderMainProfile;

const StyledMainContainer = styled.div`
  background-image: linear-gradient(38deg, #297fff 3.34%, #98fff9 90.74%);
  height: 100%;
  color: #fff;
  height: 40vh;
  border-radius: 0px 0px 50px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
