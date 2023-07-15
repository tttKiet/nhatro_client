/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import styles from "./ModalFullScreen.module.scss";
import classNames from "classNames/bind";
import { IoIosArrowBack } from "react-icons/io";
import { Image } from "react-bootstrap";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
const cx = classNames.bind(styles);

function ModalFullScreen({ show, onHide, imgToView }) {
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="modal-fullscreen"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header style={{ borderBottom: "0", marginTop: "15px" }}>
          <IoIosArrowBack
            onClick={onHide}
            className={cx("btn-back")}
          ></IoIosArrowBack>
        </Modal.Header>
        <Modal.Body>
          <div className={cx("wrap-carousel")}>
            <Carousel
              className={cx("carousel-control")}
              showArrows={true}
              showThumbs={false}
              emulateTouch={true}
              showIndicators={true}
              infiniteLoop={true}
              interval={3000}
              // autoPlay={true}
            >
              {imgToView.map((image, index) => (
                <div key={index}>
                  <Image
                    key={index}
                    src={image}
                    className={cx("img")}
                    alt="your-motel"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFullScreen;
