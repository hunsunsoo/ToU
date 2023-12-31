import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { BiCalendarCheck } from "react-icons/bi";
import moment from "moment";
import { CalendarWrapper, DropdownButton } from "../../../commons/style/calendarStyle/OfficerCreateCalendarStyle";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface OfficerCreateCalendarProps {
  onChange: any;
  value: any;
}

const OfficerCreateCalendar: React.FC<OfficerCreateCalendarProps> = ({ onChange, value }) => {
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

export default OfficerCreateCalendar;

const CalendarContainer = styled.div`
  position: relative;
`;

