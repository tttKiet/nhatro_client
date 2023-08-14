import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

function MyCalendar({ handleChangeDate, date, min }) {
  return (
    <Calendar
      showDateDisplay={false}
      className="fs-s"
      direction="horizontal"
      fixedHeight={true}
      date={date}
      minDate={new Date(min) || undefined}
      onChange={handleChangeDate}
    />
  );
}

export default MyCalendar;
