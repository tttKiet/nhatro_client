import { IoMdArrowRoundBack } from "react-icons/io";
import styles from "./ChangePassword.module.scss";
import classNames from "classNames/bind";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../../hooks";
import userServices from "../../services/userServices";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);
function ChangePassword() {
  const [isVisibility, setIsVisibility] = useState({
    password: false,
    newPassword: false,
    rePassword: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [, , user] = useAuth();

  function checkPassword(str) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(str);
  }

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Please enter password";
    }

    if (!values.newPassword) {
      errors.newPassword = "Please enter new password";
    } else if (values.newPassword !== values.rePassword) {
      errors.rePassword = "Password doesn't match";
    } else if (!checkPassword(values.newPassword)) {
      errors.newPassword =
        "New password minimum 8 characters, at least one letter and one number";
    }
    if (values.newPassword === values.password) {
      errors.password = "New password mustn't same as old password";
    }

    if (!values.rePassword) {
      errors.rePassword = "Please enter re-password";
    } else if (values.newPassword !== values.rePassword) {
      errors.rePassword = "Password doesn't match";
    } else if (!checkPassword(values.rePassword)) {
      errors.rePassword =
        "Re-password minimum 8 characters, at least one letter and one number";
    }
    if (values.newPassword === values.password) {
      errors.password = "New password mustn't same as old password";
    }

    return errors;
  };

  async function handleSubmit(values) {
    toast.loading("Loading....");
    try {
      const res = await userServices.changePassword(
        values._id,
        values.password,
        values.rePassword
      );

      if (res.err === 0) {
        toast.dismiss();
        Swal.fire(`<p >Change password successfully, you will re-login</p>`);
        dispatch(userSlice.actions.toggleLogin());
      } else {
        toast.dismiss();
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      _id: user._id,
      password: "",
      newPassword: "",
      rePassword: "",
    },
    validate,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <div className={cx("wrap")}>
      <p className="fs-l text-white fst-italic">Change your password: </p>
      <div className={cx("")}>
        <div className={cx("gr", "form-floating mb-3")}>
          <input
            type={isVisibility.password ? "text" : "password"}
            className={cx("input-custom", "form-control")}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="name@example.com"
          />
          <label htmlFor="password" className="fs-m fst-italic">
            Password
          </label>

          <span
            className={cx("toggle-password")}
            onClick={() =>
              setIsVisibility({
                ...isVisibility,
                password: !isVisibility.password,
              })
            }
          >
            {isVisibility.password ? (
              <AiOutlineEyeInvisible className="text-white fs-xl mt-3 "></AiOutlineEyeInvisible>
            ) : (
              <AiOutlineEye className="text-white fs-xl mt-3 " />
            )}
          </span>
        </div>
        {formik.errors.password && formik.touched.password && (
          <span
            style={{ color: "rgb(255, 105, 105)" }}
            className={cx("err", "ms-2 fs-s fst-italic fw-light")}
          >
            {formik.errors.password}
          </span>
        )}

        <div className={cx("gr", "form-floating mb-3")}>
          <input
            type={isVisibility.newPassword ? "text" : "password"}
            className={cx("input-custom", "form-control")}
            name="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            id="passwordChange"
            placeholder="Password"
          />
          <label htmlFor="passwordChange" className="fs-m fst-italic">
            New password
          </label>

          <span
            className={cx("toggle-password")}
            onClick={() =>
              setIsVisibility({
                ...isVisibility,
                newPassword: !isVisibility.newPassword,
              })
            }
          >
            {isVisibility.newPassword ? (
              <AiOutlineEyeInvisible className="text-white fs-xl mt-3 "></AiOutlineEyeInvisible>
            ) : (
              <AiOutlineEye className="text-white fs-xl mt-3 " />
            )}
          </span>
        </div>

        {formik.errors.newPassword && formik.touched.newPassword && (
          <span
            style={{ color: "rgb(255, 105, 105)" }}
            className={cx("err", "ms-2 fs-s fst-italic fw-light")}
          >
            {formik.errors.newPassword}
          </span>
        )}

        <div className={cx("gr", "form-floating mb-3")}>
          <input
            type={isVisibility.rePassword ? "text" : "password"}
            className={cx("input-custom", "form-control")}
            id="rePasswordChange"
            name="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            placeholder="Password"
          />
          <label htmlFor="rePasswordChange" className="fs-m fst-italic">
            Re-enter password
          </label>

          <span
            className={cx("toggle-password")}
            onClick={() =>
              setIsVisibility({
                ...isVisibility,
                rePassword: !isVisibility.rePassword,
              })
            }
          >
            {isVisibility.rePassword ? (
              <AiOutlineEyeInvisible className="text-white fs-xl mt-3 "></AiOutlineEyeInvisible>
            ) : (
              <AiOutlineEye className="text-white fs-xl mt-3 " />
            )}
          </span>
        </div>

        {formik.errors.rePassword && formik.touched.rePassword && (
          <span
            style={{ color: "rgb(255, 105, 105)" }}
            className={cx("err", "ms-2 fs-s fst-italic fw-light")}
          >
            {formik.errors.rePassword}
          </span>
        )}
      </div>

      <div className={cx("btn-group", "mt-4 gap-2")}>
        <button
          className={cx("btn-action")}
          onClick={() => formik.handleSubmit()}
        >
          Send <BsFillSendFill></BsFillSendFill>
        </button>
      </div>
    </div>
  );
}

export default ChangePassword;
