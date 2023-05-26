import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.scss";
import classNames from "classNames/bind";

import RegisterForm from "../../components/RegisterForm";

const cx = classNames.bind(styles);

function RegisterPage() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("contai")}>
        <div className="container h-100 p-3 ">
          <div className="row">
            <div className={cx("col-12 col-md-12 col-lg-3")}>
              <div className={cx("img")}>
                <div className="title">
                  <b>HOUSES</b>
                </div>
                <div className={cx("content")}>
                  <p className={cx("des")}>
                    Cho thuê phòng dể dàng với website
                    <span>&quot;Motel Future&quot;</span>
                  </p>
                  <p className={cx("des-blur")}>
                    Motel Future đã làm cho hàng triệu sinh viên có chổ ở trong
                    suốt quá trình học tập hay đi làm. Thành công với chất lượng
                    nhà ở, Motel Future sẽ là một thương hiệu website cho thuê
                    nhà bật nhất the world.
                  </p>
                </div>

                <div className={cx("card-footer")}>
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
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={cx("col-lg-9 col-12", "form-login")}>
              <div className="flex-1">
                <h3>
                  Chào mừng bạn đến với
                  <span className={cx("highlight")}>
                    &quot;Nhà trọ Online!&quot;
                  </span>
                </h3>
                <RegisterForm _id="" />

                <div className={cx("form-btn", "control-login")}>
                  <span>Bạn đã có tài khoản? </span>
                  <Link type="submit" to="/login" className="mx-2">
                    Đăng nhập ngay.
                  </Link>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
