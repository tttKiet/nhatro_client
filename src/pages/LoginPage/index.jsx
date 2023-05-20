import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import classNames from "classNames/bind";
import { useState } from "react";
import userServices from "../../services/userServices";
import Snipper from "../../components/Snipper";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPass, setErrPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validate() {
    let isErr = false;
    if (!phone) {
      setErr("Vui lòng nhập thông tin!!!");
      setErrPhone("Chưa nhập số điện thoại!");
      isErr = true;
    } else {
      setErrPhone("");
    }

    if (!pass) {
      setErr("Vui lòng nhập thông tin!!!");
      setErrPass("Vui lòng nhập mật khẩu!");
      isErr = true;
    } else {
      setErrPass("");
    }

    if (!isErr) setErr("");
    return isErr;
  }

  async function handleLogin() {
    const data = { phone, pass };
    setloading(true);
    const response = await userServices.login(data);
    if (response.err === 0) {
      dispatch(userSlice.actions.handleLogin(response.dataUser));
      navigate("/");
    } else {
      setErr(response.message);
    }
    setloading(false);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) {
      handleLogin();
    }
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
                className={cx(
                  "form",
                  "d-flex flex-column justify-content-between "
                )}
                onSubmit={(ev) => handleSubmit(ev)}
              >
                <div className="flex-1">
                  <h3>
                    Chào mừng bạn đến với
                    <span className={cx("highlight")}>
                      &quot;Nhà trọ Online!&quot;
                    </span>
                  </h3>

                  <div className={cx("form-gr")}>
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      className={cx({ iserr: errPhone.length > 0 })}
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={(ev) => setPhone(ev.target.value)}
                    />
                  </div>

                  <div className={cx("form-gr")}>
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="text"
                      id="password"
                      className={cx({ iserr: errPass.length > 0 })}
                      value={pass}
                      onChange={(ev) => setPass(ev.target.value)}
                    />
                  </div>

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

                  <span className={cx("err")}>{err}</span>
                </div>
                <div className={cx("form-gr", "mt-5")}>
                  <button
                    type="submit"
                    className="btn btn-primary d-flex justify-content-center"
                  >
                    {loading ? <Snipper /> : "Đăng nhập"}
                  </button>
                  <hr />
                  <Link to="/register" className="btn btn-secondary">
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
