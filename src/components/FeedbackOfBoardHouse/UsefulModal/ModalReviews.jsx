import Modal from "react-bootstrap/Modal";
import styles from "./ModalReviews.module.scss";
import classNames from "classNames/bind";
import { MdClose } from "react-icons/md";
import { HiStar } from "react-icons/hi";
import { Image } from "react-bootstrap";
import { AiTwotoneStar } from "react-icons/ai";
import { Fragment, useEffect, useRef, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks";

const cx = classNames.bind(styles);

function ModalAllReview({ show, onHide, allReviews, rating }) {
  const [isFilterMine, setIsFilterMine] = useState(false);
  const [modAllReview, setModAllReview] = useState([]);
  const selectRef = useRef(null);
  const [, , user] = useAuth();

  function StarDisplay(star) {
    const numberOfStars = parseInt(star);
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<AiTwotoneStar key={i} className={cx("star")} />);
    }

    return <Fragment>{stars}</Fragment>;
  }

  function handleChangeSelect(e) {
    if (e.target.value === "newest") {
      if (isFilterMine) {
        const reviewReverse = [...allReviews].reverse();
        setIsFilterMine(false);
        setModAllReview(reviewReverse);
      } else {
        const reviewReverse = [...modAllReview].reverse();
        setModAllReview(reviewReverse);
      }
    } else if (e.target.value === "oldest") {
      if (isFilterMine) {
        setIsFilterMine(false);
        setModAllReview(allReviews);
      } else {
        const reviewReverse = [...modAllReview].reverse();
        setModAllReview(reviewReverse);
      }
    } else if (e.target.value === "mine") {
      const reviewReverse = [
        modAllReview.find((review) => review.user._id === user._id),
      ];
      setIsFilterMine(true);
      setModAllReview(reviewReverse);
    }
  }

  useEffect(() => {
    setModAllReview(allReviews);
  }, [allReviews, show]);

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
          <div className={cx("wrap-all-reviews")}>
            <div className={cx("header")}>
              <p className={cx("overview-rating")}>
                <HiStar className="me-1 mb-1 fs-xxl"></HiStar>
                {modAllReview && rating ? rating : "5"} ·{" "}
                {modAllReview && modAllReview.length > 0
                  ? modAllReview.length
                  : "0"}{" "}
                reviews
              </p>

              <div className={cx("filter")}>
                <select
                  ref={selectRef}
                  className="form-select p-2 rounded-3 shadow-sm border-1"
                  aria-label="Default select example"
                  style={{ fontSize: "14px" }}
                  onChange={(e) => handleChangeSelect(e)}
                >
                  <option value="oldest" className="fs-s">
                    Oldest
                  </option>
                  <option value="newest" className="fs-s">
                    Newest
                  </option>
                  <option value="mine" className="fs-s">
                    My review
                  </option>
                </select>
              </div>
            </div>

            <div className={cx("wrap-content")}>
              {modAllReview &&
                modAllReview?.map((feedback) => (
                  <div className={cx("item", "col-sm-6")} key={feedback._id}>
                    <div className={cx("user")}>
                      <div className={cx("avatar")}>
                        <Image
                          className={cx("img-avatar")}
                          src={feedback.user?.avatar}
                        ></Image>
                      </div>
                      <div className={cx("information")}>
                        <p className="m-0 fw-medium">
                          {feedback.user?.fullName}
                        </p>
                        <p className="m-0 fw-light">
                          {moment(feedback.createdAt)
                            .startOf("minutes")
                            .fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className={cx("content")}>
                      <div className={cx("title")}>
                        <p className={cx("text-title")}>{feedback?.title}</p>

                        <div className={cx("wrap-star-feedback")}>
                          {StarDisplay(feedback?.star)}
                        </div>
                      </div>

                      <p className={cx("text-over")}>{feedback?.message}</p>
                    </div>

                    <hr className="mx-4 "></hr>
                  </div>
                ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

ModalAllReview.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  allReviews: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rating: PropTypes.number,
};

export default ModalAllReview;
