import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { getDaysInMonth } from 'date-fns';
import Week from './Week';

const CalendarLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 40px);
  list-style-type: none;
`;

const CalendarDateItem = styled.li<{$iscurrentdate: boolean}>`
  color: ${props => props.$iscurrentdate ? '#000' : '#555'};
`;

interface CalendarDate {
  key: number;
  date: number;
  isCurrentDate: boolean;
}



function App() {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [calendar, setCalendar] = useState<CalendarDate[] | null>(null)
  useEffect(() => {
    createMonthDays();
  }, []);

  const createMonthDays = () => {
    // 현재 달의 첫째 날 (ex. 현재 7월일 때 => 7월 1일)
    const nowMonthFirstDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    // 무슨 요일이지?
    const day = nowMonthFirstDate.getDay();

    // 현재 달의 요일은 얼마나 있는가? (ex. 현재 7월일 때 => 31) 
    const totalDateCurrentMonth = getDaysInMonth(new Date(nowMonthFirstDate.getFullYear(), nowMonthFirstDate.getMonth()));

    const calendar = Array.from({length: 35}, (v, i) => i - day + 1).map(date => {
      if(date < 1) {
        const lastMonthFirstDate = new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1);
        const totalDateLastMonth = getDaysInMonth(new Date(lastMonthFirstDate));
        return {
          key: date,
          date: date + totalDateLastMonth,
          isCurrentDate: false,
        };
      }
      else if(date > totalDateCurrentMonth) {
        const nextMonthFirstDate = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1);
        const totalDateNextMonth = getDaysInMonth(new Date(nextMonthFirstDate));
        return {
          key: date,
          date: date - totalDateNextMonth,
          isCurrentDate: false,
        };
      }
      return {
        key: date,
        date,
        isCurrentDate: true,
      };
    })
    setCalendar(calendar);
  }

  return (
    <section>
      <h1>캘린더</h1>
      <CalendarLayout>
        {calendar?.map(date => (
          <CalendarDateItem key={date.key} $iscurrentdate={date.isCurrentDate}>{date.date}</CalendarDateItem>
        ))}
      </CalendarLayout>
    </section>
  );
}

export default App;
