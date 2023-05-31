import Logo from "../../Logo";
import NavControl from "./NavControl";
import classNames from "classNames/bind";
import styles from "./NavUser.module.scss";
import UserControl from "./UserControl";

const cx = classNames.bind(styles);
function NavUser() {
  return (
    <div className={cx("wrap")}>
      <div className="container">
        <div className={"d-flex align-items-center justify-content-between"}>
          <Logo />
          <NavControl />
          <UserControl />
        </div>
      </div>
    </div>
  );
}

export default NavUser;
