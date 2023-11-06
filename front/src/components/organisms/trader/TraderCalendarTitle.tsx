import React, { useState } from "react";
import styled from "styled-components";
import TraderCalendar from "../../atoms/trader/TraderCalendar";

interface TraderCalendarTitleProps {
  selectedDate: Date | Date[] | null;
  onDateChange: (date: Date | Date[] | null) => void;
}

const TraderCalendarTitle: React.FC<TraderCalendarTitleProps> = ({ selectedDate, onDateChange }) => {
  return (
    <Container>
      <InputTitle>거래 일자</InputTitle>
      <TraderCalendar onChange={onDateChange} value={selectedDate} />
    </Container>
  );
};

export default TraderCalendarTitle;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 30px 0 30px 0;
`;

const InputTitle = styled.span`
  /* margin-left: 10px; */
  font-size: 1.3rem;
`;
