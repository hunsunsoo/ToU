import styled from "styled-components";
import { BiHomeAlt } from 'react-icons/bi';

interface Item {
  id: number;
  item: string;
  company: string;
  date?: Date;
  price: number; // 단가
  supplyAmount?: number;
}

const items: Item[] = [
  { id: 1, item: "고등어", company: "동현수산", date: new Date("2023.10.18 09:00"), price: 10000, supplyAmount: 300},
  { id: 2, item: "고등어", company: "싸피수산", date: new Date("2023.10.23 10:23"), price: 9000, supplyAmount: 100},
  { id: 3, item: "광어", company: "싸피수산", date: new Date("2023.10.28 09:00"), price: 12000, supplyAmount: 400}
];

const OfiicerStockTable = () => {
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.item}</td>
              <td>{item.company}</td>
              <td>{item.date?.toLocaleString('en-US', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
              <td>{item.price} 원</td>
              <td>{item.supplyAmount} kg</td>
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
  height: 100%;
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