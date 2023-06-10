import classNames from "classNames/bind";
import styles from "./NavLeft.module.scss";
import { GiCaptainHatProfile } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { BsHouse } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { userServices } from "../../../services";
import { userSlice } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks";

const cx = classNames.bind(styles);
function NavControlLeft({ setActive, active }) {
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
        <Link to={"/"}>
          <TiArrowBack />
          Back to home
        </Link>
        <h4>Thanks you so used our services!</h4>
      </div>
      <ul className={cx("list-menu-control")}>
        <hr />

        <li>
          <Link
            className={cx({ active: active === "my-profile" })}
            to={`/profile/${userCur?._id}?tag=my-profile`}
          >
            <GiCaptainHatProfile />
            My profile
          </Link>
        </li>
        <li>
          <Link
            className={cx({ active: active === "verify-email" })}
            to={`/profile/${userCur?._id}?tag=verify-email`}
          >
            <HiOutlineMail />
            Verify email
          </Link>
        </li>
        <li>
          <Link>
            <BsHouse />
            My rooms
          </Link>
        </li>
        <li>
          <Link>
            <FaMoneyBillWave />
            Bill on month
          </Link>
        </li>
        <li>
          <Link>
            <TbBrandBooking />
            Motel rent
          </Link>
        </li>
      </ul>

      <div className="d-flex flex-column gap-1 mb-5">
        <button className={cx("button-user-profile")}>Delete account</button>
        <button onClick={handleLogout} className={cx("button-user-profile")}>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default NavControlLeft;
