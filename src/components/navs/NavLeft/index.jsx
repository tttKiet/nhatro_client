import classNames from "classNames/bind";
import styles from "./NavLeft.module.scss";
import NavControlLeft from "./NavControLeft";

const cx = classNames.bind(styles);
function NavLeft() {
  return (
    <div className={cx("wrap")}>
      <NavControlLeft />
    </div>
  );
}

export default NavLeft;
