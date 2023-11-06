import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { customAxios } from "../../api/customAxios";

interface statementList {
  id: number;
  statementSeq: number;
  companyName: string;
  myWorkerName?: string;
  otherWorkerName?: string;
  productName: string;
  totalPrice?: number;
  tradeDate?: Date;
  statementStatus: string;
}

interface paramConfig {
  page: number;
  type: "req" | "res";
  companyName: string;
  isMine: boolean;
  myWorkerName: string | null;
  otherWorkerName: string;
  productName: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface OfficerDocTableProps {
  isSupply: boolean;
  params: paramConfig;
}

// const items: Item[] = [
//   { id: 1, name: "(주)싸피수산", person: "김싸피", item: "고등어 외 3건", supplyAmount: 2000000, date: new Date("2023-10-18"), state: "거래 예정" },
//   { id: 2, name: "(주)수연수산", person: "이수연", item: "광어 외 2건", supplyAmount: 1500000, date: new Date("2023-09-12"), state: "거래 완료" },
//   { id: 3, name: "(주)동현수산", person: "김동현", item: "오징어 외 4건", supplyAmount: 2000000, date: new Date("2023-08-30"), state: "거래 완료" },
//   { id: 4, name: "(주)정훈수산", person: "김정훈", item: "고등어 외 1건", supplyAmount: 2000000, date: new Date("2023-06-30"), state: "거래 완료" },
//   { id: 5, name: "(주)동익수산", person: "김동익", item: "연어", supplyAmount: 2000000, date: new Date("2023-04-12"), state: "거래 완료" },
//   { id: 6, name: "(주)윤영수산", person: "황윤영", item: "우럭", supplyAmount: 2000000, date: new Date("2023-02-22"), state: "거래 완료" },
//   { id: 7, name: "(주)동교수산", person: "정동교", item: "굴비", supplyAmount: 2000000, date: new Date("2022-12-29"), state: "거래 완료" },
// ];

const OfficerDocTable: React.FC<OfficerDocTableProps> = ({ isSupply, params  }) => {
  const navigate = useNavigate();
  // 상품 목록 조회
  const [statements, setStatements] = useState<statementList[]>([]);

  const handleRowClick = (itemId: number) => {
    // 페이지 이동 로직
    // navigate(`/detail/${itemId}`); 일단 임시
    navigate(`/detail`);
  };

  useEffect(() => {
    // 토큰 들어오는거 기다리기
    const awaitToken = async () => {
      return new Promise((resolve) => {
        const checkToken = () => {
          const storedValue = localStorage.getItem("recoil-persist");
          const accessToken = storedValue && JSON.parse(storedValue)?.UserInfoState?.accessToken;
          
          if (accessToken) {
            resolve(accessToken);
          } else {
            setTimeout(checkToken, 1000); // 1초마다 토큰 체크
          }
        };
        checkToken();
      });
    };

    // 거래명세서 목록 조회
    // const param: paramConfig = {
    //   page: 1, // 페이지 번호
    //   type: isSupply ? "req" : "res", // 공급일 때, 수급일때 ( 내 회사가 공급 / 내 회사가 수급) req / res
    //   companyName: "", // 업체명
    //   isMine: true, // 내 거래만 보기
    //   myWorkerName: null, // 본사 담당자
    //   otherWorkerName: "", // 거래처 담당자
    //   productName: "",
    //   startDate: "",
    //   endDate: "",
    //   status: "",
    // }
    customAxios.get(`statement/worker/list/web`, { params: params })
      .then((res) => {
        console.log(res.data.data.statementList);
        // setStatements(res.data.data.statementList);
      })
    }, [params]);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th></th>
          <th>업체명</th>
          <th>담당자</th>
          <th>품목</th>
          <th>금액</th>
          <th>거래 일시</th>
          <th>거래 상태</th>
        </tr>
      </thead>
      <tbody>
        {statements.map((statement) => (
          <tr key={statement.id} onClick={() => handleRowClick(statement.id)}>
            <td>{statement.id}</td>
            <td>{statement.companyName}</td>
            {isSupply ? (
              <td>{statement.myWorkerName}</td>
            ) : (
              <td>{statement.otherWorkerName}</td>
            )}
            <td>{statement.productName}</td>
            <td>{statement.totalPrice}</td>
            <td>{statement.tradeDate?.toLocaleDateString()}</td>
            <td>{statement.statementStatus}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default OfficerDocTable;

const StyledTable = styled.table`
  margin: 10px;
  width: calc(100% - 20px);
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  td {
    font-size: 14px;
    font-weight: normal;
    color: black;
  }

  th {
    background-color: rgba(217, 217, 217, 0.3);
  }
`;