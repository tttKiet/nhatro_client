import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

function MyCalendar({ handleChangeDate, date, min }) {
  const op = {};
  if (min) op.minDate = new Date(min);
  return (
    <Calendar
      showDateDisplay={false}
      className="fs-s"
      direction="horizontal"
      fixedHeight={true}
      date={date}
      {...op}
      // minDate={min ? new Date(min) : false}
      onChange={handleChangeDate}
    />
  );
}

export default MyCalendar;
