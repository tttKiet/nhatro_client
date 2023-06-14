import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function ErrorPage() {
  return (
    <div className={cx("")}>
      <div className={cx("face")}>
        <div className={cx("band")}>
          <div className={cx("red")}></div>
          <div className={cx("white")}></div>
          <div className={cx("blue")}></div>
        </div>
        <div className={cx("eyes")}></div>
        <div className={cx("dimples")}></div>
        <div className={cx("mouth")}></div>
      </div>
      <h1>404 Error</h1>
      <h1>Oops! Something went wrong!</h1>
      <Link to={"/login"}>
        {" "}
        <div className={cx("btn")}>Return to Home</div>
      </Link>
    </div>
  );
}

export default ErrorPage;
