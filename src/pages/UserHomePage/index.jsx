import styles from "./UserHomePage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function UserHomePage() {
  return <div className={cx("wrap")}>UserHomePage</div>;
}

export default UserHomePage;