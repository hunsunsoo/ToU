import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
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
      console.log(res);
      setBills(res.data.data.statementList)
    });
  });

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 불러오기" />
        <TraderSubtitle subtitle="거래 명세서 불러오기" />
      </StyledHeader>
      <MainPaddingContainer>
        <TraderBillItemList bills={bills} />
      </MainPaddingContainer>
    </StyledContainer>
  );
};

export default TraderGetListPage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
`;