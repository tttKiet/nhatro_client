import styles from "./UserHomePage.module.scss";
import classNames from "classNames/bind";
import ContentUser from "../../components/ContentUser"
const cx = classNames.bind(styles);

function UserHomePage() {
  return <div className={cx("wrap")}>
    <ContentUser></ContentUser>
  </div>;
}

export default UserHomePage;
