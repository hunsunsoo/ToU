import React from "react";
import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  quantity?: number;
  unitPrice?: number;
  supplyAmount?: number;
  vat?: number;
  note: string;
}

const items: Item[] = [
  { id: 1, name: "가리비", quantity: 200, unitPrice: 10000, supplyAmount: 2000000, vat: 200000, note: " " },
  { id: 2, name: "무늬오징어", quantity: 100, unitPrice: 15000, supplyAmount: 150000, vat: 150000, note: " " },
  { id: 3, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
  { id: 4, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
  { id: 5, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
];

const OfficerItemTable = () => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th></th>
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
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>{item.supplyAmount}</td>
            <td>{item.vat}</td>
            <td>{item.note}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default OfficerItemTable;

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