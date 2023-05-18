import styles from "./AboutPage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function AboutPage() {
  return <div className={cx("wrap")}>AboutPage</div>;
}

export default AboutPage;
