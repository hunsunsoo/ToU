import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { BiCalendarCheck } from "react-icons/bi";
import moment from "moment";
import { CalendarWrapper, DropdownButton } from "../../../commons/style/calendarStyle/TraderCalendarStyle";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TraderCalendarProps {
  onChange: any;
  value: any;
}

const TraderCalendar: React.FC<TraderCalendarProps> = ({ onChange, value }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;

  const [nowDate, setNowDate] = useState<string>(formattedDate);
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
          <BiCalendarCheck size="24" />
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
`;

