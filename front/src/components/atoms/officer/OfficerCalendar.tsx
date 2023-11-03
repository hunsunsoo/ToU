import React, { useState } from 'react';
import styled from "styled-components";
import { BiCalendar } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OfficerCalendar.css';

const OfficerCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <CalendarDiv>
      <StyledTitle>
        <BiCalendar color="#545A96" size={"30px"} style={{marginRight: "10px"}}/>일정 관리
      </StyledTitle>
      {/* <Calendar onChange={onChange} value={value} /> */}
      <Calendar />
    </CalendarDiv>
  );
};

export default OfficerCalendar;

const CalendarDiv = styled.div`
  height: 82%;
  border: 1px solid black;
  border-radius: 30px;
  margin: 20px 0 20px 20px;
  padding: 20px;
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545A96;
`