import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { customAxios } from '../../api/customAxios';
import Modal from './OfficerItemModal';

interface StockList {
  id?: number;
  stockSeq: number;
  stockDate?: Date;
  stockQuantity: number;
  stockUnit: string;
  stockName: string;
  stockPrice: number;
  stockPrice1: number;
  stockPrice2: number;
  note?: string;
  isChecked?: boolean;
}

interface OfficerItemTableProps {
  onSelectedSeqListChange: (selectedSeqList: number[]) => void;
}

// const stockLists: StockList[] = [
//   { id: 1, name: "가리비", quantity: 200, unitPrice: 10000, supplyAmount: 2000000, vat: 200000, note: " " },
//   { id: 2, name: "무늬오징어", quantity: 100, unitPrice: 15000, supplyAmount: 150000, vat: 150000, note: " " },
//   { id: 3, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
//   { id: 4, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
//   { id: 5, name: "", quantity: undefined, unitPrice: undefined, supplyAmount: undefined, vat: undefined, note: "" },
// ];

const OfficerItemTable: React.FC<OfficerItemTableProps> = ({ onSelectedSeqListChange }) => {
  // 상품 목록 조회
  const [stockItems, setStockItems] = useState<StockList[]>([]);
  // 선택된 상품 목록
  const [selectedItems, setSelectedItems] = useState<StockList[]>([]);
  // const [selectedSeqList, setSelectedSeqList] = useState<number[]>([]);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
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
      const price1 = Math.round(price * quantity);
      const price2 = Math.round(price * quantity / 10);
      return { price1, price2 };
    };

    // 판매용 재고 목록 조회
    customAxios.get(`stock/worker/list/out`)
      .then((res) => {
        const updatedStockItems = res.data.data.stockList.map((stockitem: StockList) => {
          const { price1, price2 } = calculatePrice(stockitem.stockPrice, stockitem.stockQuantity);
          return {
            ...stockitem,
            stockPrice1: price1,
            stockPrice2: price2,
            isChecked: false,
          };
        });
        setStockItems(updatedStockItems);
      })
    }, []);

  // 체크박스 토글 함수
  const toggleCheckbox = (seq: number) => {
    const updatedStockItems = stockItems.map((stockitem) =>
      stockitem.stockSeq === seq ? { ...stockitem, isChecked: !stockitem.isChecked } : stockitem
    );
    setStockItems(updatedStockItems);
    setSelectedItems(updatedStockItems.filter((item) => item.isChecked));
  };

  // 확인 버튼 클릭 시 선택된 상품 목록 업데이트
  const handleConfirm = () => {
    const selected = stockItems.filter((stockitem) => stockitem.isChecked);
    setSelectedItems(selected);
    const selectedSeq = selectedItems.map((selectedItem) => selectedItem.stockSeq);
    // setSelectedSeqList(selectedSeq);
    onSelectedSeqListChange(selectedSeq);
    closeModal();
  };

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
        {selectedItems.map((selectedItem) => (
          <tr key={selectedItem.id}>
            <td>{selectedItem.id}</td>
            <td>{selectedItem.stockName}</td>
            <td>{selectedItem.stockQuantity}{selectedItem.stockUnit}</td>
            <td>{selectedItem.stockPrice}</td>
            <td>{selectedItem.stockPrice1}</td>
            <td>{selectedItem.stockPrice2}</td>
            <td>{selectedItem.note}</td>
          </tr>
        ))}
        <tr onClick={openModal}>
          <td></td>
          <td>추가</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalType={"type1"}
      >
        <div>
          <h2>품목 등록</h2>
          <p>품목명: </p>
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
            {stockItems.map((stockitem) => (
              <tr key={stockitem.stockSeq}>
                <td><input
                  type="checkbox"
                  checked={stockitem.isChecked}
                  onChange={() => toggleCheckbox(stockitem.stockSeq as number)}
                /></td>
                <td>{stockitem.stockName}</td>
                <td>{stockitem.stockQuantity} {stockitem.stockUnit}</td>
                <td>{stockitem.stockPrice}</td>
                <td>{stockitem.stockPrice1}</td>
                <td>{stockitem.stockPrice2}</td>
                <td>{stockitem.note}</td>
              </tr>
            ))}
            </tbody>
          </StyledTable>
          <button onClick={handleConfirm}>확인</button>
        </div>
      </Modal>
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