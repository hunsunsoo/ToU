import styled from "styled-components";


interface InterCalendarWrapperProps {
    OpenYN2: boolean;
  }
  
export const InterCalendarWrapper = styled.div<InterCalendarWrapperProps>`
  z-index: 10;
  position: absolute;
  top: 100%;
  right: 0;
  display: ${(props) => (props.OpenYN2 ? "block" : "none")};

  .react-calendar {
    width: 21.875rem;
    max-width: 100%;
    background: white;
    border: 1px solid #a0a096;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    border-radius: 10px;
  }

  .react-calendar--doubleView {
    width: 700px;
  }

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 0.9em;
    font-weight: bold;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
//마우스 올라간 스타일
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #2d8cec;
  }

  .react-calendar__tile--now {
    background: #ffff99bd;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #fcffa9;
  }

  .react-calendar__tile--hasActive {
    background: #76baff;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color:#ffa9a9;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  //선택된 구간 전체
  .react-calendar__tile--active {
    background: #91cdfe;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #2d8cec;
  }
 // 호버링 될때 선택된 구간
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #cde8ff;
  }
`;


export const DropdownButton = styled.button`
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


