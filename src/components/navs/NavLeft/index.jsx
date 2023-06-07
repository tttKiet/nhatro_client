import classNames from "classNames/bind";
import styles from "./NavLeft.module.scss";
import NavControlLeft from "./NavControLeft";

const cx = classNames.bind(styles);
function NavLeft({ active, setActive }) {
  return (
    <div className={cx("wrap")}>
      <NavControlLeft setActive={setActive} active={active} />
    </div>
  );
}

export default NavLeft;
