import Modal from "react-bootstrap/Modal";
import styles from "./ModalCreateReview.module.scss";
import classNames from "classNames/bind";
import { MdClose } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { useAuth } from "../../../hooks";
import { FormikProvider, useFormik } from "formik";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ModalCreateReview({ show, onHide }) {
  const [, , user] = useAuth();

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Please enter title";
    } else if (values.title.length <= 5) {
      errors.title = "Title must more than be 5 characters";
    } else if (values.title.length > 150) {
      errors.title = "Title must less than be 150 characters";
    }

    if (!values.message) {
      errors.message = "Please enter message";
    } else if (values.message.length <= 10) {
      errors.message = "Message must more than be 10 characters";
    } else if (values.message.length > 400) {
      errors.message = "Message must less than be 400 characters";
    }

    if (!values.star) {
      errors.star = "You have to rating star for submit!";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      fullName: user.fullName,
      email: user.email,
      title: "",
      message: "",
      star: "",
    },
    validate,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  function handleSubmit(values) {
    console.log("values", values);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen="sm-down"
      >
        <span className={cx("button-close")}>
          <MdClose className={cx("close")} onClick={onHide}></MdClose>
        </span>
        <Modal.Body>
          <h4 className="fst-italic text-center fw-light">
            Write your review for this board house
          </h4>
          <div className={cx("wrap")}>
            <FormikProvider value={formik}>
              <form action="" onSubmit={formik.handleSubmit}>
                {/* rating */}
                <div className={cx("wrap-rating")}>
                  <div className={cx("rating")}>
                    <input
                      value="5"
                      name="star"
                      id="star5"
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, star: "5" })
                      }
                    />

                    <label htmlFor="star5">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                          pathLength={360}
                        />
                      </svg>
                    </label>

                    <input
                      value="4"
                      name="star"
                      id="star4"
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, star: "4" })
                      }
                    />
                    <label htmlFor="star4">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                          pathLength={360}
                        />
                      </svg>
                    </label>
                    <input
                      value="3"
                      name="star"
                      id="star3"
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, star: "3" })
                      }
                    />
                    <label htmlFor="star3">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                          pathLength={360}
                        />
                      </svg>
                    </label>
                    <input
                      value="2"
                      name="star"
                      id="star2"
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, star: "2" })
                      }
                    />
                    <label htmlFor="star2">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                          pathLength={360}
                        />
                      </svg>
                    </label>

                    <input
                      value="1"
                      name="star"
                      id="star1"
                      type="radio"
                      onChange={() =>
                        formik.setValues({ ...formik.values, star: "1" })
                      }
                    />
                    <label htmlFor="star1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                          pathLength={360}
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                {formik.touched.star && (
                  <span
                    style={{ color: "rgb(255, 105, 105)" }}
                    className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                  >
                    {formik.errors.star}
                  </span>
                )}

                {/* information */}
                <div className={cx("info-form")}>
                  <div className={cx("input-container")}>
                    <input
                      className={cx("input-field")}
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Enter title here..."
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                    <label htmlFor="title" className={cx("input-label")}>
                      Title
                    </label>
                    <span className={cx("input-highlight")}></span>
                  </div>
                  {formik.errors.title && formik.touched.title && (
                    <span
                      style={{ color: "rgb(255, 105, 105)" }}
                      className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                    >
                      {formik.errors.title}
                    </span>
                  )}

                  <div className={cx("input-container")}>
                    <textarea
                      className={cx("input-field")}
                      type="text"
                      id="message"
                      name="message"
                      style={{ height: "100px" }}
                      placeholder="Enter message here..."
                      onChange={formik.handleChange}
                      value={formik.values.message}
                    />
                    <label htmlFor="message" className={cx("input-label")}>
                      Message
                    </label>
                    <span className={cx("input-highlight")}></span>
                  </div>
                  {formik.errors.message && formik.touched.message && (
                    <span
                      style={{ color: "rgb(255, 105, 105)" }}
                      className={cx("err", "ms-2 fs-s fst-italic fw-light")}
                    >
                      {formik.errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className={cx("btn-submit")}>
                  Send <BsSend className="ms-1"></BsSend>
                </button>
              </form>
            </FormikProvider>

            {/* </Form> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCreateReview;
