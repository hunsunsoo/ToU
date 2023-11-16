import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBillItemList from "../../components/organisms/trader/TraderBillItemList";
import { customAxios } from "../../components/api/customAxios";

export type BillType = {
  statementSeq: number;
  branchName: string;
  productsName: string;
  tradeDate: string;
};

const TraderGetListPage = () => {
  const [bills, setBills] = useState<BillType[]>([]);

  useEffect(() => {
    customAxios.get("/statement/worker/list/preparing").then((res) => {
      setBills(res.data.data.statementList)
    });
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 불러오기" />
      </StyledHeader>
      <StyledMainPaddingContainer>
        <TraderBillItemList bills={bills} />
      </StyledMainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderGetListPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F0F0F0; 
  height: 100vh;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;

const StyledMainPaddingContainer = styled(MainPaddingContainer)`
  background-color: #fff; // 내부 박스 배경색으로 흰색을 설정합니다.
  margin: 1rem; // 상하좌우 여백을 줍니다.
  border-radius: 20px; // 모서리를 둥글게 처리합니다.
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 그림자 효과를 추가합니다.
  overflow-y: scroll;
  height: 100%;
`;