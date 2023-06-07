import styles from "./MotelPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AboutPage() {
  return <div className={cx("wrap")}>About Page</div>;
}

export default AboutPage;
