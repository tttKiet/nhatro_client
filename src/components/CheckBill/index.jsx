import classNames from "classNames/bind";
import styles from "./CheckBill.module.scss";

const cx = classNames.bind(styles);

function CheckBill() {
  return <div className={cx("wrapper")}>Check Bill</div>;
}

export default CheckBill;
