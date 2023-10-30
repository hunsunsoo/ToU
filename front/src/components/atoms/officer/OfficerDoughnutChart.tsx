import styled from "styled-components";
import DonutChart from "react-donut-chart";
// import { Doughnut } from 'react-chartjs-2';
import { BiDoughnutChart } from 'react-icons/bi';

type Idata = {
  total: number;
  comp1: number;
  comp2: number;
  comp3: number;
};

const OfficerDoughnutChart: React.FC<Idata> = ({ total, comp1, comp2, comp3 }) => {
// const OfficerDoughnutChart: React.FC = () => {
  const other = total - comp1 - comp2 - comp3;

  return (
    <DoughnutDiv>
      <StyledTitle>
        <BiDoughnutChart color="#545A96" size={"30px"} style={{marginRight: "10px"}}/>업체별 거래 횟수
      </StyledTitle>
      <div style={{fontSize: "13px"}}>
        <DonutChart
          data={[
            { label: "싸피수산", value: comp1 },
            { label: "동교수산", value: comp2 },
            { label: "수연수산", value: comp3 },
            { label: "기타", value: other },
          ]}
          colors={["#f76b8a", "#13D8F6", "#ffbf00", "#a6a6a6"]}
          interactive={false}
          width={350}
          height={250}
          legend={true}
          strokeColor={"none"}
        />
      </div>
      <p style={{color: "red"}}>다른 라이브러리로 바꿔야할듯...</p>
    </DoughnutDiv>
  );
};

export default OfficerDoughnutChart;

const DoughnutDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 30px;
  margin: 20px 0 20px 20px;
  padding: 20px;
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545A96;
`
