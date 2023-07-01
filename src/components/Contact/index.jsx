import styles from "./Contact.module.scss";
import { useFormik } from "formik";
import { useAuth } from "../../hooks";
import classNames from "classNames/bind";
import { feedbackService } from "../../services";
import {
  BsFillSendFill,
  BsMapFill,
  BsFillEnvelopeAtFill,
  BsFillPhoneFill,
  BsFacebook,
  BsTiktok,
  BsFillTvFill,
} from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { ToastContext } from "../../untils/context";
import { useContext } from "react";

const cx = classNames.bind(styles);

function Contact() {
  const [, , inforUser] = useAuth();
  const toast = useContext(ToastContext);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter title";
    } else if (values.title.length <= 5) {
      errors.title = "Title must more than be 5 characters";
    }

    if (!values.message) {
      errors.message = "Please enter message";
    } else if (values.message.length <= 10) {
      errors.message = "Message must more than be 10 characters";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: inforUser.fullName,
      email: inforUser.email,
      title: "",
      message: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSubmit(inforUser._id, values);
    },
  });

  async function handleSubmit(id, values) {
    toast.loading("Creating...");
    try {
      const res = await feedbackService.createFeedback(id, values);
      if (res.err === 0) {
        formik.resetForm();
        toast.dismiss();
        toast.success("Create feedback successfully");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error");
      console.log(error);
    }
  }

  return (
    <>
      <div className={cx("wrap", "rounded")}>
        <div className="container ">
          <div
            className={cx("row-wrap", "row my-5 shadow")}
            style={{ borderRadius: "10px" }}
          >
            <div className={cx("col-right", "col-md-6 col-sm-6 px-5")}>
              <h3
                className="fs-xxl text-center py-3 fst-italic"
                style={{ color: "white" }}
              >
                Contact us <BsFillTvFill className="ms-2"></BsFillTvFill>
              </h3>
              <p className="text-center fw-light fst-italic text-white">
                We&apos;re open for any suggestion or just to have a chat
              </p>

              <div className="row">
                <div className="d-flex align-items-center mb-4">
                  <span className={cx("circle", "shadow")}>
                    <BsMapFill
                      className="fs-l"
                      style={{ color: "#FF6969" }}
                    ></BsMapFill>
                  </span>
                  <div className=" fs-s text-white">
                    3/2 Street, Xuan Khanh Ward, Ninh Kieu District, Can Tho
                    City
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <span className={cx("circle", "shadow")}>
                    <BsFillEnvelopeAtFill
                      className="fs-l"
                      style={{ color: "#FF6969" }}
                    ></BsFillEnvelopeAtFill>
                  </span>
                  <div className=" fs-s text-white">ctu@admin.com</div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <span className={cx("circle", "shadow")}>
                    <BsFillPhoneFill
                      className="fs-l"
                      style={{ color: "#FF6969" }}
                    ></BsFillPhoneFill>
                  </span>
                  <div className=" fs-s text-white">0123456789</div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <span className={cx("circle", "shadow")}>
                    <BsFacebook
                      className="fs-l"
                      style={{ color: "#FF6969" }}
                    ></BsFacebook>
                  </span>
                  <a
                    href="https://www.facebook.com/CTUDHCT/"
                    className=" fs-s text-white text-break"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    https://www.facebook.com/CTUDHCT/
                  </a>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <span className={cx("circle", "shadow")}>
                    <BsTiktok
                      className="fs-l"
                      style={{ color: "#FF6969" }}
                    ></BsTiktok>
                  </span>
                  <a
                    href="https://www.tiktok.com/@ctudhct"
                    className=" fs-m text-white text-break"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    https://www.tiktok.com/@ctudhct
                  </a>
                </div>
              </div>
            </div>

            <div className={cx("col-left", "col-md-6 col-sm-6 col-12")}>
              <form onSubmit={formik.handleSubmit}>
                <h3
                  className="fs-xxl text-center py-3 fst-italic"
                  style={{ color: "#FF6969" }}
                >
                  Send us a message{" "}
                  <AiFillMessage className="ms-2"></AiFillMessage>
                </h3>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={cx("input-field", "form-control fst-italic")}
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.email}
                    disabled
                  />
                  <label htmlFor="email" className="fw-light fs-s">
                    Email address
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={cx("input-field", "form-control fst-italic")}
                    id="fullName"
                    name="fullName"
                    onChange={formik.handleChange}
                    defaultValue={formik.values.fullName}
                    disabled
                  />
                  <label htmlFor="fullName" className="fw-light fs-s">
                    Full name
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={cx("input-field", "form-control")}
                    id="title"
                    name="title"
                    placeholder="name@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                  <label htmlFor="title" className="fw-light fs-s">
                    Title
                  </label>

                  {formik.errors.title && formik.touched.title && (
                    <span
                      style={{ color: "rgb(255, 105, 105)" }}
                      className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                    >
                      {formik.errors.title}
                    </span>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className={cx("input-field", "form-control")}
                    placeholder="Leave a comment here"
                    id="message"
                    name="message"
                    style={{ height: "100px" }}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                  ></textarea>
                  <label htmlFor="message" className="fw-light fs-s">
                    Message
                  </label>

                  {formik.errors.message && formik.touched.message && (
                    <span
                      className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                      style={{ color: "rgb(255, 105, 105)" }}
                    >
                      {formik.errors.message}
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button className={cx("btn-submit")}>
                    Submit <BsFillSendFill className="ms-1"></BsFillSendFill>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
