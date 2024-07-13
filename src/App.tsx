import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { getDaysInMonth } from 'date-fns';
import Week from './Week';
import useCalendar from './useCalendar';

const Wrapper = styled.section`
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 30px);
  list-style-type: none;
`;

const CalendarDateItem = styled.li<{$iscurrentdate: boolean, $ismatch: boolean}>`
  height: 30px;
  background: ${props => props.$ismatch && props.$iscurrentdate ? '#55fc' : 'transparent'};
  color: ${props => props.$iscurrentdate ? '#000' : '#555'};
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

interface CalendarDate {
  key: number;
  date: number;
  isCurrentDate: boolean;
}

function App() {
  const {calendar, currentDay, handleClickCalendarDay, moveMonth} = useCalendar();

  return (
    <Wrapper>
      <h1>캘린더</h1>
      <p>{`오늘은 ${currentDay.getFullYear()}년 ${currentDay.getMonth() + 1}월 ${currentDay.getDate()}일 입니다.`}</p>
      <article>
        <button onClick={() => moveMonth(false)}>◀</button>
        <span>{`${currentDay.getFullYear()}년 ${currentDay.getMonth() + 1}월`}</span>
        <button onClick={() => moveMonth(true)}>▶</button>
      </article>
      <CalendarLayout>
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
