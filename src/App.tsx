import React, { useEffect } from 'react';
import './App.css';
import styled from 'styled-components';

const Days = styled.div``;

function App() {
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
    const totalDateCurrentMonth = calMonthDay(0);

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
    console.log(calendar);
  }

  const findNextMonthDate = (week: number[]) => {
    const totalDateCurrentMonth = calMonthDay(0);
    const includeNextMonthDate = week.map(date => {
      return date > totalDateCurrentMonth ? date - totalDateCurrentMonth : date;
    })
    return includeNextMonthDate;
  }

  const findLastMonthDate = (week: number[]) => {
    const totalDateLastMonth = calMonthDay(-1);
    console.log(totalDateLastMonth);
    const includeLastMonthDate = week.map((date) => {
      return date < 1 ? date + totalDateLastMonth : date;
    });
    return includeLastMonthDate;
  }

  const createWeekCalendar = (startDate: number, day: number) => {
    return Array.from(new Array(7), (startDate, i) => (i + 1)).map(date => date + startDate - 1 - day);
  }

  // index : 현재 달 기준으로 앞 또는 뒤로 이동
  // 예시 : index: -2일때 현재 8월이면 구해지는 값은 6월
  const calMonthDay = (index: number) => {
    const day1 = new Date();
    // 한 달에 며칠이 포함되어 있는가
    const dates = new Date(day1.getFullYear(), day1.getMonth() + 1 + index, 0).getDate();
    return dates;
  }

  return (
    <div>
    </div>
  );
}

export default App;
