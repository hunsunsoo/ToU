import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { BiCalendar } from 'react-icons/bi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './OfficerCalendar.css';
import { customAxios } from '../../api/customAxios';

interface Schedule {
  statementSeq: number;
  branchName: string;
  productName: string;
  statementStatus: string;
  tradeDate: string; // 날짜 문자열
  reqORres: number;
}

const OfficerCalendar = () => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [highlightedBranch, setHighlightedBranch] = useState<string | null>(null);


  useEffect(() => {
    customAxios.get(`/client/worker/schedule/list`)
      .then((res) => {
        setScheduleList(res.data.data.scheduleList);
      })
      .catch((res) => {
        console.log(res);
      })
  }, [])

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateKey = date.toISOString().split('T')[0];
      const hasSchedule = scheduleList.some((schedule) => {
        if (schedule.tradeDate.split('T')[0] === dateKey) {
          setHighlightedBranch(schedule.branchName);
          return true;
        }
        return false;
      });

      if (hasSchedule) {
        return (
          <StyledHighlightedBranch>
            {highlightedBranch}
          </StyledHighlightedBranch>
        );
      }
    }
    return null;
  };

  return (
    <CalendarDiv>
      <StyledTitle>
        <BiCalendar color="#545A96" size={"30px"} style={{marginRight: "10px"}}/>일정 관리
      </StyledTitle>
      <Calendar tileContent={tileContent} />
    </CalendarDiv>
  );
};

export default OfficerCalendar;

const CalendarDiv = styled.div`
  height: 82%;
  border-radius: 30px;
  margin: 20px 0 20px 20px;
  padding: 20px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.25);
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #545A96;
`

const StyledHighlightedBranch = styled.div`
  color: #ff0000;
  font-size: 11px;
  font-weight: bold;
`;