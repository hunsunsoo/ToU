import React, { useState } from "react";
import styled from "styled-components";
import TraderCalendar from "../../atoms/trader/TraderCalendar";

const TraderCalendarTitle = () => {
  const [selectedDate, setSelectedDate] = useState<Date | Date[] | null>(
    new Date()
  );

  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date);
  };

  return (
    <Container>
      <InputTitle>거래 일자</InputTitle>
      <TraderCalendar onChange={handleDateChange} value={selectedDate} />
    </Container>
  );
};

export default TraderCalendarTitle;

const Container = styled.div`
  padding-top:10px;
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
