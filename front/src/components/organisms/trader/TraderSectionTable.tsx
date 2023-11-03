import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface TableRow {
  code: string;
  name: string;
  price: string;
  manager: string;
}

const data: TableRow[] = [
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
  { code: "B12-ALF", name: "고등어", price: "123,000", manager: "김싸피" },
  { code: "B13-ALF", name: "연어", price: "123,000", manager: "이싸피" },
];

const TraderSectionTable: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (billId: number) => {
    navigate(`/m/sign/${billId}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>구역코드</th>
          <th>품목</th>
          <th>가격</th>
          <th>담당자</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => handleRowClick(1)}>
            {" "}
            {/* 행 클릭 이벤트 추가 */}
            <td>{row.code}</td>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.manager}</td>
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
