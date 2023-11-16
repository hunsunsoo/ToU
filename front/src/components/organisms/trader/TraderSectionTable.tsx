import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TraderBillItem from "../../atoms/trader/TraderBillItem";

type BillType = {
  statementSeq: number;
  workerName: string; // 또는 branchName
  productName: string; // 또는 productsName
  tradeDate: string;
};

type TraderSectionTableProps = {
  data: BillType[];
};

const TraderSectionTable: React.FC<TraderSectionTableProps> = ({ data }) => {
  const navigate = useNavigate();

  const groupBillsByDate = (bills: BillType[]) => {
    const groups: { [key: string]: BillType[] } = {};
    bills.forEach((bill) => {
      // 날짜 형식을 '년 월 일'로 지정
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const date = new Date(bill.tradeDate).toLocaleDateString(
        "ko-KR",
        dateOptions
      );

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(bill);
    });
    return groups;
  };
  // 날짜별로 그룹화된 bills
  const groupedBills = groupBillsByDate(data);
  return (
    <>
      {Object.keys(groupedBills).length > 0 ? (
        <ItemListContainer>
          {Object.entries(groupedBills).map(([date, bills]) => (
            <DateSection key={date}>
              <DateHeader>
                <DateCircle />
                <DateText>{date}</DateText>
              </DateHeader>
              {bills.map((bill) => (
                <TraderBillItem
                  key={bill.statementSeq}
                  branchName={bill.workerName}
                  productsName={bill.productName}
                  onClick={() => navigate(`/m/sign/${bill.statementSeq}`)}
                />
              ))}
            </DateSection>
          ))}
        </ItemListContainer>
      ) : (
        <NoItemsContainer>거래명세서가 존재하지 않습니다.</NoItemsContainer>
      )}
    </>
  );
};
export default TraderSectionTable;

const DateSection = styled.section`
  background-color: #fff; // 배경색을 흰색으로 설정
`;

const ItemListContainer = styled.div`
  margin-top: 1rem;
`;

const DateCircle = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3a89ff; // 청색 원 배경색 설정
  margin-right: 0.5rem; // 오른쪽 마진 추가
`;

const DateHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem; // 패딩 추가
  font-weight: bold;
`;

const NoItemsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const DateText = styled.span`
  font-size: 1.3rem;
  color: #3a89ff;
`;
