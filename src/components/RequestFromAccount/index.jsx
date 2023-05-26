import styles from "./RequestFromAccount.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);
function RequestFromAccount() {
  return <div className={cx("wrap")}>RequestFromAccount</div>;
}

export default RequestFromAccount;
