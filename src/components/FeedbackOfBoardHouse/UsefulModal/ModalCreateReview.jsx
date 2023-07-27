import Modal from "react-bootstrap/Modal";
import styles from "./ModalCreateReview.module.scss";
import classNames from "classNames/bind";
import { MdClose } from "react-icons/md";
import { BsSend, BsTrash, BsUpload } from "react-icons/bs";
import { useAuth } from "../../../hooks";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { feedbackOfBoardHouseServices } from "../../../services";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const cx = classNames.bind(styles);

function ModalCreateReview({
  show,
  onHide,
  setExistReview,
  review,
  setReview,
}) {
  const [, , user] = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const starArr = [5, 4, 3, 2, 1];

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
      title: "",
      message: "",
      star: "",
    },
    validate,

    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  async function handleSubmit(values) {
    let toastId = null;
    toastId = toast.loading("Updating...");
    setLoading(true);
    try {
      let res = null;

      if (isUpdate) {
        res = await feedbackOfBoardHouseServices.updateFeedback(
          review._id,
          values
        );
      } else {
        res = await feedbackOfBoardHouseServices.createFeedback(
          id,
          user._id,
          values
        );
      }

      if (res.err === 0) {
        toast.update(toastId, {
          render: res.message,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        if (!isUpdate) {
          formik.resetForm();
          setReview(res.data);
        }
        setExistReview(true);
        setLoading(false);
        onHide();
      } else {
        toast.update(toastId, {
          render: res.message,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        toast.dismiss(toastId);
        toast.clearWaitingQueue();
        setLoading(false);
      }, 2000);
    }
  }

  function confirmBeforeDelete() {
    toast.error(
      <div className={cx("wrap-toast")}>
        <p className="m-0">
          Are you sure to <b>delete</b>?
        </p>
        <div className="">
          <AiOutlineCheckCircle
            style={{ color: "#FE0000" }}
            className={cx("btn-action")}
            onClick={() => handleDeleteFeedback()}
          ></AiOutlineCheckCircle>
          <AiOutlineCloseCircle
            style={{ color: "#0079FF" }}
            className={cx("btn-action")}
            onClick={() => {
              toast.dismiss();
              toast.clearWaitingQueue();
            }}
          ></AiOutlineCloseCircle>
        </div>
      </div>,
      {
        closeButton: false,
      }
    );

    async function handleDeleteFeedback() {
      toast.loading("Deleting...");
      setLoading(true);
      try {
        const res = await feedbackOfBoardHouseServices.deleteFeedback(
          review._id
        );
        if (res.err === 0) {
          setLoading(false);
          setExistReview(false);
          setReview(null);
          formik.resetForm();

          toast.dismiss();
          toast.success(res.message);
          onHide();
        } else {
          toast.dismiss();
          toast.error(res.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          toast.dismiss();
          toast.clearWaitingQueue();
          setLoading(false);
        }, 3000);
      }
    }
  }

  useEffect(() => {
    if (review) {
      setIsUpdate(true);
      formik.setValues({
        title: review.title,
        message: review.message,
        star: review.star,
      });
    } else {
      console.log("rong");
      setIsUpdate(false);
    }
  }, [review, isUpdate]);

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
            <form action="" onSubmit={formik.handleSubmit}>
              {/* rating */}
              <div className={cx("wrap-rating")}>
                <div className={cx("rating")}>
                  {starArr.map((star, index) => (
                    <Fragment key={index}>
                      <input
                        value={star}
                        checked={formik.values.star == star ? true : false}
                        name="star"
                        id={`star${star}`}
                        type="radio"
                        onChange={() =>
                          formik.setValues({ ...formik.values, star: star })
                        }
                      />
                      <label htmlFor={`star${star}`}>
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
                    </Fragment>
                  ))}
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

              <button
                type="submit"
                className={cx("btn-submit")}
                disabled={loading}
              >
                {isUpdate ? (
                  <p className="m-0">
                    Update <BsUpload className="ms-1"></BsUpload>
                  </p>
                ) : (
                  <p className="m-0">
                    Send <BsSend className="ms-1"></BsSend>
                  </p>
                )}
              </button>

              {isUpdate && (
                <button
                  type="reset"
                  className={cx("btn-submit")}
                  onClick={() => confirmBeforeDelete()}
                  disabled={loading}
                >
                  <p className="m-0">
                    Delete <BsTrash className="ms-1"></BsTrash>
                  </p>
                </button>
              )}
            </form>

            {/* </Form> */}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalCreateReview.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  setExistReview: PropTypes.func,
  review: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  setReview: PropTypes.func,
};

export default ModalCreateReview;
