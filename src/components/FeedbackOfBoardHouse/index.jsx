import styles from "./FeedbackOfBoardHouse.module.scss";
import classNames from "classNames/bind";
import { HiOutlineEye, HiStar } from "react-icons/hi";
import Image from "react-bootstrap/Image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useCallback, useEffect, useState } from "react";
import ModalAllReview from "./UsefulModal/ModalReviews";
import { FiMessageSquare } from "react-icons/fi";
import ModalCreateReview from "./UsefulModal/ModalCreateReview";
import { feedbackOfBoardHouseServices } from "../../services";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks";
import { AiOutlineEdit } from "react-icons/ai";

const cx = classNames.bind(styles);

function FeedbackOfBoardHouse() {
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { id } = useParams();
  const [, , user] = useAuth();
  const [existReview, setExistReview] = useState(false);
  const [review, setReview] = useState(null);

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

  useEffect(() => {
    checkAlreadyFeedback();
  }, [checkAlreadyFeedback]);

  return (
    <div className={cx("wrap")}>
      <div className={cx("wrap-feedback", "container")}>
        <hr className="mx-3 pb-3"></hr>
        <span className={cx("line")}></span>
        <p className={cx("overview-rating")}>
          <HiStar className="me-1"></HiStar>4,88 · 34 reviews
        </p>

        <div className={cx("all-feedback", "row")}>
          <div className={cx("item", "col-sm-6")}>
            <div className={cx("user")}>
              <div className={cx("avatar")}>
                <Image
                  className={cx("img-avatar")}
                  src="https://i.pinimg.com/736x/7d/b7/d3/7db7d395dbb6d0466b2eebc49ef16146.jpg"
                ></Image>
              </div>
              <div className={cx("information")}>
                <p className="m-0 fw-medium">LTV</p>
                <p className="m-0 fw-light">21/12/2023</p>
              </div>
            </div>
            <div className={cx("content")}>
              <p className={cx("text-over")}>
                Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ bị hỏng
                ngay cả khi chủ nhà biết về điều này, Không vệ sinh trước khi
                đến. Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ bị
                hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh trước
                khi đến. Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ
                bị hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều trong
                căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này, Không vệ
                sinh trước khi đến
              </p>
            </div>
          </div>

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
            <div className={cx("item")}>
              <div className={cx("user")}>
                <div className={cx("avatar")}>
                  <Image
                    className={cx("img-avatar")}
                    src="https://i.pinimg.com/736x/7d/b7/d3/7db7d395dbb6d0466b2eebc49ef16146.jpg"
                  ></Image>
                </div>
                <div className={cx("information")}>
                  <p className="m-0 fw-medium">LTV</p>
                  <p className="m-0 fw-light">21/12/2023</p>
                </div>
              </div>
              <div className={cx("content")}>
                <p className={cx("text-over")}>
                  Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ bị
                  hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh trước
                  khi đến. Căn hộ rộng rãi, thật không may, rất nhiều trong căn
                  hộ bị hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                  trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                  trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                  Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không may,
                  rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết về
                  điều này, Không vệ sinh trước khi đến
                </p>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("user")}>
                <div className={cx("avatar")}>
                  <Image
                    className={cx("img-avatar")}
                    src="https://i.pinimg.com/736x/7d/b7/d3/7db7d395dbb6d0466b2eebc49ef16146.jpg"
                  ></Image>
                </div>
                <div className={cx("information")}>
                  <p className="m-0 fw-medium">LTV</p>
                  <p className="m-0 fw-light">21/12/2023</p>
                </div>
              </div>
              <div className={cx("content")}>
                <p className={cx("text-over")}>
                  Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ bị
                  hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh trước
                  khi đến. Căn hộ rộng rãi, thật không may, rất nhiều trong căn
                  hộ bị hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                  trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                  trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                  Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không may,
                  rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết về
                  điều này, Không vệ sinh trước khi đến
                </p>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("user")}>
                <div className={cx("avatar")}>
                  <Image
                    className={cx("img-avatar")}
                    src="https://i.pinimg.com/736x/7d/b7/d3/7db7d395dbb6d0466b2eebc49ef16146.jpg"
                  ></Image>
                </div>
                <div className={cx("information")}>
                  <p className="m-0 fw-medium">LTV</p>
                  <p className="m-0 fw-light">21/12/2023</p>
                </div>
              </div>
              <div className={cx("content")}>
                <p className={cx("text-over")}>
                  Căn hộ rộng rãi, thật không may, rất nhiều trong căn hộ bị
                  hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh trước
                  khi đến. Căn hộ rộng rãi, thật không may, rất nhiều trong căn
                  hộ bị hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                  trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                  trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                  Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không may,
                  rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết về
                  điều này, Không vệ sinh trước khi đến
                </p>
              </div>
            </div>
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
          <button className={cx("btn-view-all")} onClick={handleShow}>
            All reviews <HiOutlineEye className="fs-l"></HiOutlineEye>
          </button>
        </div>
      </div>

      {/* Modal view all reviews */}
      <ModalAllReview show={show} onHide={handleClose}></ModalAllReview>

      {/* Modal create review */}
      <ModalCreateReview
        show={showCreate}
        onHide={handleCloseCreate}
        setExistReview={setExistReview}
        setReview={setReview}
        review={review}
      ></ModalCreateReview>
    </div>
  );
}

export default FeedbackOfBoardHouse;
