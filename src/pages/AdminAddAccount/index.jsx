import RegisterForm from "../../components/RegisterForm";
import styles from "./AdminAddAccount.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AdminAddAccount() {
  return (
    <div className={cx("wrap")}>
      <RegisterForm />
    </div>
  );
}

export default AdminAddAccount;
