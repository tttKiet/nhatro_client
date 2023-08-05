import Modal from "react-bootstrap/Modal";
import { MdClose, MdOutlineArrowBack } from "react-icons/md";
import classNames from "classNames/bind";
import styles from "./ModalMissPassword.module.scss";
import { BsFillSendFill } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-toastify";
import { codeServices, userServices } from "../../../services";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const cx = classNames.bind(styles);

function ModalMissPassword({ show, onHide }) {
  const [isSentCode, setIsSentCode] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibility, setIsVisibility] = useState({
    newPassword: false,
    rePassword: false,
  });

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function checkPassword(str) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(str);
  }

  const validate = (values) => {
    const errors = {};

    if (!values.newPassword) {
      errors.newPassword = "Please enter new password";
    } else if (values.newPassword !== values.rePassword) {
      errors.rePassword = "Password doesn't match";
    } else if (!checkPassword(values.newPassword)) {
      errors.newPassword =
        "New password minimum 8 characters, at least one letter and one number";
    }

    if (!values.rePassword) {
      errors.rePassword = "Please enter re-password";
    } else if (values.newPassword !== values.rePassword) {
      errors.rePassword = "Password doesn't match";
    } else if (!checkPassword(values.rePassword)) {
      errors.rePassword =
        "Re-password minimum 8 characters, at least one letter and one number";
    }

    if (!values.codeFormik) {
      errors.codeFormik = "Please enter code";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      codeFormik: "",
      newPassword: "",
      rePassword: "",
    },
    validate,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  async function handleSendCode() {
    if (email.length === 0) {
      return toast.error("Please enter an email address");
    } else if (!validateEmail(email)) {
      return toast.warning("Please enter a valid email");
    }

    toast.loading("Loading...");
    setIsLoading(true);

    try {
      const res = await codeServices.checkExistCodeForEmail(email);
      if (res.err === 0) {
        return toast.warning(res.message);
      }

      await userServices
        .sendCodeMissPassword(email)
        .then((res) => {
          if (res.err === 0) {
            toast.dismiss();
            toast.success(res.message);
            setIsLoading(false);
            setIsSentCode(true);
          } else {
            toast.dismiss();
            toast.error(res.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          toast.dismiss();
          toast.error(err.response.data.message);
          setIsLoading(false);
        });
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  }

  async function handleSubmit(values) {
    toast.loading("Loading...");
    setIsLoading(true);

    try {
      const res = await userServices.verifyCodeAndChangePassword(
        values.codeFormik,
        email,
        values.rePassword
      );

      console.log("Res", res);
      if (res.data.err === 0) {
        toast.dismiss();
        toast.success(
          <p className="m-0">
            {res.data.message}
            <br></br>
            Please re-login
          </p>
        );
        setIsLoading(false);
        onHide();
      } else {
        toast.dismiss();
        toast.success(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // onExited={() => alert("exit")}
      //   fullscreen="sm-down"
    >
      <span className={cx("button-close")}>
        <MdClose className={cx("close")} onClick={onHide}></MdClose>
      </span>
      <Modal.Body>
        <div className={cx("")}>
          <p
            className="fs-m text-center rounded shadow py-2"
            style={{ background: "#068FFF", color: "#ffff" }}
          >
            {!isSentCode &&
              "We will send to your email a code, enter your email here:"}
            {isSentCode && "Enter your code here to set a new password:"}{" "}
          </p>

          {!isSentCode && (
            <>
              <div className={cx("gr", "form-floating mb-3")}>
                <input
                  type="text"
                  className={cx("input-custom", "form-control")}
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email" className="fs-m fst-italic">
                  Your email
                </label>
              </div>
            </>
          )}

          {isSentCode && (
            <>
              <div className={cx("field", "mb-3")}>
                <div className={cx("gr", "form-floating")}>
                  <input
                    type="text"
                    className={cx("input-custom", "form-control")}
                    id="codeFormik"
                    name="codeFormik"
                    onChange={formik.handleChange}
                    value={formik.values.codeFormik}
                    placeholder="name@example.com"
                  />
                  <label htmlFor="codeFormik" className="fs-m fst-italic">
                    Your code
                  </label>
                </div>
                {formik.errors.codeFormik && formik.touched.codeFormik && (
                  <span
                    style={{ color: "rgb(255, 105, 105)" }}
                    className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                  >
                    {formik.errors.codeFormik}
                  </span>
                )}
              </div>

              <div className={cx("field", "mb-3")}>
                <div className={cx("gr", "form-floating")}>
                  <input
                    type={isVisibility.newPassword ? "text" : "password"}
                    className={cx("input-custom", "form-control")}
                    id="newPassword"
                    name="newPassword"
                    placeholder="name@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                  />
                  <label htmlFor="newPassword" className="fs-m fst-italic">
                    New password
                  </label>

                  <span
                    className={cx("toggle-password")}
                    onClick={() =>
                      setIsVisibility({
                        ...isVisibility,
                        newPassword: !isVisibility.newPassword,
                      })
                    }
                  >
                    {isVisibility.newPassword ? (
                      <AiOutlineEyeInvisible className=" fs-xl mt-3 text-dark "></AiOutlineEyeInvisible>
                    ) : (
                      <AiOutlineEye className=" fs-xl mt-3 text-dark " />
                    )}
                  </span>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <span
                    style={{ color: "rgb(255, 105, 105)" }}
                    className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                  >
                    {formik.errors.newPassword}
                  </span>
                )}
              </div>
              <div className={cx("field", "mb-3")}>
                <div className={cx("gr", "form-floating")}>
                  <input
                    type={isVisibility.rePassword ? "text" : "password"}
                    className={cx("input-custom", "form-control")}
                    id="rePassword"
                    name="rePassword"
                    placeholder="name@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                  />
                  <label htmlFor="rePassword" className="fs-m fst-italic">
                    Re-password
                  </label>

                  <span
                    className={cx("toggle-password")}
                    onClick={() =>
                      setIsVisibility({
                        ...isVisibility,
                        rePassword: !isVisibility.rePassword,
                      })
                    }
                  >
                    {isVisibility.rePassword ? (
                      <AiOutlineEyeInvisible className=" fs-xl mt-3 text-dark "></AiOutlineEyeInvisible>
                    ) : (
                      <AiOutlineEye className=" fs-xl mt-3 text-dark " />
                    )}
                  </span>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword && (
                  <span
                    style={{ color: "rgb(255, 105, 105)" }}
                    className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                  >
                    {formik.errors.rePassword}
                  </span>
                )}
              </div>
            </>
          )}

          {!isSentCode ? (
            <button
              disabled={isLoading}
              className={cx("btn-action")}
              onClick={(e) => handleSendCode(e)}
            >
              Send code
              <BsFillSendFill className="ms-2"></BsFillSendFill>
            </button>
          ) : (
            <>
              <button
                disabled={isLoading}
                className={cx("btn-action", "me-2")}
                onClick={() => {
                  setIsSentCode(false);
                  formik.resetForm();
                }}
              >
                Back
                <MdOutlineArrowBack className="ms-2"></MdOutlineArrowBack>
              </button>
              <button
                disabled={isLoading}
                className={cx("btn-action")}
                onClick={() => formik.handleSubmit()}
              >
                Confirm
                <BsFillSendFill className="ms-2"></BsFillSendFill>
              </button>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMissPassword;
