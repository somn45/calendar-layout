import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { getDaysInMonth } from 'date-fns';
import Week from './Week';

const MonthCalendar = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

function App() {
  const [calendar, setCalendar] = useState<number[][] | null>(null)
  useEffect(() => {
    createMonthDays();
  }, []);

  const createMonthDays = () => {
    const now = new Date();
    const nowMonthFirstDate = new Date(now.getFullYear(), now.getMonth(), 1);
    // 무슨 요일이지?
    const day = nowMonthFirstDate.getDay();
    // 몇일이지?
    let currentDate = nowMonthFirstDate.getDate();
    const totalDateCurrentMonth = getDaysInMonth(new Date(nowMonthFirstDate.getFullYear(), nowMonthFirstDate.getMonth()));

    // 현재 달의 달력
    let calendar: number[][] = [];
    while(currentDate <= totalDateCurrentMonth) {
      const week = createWeekCalendar(currentDate, day);
      calendar.push(week);
      currentDate += 7;
    }
    calendar = calendar.map((week, index) => {
      return index === 0 ? findLastMonthDate(calendar[index]) : index === calendar.length - 1 ? findNextMonthDate(calendar[index]) : week;
    })
    setCalendar(calendar);
  }

  const findNextMonthDate = (week: number[]) => {
    const totalDateCurrentMonth = getDaysInMonth(new Date(new Date().getFullYear(), new Date().getMonth()));
    const includeNextMonthDate = week.map(date => {
      return date > totalDateCurrentMonth ? date - totalDateCurrentMonth : date;
    })
    return includeNextMonthDate;
  }

  const findLastMonthDate = (week: number[]) => {
    const totalDateLastMonth = getDaysInMonth(new Date(new Date().getFullYear(), new Date().getMonth() - 1));
    const includeLastMonthDate = week.map((date) => {
      return date < 1 ? date + totalDateLastMonth : date;
    });
    return includeLastMonthDate;
  }

  const createWeekCalendar = (startDate: number, day: number) => {
    return Array.from(new Array(7), (startDate, i) => (i + 1)).map(date => date + startDate - 1 - day);
  }

  return (
    <section>
      <h1>캘린더</h1>
      <MonthCalendar>
      {calendar?.map(week => (
        <Week key={week[0]} week={week} />
      ))}
      </MonthCalendar>
    </section>
  );
}

export default App;
