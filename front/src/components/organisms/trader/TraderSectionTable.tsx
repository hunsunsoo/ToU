import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TableRow } from "../../../pages/trader/TraderSectionPage";

const TraderSectionTable: React.FC<{ data: TableRow[] }> = ({ data }) => {
  const navigate = useNavigate();

  // 날짜와 시간을 분리하는 함수
  const formatDate = (dateString: string) => {
    return dateString.split("T")[0]; // 'T'를 기준으로 문자열을 분리하고 날짜 부분만 반환합니다.
  };

  const handleRowClick = (statementSeq: number) => {
    navigate(`/m/sign/${statementSeq}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>거래처</th>
          <th>품목</th>
          <th>거래일시</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(row.statementSeq)}>
            <td>{row.workerName}</td>{" "}
            {/* 거래처 이름을 workerName으로 표시합니다. */}
            <td>{row.productName}</td>
            <td>{formatDate(row.tradeDate)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TraderSectionTable;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;
