// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { customAxios } from "../../api/customAxios";

interface Item {
  id: number;
  stockSeq?: number; // 물품 seq번호
  stockCode?: number; // 물품 code번호
  date?: string;        // 날짜
  stockName?: string; // 물품명
  stockQuantity: number; // 물량
  stockUni?: string; // 단위
  stockTotalPrice: number; // 공급가액
  stockPrice1: number; // 단가
  stockPrice2: number; // 부가세
  state: string;
}

// const items: Item[] = [
//   { id: 1, date: new Date("2023-10-18"), item: "고등어", supplyAmount: 1000, price: 10000, priceAmount: 2000000, vat: 200000, state: "" },
//   { id: 2, date: new Date("2023-10-18"), item: "광어", supplyAmount: 300, price: 10000, priceAmount: 1500000, vat: 150000, state: "" },
//   { id: 3, date: new Date("2023-10-18"), item: "오징어", supplyAmount: 150, price: 10000, priceAmount: 1500000, vat: 150000, state: "" },
//   { id: 4, date: new Date("2023-10-18"), item: "키조개", supplyAmount: 1000, price: 10000, priceAmount: 1350000, vat: 135000, state: "" },
// ];

const OfficerDetailTable = () => {
  // const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  const { billId } = useParams<{ billId: string }>();

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
    
    // 가격 계산 함수
    const calculatePrice = (price: number, quantity: number) => {
      const price1 = Math.round(price / quantity);
      const price2 = Math.round(price / 10);
      return { price1, price2 };
    };
    
    // 판매용 재고 목록 조회
    customAxios.get(`statement/worker/detail/${billId}`)
    .then((res) => {
      const updatedItems = res.data.data.itemList.map((item: Item) => {
        const { price1, price2 } = calculatePrice(item.stockTotalPrice, item.stockQuantity);
        return {
          ...item,
          stockPrice1: price1,
          stockPrice2: price2,
          date: res.data.data.tradeDate,
        };
      });
      setItems(updatedItems);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])

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
          <tr key={item.id}>
            {/* 나중가면 id값이 아니라 seq로 바꿔야댐 */}
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.stockName}</td>
            <td>{item.stockQuantity}</td>
            <td>{item.stockPrice1}</td>
            <td>{item.stockTotalPrice}</td>
            <td>{item.stockPrice2}</td>
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