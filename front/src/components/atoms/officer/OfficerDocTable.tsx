import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  person: string;
  item: string;
  supplyAmount?: number;
  date?: Date;
  state: string;
}

const items: Item[] = [
  { id: 1, name: "(주)싸피수산", person: "김싸피", item: "고등어 외 3건", supplyAmount: 2000000, date: new Date("2023-10-18"), state: "거래 예정" },
  { id: 2, name: "(주)수연수산", person: "이수연", item: "광어 외 2건", supplyAmount: 1500000, date: new Date("2023-09-12"), state: "거래 완료" },
  { id: 3, name: "(주)동현수산", person: "김동현", item: "오징어 외 4건", supplyAmount: 2000000, date: new Date("2023-08-30"), state: "거래 완료" },
  { id: 4, name: "(주)정훈수산", person: "김정훈", item: "고등어 외 1건", supplyAmount: 2000000, date: new Date("2023-06-30"), state: "거래 완료" },
  { id: 5, name: "(주)동익수산", person: "김동익", item: "연어", supplyAmount: 2000000, date: new Date("2023-04-12"), state: "거래 완료" },
  { id: 6, name: "(주)윤영수산", person: "황윤영", item: "우럭", supplyAmount: 2000000, date: new Date("2023-02-22"), state: "거래 완료" },
  { id: 7, name: "(주)동교수산", person: "정동교", item: "굴비", supplyAmount: 2000000, date: new Date("2022-12-29"), state: "거래 완료" },
];

const OfficerDocTable = () => {
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
          <th>업체명</th>
          <th>담당자</th>
          <th>품목</th>
          <th>금액</th>
          <th>거래 일시</th>
          <th>거래 상태</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} onClick={() => handleRowClick(item.id)}>
            {/* 나중가면 id값이 아니라 seq로 바꿔야댐 */}
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.person}</td>
            <td>{item.item}</td>
            <td>{item.supplyAmount}</td>
            <td>{item.date?.toLocaleDateString()}</td>
            <td>{item.state}</td>
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