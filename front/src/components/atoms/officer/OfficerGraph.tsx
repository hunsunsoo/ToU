import styled from "styled-components";
import { BiLineChart } from "react-icons/bi";
import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { customAxios } from "../../api/customAxios";

const MyResponsiveLine = ({ data }: { data: any[] }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 0, right: 10, bottom: 100, left: 50 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: 4000,
      max: 24000,
      stacked: false,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "월",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "가격",
      legendOffset: -40,
      legendPosition: "middle",
      tickValues: [4000, 8000, 12000, 16000, 20000, 24000],
    }}
    pointSize={5}
    pointColor={{ theme: "background" }}
    pointBorderWidth={5}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 100,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

// const chartData = [
//   {
//     id: "고등어",
//     color: "hsl(303, 70%, 50%)",
//     data: [
//       { x: "5월", y: 12500 },
//       { x: "6월", y: 10000 },
//       { x: "7월", y: 8300 },
//       { x: "8월", y: 13500 },
//       { x: "9월", y: 14000 },
//       { x: "10월", y: 15500 },
//     ],
//   },
//   {
//     id: "무늬오징어",
//     color: "hsl(303, 70%, 50%)",
//     data: [
//       { x: "5월", y: 11500 },
//       { x: "6월", y: 13000 },
//       { x: "7월", y: 15000 },
//       { x: "8월", y: 14000 },
//       { x: "9월", y: 16000 },
//       { x: "10월", y: 17000 },
//     ],
//   },
//   {
//     id: "독도새우",
//     color: "hsl(303, 70%, 50%)",
//     data: [
//       { x: "5월", y: 20000 },
//       { x: "6월", y: 18000 },
//       { x: "7월", y: 23500 },
//       { x: "8월", y: 24000 },
//       { x: "9월", y: 22000 },
//       { x: "10월", y: 23000 },
//     ],
//   },
//   {
//     id: "키조개(대)",
//     color: "hsl(303, 70%, 50%)",
//     data: [
//       { x: "5월", y: 9000 },
//       { x: "6월", y: 11500 },
//       { x: "7월", y: 12500 },
//       { x: "8월", y: 11000 },
//       { x: "9월", y: 12500 },
//       { x: "10월", y: 10000 },
//     ],
//   },
// ];

interface productList {
  stockName: string;
  averagePriceList: averageList[];
}

interface averageList {
  stockDate: string;
  stockPrice: number;
}

const OfiicerGraph = () => {
  const [branchSeq, setBranchSeq] = useState(0);
  const [chartData, setChartData] = useState<productList[]>([]);

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const checkToken = () => {
      const storedValue = localStorage.getItem("recoil-persist");
      const userInfo = storedValue && JSON.parse(storedValue)?.UserInfoState;
      const branchSeqFromStorage = userInfo ? userInfo.branchSeq : null;
      setBranchSeq(branchSeqFromStorage || 0);

      if (branchSeq !== 0) {
        // 업체별 거래횟수 정보 가져오기
        customAxios
          .get(`/stock/worker/${branchSeq}/receiving/price`)
          .then((res) => {
            const transformedData = res.data.data.productList.map(
              (item: productList) => {
                return {
                  id: item.stockName,
                  color: "hsl(303, 70%, 50%)", // 고정값이거나 다른 로직을 통해 동적으로 설정할 수 있습니다.
                  data: item.averagePriceList.map((averageItem: averageList) => ({
                    x: averageItem.stockDate,
                    y: averageItem.stockPrice,
                  })),
                };
              }
            );
            setTimeout(() => {}, 1000);
            setChartData(transformedData);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        setTimeout(checkToken, 1000); // 1초마다 토큰 체크
      }
    };
    checkToken();
  }, [branchSeq]);

  return (
    <GraphDiv>
      <StyledTitle>
        <BiLineChart
          color="#545A96"
          size={"30px"}
          style={{ marginRight: "10px" }}
        />
        입고 단가
      </StyledTitle>

      <div style={{ height: "300px" }}>
        {chartData ? (
          chartData.length > 0 ? (
            <MyResponsiveLine data={chartData} />
          ) : (
            <p>데이터 없음</p>
          )
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </GraphDiv>
  );
};

export default OfiicerGraph;

const GraphDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 30px;
  margin: 20px;
  padding: 20px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545a96;
`;
