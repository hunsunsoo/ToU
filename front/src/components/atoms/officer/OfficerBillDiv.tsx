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

const OfficeBillDiv = () => {
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
        };
      });
      setItems(updatedItems);
    })
    .catch((res) => {
      console.log(res);
    })
  }, [])

  return (
    <Table>
      <tr>
        <td className="title">수량</td>
        <td>{items.reduce((acc, item) => acc + item.stockQuantity, 0).toLocaleString()} kg</td>
        <td className="title">공급가액</td>
        <td>{items.reduce((acc, item) => acc + item.stockTotalPrice - item.stockPrice2, 0).toLocaleString()}</td>
        <td className="title">VAT</td>
        <td>{items.reduce((acc, item) => acc + item.stockPrice2, 0).toLocaleString()}</td>
        <td className="title">합계</td>
        <td>{items.reduce((acc, item) => acc + item.stockTotalPrice, 0).toLocaleString()}</td>
        <td className="title">인수</td>
        <td>(인)</td>
      </tr>
    </Table>
  );
};

export default OfficeBillDiv;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: black;

  td {
    border: 1px solid black;
    height: 40px;
    /* padding: 0 10px; */

    &:not(.title) {
      font-weight: normal;
      padding-left: 20px;
    }
  }

  .title {
    text-align: center;
  }
`