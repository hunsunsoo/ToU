import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import TraderBillItem from "../../atoms/trader/TraderBillItem";
import { BillType } from "../../../pages/trader/TraderGetListPage";

type TraderBillItemListProps = {
  bills: BillType[];
};

const TraderBillItemList = ({ bills }: TraderBillItemListProps) => {
  const navigate = useNavigate();

  // bills 배열을 날짜별로 그룹화하는 함수
  const groupBillsByDate = (bills: BillType[]) => {
    const groups: { [key: string]: BillType[] } = {};
    bills.forEach((bill) => {
      // 날짜 형식을 '년 월 일'로 지정합니다.
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
  const groupedBills = groupBillsByDate(bills);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
                  branchName={bill.branchName}
                  productsName={bill.productsName}
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

export default TraderBillItemList;

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
