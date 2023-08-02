import { Link } from "react-router-dom";
import styles from "./RegisterPage.module.scss";
import classNames from "classNames/bind";
import supermraket from "../../assets/gifs/supermarket.gif";

import RegisterForm from "../../components/RegisterForm";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);

function RegisterPage() {
  return (
    <div className={cx("wrap")}>
      <div className={cx("contai")}>
        <div className=" container-xl h-100 p-3 ">
          <div className="row">
            <div className={cx("col-12 col-md-12 col-lg-4")}>
              <div className={cx("img")}>
                <div className="title">
                  <b>FUTURE MOTEL</b>
                </div>
                <div className={cx("content")}>
                  <p className={cx("des")}>
                    Easily rent a room with the website
                    <span>&quot;Future Motel&quot;</span>
                  </p>
                  <p className={cx("des-blur")}>
                    Future Motel has provided millions of students with
                    accommodation throughout their study or work journey. With
                    its successful housing quality, Future Motel is poised to
                    become the world&quot;s leading brand for house rental
                    websites.
                  </p>
                </div>

                <div className={cx("card-footer")}>
                  <Image src={supermraket} className="rounded-3 shadow"></Image>
                </div>
              </div>
            </div>
            <div className={cx("col-lg-8 col-12", "form-login")}>
              <div className="flex-1">
                <h3>
                  Welcome to
                  <span className={cx("highlight")}>
                    &quot;Future Motel&quot;
                  </span>
                </h3>
                <RegisterForm _id="" />

                <div className={cx("form-btn", "control-login")}>
                  <span>Do you have a account? </span>
                  <Link type="submit" to="/login" className="mx-2">
                    Login now
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
