import React, { useState, useEffect } from 'react';
import OfficerInput from '../../atoms/officer/OfficerInput';
import styled from 'styled-components';
import OfficerCreateCalendar from '../../atoms/officer/OfficerCreateCalendar';

interface StockItems {
  stockSeq?: number;
  stockName?: string;
  stockDate: Date;
  stockQuantity?: number;
  stockUnit?: string;
}

interface InputDivProps {
  isStockManage: boolean;
  isInput?: boolean;
  stock?: StockItems;
  selectedCompanyName?: string;
  branchs?: Branch[];
  branchSelectionCallback?: (branchSeq: number) => void;
  updateStock?: (updatedStock: StockItems) => void;
}

interface Branch {
  branchSeq: number;
  branchName: string;
}


const OfficerInputDiv: React.FC<InputDivProps> = ({ isStockManage, isInput, stock, selectedCompanyName, branchs, branchSelectionCallback, updateStock }) => {
  const [selectedBranch, setSelectedBranch] = useState<number | string>("");
  const [newStock, setNewStock] = useState<StockItems | undefined>(undefined);

  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    setSelectedBranch(Number(selectedValue));
    // console.log(intValue);
    if (branchSelectionCallback) {
      branchSelectionCallback(intValue);
    }
  };

  const handleDropdownChange2 = (selectedValue: string) => {
    let unit: string;

    switch (selectedValue) {
      case "1":
        unit = "kg";
        break;
      case "2":
        unit = "ton";
        break;
      case "3":
        unit = "마리";
        break;
      default:
        unit = "";
    }

    if (updateStock) {
      setNewStock((prevStock) => ({
        ...(prevStock as StockItems),
        stockUnit: unit,
      } as StockItems));
      updateStock({
        ...(newStock as StockItems),
        stockUnit: unit,
      });
    }
  };

  // 입력값이 변경될 때마다 상태를 업데이트하고, 상태를 부모로 전달한다.
  const handleNewStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewStock((prevStock) => ({
      ...(prevStock as StockItems),
      [name]: value,
    } as StockItems));
  };

  useEffect(() => {
    if (updateStock) {
      updateStock(newStock as StockItems);
    }
  }, [newStock, updateStock]);

  // 초기값 kg 주기
  useEffect(() => {
    setNewStock((prevStock) => ({
      ...(prevStock as StockItems),
      stockUnit: "kg",
    } as StockItems));
  }, []);

  // 날짜 선택
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );

  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date);
    if (date && updateStock) {
      setNewStock((prevStock) => ({
        ...(prevStock as StockItems),
        stockDate: date as Date,
      } as StockItems));
      updateStock({
        ...(newStock as StockItems),
        stockDate: date as Date,
      });
    }
  };

  if (!isStockManage) { // 재고관리 아닐때(거래명세서생성)
    return (
      <MainDiv>
        <SubDiv>
            <StyledSpan>• 업체명</StyledSpan>
          <OfficerInput
            size={"underwriter"}
            value={selectedCompanyName || ""}
          />
        </SubDiv>
        <div>
          <SubDiv>
            <StyledSpan>• 관할구역</StyledSpan>
            <Dropdown value={selectedBranch} onChange={(e) => handleDropdownChange(e.target.value)}>
              {branchs && branchs.map((branch, index) => (
                <option key={index} value={branch.branchSeq}>
                  {branch.branchName}
                </option>
              ))}
            </Dropdown>
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
                onChange={(e) => handleNewStockChange(e)}
                name="stockName"
              />
            </SubDiv>
            <SubDiv>
              <StyledSpan>• 수량/단위</StyledSpan>
              <OfficerInput
                size={"underwriter2"}
                onChange={(e) => handleNewStockChange(e)}
                name="stockQuantity"
              />
              <Dropdown onChange={(e) => handleDropdownChange2(e.target.value)}>
                <option value="1">kg</option>
                <option value="2">ton</option>
                <option value="3">마리</option>
              </Dropdown>
            </SubDiv>
          </div>
          <SubDiv>
            <StyledSpan>• 출고 가격</StyledSpan>
            <OfficerInput
                size={"underwriter2"}
                onChange={(e) => handleNewStockChange(e)}
                name="stockPrice"
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
                value={stock ? stock.stockName : ""}
              />
            </SubDiv>
            <SubDiv>
              <StyledSpan>• 수량/단위</StyledSpan>
              <OfficerInput
                size={"underwriter2"}
                isDisabled={true}
                value={stock ? stock.stockQuantity : ""}
              />
              <OfficerInput
                size={"underwriter3"}
                isDisabled={true}
                value={stock ? stock.stockUnit : ""}
              />

            </SubDiv>
          </div>
          <SubDiv>
            <StyledSpan>• 입고 일시</StyledSpan>
            <OfficerInput
              size={"underwriter"}
              isDisabled={true}
              value={stock ? stock.stockDate.toString() : ""}
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
const StyledSpan2 = styled.span`
  display: flex;
  align-items: center;
  gap: 40px;
  min-width: 80px;
  margin: 0 30px 0 20px;
`

const Dropdown = styled.select`
  min-width: 140px;
  height: 37px;
  padding: 8px;
  position: relative;
  border: 1px solid black;
  /* left: 30px; */
  font-size: 16px;
`
