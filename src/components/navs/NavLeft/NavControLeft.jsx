import classNames from "classNames/bind";
import styles from "./NavLeft.module.scss";
import { HiOutlineMail, HiOutlineUserCircle } from "react-icons/hi";
import { BsFileEarmark, BsHouse, BsTrash } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { MdLogout, MdOutlineAdminPanelSettings } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { userServices } from "../../../services";
import { userSlice } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks";

const cx = classNames.bind(styles);
function NavControlLeft({ setActive, active, onHide }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, , userCur] = useAuth();

  const handleLogout = useCallback(() => {
    Swal.fire({
      title: "Are you sure to logout?",
      showConfirmButton: true,
      showDenyButton: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      text: "You will sign out now",
      confirmButtonText: "Sign out here",
      reverseButtons: true,
      confirmButtonColor: "#d55",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await userServices.loggout();
        if (res === "ok") {
          navigate("/login");
          dispatch(userSlice.actions.toggleLogin());
        }
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className={cx("nav-control")}>
      <div className={cx("hi")}>
        <Link onClick={() => navigate(-1)}>
          <TiArrowBack />
          Back
        </Link>
        <h4>Thanks you so used our services!</h4>
      </div>
      <ul className={cx("list-menu-control")}>
        <hr />
        <li>
          <Link
            className={cx({ active: active === "my-profile" })}
            to={`/profile?tag=my-profile`}
            onClick={onHide ? () => onHide() : ""}
          >
            <HiOutlineUserCircle />
            My profile
          </Link>
        </li>
        <li>
          <Link
            className={cx({ active: active === "verify-email" })}
            to={`/profile?tag=verify-email`}
            onClick={onHide ? () => onHide() : ""}
          >
            <HiOutlineMail />
            Verify email
          </Link>
        </li>
        <li>
          <Link
            className={cx({ active: active === "req-owner-broad-house" })}
            to={`/profile?tag=req-owner-broad-house`}
            onClick={onHide ? () => onHide() : ""}
          >
            <MdOutlineAdminPanelSettings />
            Request to be the board house owner
          </Link>
        </li>

        <li>
          <Link
            className={cx({ active: active === "my-feedback" })}
            to={`/profile?tag=my-feedback`}
            onClick={onHide ? () => onHide() : ""}
          >
            <BsFileEarmark />
            My feedbacks
          </Link>
        </li>
      </ul>

      <div className="d-flex flex-column align-items-center justify-content-center gap-3 mb-5">
        <button className={cx("btn")}>
          <div>
            <span>
              <p className="m-0 text-center">
                <BsTrash className="fs-l"></BsTrash>
              </p>
            </span>
          </div>
          <div>
            <span>
              <p className="m-0 text-center fs-m">Delete account</p>
            </span>
          </div>
        </button>

        <button onClick={handleLogout} className={cx("btn")}>
          <div>
            <span>
              <p className="m-0 text-center">
                <MdLogout className="fs-l "></MdLogout>
              </p>
            </span>
          </div>
          <div>
            <span>
              <p className="m-0 text-center fs-m">Logout</p>
            </span>
          </div>
        </button>

        {/* <button onClick={handleLogout} className={cx("button-user-profile")}>
          Sign out <MdLogout className="fs-l ms-1"></MdLogout>
        </button> */}
      </div>
    </div>
  );
}

export default NavControlLeft;
