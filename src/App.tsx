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
    const totalDateCurrentMonth = calMonthDay();
    console.log(totalDateCurrentMonth);

    if(day !== 1) {

    }
    // 현재 달의 달력
    const calendar = [];
    while(currentDate <= totalDateCurrentMonth) {
      const week = createWeekCalendar(currentDate);
      currentDate += 7;
      console.log('달력의 일자', currentDate); 
    }
  }

  const createWeekCalendar = (startDate: number) => {
    return Array.from(new Array(7), (startDate, i) => (i + 1))
  }

  const calMonthDay = () => {
    const day1 = new Date();
    // 한 달에 며칠이 포함되어 있는가
    const dates = new Date(day1.getFullYear(), day1.getMonth() + 1, 0).getDate();
    return dates;
  }

  return (
    <div>
    </div>
  );
}

export default App;
