import React, { useState } from "react";
import styled from "styled-components";
import TraderInterCalendar from "../../atoms/trader/TraderInterCalendar";

// onDateChange에 대한 타입을 명시해야 합니다.
// Date 객체 또는 null을 인자로 받는 함수 타입입니다.
interface TraderInterCalendarTitleProps {
  onDateChange: (date: Date | null) => void;
}

const TraderInterCalendarTitle: React.FC<TraderInterCalendarTitleProps> = ({
  onDateChange,
}) => {
  // useState에 제네릭 타입을 추가합니다.
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // handleDateChange의 매개변수에 대한 타입을 지정합니다.
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <Container>
      <InputTitle>거래 일자</InputTitle>
      <TraderInterCalendar onChange={handleDateChange} value={selectedDate} />
    </Container>
  );
};

export default TraderInterCalendarTitle;

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const InputTitle = styled.span`
  /* margin-left: 10px; */
  font-size: 1.3rem;
`;
