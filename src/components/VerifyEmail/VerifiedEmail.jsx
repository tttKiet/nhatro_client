// scss
import styles from "./VerifyEmail.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

function VerifiedEmail() {
  return <div className={cx("verified")}>VerifiedEmail</div>;
}

export default VerifiedEmail;
