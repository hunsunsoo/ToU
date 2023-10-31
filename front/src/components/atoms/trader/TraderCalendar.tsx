import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BiCalendarCheck } from "react-icons/bi";
import moment from "moment";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TraderCalendarProps {
  onChange: any;
  value: any;
}

interface CalendarWrapperProps {
  OpenYN: boolean;
}

const TraderCalendar: React.FC<TraderCalendarProps> = ({ onChange, value }) => {
  const [nowDate, setNowDate] = useState<string>("거래일자를 등록하세요");
  const [OpenYN, setOpenYN] = useState<boolean>(false);

  const handleToggleCalendar = () => {
    setOpenYN(!OpenYN);
  };

  const handleDateChange = (selectedDate: any) => {
    onChange(selectedDate);
    setOpenYN(false);
    if (Array.isArray(selectedDate)) {
      setNowDate(moment(selectedDate[0] as Date).format("YYYY년 MM월 DD일"));
    } else {
      setNowDate(moment(selectedDate as Date).format("YYYY년 MM월 DD일"));
    }
  };

  return (
    <CalendarContainer>
      <label>
        <DropdownButton onClick={handleToggleCalendar}>
          {nowDate}
          <BiCalendarCheck size = "24"/>
        </DropdownButton>
      </label>
      <CalendarWrapper OpenYN={OpenYN}>
        <Calendar
          onChange={handleDateChange}
          value={value}
          formatDay={(locale, date) => moment(date).format("DD")}
        />
      </CalendarWrapper>
    </CalendarContainer>
  );
};

export default TraderCalendar;

const CalendarContainer = styled.div`
  position: relative;
  /* margin-top: 10px; */
`;

const DropdownButton = styled.button`
  width: 240px;
  height: 48px;
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 10px;
  padding: 0px 12px;
  color: var(--festie-gray-800, #3a3a3a);
  font-family: SUIT Variable;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  text-align: start;
  appearance: none;
  background-color: white;
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
`;

const CalendarWrapper = styled.div<CalendarWrapperProps>`
  z-index: 10;
  position: absolute;
  top: 100%;
  right: 0;
  display: ${(props) => (props.OpenYN ? "block" : "none")};
`;

