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
      const date = new Date(bill.tradeDate).toLocaleDateString();
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
            <div key={date}>
              <DateHeader>
                <span>{date}</span>
              </DateHeader>
              {bills.map((bill) => (
                <TraderBillItem
                  key={bill.statementSeq}
                  itemText={`${bill.branchName} - ${bill.productsName}`}
                  onClick={() => navigate(`/m/sign/${bill.statementSeq}`)}
                />
              ))}
            </div>
          ))}
        </ItemListContainer>
      ) : (
        <NoItemsContainer>거래명세서가 존재하지 않습니다.</NoItemsContainer>
      )}
    </>
  );
};

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

const NoItemsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;
