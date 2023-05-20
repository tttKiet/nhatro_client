import styles from "./HomePage.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function HomePage() {
  return (
    <div className={cx("wrap")}>
      <p>Home page</p>
    </div>
  );
}

export default HomePage;
