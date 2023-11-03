import React from 'react';
import OfficerInput from '../../atoms/officer/OfficerInput';
import styled from 'styled-components';

interface StockItems {
  preStockSeq: number;
  preStockName: string;
  preStockDate: Date;
  preStockQuantity: number;
  preStockUnit: string;
}

interface InputDivProps {
  isStockManage: boolean;
  isInput?: boolean;
  stock?: StockItems;
}

const handleDropdownChange = (selectedValue: string) => {
  const intValue = parseInt(selectedValue, 10);
  // 나중에 이 int값을 seq넘버로 쓰면 됨
  console.log(intValue);
};

const OfficerInputDiv: React.FC<InputDivProps> = ({ isStockManage, isInput, stock }) => {
  console.log(stock);

  if (!isStockManage) { // 재고관리 아닐때(거래명세서생성)
    return (
      <MainDiv>
        <SubDiv>
            <StyledSpan>• 업체명</StyledSpan>
          <OfficerInput
            size={"underwriter"}
          />
        </SubDiv>
        <div>
          <SubDiv>
            <StyledSpan>• 담당자</StyledSpan>
            <OfficerInput
              size={"underwriter"}
            />
          </SubDiv>
          <SubDiv>
            <StyledSpan>• 연락처</StyledSpan>
            <OfficerInput
              size={"underwriter"}
            />
          </SubDiv>
        </div>
      </MainDiv>
    );
  } else { // 재고관리일때
    if (isInput) { // 입력하는 폼일때
      return (
        <MainDiv>
          <div>
            <SubDiv>
              <StyledSpan>• 품목명</StyledSpan>
              <OfficerInput
                size={"underwriter"}
              />
            </SubDiv>
            <SubDiv>
              <StyledSpan>• 수량/단위</StyledSpan>
              <OfficerInput
                size={"underwriter2"}
              />
              <Dropdown onChange={(e) => handleDropdownChange(e.target.value)}>
                <option value="1">kg</option>
                <option value="2">ton</option>
                <option value="3">마리</option>
              </Dropdown>
            </SubDiv>
          </div>
          <SubDiv>
            <StyledSpan>• 입고 일시</StyledSpan>
            <OfficerInput
              size={"underwriter"}
            />
          </SubDiv>
        </MainDiv>
      );
    } else { // 입력폼 아닐때
      return (
        <MainDiv>
          <div>
            <SubDiv>
              <StyledSpan>• 품목명</StyledSpan>
              <OfficerInput
                size={"underwriter"}
                isDisabled={true}
                value={stock ? stock.preStockName : ""}
              />
            </SubDiv>
            <SubDiv>
              <StyledSpan>• 수량/단위</StyledSpan>
              <OfficerInput
                size={"underwriter2"}
                isDisabled={true}
                value={stock ? stock.preStockQuantity : ""}
              />
              <Dropdown value={stock ? stock.preStockUnit : ""} onChange={(e) => handleDropdownChange(e.target.value)}>
                <option value="1">kg</option>
                <option value="2">ton</option>
                <option value="3">마리</option>
              </Dropdown>
            </SubDiv>
          </div>
          <SubDiv>
            <StyledSpan>• 입고 일시</StyledSpan>
            <OfficerInput
              size={"underwriter"}
              isDisabled={true}
              value={stock ? stock.preStockDate.toString() : ""}
            />
          </SubDiv>
        </MainDiv>
      );
    }
  }
  
};

export default OfficerInputDiv;

const MainDiv = styled.div`
  display: flex;
  border: 1px solid #666;
  margin: 10px;
  padding: 20px 0 0 0;
  font-size: 15px;
`

const SubDiv = styled.div`
  margin-bottom: 20px;
`

const StyledSpan = styled.span`
  display: inline-block;
  min-width: 80px;
  margin: 0 30px 0 20px;
`

const Dropdown = styled.select`
  /* width: 100%; */
  padding: 8px;
  position: relative;
  /* left: 30px; */
  font-size: 16px;
`
