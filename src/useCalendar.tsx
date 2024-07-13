import { deepStrictEqual } from "assert";
import { addMonths, getDaysInMonth, subMonths } from "date-fns";
import { useEffect, useState } from "react";

interface CalendarDate {
  key: number;
  date: number;
  isCurrentDate: boolean;
}

interface useCalendarReturnType {
  calendar: CalendarDate[] | null;
  currentDay: Date;
  handleClickCalendarDay: (date: number, isCurrentDay: boolean) => void;
  moveMonth: (isAdd: boolean) => void;
}

type useCalendarType = () => useCalendarReturnType;

const useCalendar: useCalendarType = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  const [calendar, setCalendar] = useState<CalendarDate[] | null>(null)

  useEffect(() => {
    createMonthDays();
  }, [currentDay]);

  const createMonthDays = () => {
    // 현재 달의 첫째 날 (ex. 현재 7월일 때 => 7월 1일)
    const nowMonthFirstDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    // 현재 달의 첫째 날은 무슨 요일이지?
    const day = nowMonthFirstDate.getDay();

    // 현재 달의 요일은 얼마나 있는가? (ex. 현재 7월일 때 => 31) 
    const totalDateCurrentMonth = getDaysInMonth(new Date(nowMonthFirstDate.getFullYear(), nowMonthFirstDate.getMonth()));

    const calendarLen = Math.ceil((totalDateCurrentMonth + day) / 7);

    const calendar = Array.from({length: calendarLen * 7}, (v, i) => i - day + 1).map(date => {
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
        return {
          key: date,
          date: date - totalDateCurrentMonth,
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

  const moveMonth = (isAdd: boolean) => {
    setCurrentDay(prevDate => isAdd ? addMonths(prevDate, 1) : subMonths(prevDate, 1));
  }

  const handleClickCalendarDay = (date: number, isCurrentDay: boolean) => {
    if(isCurrentDay) setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth(), date));
  }

  return {calendar, currentDay, handleClickCalendarDay, moveMonth}
}

export default useCalendar;