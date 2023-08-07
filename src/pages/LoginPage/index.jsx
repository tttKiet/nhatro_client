import { Link } from "react-router-dom";
import { useState } from "react";
import userServices from "../../services/userServices";
import Snipper from "../../components/Snipper";
import { GrGoogle, GrFacebookOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import firebaseAuth from "../../untils/firebaseConfig";
import supermraket from "../../assets/gifs/supermarket.gif";
import styles from "./LoginPage.module.scss";
import classNames from "classNames/bind";
import { Image } from "react-bootstrap";
import ModalMissPassword from "./MissPassword/ModalMissPassword";
const cx = classNames.bind(styles);

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please! Enter input email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Inlalic email!";
    }

    if (!values.password) {
      errors.password = "Please! Enter input password!";
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
      navigate("/");
    } else {
      setResMessage(response.message);
    }
    setLoading(false);
  }

  // test
  const providers = {
    google: new GoogleAuthProvider(),
    facebook: new FacebookAuthProvider(),
  };
  const firebaseLogin = async (loginType) => {
    setLoading(true);
    try {
      const provider = providers[loginType];
      const userData = await signInWithPopup(firebaseAuth, provider);
      const token = userData.user.accessToken;
      const res = await userServices.loginWithSocial(token);

      if (res?.response?.status === 401) {
        // handle error
      } else if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  function handleClickLoginGoogle() {
    firebaseLogin("google");
  }

  function handleClickLoginFacebook() {
    firebaseLogin("facebook");
  }

  return (
    <div className={cx("wrap")}>
      <ModalMissPassword
        show={show}
        onHide={() => setShow(false)}
      ></ModalMissPassword>
      <div className={cx("contai")}>
        <div className="container h-100 p-3 ">
          <div className="row">
            <div className={cx("col-12 col-md-5")}>
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
            <div className={cx("col-12  col-md-7 ", "form-login")}>
              <form
                onSubmit={formik.handleSubmit}
                className={cx("form", "d-flex flex-column ")}
              >
                <div className="flex-1">
                  <h3>
                    Welcome to
                    <span className={cx("highlight")}>
                      &quot;Future Motel&quot;
                    </span>
                  </h3>

                  <div className={cx("form-gr")}>
                    <input
                      className={cx({})}
                      type="text"
                      name="email"
                      placeholder="Your email"
                      onChange={formik.handleChange}
                      value={formik.values.fullName}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <span className={cx("err")}>{formik.errors.email}</span>
                    )}
                  </div>

                  <div className={cx("form-gr")}>
                    <div className={cx("input-eye")}>
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        placeholder="Your password"
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
                    <div className="d-flex justify-content-center align-items-center px-2">
                      <input type="checkbox" id="remember" defaultChecked />
                      <label htmlFor="remember" className="mb-0 mx-2">
                        Remember me.
                      </label>
                    </div>

                    <p
                      className={cx("miss-password")}
                      onClick={() => setShow(true)}
                    >
                      {" "}
                      Missing password?
                    </p>
                  </div>

                  <span className={cx("err")}>{}</span>
                </div>
                <div className={cx("form-btn")}>
                  <div className={cx("login")}>
                    <button
                      style={{ backgroundColor: "#0079FF" }}
                      type={loading ? "button" : "submit"}
                      className=" d-flex justify-content-center"
                    >
                      {loading ? <Snipper size={24} /> : "Continues"}
                    </button>
                  </div>
                  <span className="border-span my-3" data-text="Or"></span>

                  <div className={cx("social")}>
                    <button
                      style={{ backgroundColor: "#f53f3f" }}
                      type="button"
                      className="google shadow"
                      onClick={handleClickLoginGoogle}
                    >
                      <GrGoogle className="fs-l mb-1 me-2" />
                      Login with google
                    </button>
                    <button
                      style={{ backgroundColor: "#0d61cc" }}
                      type="button"
                      className="facebook"
                      onClick={handleClickLoginFacebook}
                    >
                      <GrFacebookOption className="fs-l mb-1 me-2" />
                      Login with facebook
                    </button>
                  </div>
                  <span className="mt-2">
                    You dont have account? You can
                    <Link to="/register" className="mx-1">
                      register
                    </Link>
                    here!
                  </span>
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
