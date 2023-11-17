import styled, { keyframes } from "styled-components";
import OfficerSideBar from "../../components/organisms/officer/OfficerSideBar";
import OfficerCalendar from "../../components/atoms/officer/OfficerCalendar";
import OfficerGraph from "../../components/atoms/officer/OfficerGraph";
import OfficerStockTable from "../../components/atoms/officer/OfficerStockTable";
import OfficerChart from "../../components/atoms/officer/OfficerChart";

const OfficerMainPage = () => {
  return (
    <MainDiv>
      <OfficerSideBar />
      <DashboardDiv>
        <OfficerCalendar />
        <DashboardDiv2>
          <DashboardDivUP>
            <OfficerChart />
            <OfficerGraph />
          </DashboardDivUP>
          <DashboardDivDown>
            <OfficerStockTable />
          </DashboardDivDown>
        </DashboardDiv2>
      </DashboardDiv>
    </MainDiv>
  );
};

export default OfficerMainPage;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: calc(100vh - 40px);
  overflow: hidden;
  background-color: #f8f8f8;
`;

const DashboardDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
`;

const DashboardDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const DashboardDivUP = styled.div`
  display: flex;
  width: 100%;
  height: 55%;
`;

const DashboardDivDown = styled.div`
  display: flex;
  width: 100%;
  height: 45.5%;
`;
