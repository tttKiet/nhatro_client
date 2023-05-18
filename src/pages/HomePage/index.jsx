import styles from "./HomePage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function HomePage() {
  return <div className={cx("wrap")}>Home</div>;
}

export default HomePage;
