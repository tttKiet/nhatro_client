import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import classNames from "classNames/bind";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";

const cx = classNames.bind(styles);
function Nav() {
  const location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(userSlice.actions.toggleLogin());
    navigate("/login");
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("d-flex  flex-column")}>
        <Link className={cx("link", { active: url === "/" })} to={"/"}>
          Dash Board
        </Link>
        <Link
          className={cx("link", { active: url.includes("accounts") })}
          to={"/admin/user/accounts"}
        >
          Accounts
        </Link>

        <button className={cx("link")} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
