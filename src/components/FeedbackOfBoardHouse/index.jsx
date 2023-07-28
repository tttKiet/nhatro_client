import styles from "./FeedbackOfBoardHouse.module.scss";
import classNames from "classNames/bind";
import { HiOutlineEye, HiStar } from "react-icons/hi";
import Image from "react-bootstrap/Image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Fragment, useCallback, useEffect, useState } from "react";
import ModalAllReview from "./UsefulModal/ModalReviews";
import { FiMessageSquare } from "react-icons/fi";
import ModalCreateReview from "./UsefulModal/ModalCreateReview";
import { feedbackOfBoardHouseServices } from "../../services";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks";
import { AiOutlineEdit, AiTwotoneStar } from "react-icons/ai";
import moment from "moment";
import { Tooltip } from "react-tooltip";

const cx = classNames.bind(styles);

function FeedbackOfBoardHouse() {
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { id } = useParams();
  const [, , user] = useAuth();
  const [existReview, setExistReview] = useState(false);
  const [review, setReview] = useState(null);
  const [allReviews, setAllReviews] = useState(null);
  const [rating, setRating] = useState(null);

  // on/off modal view all reviews
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // on/off modal create review
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const checkAlreadyFeedback = useCallback(async () => {
    try {
      const res = await feedbackOfBoardHouseServices.checkAlreadyFeedback(
        user._id,
        id
      );
      if (res.isFeedback) {
        setExistReview(true);
        setReview(res.data);
      } else {
        setExistReview(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, user]);

  const getAllFeedback = useCallback(async () => {
    try {
      const res = await feedbackOfBoardHouseServices.getAllFeedback(id);
      if (res.err === 0 && res.data.length > 0) {
        setAllReviews(res.data);
        setRating(res.rating);
      } else {
        setAllReviews(null);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  function StarDisplay(star) {
    const numberOfStars = parseInt(star);
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<AiTwotoneStar key={i} className={cx("star")} />);
    }

    return <Fragment>{stars}</Fragment>;
  }

  useEffect(() => {
    checkAlreadyFeedback();
    getAllFeedback();
  }, [checkAlreadyFeedback, getAllFeedback]);

  return (
    <div className={cx("wrap")}>
      <div className={cx("wrap-feedback", "container shadow-sm")}>
        {/* <hr className="mx-3 pb-3"></hr> */}
        <span className={cx("line")}></span>
        <p className={cx("overview-rating")}>
          <HiStar className="me-1"></HiStar>
          {allReviews && rating ? rating : "5"} ·{" "}
          {allReviews && allReviews.length > 0 ? allReviews.length : "0"}{" "}
          reviews
        </p>

        <div className={cx("all-feedback", "row")}>
          {allReviews &&
            allReviews.slice(0, 4).map((feedback) => (
              <div className={cx("item", "col-sm-6")} key={feedback._id}>
                <div className={cx("user")}>
                  <div className={cx("avatar")}>
                    <Link to={`/user/${feedback?.user?._id}`}>
                      <Image
                        id="user-information"
                        className={cx("img-avatar")}
                        src={feedback.user?.avatar}
                      ></Image>
                    </Link>
                    <Tooltip
                      anchorSelect="#user-information"
                      content="Click to see profile"
                    />
                  </div>
                  <div className={cx("information")}>
                    <p className="m-0 fw-medium">{feedback.user?.fullName}</p>
                    <p className={cx("text-title")}>
                      {moment(feedback.createdAt).startOf("minutes").fromNow()}
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
              </div>
            ))}

          {/* responsive */}
          <Carousel
            className={cx("carousel", "shadow-sm")}
            showThumbs={false}
            autoPlay={false}
            interval={8000}
            infiniteLoop={true}
            transitionTime={1000}
            showStatus={false}
            emulateTouch={false}
            showArrows={false}
            showIndicators={true}
            swipeable={true}
          >
            {allReviews &&
              allReviews.slice(0, 4).map((feedback) => (
                <div className={cx("item", "col-sm-6")} key={feedback._id}>
                  <div className={cx("user")}>
                    <div className={cx("avatar")}>
                      <Link to={`/user/${feedback?.user?._id}`}>
                        <Image
                          id="user-information"
                          className={cx("img-avatar")}
                          src={feedback.user?.avatar}
                        ></Image>
                      </Link>
                      <Tooltip
                        anchorSelect="#user-information"
                        content="Click to see profile"
                      />
                    </div>
                    <div className={cx("information")}>
                      <p className="m-0 fw-medium">{feedback.user?.fullName}</p>
                      <p className={cx("text-title")}>
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
                </div>
              ))}
          </Carousel>
        </div>

        <div className={cx("group-btn")}>
          <button
            className={cx("btn-view-all", "me-4")}
            onClick={handleShowCreate}
          >
            {existReview === true ? (
              <p className="m-0">
                Edit review <AiOutlineEdit className="fs-l" />
              </p>
            ) : (
              <p className="m-0">
                Create review <FiMessageSquare className="fs-l" />
              </p>
            )}
          </button>
          {existReview && (
            <button className={cx("btn-view-all")} onClick={handleShow}>
              View {allReviews?.length} reviews{" "}
              <HiOutlineEye className="fs-l"></HiOutlineEye>
            </button>
          )}
        </div>
      </div>

      {/* Modal view all reviews */}
      <ModalAllReview
        show={show}
        onHide={handleClose}
        allReviews={allReviews}
        StarDisplay={StarDisplay}
        rating={rating}
      ></ModalAllReview>

      {/* Modal create review */}
      <ModalCreateReview
        show={showCreate}
        onHide={handleCloseCreate}
        setExistReview={setExistReview}
        setReview={setReview}
        review={review}
        getAllFeedback={getAllFeedback}
      ></ModalCreateReview>
    </div>
  );
}

export default FeedbackOfBoardHouse;
