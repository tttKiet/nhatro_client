import { userServices } from "../../services";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.scss";
import classNames from "classNames/bind";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function RegisterForm({ _id }) {
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
      handleSubmit(values);
    },
    validate,
  });

  async function handleSubmit(values) {
    let res;
    if (_id) {
      res = await userServices.updateUser(_id, values);
      console.log(res);
    } else {
      res = await userServices.createUser(values);
    }
    if (res.err === 0) {
      navigation("/root/user/accounts");
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
        <div className="d-flex gap-5 flex-wrap">
          <div>
            <div className={cx("form-group")}>
              <label htmlFor="fullName" className={cx("form-group-label")}>
                Họ & Tên:
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="Vd: Nguyễn Văn A"
                className={cx({ errInput: !!formik.errors.fullName })}
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
                id="email"
                type="text"
                name="email"
                className={cx({ errInput: !!formik.errors.email })}
                placeholder="abcxyz@gmail.com"
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
                type="text"
                name="phone"
                className={cx({ errInput: !!formik.errors.phone })}
                placeholder="vd: 0123456789"
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
                Mật khẩu:
              </label>
              <input
                id="pass"
                type="password"
                className={cx({ errInput: !!formik.errors.password })}
                placeholder="Mật khẩu của bạn"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && formik.touched.password && (
                <span className={cx("err")}>{formik.errors.password}</span>
              )}
            </div>

            <div className={cx("form-group")}>
              <label htmlFor="cpass" className={cx("form-group-label")}>
                Nhập lại mật khẩu:
              </label>
              <input
                id="cpass"
                type="password"
                className={cx({ errInput: !!formik.errors.cpassword })}
                placeholder="Nhập lại mật khẩu của bạn"
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
                Địa chỉ:
              </label>
              <textarea
                id="address"
                type="text"
                className={cx({ errInput: !!formik.errors.address })}
                placeholder="Địa chỉ của bạn"
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
            Hủy
          </button>

          <button className={cx("btn", "btn-primary")} type="submit">
            {_id ? "Lưu" : "Đăng ký"}
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
