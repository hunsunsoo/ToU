import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import TraderSubtitle from "../../components/atoms/trader/TraderSubtitle";
import TraderHeader from "../../components/organisms/trader/TraderHeader";
import { MainPaddingContainer } from "../../commons/style/mobileStyle/MobileLayoutStyle";
import TraderBillItemList from "../../components/organisms/trader/TraderBillItemList";
import { customAxios } from "../../components/api/customAxios";
// import TraderSearchBox from "../../components/organisms/trader/TraderSearchBox";
// import TraderInterCalendarTitle from "../../components/organisms/trader/TraderInterCalendarTitle";

// 타입 정의 (실제 타입에 맞춰서 수정해야 합니다)
export type BillType = {
  statementSeq: number;
  branchName: string;
  productsName: string;
  tradeDate: string;
};

interface ButtonProps {
  isActive: boolean;
}

const TraderGetListPage = () => {
  const [bills, setBills] = useState<BillType[]>([]);
  const [selectedButton, setSelectedButton] = useState("waiting"); // 선택된 버튼의 상태를 추적

  // const [searchTerm, setSearchTerm] = useState(""); // 검색어를 위한 상태
  // const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜를 위한 상태

  // 요청을 보내는 함수를 정의합니다.
  const fetchBills = (endpoint: string, buttonKey: string) => {
    customAxios
      .get(endpoint)
      .then((res) => {
        console.log(res);
        setBills(res.data.data.statementList);
        setSelectedButton(buttonKey);
      })
      .catch((error) => {
        console.error("There was an error fetching the bills:", error);
        // Handle error here if needed
      });
  };

  // 수급
  const handleSupplyClick = () => {
    fetchBills(`/statement/worker/list/waiting`, "waiting");
  };

  // 공급
  const handleDemandClick = () => {
    fetchBills(`/statement/worker/list/preparing`, "preparing");
  };

  // // 검색어를 업데이트하는 함수
  // const handleSearch = (searchTerm: string) => {
  //   setSearchTerm(searchTerm);
  // };

  // // 날짜가 변경될 때 실행될 함수
  // const handleDateChange = (date: Date | null) => {
  //   // react-calendar는 single mode에서 Date 객체를, range mode에서 Date 배열을 반환할 수 있습니다.
  //   // 상황에 맞게 처리하세요.
  //   const selectedDate = Array.isArray(date) ? date[0] : date;
  //   setSelectedDate(selectedDate);
  // };

  // 검색어와 날짜에 따라 목록을 필터링하는 함수
  // const getFilteredBills = () => {
  //   return bills.filter((bill) => {
  //     // 날짜와 검색어 모두 만족하는 항목만 필터링
  //     const billDate = new Date(bill.tradeDate);
  //     return (
  //       bill.productsName.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //       billDate.toDateString() === selectedDate.toDateString()
  //     );
  //   });
  // };

  // // 필터링된 목록을 상태에 저장
  // const filteredBills = getFilteredBills();

  // 기본은 수급
  useEffect(() => {
    fetchBills(`/statement/worker/list/waiting`, "waiting");
  }, []);

  return (
    <StyledContainer>
      <StyledHeader>
        <TraderHeader title="거래 명세서 불러오기" />
        <TraderSubtitle subtitle="거래 명세서 불러오기" />
      </StyledHeader>
      <MainPaddingContainer>
        <Button
          onClick={handleSupplyClick}
          isActive={selectedButton === "waiting"}
        >
          수급
        </Button>
        <Button
          onClick={handleDemandClick}
          isActive={selectedButton === "preparing"}
        >
          공급
        </Button>
        {/* <TraderSearchBox onSearch={handleSearch} />
        <TraderInterCalendarTitle onDateChange={handleDateChange} /> */}
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

const Button = styled.button<ButtonProps>`
  border: 2px solid #ccc;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #fff;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    `}
`;
