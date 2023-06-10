import { MdEmail } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { DiCode } from "react-icons/di";
import { useAuth } from "../../hooks";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import VerifiedEmail from "./VerifiedEmail";
import { codeServices, userServices } from "../../services";
import Snipper from "../Snipper";
import { ToastContext } from "../../untils/context";
import { reloadInfo } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
// scss
import styles from "./VerifyEmail.module.scss";
import classNames from "classNames/bind";
const cx = classNames.bind(styles);

function VerifyEmail() {
  const [, , user] = useAuth();
  const [isLoadding, setIsLoading] = useState(false);
  const [isEnterCode, setIsEnterCode] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [changeInterface, setChangeInterface] = useState(false);
  const toast = useContext(ToastContext);
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Please enter your email!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate,
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const resIsExistCode = await codeServices.checkExistCodeForEmail(
        values.email
      );

      if (resIsExistCode.status === 200 && resIsExistCode.data.err === 0)
        setIsEnterCode(true);
      else {
        const res = await userServices.sendCodeEmail(user._id, values.email);
        if (res?.status === 200) {
          toast.success("Sent code!");
          setEmail(values.email);
          dispatch(reloadInfo());
          setIsEnterCode(true);
        } else {
          toast.error(res?.data?.message || "Erorr");
        }
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setIsLoading(false);
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter your code!!!");
    } else {
      try {
        const res = await codeServices.verifyCodeEmail(code, email, user._id);
        if (res.status === 200) {
          if (res.data.err === 0) {
            dispatch(reloadInfo());
            setChangeInterface(false);
            toast.success(res.data.message || "Verified!");
          }
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleClickChangeEmail = () => {
    setIsEnterCode(false);
  };

  useEffect(() => {
    if (!user.emailVerified) {
      const emailExists = user.email;
      formik.setValues({
        email: emailExists,
      });
      setEmail(emailExists);
      try {
        if (emailExists) {
          codeServices.checkExistCodeForEmail(emailExists).then((res) => {
            if (res.status === 200 && res.data.err === 0) setIsEnterCode(true);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [user.emailVerified, user.email]);

  if (user.emailVerified && !changeInterface) {
    return <VerifiedEmail setChangeInterface={setChangeInterface} />;
  }

  return (
    <div className={cx("wrap")}>
      {changeInterface && (
        <div className={cx("back")} onClick={() => setChangeInterface(false)}>
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
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </div>
      )}
      {isEnterCode ? (
        <div>
          <div className={cx("title")}>
            <h4>Enter code</h4>
            <div className="mt-4">
              <span className={cx("content")}>
                We have sent the code to
                <span className={cx("entered")}>
                  <MdEmail />
                  {email}
                </span>
                , please check your email and enter the code in the box below.
              </span>
            </div>
          </div>
          <form name="code" onSubmit={handleSubmitCode}>
            <div className={cx("gr", "mt-3")}>
              <label htmlFor="code">
                Code <span>*</span>
              </label>
              <div className={cx("input")}>
                <span>
                  <DiCode />
                </span>
                <input
                  id="code"
                  name="email"
                  type="text"
                  placeholder="Enter your code..."
                  spellCheck={false}
                  value={code}
                  onChange={(e) => {
                    if (e.target.value.length < 7) {
                      setCode(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className={cx("gr", "mt-4 d-flex gap-3")}>
              <button
                type="button"
                onClick={handleClickChangeEmail}
                className={cx("btn-default center", "transparent", {
                  disabled: isLoadding,
                })}
              >
                <CgArrowsExchange />
                Other Email
              </button>

              <button
                type={isLoadding ? "button" : "submit"}
                className={cx("btn-default", {
                  disabled: isLoadding,
                })}
              >
                {!isLoadding ? "Continue" : <Snipper color="#000" />}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className={cx("title")}>
            <h4>
              {changeInterface ? "Change email" : "Your email is not verified "}
            </h4>
            <span className={cx("content")}>
              {changeInterface
                ? "You need to re-authenticate new email when changing email."
                : "You need to verify your email to be able to use the owner function and retrieve your password in case of password theft."}
            </span>
          </div>
          <div>
            <form name="email" onSubmit={formik.handleSubmit}>
              <div className={cx("gr", "mt-4")}>
                <label htmlFor="email">
                  {changeInterface ? "New Email Address" : " Email Address "}
                  <span>*</span>
                </label>
                <div className={cx("input")}>
                  <span>
                    <MdEmail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder={
                      changeInterface
                        ? "Enter your new email..."
                        : "Enter your email..."
                    }
                    spellCheck={false}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        formik.submitForm();
                      }
                    }}
                  />
                </div>

                {formik.errors.email && formik.touched.email && (
                  <span className={cx("error")}>{formik.errors.email}</span>
                )}
              </div>
              <div className={cx("gr", "mt-4")}>
                <button
                  type={isLoadding ? "button" : "submit"}
                  className={cx("btn-default", {
                    disabled: isLoadding,
                  })}
                >
                  {!isLoadding ? "Continue" : <Snipper color="#000" />}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;
