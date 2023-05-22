import { useSelector } from "react-redux";
import styles from "./RootHomePage.module.scss";
import classNames from "classNames/bind";
import { userSelector } from "../../redux/selectors";

const cx = classNames.bind(styles);

function RootHomePage() {
  const currUser = useSelector(userSelector.curUserLogin);
  console.log(currUser);

  return (
    <div className={cx("wrap", "flex")}>
      <div className={cx("d-flex justify-content-between ", "heading")}>
        <div>
          Xin Chào <b>{currUser.fullName}</b>!
        </div>
        <div>{currUser.email}</div>
      </div>
    </div>
  );
}

export default RootHomePage;
