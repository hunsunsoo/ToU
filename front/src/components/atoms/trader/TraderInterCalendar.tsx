import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { BiCalendarCheck } from "react-icons/bi";
import moment from "moment";
import { InterCalendarWrapper, DropdownButton } from "../../../commons/style/calendarStyle/TraderInterCalendarStyle";



interface TraderInterCalendarProps {
  onChange: any;
  value: any;
}

const TraderInterCalendar: React.FC<TraderInterCalendarProps> = ({ onChange, value }) => {
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일`;

  const [nowDate, setNowDate] = useState<string>(formattedDate);
  const [OpenYN2, setOpenYN2] = useState<boolean>(false);

  // 바깥 클릭을 감지하는 로직
  // const handleClickOutside = (event: any) => {
  //   if (event.target.closest(".react-calendar")) {
  //       return;
  //   }
  //   setOpenYN2(false);
  // };
  
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  const handleToggleCalendar = () => {
    setOpenYN2(!OpenYN2);
  };

  const handleDateChange = (selectedDate:any) => {
    onChange(selectedDate);
    setOpenYN2(false);
    if (Array.isArray(selectedDate)) {
      const startDate = moment(selectedDate[0]).format("YYYY년 MM월 DD일");
      const endDate = moment(selectedDate[1]).format("YYYY년 MM월 DD일");
      if (startDate === endDate) {
        setNowDate(startDate);
      } else {
        setNowDate(`${startDate} ~ ${endDate}`);
      }
    } else {
      setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
    }
  };

  return (
    <CalendarContainer>
      <label>
        <DropdownButton onClick={handleToggleCalendar}>
          <StyledNowDiv>{nowDate}</StyledNowDiv>
          <StyledIcon><BiCalendarCheck size="24" /></StyledIcon>
        </DropdownButton>
      </label>
      <InterCalendarWrapper OpenYN2={OpenYN2}>
        <Calendar
          onChange={handleDateChange}
          value={value}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format("DD")}
        />
      </InterCalendarWrapper>
    </CalendarContainer>
  );
};

export default TraderInterCalendar;

const CalendarContainer = styled.div`
  position: relative;
`;

const StyledNowDiv = styled.div`
  font-family: SUIT Variable;
  font-size: 1rem;
  font-style: normal;
  width: 10rem;
`;

const StyledIcon = styled.div`
  
`;