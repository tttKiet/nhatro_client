import { useSelector } from "react-redux";
import styles from "./RootEditAccount.module.scss";
import classNames from "classNames/bind";
import { userSelector } from "../../redux/selectors";

const cx = classNames.bind(styles);

function RootEditAccount() {
  const currUser = useSelector(userSelector.curUserLogin);
  console.log(currUser);

  return <div className={cx("wrap", "flex")}>Edit</div>;
}

export default RootEditAccount;
