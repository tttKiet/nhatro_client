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

const cx = classNames.bind(styles);
function NavControlLeft({ setActive, active }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

        <li
          className={cx({ active: active === "my-profile" })}
          onClick={() => setActive("my-profile")}
        >
          <GiCaptainHatProfile />
          My profile
        </li>
        <li
          onClick={() => setActive("verify-email")}
          className={cx({ active: active === "verify-email" })}
        >
          <HiOutlineMail />
          Verify email
        </li>
        <li>
          <BsHouse />
          My rooms
        </li>
        <li>
          <FaMoneyBillWave />
          Bill on month
        </li>
        <li>
          <TbBrandBooking />
          Motel rent
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
