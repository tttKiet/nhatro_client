import ClockLoader from "../Snipper/ClockLoader";

// scss
import styles from "./PreSnipperLoader.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function PreSnipperLoader() {
  return (
    <div className={cx("wrap")}>
      <ClockLoader color="#000" size={50} />
      <p>Loading page ... Please watting</p>
    </div>
  );
}

export default PreSnipperLoader;
