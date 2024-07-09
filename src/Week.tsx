import { styled } from "styled-components";

const WeekCalendar = styled.ul`
  width: 210px;
  display: flex;
  list-style-type: none;
  li {
    width: 30px;
    display: flex;
    justify-content: center;
  }
`;

const Week = ({week}: {week: number[]}) => {
  return (
  <li>
    <WeekCalendar>
    {week.map(date => (
      <li key={date}>{String(date)}</li>
    ))}
    </WeekCalendar>
  </li>
  ) 

}

export default Week;