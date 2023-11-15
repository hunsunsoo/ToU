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

const Modal = ({ isOpen, onClose, schedule }: { isOpen: boolean; onClose: () => void; schedule: Schedule }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {/* 모달 내용 작성 */}
      <div>{/* 여기에 schedule 정보를 표시하는 내용을 추가해주세요 */}</div>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const OfficerCalendar = () => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);
  const [highlightedBranch, setHighlightedBranch] = useState<string[] | null>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
      const branchesForDate = scheduleList
        .filter((schedule) => schedule.tradeDate.split('T')[0] === dateKey)
        .map((schedule) => schedule.branchName);

      // setHighlightedBranch(branchesForDate);

      const scheduleCount = branchesForDate.length;

      if (scheduleCount > 0) {
        return (
          <StyledHighlightedBranch>
            {branchesForDate.map((branch, index) => (
              <StyledTile key={index}>
                + {scheduleCount}
              </StyledTile>
            ))}
          </StyledHighlightedBranch>
        );
      }
    }
    return null;
  };

  // const handleTileClick = (date: Date) => {
  //   setSelectedDate(date);

  //   // 선택된 날짜에 해당하는 스케줄을 찾기
  //   const dateKey = date.toISOString().split('T')[0];
  //   const scheduleForDate = scheduleList.find((schedule) => schedule.tradeDate.split('T')[0] === dateKey) || null;
    
  //   // 찾은 스케줄을 상태 변수에 저장
  //   setSelectedSchedule(scheduleForDate);

  //   // 모달 열기
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <CalendarDiv>
      <StyledTitle>
        <BiCalendar color="#545A96" size={"30px"} style={{ marginRight: "10px" }} />일정 관리
      </StyledTitle>
      <Calendar tileContent={tileContent} />
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} schedule={selectedSchedule || ({} as Schedule)} /> */}
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

const StyledHighlightedBranch = styled.div`
  color: #3700ff;
  font-size: 10px;
  font-weight: bold;
`;

const StyledTile = styled.div`
  /* border: 1px solid black; */
  background-color: #005B9E;
  color: white;
  width: 30px;
  margin-top: 15px;
  font-weight: lighter;
`