import NavControlLeft from "./NavControLeft";
import classNames from "classNames/bind";
import styles from "./NavLeft.module.scss";

const cx = classNames.bind(styles);
function NavLeft({ active, setActive, onHide }) {
  return (
    <div className={cx("wrap")}>
      <NavControlLeft setActive={setActive} active={active} onHide={onHide} />
    </div>
  );
}

export default NavLeft;
