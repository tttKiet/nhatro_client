import styles from "./Feedback.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function Feedback() {
  return <div className={cx("wrap")}></div>;
}

export default Feedback;
