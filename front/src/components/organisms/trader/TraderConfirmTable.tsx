import React, { useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan  } from "@fortawesome/sharp-light-svg-icons";

interface TraderConfirmTableProps {
  isItemChecked: boolean;
    data: Array<{ id: number; category: string; quantity: number; price: number; }>;
  } 

const TraderConfirmTable: React.FC<TraderConfirmTableProps> = ({ isItemChecked ,data }) => {

  const [tableData, setTableData] = useState(data);

  const handleDelete = (id: number) => {
    const newData = data.filter(item => item.id !== id);
    setTableData(newData);
  };

  // 가격 표기 형식 변환
  const formatPrice = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
     <StyledTable isItemChecked={isItemChecked}>
        <thead>
          <tr>
            <th>품목</th>
            <th>수량</th>
            <th>단가</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td><input type="text" defaultValue={item.category} disabled={true} /></td>
              <td><input type="number" defaultValue={formatPrice(item.quantity)} disabled={true} /></td>
              <td><input type="number" defaultValue={formatPrice(item.price)} disabled={true} /></td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default TraderConfirmTable;


const StyledTable = styled.table<{ isItemChecked: boolean }>`


  width: 100%;
  border-collapse: collapse;

  th:nth-child(1) { // 첫 번째 헤더
    width: 35%;
  }

  th:nth-child(2) { // 두 번째 헤더
    width: 25%;
  }

  th:nth-child(3) { // 세 번째 헤더
    width: 35%;
  }

  th:nth-child(4) { // 네 번째 헤더
    width: 5%;
  }

  td {
    padding: 4px 10px;
    border-bottom: 1px solid #ccc;
    text-align: center;
    background-color: ${props => props.isItemChecked ? '#F5F5F5' : '#ffffff'};
  }

  th {
    text-align: center;
    padding: 8px 12px;
    background-color: #ffffff;
    /* border-top:  0.5px solid #484848; */
    border-bottom: 1px solid #484848;
  }

  input {
    text-align: center;
    font-size: 17px;
    width: 100%;
    padding: 6px 10px;
    border: none;
    box-sizing: border-box;
    background-color: ${props => props.isItemChecked ? '#F5F5F5' : '#ffffff'}; // 조건부 배경색 변경

    &:focus {
      outline: none;
      border: 1px solid #aaa;
    }
  }
`;
