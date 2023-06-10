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

  if (user.emailVerified) {
    return <VerifiedEmail />;
  }

  return (
    <div className={cx("wrap")}>
      {isEnterCode ? (
        <div>
          <div className={cx("title")}>
            <h4>Enter code</h4>
            <span className={cx("content")}>
              We have sent the code to
              <span className={cx("entered")}>
                <MdEmail />
                {email}
              </span>
              , please check your email and enter the code in the box below.
            </span>
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
            <h4>Your email is not verified</h4>
            <span className={cx("content")}>
              You need to verify your email to be able to use the owner function
              and retrieve your password in case of password theft.
            </span>
          </div>
          <div>
            <form name="email" onSubmit={formik.handleSubmit}>
              <div className={cx("gr", "mt-4")}>
                <label htmlFor="email">
                  Email Address <span>*</span>
                </label>
                <div className={cx("input")}>
                  <span>
                    <MdEmail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email..."
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
