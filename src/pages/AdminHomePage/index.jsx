import styles from "./AdminHomePage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AdminHomePage() {
  return <div className={cx("wrap")}>AdminHomePage</div>;
}

export default AdminHomePage;
