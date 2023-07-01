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

const cx = classNames.bind(styles);

function Contact() {
  const [, , inforUser] = useAuth();

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter your title";
    }
    if (!values.content) {
      errors.content = "Please enter your content";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: inforUser.fullName,
      email: inforUser.email,
      title: "",
      content: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: (values) => {
      handleSubmit(inforUser._id, values);
    },
  });

  async function handleSubmit(id, values) {
    const res = await feedbackService.createFeedback(id, values);
    if (res.err === 0) {
      alert("ok");
    } else {
      alert("cut");
    }
  }

  return (
    <>
      <div className={cx("wrap", "rounded")}>
        {/* <form onSubmit={formik.handleSubmit}>
      <div className={cx({cx("wrap-contact-form")}>
      <div className={cx({cx("left-contact")}>
        <div className={cx({cx("left-item")}>
          <h4>Full Name:</h4>
          <span  className={cx({cx("infor")}>{inforUser?.fullName}</span>
        </div>
        <div className={cx({cx("left-item")}>
          <h4 >Email:</h4>
          <span className={cx({cx("infor")}>{inforUser?.email}</span>
        </div>
        <div className={cx({cx("left-item")}>
          <h4>Title:</h4>
          <input 
            type="text" 
            placeholder="Title"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            />
           {formik.errors.title && formik.touched.title && (
                <span className={cx({cx("err")}>{formik.errors.title}</span>
              )}
            
        </div>
        <div className={cx({cx("left-item")}>
          <h4>Content:</h4>
          <textarea 
            type="text-aria" 
            placeholder="Message"
            id="content"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            />
           {formik.errors.content && formik.touched.content && (
                <span className={cx({cx("err")}>{formik.errors.content}</span>
              )}
        </div>
        <div className={cx({cx("left-item")}>
          <button
           
           className={cx({cx("btn")}
           type="submit"
           
           >Sent Message</button>
        </div>

        </div>
      <div className={cx({cx("right-contact")}>
      <img src="https://originhr.in/wp-content/uploads/2022/06/support-img.png"alt="" />

      </div>
      </div>
    </form> */}

        <div className="container ">
          <div className="row my-5 shadow" style={{ borderRadius: "10px" }}>
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
                    className={cx("input-field", "form-control")}
                    id="email"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="email" className="fw-light fs-s">
                    Email address
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={cx("input-field", "form-control")}
                    id="fullName"
                    placeholder="name@example.com"
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
                    placeholder="name@example.com"
                  />
                  <label htmlFor="title" className="fw-light fs-s">
                    Title
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <textarea
                    className={cx("input-field", "form-control")}
                    placeholder="Leave a comment here"
                    id="message"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="message" className="fw-light fs-s">
                    Message
                  </label>
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
