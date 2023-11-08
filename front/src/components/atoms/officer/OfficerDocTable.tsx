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
  tradeDate?: string;
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

const OfficerDocTable: React.FC<OfficerDocTableProps> = ({ isSupply, params  }) => {
  const navigate = useNavigate();
  // 상품 목록 조회
  const [statements, setStatements] = useState<statementList[]>([]);

  const handleRowClick = (statementSeq: number) => {
    // 페이지 이동 로직
    navigate(`/detail/${statementSeq}`);
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

    customAxios.get(`statement/worker/list/web`, { params: params })
      .then((res) => {
        // console.log(res.data.data.statementList);
        setStatements(res.data.data.statementList);
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
          <tr key={statement.id} onClick={() => handleRowClick(statement.statementSeq)}>
            <td>{statement.id}</td>
            <td>{statement.companyName}</td>
            {isSupply ? (
              <td>{statement.myWorkerName}</td>
            ) : (
              <td>{statement.otherWorkerName}</td>
            )}
            <td>{statement.productName}</td>
            <td>{statement.totalPrice}</td>
            <td>{statement.tradeDate}</td>
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