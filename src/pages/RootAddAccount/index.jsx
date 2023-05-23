import RegisterForm from "../../components/RegisterForm";
import styles from "./RootAddAccount.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RootAddAccount() {
  return (
    <div className={cx("wrap")}>
      <h2 className={cx("header")}>Create account</h2>
      <RegisterForm _id="" />
    </div>
  );
}

export default RootAddAccount;
