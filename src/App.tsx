import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { getDaysInMonth } from 'date-fns';
import Week from './Week';
import useCalendar from './useCalendar';

const Wrapper = styled.section`
  width: 600px;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarHeader = styled.article`
  width: 230px;
  display: flex;
  justify-content: space-between;
`;

const CalendarLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 30px);
  list-style-type: none;
`;

const DayListItem = styled.li`
  height: 30px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

const CalendarDateItem = styled.li<{$iscurrentdate: boolean, $ismatch: boolean}>`
  height: 30px;
  background: ${props => props.$ismatch && props.$iscurrentdate ? 'var(--Primary-Orange-Yellow-Orange, #FFD880)' : 'transparent'};
  border-radius: 100px;
  color: ${props => props.$iscurrentdate ? '#000' : '#555'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MoveMonthButton = styled.button`
  width: 18px;
  height: 18px;
  background: transparent;
  border: transparent;
`;

const dayList = ["일", "월", "화", "수", "목", "금", "토"];

function App() {
  const {calendar, currentDay, handleClickCalendarDay, moveMonth} = useCalendar();

  return (
    <Wrapper>
      <h1>캘린더</h1>
      <p>{`오늘은 ${currentDay.getFullYear()}년 ${currentDay.getMonth() + 1}월 ${currentDay.getDate()}일 입니다.`}</p>
      <CalendarHeader>
        <MoveMonthButton onClick={() => moveMonth(false)}>{`<`}</MoveMonthButton>
        <span>{`${currentDay.getFullYear()}년 ${currentDay.getMonth() + 1}월`}</span>
        <MoveMonthButton onClick={() => moveMonth(true)}>{`>`}</MoveMonthButton>
      </CalendarHeader>
      <CalendarLayout>
        {dayList.map(day => <DayListItem key={day}>{day}</DayListItem>)}
        {calendar?.map(date => (
          <CalendarDateItem key={date.key}
          $iscurrentdate={date.isCurrentDate} 
          $ismatch={currentDay.getDate() === date.date}
          onClick={() => handleClickCalendarDay(date.date, date.isCurrentDate)} >{date.date}</CalendarDateItem>
        ))}
      </CalendarLayout>
    </Wrapper>
  );
}

export default App;
