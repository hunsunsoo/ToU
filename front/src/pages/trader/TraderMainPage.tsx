
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderMainPageBtn from "../../components/organisms/trader/TraderMainPageBtn";
import TraderMainProfile from "../../components/organisms/trader/TraderMainProfile";


const TraderMainPage = () => {
  return (
    <>
      <TraderMainProfile />
      <MainPaddingContainer>
        <TraderMainPageBtn />
      </MainPaddingContainer>
    </>
  );
};

export default TraderMainPage;
