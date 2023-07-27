import Modal from "react-bootstrap/Modal";
import styles from "./ModalReviews.module.scss";
import classNames from "classNames/bind";
import { MdClose } from "react-icons/md";
import { HiStar } from "react-icons/hi";
import { Image } from "react-bootstrap";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function ModalAllReview({ show, onHide }) {
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
                <HiStar className="me-1 mb-1 fs-xxl"></HiStar>4,88 · 34 reviews
              </p>

              <div className={cx("filter")}>
                <select
                  className="form-select p-2 rounded-3 shadow-sm border-1"
                  aria-label="Default select example"
                  defaultValue="all"
                  style={{ fontSize: "14px" }}
                >
                  <option value="all" className="fs-s">
                    All
                  </option>
                  <option value="newest" className="fs-s">
                    Newest
                  </option>
                  <option value="oldest" className="fs-s">
                    Oldest
                  </option>
                </select>
              </div>
            </div>

            <div className={cx("wrap-content")}>
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
                    hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                    trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                    trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                    Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không
                    may, rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết
                    về điều này, Không vệ sinh trước khi đến. Căn hộ rộng rãi,
                    thật không may, rất nhiều trong căn hộ bị hỏng ngay cả khi
                    chủ nhà biết về điều này, Không vệ sinh trước khi đến
                  </p>
                </div>

                <hr className="mx-4 "></hr>
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
                    hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                    trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                    trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                    Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không
                    may, rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết
                    về điều này, Không vệ sinh trước khi đến. Căn hộ rộng rãi,
                    thật không may, rất nhiều trong căn hộ bị hỏng ngay cả khi
                    chủ nhà biết về điều này, Không vệ sinh trước khi đến
                  </p>
                </div>

                <hr className="mx-4"></hr>
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
                    hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                    trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                    trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                    Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không
                    may, rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết
                    về điều này, Không vệ sinh trước khi đến. Căn hộ rộng rãi,
                    thật không may, rất nhiều trong căn hộ bị hỏng ngay cả khi
                    chủ nhà biết về điều này, Không vệ sinh trước khi đến
                  </p>
                </div>

                <hr className="mx-4"></hr>
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
                    hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                    trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                    trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                    Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không
                    may, rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết
                    về điều này, Không vệ sinh trước khi đến. Căn hộ rộng rãi,
                    thật không may, rất nhiều trong căn hộ bị hỏng ngay cả khi
                    chủ nhà biết về điều này, Không vệ sinh trước khi đến
                  </p>
                </div>

                <hr className="mx-4"></hr>
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
                    hỏng ngay cả khi chủ nhà biết về điều này, Không vệ sinh
                    trước khi đến. Căn hộ rộng rãi, thật không may, rất nhiều
                    trong căn hộ bị hỏng ngay cả khi chủ nhà biết về điều này,
                    Không vệ sinh trước khi đến. Căn hộ rộng rãi, thật không
                    may, rất nhiều trong căn hộ bị hỏng ngay cả khi chủ nhà biết
                    về điều này, Không vệ sinh trước khi đến. Căn hộ rộng rãi,
                    thật không may, rất nhiều trong căn hộ bị hỏng ngay cả khi
                    chủ nhà biết về điều này, Không vệ sinh trước khi đến
                  </p>
                </div>

                <hr className="mx-4"></hr>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalAllReview;
