import { userServices } from "../../services";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import styles from "./RegisterForm.module.scss";
import classNames from "classNames/bind";

const cx = classNames.bind(styles);

function RegisterForm() {
  const navigation = useNavigate();
  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Nhập dùm cái!";
    }

    if (!values.email) {
      errors.email = "Nhập dùm cái!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email sai định dạng!";
    }

    if (!values.phone) {
      errors.phone = "Nhập dùm cái!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Số điện thoại sai định dạng!";
    }

    if (!values.password) {
      errors.password = "Nhập dùm cái!";
    } else if (values.password.length < 8 || values.password.length > 16) {
      errors.password =
        "Mật khẩu không được nhỏ hơn 8 ký tự hay lớn hơn 16 ký tự!";
    }

    if (!values.cpassword) {
      errors.cpassword = "Nhập dùm cái!";
    } else if (values.password !== values.cpassword) {
      errors.cpassword = "Nhập lại mật khẩu không chính xác!";
    }

    if (!values.address) {
      errors.address = "Nhập dùm cái!";
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
      handleRegister(values);
    },
    validate,
  });

  async function handleRegister(values) {
    const res = await userServices.createUser(values);
    if (res.err === 0) {
      navigation("/root/user/accounts");
    }
  }

  return (
    <div className={cx("wrap")}>
      <form className={cx("form")} onSubmit={formik.handleSubmit}>
        <div className="d-flex gap-5 flex-wrap">
          <div>
            <div className={cx("form-group")}>
              <label className={cx("form-group-label")}>Họ & Tên:</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <span className={cx("err")}>{formik.errors.fullName}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label className={cx("form-group-label")}>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Input your Full Name.."
                className={cx("")}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <span className={cx("err")}>{formik.errors.email}</span>
              )}
            </div>
            <div className={cx("form-group")}>
              <label className={cx("form-group-label")}>Phone:</label>
              <input
                type="text"
                name="phone"
                placeholder="Input your Phone.."
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
              <label className={cx("form-group-label")}>Password:</label>
              <input
                type="text"
                placeholder="Input your Password.."
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span className={cx("err")}>{formik.errors.password}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label className={cx("form-group-label")}>
                Confirm password:
              </label>
              <input
                type="text"
                placeholder="Repeat your Password.."
                name="cpassword"
                onChange={formik.handleChange}
                value={formik.values.cpassword}
              />
              {formik.errors.cpassword && formik.touched.cpassword && (
                <span className={cx("err")}>{formik.errors.cpassword}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label className={cx("form-group-label")}>Address:</label>
              <input
                type="text"
                placeholder="Input your Address.."
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

          <button className={cx("btn")} type="button">
            Hủy
          </button>

          <button className={cx("btn", "btn-primary")} type="submit">
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
