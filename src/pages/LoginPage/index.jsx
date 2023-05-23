import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import classNames from "classNames/bind";
import { useState } from "react";
import userServices from "../../services/userServices";
import Snipper from "../../components/Snipper";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const cx = classNames.bind(styles);

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Chưa nhập email sao đăng nhập?";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Nhập sai định dạng email!";
    }

    if (!values.password) {
      errors.password = "Mật khẩu còn chưa nhập?";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validate,
  });

  async function handleLogin(values) {
    setLoading(true);
    const response = await userServices.login(values);

    if (response.err === 0) {
      dispatch(userSlice.actions.handleLogin(response.dataUser));
      navigate("/");
    } else {
      setResMessage(response.message);
    }
    setLoading(false);
  }

  return (
    <div className={cx("wrap")}>
      <div className={cx("contai")}>
        <div className="container">
          <div className="row">
            <div className={cx("col-6 p-0")}>
              <div className={cx("img")}></div>
            </div>
            <div className={cx("col-6 ", "form-login")}>
              <form
                onSubmit={formik.handleSubmit}
                className={cx("form", "d-flex flex-column ")}
              >
                <div className="flex-1">
                  <h3>
                    Chào mừng bạn đến với
                    <span className={cx("highlight")}>
                      &quot;Nhà trọ Online!&quot;
                    </span>
                  </h3>

                  <div className={cx("form-gr")}>
                    <input
                      className={cx({})}
                      type="text"
                      name="email"
                      placeholder="Email của bạn"
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <span className={cx("err")}>{formik.errors.email}</span>
                    )}
                  </div>

                  <div className={cx("form-gr")}>
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu của bạn"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password && (
                      <span className={cx("err")}>
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div className={cx("res-Err", "err")}>{resMessage}</div>

                  <div
                    className={cx(
                      "form-gr d-flex justify-content-between align-items-center mb-4 mt-0"
                    )}
                  >
                    <div className="d-flex  justify-content-center align-items-center">
                      <input type="checkbox" />
                      <p className="mb-0 mx-2">Ghi nhớ đăng nhập</p>
                    </div>

                    <a href="#"> Quên mật khẩu?</a>
                  </div>

                  <span className={cx("err")}>{}</span>
                </div>
                <div className={cx("form-btn", "mt-5")}>
                  <button
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center"
                  >
                    {loading ? <Snipper /> : "Đăng nhập"}
                  </button>
                  <hr />
                  <Link to="/register" className="btn ">
                    Đăng ký
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
