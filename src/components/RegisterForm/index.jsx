import { userServices } from "../../services";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.scss";
import classNames from "classNames/bind";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { ToastContext } from "../../untils/context";
import { useContext } from "react";

const cx = classNames.bind(styles);

function RegisterForm({ _id }) {
  const navigation = useNavigate();
  const toast = useContext(ToastContext);
  const [showPass, setShowPass] = useState(false);
  const [, type] = useAuth();
  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Please enter your full name!";
    }

    if (!values.email) {
      errors.email = "Please enter your email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format!";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.password) {
      errors.password = "Please enter your password!";
    } else if (values.password.length < 8 || values.password.length > 16) {
      errors.password = "Password must be between 8 and 16 characters long!";
    }

    if (!values.cpassword) {
      errors.cpassword = "Please re-enter your password!";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "Passwords do not match!";
    }

    if (!values.address) {
      errors.address = "Please enter your address!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      address: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate,
  });

  async function handleSubmit(values) {
    let res;
    if (_id) {
      toast
        .promise(userServices.updateUser(_id, values), {
          loading: "Update...",
          success: <b>Update successfully!</b>,
          error: <b>Could not update.</b>,
        })
        .then(() => {
          if (res.err === 0) {
            if (type == "root") {
              return navigation("/root/user/accounts");
            } else {
              setTimeout(() => {
                navigation("/login");
              }, 2000);
            }
          }
        });
    } else {
      toast
        .promise(userServices.createUser(values), {
          loading: "Register...",
          success: <b>Register successfully!</b>,
          error: <b>Could not register.</b>,
        })
        .then((res) => {
          if (res.err === 0) {
            if (type == "root") {
              return navigation("/root/user/accounts");
            } else {
              setTimeout(() => {
                navigation("/login");
              }, 2000);
            }
          }
        });
    }
  }

  useEffect(() => {
    if (_id) {
      userServices.getUserById(_id).then((user) => {
        formik.setValues({
          ...user.dataUser,
          cpassword: user.dataUser.password,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("wrap")}>
      <form className={cx("form")} onSubmit={formik.handleSubmit}>
        <div className="d-flex gap-md-0 gap-lg-5 gap-xl-5 gap-sm-0 flex-wrap">
          <div>
            <div className={cx("form-group")}>
              <label htmlFor="fullName" className={cx("form-group-label")}>
                Full name:
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                spellCheck={false}
                placeholder="exam: Nguyen Van A"
                className={cx({
                  errInput: !!formik.errors.fullName && formik.touched.fullName,
                })}
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <span className={cx("err")}>{formik.errors.fullName}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label className={cx("form-group-label")} htmlFor="email">
                Email:
              </label>
              <input
                spellCheck={false}
                id="email"
                type="text"
                name="email"
                placeholder="exam: abcxyz@gmail.com"

                className={cx({
                  errInput: !!formik.errors.email && formik.touched.email,
                })}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <span className={cx("err")}>{formik.errors.email}</span>
              )}
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="phone" className={cx("form-group-label")}>
                Phone:
              </label>
              <input
                id="phone"
                spellCheck={false}
                type="text"
                name="phone"
                className={cx({
                  errInput: !!formik.errors.phone && formik.touched.phone,
                })}
                placeholder="exam: 0123456789"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && (
                <span className={cx("err")}>{formik.errors.phone}</span>
              )}
            </div>
          </div>
          <div>
            <div className={cx("form-group")}>
              <label htmlFor="pass" className={cx("form-group-label")}>
                Password:
              </label>
              <div className={cx("input-eye")}>
                <input
                  spellCheck={false}
                  id="pass"
                  type={showPass ? "text" : "password"}
                  className={cx({
                    errInput:
                      !!formik.errors.password && formik.touched.password,
                  })}
                  placeholder="Your password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <div onClick={() => setShowPass((prev) => !prev)}>
                  {showPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={cx("w-6 h-6", "eye")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={cx("w-6 h-6", "eye")}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {formik.errors.password && formik.touched.password && (
                <span className={cx("err")}>{formik.errors.password}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="cpass" className={cx("form-group-label")}>
                Confirm password:
              </label>
              <input
                id="cpass"
                spellCheck={false}
                type={showPass ? "text" : "password"}
                className={cx({
                  errInput:
                    !!formik.errors.cpassword && formik.touched.cpassword,
                })}
                placeholder="Confirm your password"
                name="cpassword"
                onChange={formik.handleChange}
                value={formik.values.cpassword}
              />
              {formik.errors.cpassword && formik.touched.cpassword && (
                <span className={cx("err")}>{formik.errors.cpassword}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="address" className={cx("form-group-label")}>
                Your address:
              </label>
              <textarea
                spellCheck={false}
                id="address"
                type="text"
                className={cx({
                  errInput: !!formik.errors.address && formik.touched.address,
                })}
                placeholder="Your address here"
                name="address"
                onChange={formik.handleChange}
                value={formik.values.address}
              />

              {formik.errors.address && formik.touched.address && (
                <span className={cx("err")}>{formik.errors.address}</span>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex gap-4">
          <button
            className={cx("btn")}
            type="reset"
            onClick={formik.handleReset}
          >
            Reset
          </button>

          <button
            className={cx("btn")}
            type="button"
            onClick={() => navigation(-1)}
          >
            Cancel
          </button>

          <button className={cx("btn", "btn-primary")} type="submit">
            {_id ? "Save" : type === "root" ? "Add member" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  _id: PropTypes.string.isRequired,
};

export default RegisterForm;
