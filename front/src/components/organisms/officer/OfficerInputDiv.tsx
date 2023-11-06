import React, { useState } from 'react';
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
  selectedCompanyName?: string;
  branchs?: Branch[];
}

interface Branch {
  branchSeq: number;
  branchName: string;
}


const OfficerInputDiv: React.FC<InputDivProps> = ({ isStockManage, isInput, stock, selectedCompanyName, branchs }) => {

  const handleDropdownChange = (selectedValue: string) => {
    const intValue = parseInt(selectedValue, 10);
    console.log(intValue);
    // setBranchInfo
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
            <Dropdown>
              {branchs && branchs.map((branch, index) => (
                <option key={index} value={branch.branchName}>
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
              <Dropdown onChange={(e) => handleDropdownChange(e.target.value)}>
                {/* {userInfo.branchList.map((branch) => (
                  <option key={branch.branchSeq} value={`${branch.branchSeq}`}>
                    {branch.branchName}
                  </option>
                ))} */}
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
  min-width: 300px;
  padding: 8px;
  position: relative;
  /* left: 30px; */
  font-size: 16px;
`
