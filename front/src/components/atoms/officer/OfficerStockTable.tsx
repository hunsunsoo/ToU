import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { BiHomeAlt } from 'react-icons/bi';
import { customAxios } from '../../api/customAxios';

interface StockList {
  stockName: string;
  fromCompanyName: string;
  fromBranchName: string;
  stockDate: Date;
  stockPrice: number;
  stockQuantity: number;
  stockUnit: string;
}

// 재고 현황 조회
const OfiicerStockTable = () => {
  const [stockItems, setStockItems] = useState<StockList[]>([]);

  useEffect(() => {
    customAxios.get("/stock/worker/dash/list/1") // 임시로 1로 넣었음. 바꿔야함
      .then((res) => {
        setStockItems(res.data.data.stockList);
        // console.log(res);
      })
  }, []);  

  return (
    <StockTableDiv>
      <StyledTitle>
        <BiHomeAlt color="#545A96" size={"30px"} style={{marginRight: "10px"}}/>재고 현황
      </StyledTitle>
      <StyledTable>
        <thead>
          <tr>
            <th>품명</th>
            <th>입고업체</th>
            <th>입고일시</th>
            <th>입고단가</th>
            <th>입고수량</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr key={index}>
              <td>{item.stockName}</td>
              <td>{item.fromCompanyName}</td>
              <td>{item.stockDate.toLocaleString('en-US', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{item.stockPrice} 원</td>
              <td>{item.stockQuantity} {item.stockUnit}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StockTableDiv>
  );
};

export default OfiicerStockTable;

const StockTableDiv = styled.div`
  width: 100%;
  height: 65%;
  border: 1px solid black;
  border-radius: 30px;
  margin: 0 20px 20px 20px;
  padding: 20px;
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545A96;
`

const StyledTable = styled.table`
  margin: 10px 0;
  width: 100%;
  border-collapse: collapse;
  color: #545A96;

  th, td {
    padding: 6px;
    text-align: center;
    font-weight: bold;
  }

  td {
    font-size: 14px;
  }

  th {
    font-size: 16px;
  }
`;