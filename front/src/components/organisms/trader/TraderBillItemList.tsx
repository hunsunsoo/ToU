import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TraderBillItem from "../../atoms/trader/TraderBillItem";

const TraderBillItemList = () => {
  const dates = ["2023.10.18", "2023.10.19"]; // 예시 날짜 데이터

  const navigate = useNavigate();

  const handleItemClick = (billId: number) => {
    navigate(`/m/confirm/${billId}`);
  };

  return (
    <ItemListContainer>
      {dates.map((date) => (
        <div key={date}>
          <DateHeader>{date}</DateHeader>
          <TraderBillItem
            itemText="ㅎㅇ"
            onClick={() => handleItemClick(2)}
          />
          <TraderBillItem
            itemText="ㅎㅇ"
            onClick={() => handleItemClick(1)}
          />
        </div>
      ))}
    </ItemListContainer>
  );
};
// ... (하단 코드 생략)

export default TraderBillItemList;

const ItemListContainer = styled.div`
  margin-top: 1rem;
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #000;
    margin: 0 1rem; // 양쪽 선 사이의 거리 조절
  }
  & > span {
    background-color: #fff; // 텍스트 배경 색상 지정
    padding: 0 1rem;
    font-size: 1rem;
    z-index: 1; // 선 위에 텍스트가 오도록 z-index 설정
    position: relative; // z-index 적용을 위해 position 지정
  }
`;
