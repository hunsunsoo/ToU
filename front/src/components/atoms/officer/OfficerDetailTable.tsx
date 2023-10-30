import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Item {
  id: number;
  date?: Date;
  item: string;
  supplyAmount?: number;
  price: number; // 단가
  priceAmount: number; // 공급가액
  vat: number; // 부가세
  state: string;
}

const items: Item[] = [
  { id: 1, date: new Date("2023-10-18"), item: "고등어", supplyAmount: 1000, price: 10000, priceAmount: 2000000, vat: 200000, state: "" },
  { id: 2, date: new Date("2023-10-18"), item: "광어", supplyAmount: 300, price: 10000, priceAmount: 1500000, vat: 150000, state: "" },
  { id: 3, date: new Date("2023-10-18"), item: "오징어", supplyAmount: 150, price: 10000, priceAmount: 1500000, vat: 150000, state: "" },
  { id: 4, date: new Date("2023-10-18"), item: "키조개", supplyAmount: 1000, price: 10000, priceAmount: 1350000, vat: 135000, state: "" },
];

const OfficerDetailTable = () => {
  const navigate = useNavigate();

  const handleRowClick = (itemId: number) => {
    // 페이지 이동 로직
    // navigate(`/detail/${itemId}`); 일단 임시
    navigate(`/detail`);
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <th></th>
          <th>거래일시</th>
          <th>품목명</th>
          <th>수량</th>
          <th>단가</th>
          <th>공급가액</th>
          <th>부가세</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} onClick={() => handleRowClick(item.id)}>
            {/* 나중가면 id값이 아니라 seq로 바꿔야댐 */}
            <td>{item.id}</td>
            <td>{item.date?.toLocaleDateString()}</td>
            <td>{item.item}</td>
            <td>{item.supplyAmount}</td>
            <td>{item.price}</td>
            <td>{item.priceAmount}</td>
            <td>{item.vat}</td>
            <td>{item.state}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default OfficerDetailTable;

const StyledTable = styled.table`
  margin: 10px 0;
  /* width: calc(100% - 20px); */
  width: 100%;
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