import Logo from "../../Logo";
import NavControl from "./NavControl";
import UserControl from "./UserControl";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";

const cx = classNames.bind(styles);
function NavUser() {
  return (
    <div className={cx("wrap")}>
      <div className="container">
        <div
          className={cx(
            "d-flex align-items-center justify-content-between",
            "navbar"
          )}
        >
          <Logo />
          <NavControl />
          <UserControl />
        </div>
      </div>
    </div>
  );
}

export default NavUser;
