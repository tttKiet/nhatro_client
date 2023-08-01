import { Image, Modal } from "react-bootstrap";
import { GrFormClose } from "react-icons/gr";
import styles from "./ModalRoomDetails.module.scss";
import EmailVerified from "../../EmailVerified";
import classNames from "classNames/bind";
import { useAuth } from "../../../hooks";
import { Link } from "react-router-dom";
import moment from "moment";
import { useCallback } from "react";
const cx = classNames.bind(styles);

function ModalRoomDetails({ show, toggleShow, ...props }) {
  const [, , user] = useAuth();
  return (
    <Modal
      centered
      size="lg"
      show={show}
      scrollable={true}
      onHide={toggleShow}
      // backdrop="static"
      keyboard={true}
      dialogClassName={cx("wrap")}
    >
      <div className={cx("header")}>
        <h4>Room {props?.room?.number}</h4>
        <div className={cx("x")} onClick={toggleShow}>
          <GrFormClose size={26} />
        </div>
      </div>

      <Modal.Body>
        <div className={cx("wrapper", "px-5")}>
          <div className="row g-4">
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Owner:</h5>
                <div className={cx("desc")}>
                  <div className={cx("avt")}>
                    <Image src={props?.room?.boardHouseId?.userId?.avatar} />
                  </div>
                  {props?.room?.boardHouseId?.userId?.fullName}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Name:</h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.name}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Email: </h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.userId?.email}
                  <EmailVerified />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Phone: </h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.userId?.phone}
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Board house address: </h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.address}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Room type: </h5>
                <div className={cx("desc")}>
                  {props?.room?.isLayout ? "have layout" : "no layout"}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Rental start date: </h5>
                <div className={cx("desc")}>
                  {moment(props?.startDate).format("ll")}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Electric price: </h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.electricPrice}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Electric price: </h5>
                <div className={cx("desc")}>
                  {props?.room?.boardHouseId?.waterPrice}
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className={cx("item")}>
                <h5 className={cx("title")}>Room price: </h5>
                <div className={cx("desc")}>{props?.room?.price}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className={cx("footer")}></div>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalRoomDetails;
