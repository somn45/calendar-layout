import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    const day1 = new Date();
    const calMonthDay = () => {
      // 한 달에 며칠이 포함되어 있는가
      const dates = new Date(day1.getFullYear(), day1.getMonth() + 1, 0).getDate();
      console.log(dates);

      // 무슨 요일인가?
      const today = new Date(Date.now()).getDay();
      console.log('무슨 요일?', today);
    }
    calMonthDay();
  }, []);
  return (
    <div>
    </div>
  );
}

export default App;
