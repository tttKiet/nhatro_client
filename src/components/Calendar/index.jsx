import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";

import classNames from "classNames/bind";
import styles from "./CalendarDate.module.scss";

const cx = classNames.bind(styles);

function CalendarDate({ selectionRange, onChange, monthsShown = 1 }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("date")}>
        <DateRange
          rangeColors={["#262626"]}
          ranges={[selectionRange]}
          direction="horizontal"
          showDateDisplay={false}
          minDate={new Date()}
          onChange={onChange}
          months={monthsShown}
          fixedHeight={true}
        />
      </div>
    </div>
  );
}

export default CalendarDate;
