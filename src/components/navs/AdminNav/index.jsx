import styles from "./AdminNav.module.scss";
import classNames from "classNames/bind";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Logo";
import { useDispatch } from "react-redux";
import { userSlice } from "../../../redux/reducers";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks";
import { TbSwitchHorizontal } from "react-icons/tb";

const cx = classNames.bind(styles);
function AdminNav() {
  const location = useLocation();
  const url = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, , dataAdmin] = useAuth();

  function handleLogout() {
    Swal.fire({
      title: "Are you sure to logout?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      text: "You will logout our system",
      confirmButtonText: "Confirm",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(userSlice.actions.toggleLogin());
        navigate("/login");
      }
    });
  }

  function handleSwitchUserPage() {
    Swal.fire({
      title: "Are you sure to switch user page?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      text: "You will access to user page soon!",
      confirmButtonText: "Confirm",
      reverseButtons: true,
      confirmButtonColor: "#176B87",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }

  return (
    <div className={cx("wrap")}>
      <Logo />
      <hr />
      <div className={cx("d-flex mt-5 flex-column")}>
        <Link
          className={cx("link", { active: url === "/admin" })}
          to={"/admin"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Dash Board
        </Link>

        <Link
          className={cx("link", { active: url.includes("/all-members") })}
          to={`/admin/${dataAdmin._id}/all-members`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          All Members
        </Link>

        <Link
          className={cx("link", { active: url.includes("all-rooms") })}
          to={`/admin/${dataAdmin._id}/all-rooms`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
          All Rooms
        </Link>

        <button className={cx("link", "btn")} onClick={handleSwitchUserPage}>
          <TbSwitchHorizontal className="fs-l"></TbSwitchHorizontal>
          Switch to user page
        </button>

        <button className={cx("link", "btn")} onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNav;
